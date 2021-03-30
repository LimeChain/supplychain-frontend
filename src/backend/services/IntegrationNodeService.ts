import fs from 'fs/promises';
import path from 'path';
import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import ProductRepo from '../modules/ProductModule/Product/Repo/ProductRepo';
import SkuModel from '../modules/ProductModule/Sku/Model/SkuModel';
import SkuRepo from '../modules/ProductModule/Sku/Repo/SkuRepo';
import SkuOriginModel from '../modules/ProductModule/SkuOrigin/Model/SkuOriginModel';
import SkuOriginRepo from '../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepo';
import ShipmentModel from '../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentRepo from '../modules/ShipmentModule/Shipment/Repo/ShipmentRepo';
import ShipmentDocumentModel from '../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentRepo from '../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepo';
import SV from '../utilities/SV';
import Service from './common/Service';

export default class IntegrationNodeService extends Service {

    shipmentRepo: ShipmentRepo = this.repoFactory.getShipmentRepo();
    skuRepo: SkuRepo = this.repoFactory.getSkuRepo();
    skuOriginRepo: SkuOriginRepo = this.repoFactory.getSkuOriginRepo();
    shipmentDocumentRepo: ShipmentDocumentRepo = this.repoFactory.getShipmentDocumentRepo();
    productRepo: ProductRepo = this.repoFactory.getProductRepo();

    async creditProduct(reqProductModel: ProductModel) {
        await this.productRepo.save(reqProductModel);
    }

    async creditShipment(siteId: number, reqShipmentModel: ShipmentModel, reqSkuModels: SkuModel[], reqSkuOriginModels: SkuOriginModel[], reqShipmentDocumentModels: ShipmentDocumentModel[]): Promise < void > {
        const shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(reqShipmentModel.shipmentId);
        let oldShipmentStatus = SV.NOT_EXISTS;
        if (shipmentModel !== null) {
            oldShipmentStatus = shipmentModel.shipmentStatus;
        }

        await this.shipmentRepo.save(reqShipmentModel);

        // create notification
        // if (reqShipmentModel.isStatusChangeForNotification(oldShipmentStatus)) {
        if (oldShipmentStatus !== reqShipmentModel.shipmentStatus) {
            const destinatioNotification = reqShipmentModel.isInTransit() === true && reqShipmentModel.shipmentDestinationSiteId === siteId;
            const originNotification = reqShipmentModel.isReceived() === true && reqShipmentModel.shipmentOriginSiteId === siteId;
            if (destinatioNotification === true || originNotification === true) {
                const notificationService = this.servicesFactory.getNotificationService();
                notificationService.createNotification(reqShipmentModel.shipmentId, reqShipmentModel.shipmentStatus);
            }
        }

        // credit sku models
        for (let i = 0; i < reqSkuModels.length; i++) {
            const reqSkuModel = reqSkuModels[i];
            await this.skuRepo.save(reqSkuModel);
        }

        // credit sku origin models
        for (let i = 0; i < reqSkuOriginModels.length; i++) {
            const reqSkuOriginModel = reqSkuOriginModels[i];
            await this.skuOriginRepo.save(reqSkuOriginModel);
        }

        // delete missing document models from the db
        await this.shipmentDocumentRepo.deleteUnused(reqShipmentModel, reqShipmentDocumentModels);

        // delete missing document files
        const storagePath = reqShipmentModel.getStoragePath();
        await fs.mkdir(storagePath, { 'recursive': true });
        try {
            const documentNames: string[] = await fs.readdir(storagePath);

            const set = new Set(reqShipmentDocumentModels.map((m) => m.shipmentId === reqShipmentModel.shipmentId && m.shipmentDocumentId.toString()))

            for (let i = 0; i < documentNames.length; i++) {
                const documentName = documentNames[i];
                if (set.has(documentName) === false) {
                    await fs.rm(path.join(storagePath, documentName));
                }
            }
        } catch (err) {
        }

        // credit shipment document models
        for (let i = 0; i < reqShipmentDocumentModels.length; i++) {
            const reqShipmentDocumentModel = reqShipmentDocumentModels[i];

            // if document is from another shipment through sku origin dont add it
            if (reqShipmentDocumentModel.shipmentId !== reqShipmentModel.shipmentId) {
                continue;
            }

            // do not need to remove the begging of the URL, because here shipmentDocumentUrl is only base64 encoded bytes, without the prefix
            const documentBuffer = Buffer.from(reqShipmentDocumentModel.shipmentDocumentUrl, 'base64');
            const documentPath = reqShipmentModel.getShipmentDocumentStoragePath(reqShipmentDocumentModel.shipmentDocumentId);

            reqShipmentDocumentModel.updateShipmentDocumentUrl();
            await fs.writeFile(documentPath, documentBuffer);
            await this.shipmentDocumentRepo.save(reqShipmentDocumentModel);
        }

        if ((await fs.readdir(storagePath)).length === 0) {
            await fs.rmdir(storagePath);
        }
    }

    async dlt(shipmentId: number, shipmentStatus: number, dlt: string, hash: string) {
        const shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(shipmentId);
        if (shipmentModel === null) { // this node does not have this shipment
            return;
        }

        if (shipmentModel.shipmentStatus !== shipmentStatus) {
            return;
        }

        shipmentModel.shipmentDltProof = dlt;
        shipmentModel.shipmentHash = hash;
        await this.shipmentRepo.save(shipmentModel);
    }

}
