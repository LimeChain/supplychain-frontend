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
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';

export default class IntegrationNodeService extends Service {

    shipmentRepo: ShipmentRepo = this.repoFactory.getShipmentRepo();
    skuRepo: SkuRepo = this.repoFactory.getSkuRepo();
    skuOriginRepo: SkuOriginRepo = this.repoFactory.getSkuOriginRepo();
    shipmentDocumentRepo: ShipmentDocumentRepo = this.repoFactory.getShipmentDocumentRepo();
    productRepo: ProductRepo = this.repoFactory.getProductRepo();

    async creditProduct(reqProductModel: ProductModel) {
        await this.productRepo.saveWithPrimaryKey(reqProductModel);
    }

    async creditShipment(reqShipmentModel: ShipmentModel, reqSkuModels: SkuModel[], reqSkuOriginModels: SkuOriginModel[], reqShipmentDocumentModels: ShipmentDocumentModel[]): Promise < void > {
        await this.shipmentRepo.saveWithPrimaryKey(reqShipmentModel);

        // create notification
        // if (shipmentModel.isStatusChangeForNotification(oldShipmentStatus)) {
        //     const notificationService = this.servicesFactory.getNotificationService();
        //     notificationService.createNotification(shipmentModel.shipmentId, shipmentModel.shipmentStatus);
        // }

        // credit sku models
        for (let i = 0; i < reqSkuModels.length; i++) {
            const reqSkuModel = reqSkuModels[i];
            await this.skuRepo.saveWithPrimaryKey(reqSkuModel);
        }

        // credit sku origin models
        for (let i = 0; i < reqSkuOriginModels.length; i++) {
            const reqSkuOriginModel = reqSkuOriginModels[i];
            await this.skuOriginRepo.saveWithPrimaryKey(reqSkuOriginModel);
        }

        // delete missing document models from the db
        await this.shipmentDocumentRepo.deleteUnused(reqShipmentModel, reqShipmentDocumentModels);

        // delete missing document files
        const storagePath = reqShipmentModel.getStoragePath();
        try {
            const documentNames: string[] = await fs.readdir(storagePath);

            const set = new Set(reqShipmentDocumentModels.map((m) => m.shipmentId === reqShipmentModel.shipmentId && m.shipmentDocumentId.toString()))

            for (let i = 0; i < documentNames.length; i++) {
                const documentName = documentNames[i];
                if (set.has(documentName) === false) {
                    await fs.rm(path.join(storagePath, documentName));
                }
            }

            if ((await fs.readdir(storagePath)).length === 0) {
                await fs.rmdir(storagePath);
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

            await this.shipmentDocumentRepo.saveWithPrimaryKey(reqShipmentDocumentModel);
        }
    }

}
