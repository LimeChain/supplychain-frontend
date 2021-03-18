import fs from 'fs/promises';
import ShipmentConstsH from '../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
import SkuModel from '../modules/ProductModule/Sku/Model/SkuModel';
import SkuRepo from '../modules/ProductModule/Sku/Repo/SkuRepo';
import SkuOriginModel from '../modules/ProductModule/SkuOrigin/Model/SkuOriginModel';
import ShipmentModel from '../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentRepo from '../modules/ShipmentModule/Shipment/Repo/ShipmentRepo';
import ShipmentFilter from '../modules/ShipmentModule/Shipment/Utils/ShipmentFilter';
import ShipmentDocumentModel from '../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentRepo from '../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepo';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import SV from '../utilities/SV';
import Service from './common/Service';
import NotificationService from './NotificationService';
import SkuOriginRepo from '../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepo';
import DatabaseWhere from '../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../utilities/database/DatabaseWhereClause';
import SkuModelG from '../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../modules/ProductModule/Sku/Model/SkuModelH';
import SkuOriginModelH from '../modules/ProductModule/SkuOrigin/Model/SkuOriginModelH';
import ShipmentDocumentModelH from '../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';
import ShipmentModelH from '../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
import ShipmentConsts from '../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import ProductRepo from '../modules/ProductModule/Product/Repo/ProductRepo';
import SkuFilter from '../modules/ProductModule/Sku/Utils/SkuFilter';
import buffer from 'buffer';
import path from 'path';
import S from '../../frontend/resources/common/js/utilities/Main';
import ShipmentApiH from '../requests/api/shipment/ShipmentApi.h';
import Params from '../utilities/Params';
import { number } from 'prop-types';

export default class ShipmentService extends Service {
    shipmentRepo: ShipmentRepo = this.repoFactory.getShipmentRepo();
    skuRepo: SkuRepo = this.repoFactory.getSkuRepo();
    skuOriginRepo: SkuOriginRepo = this.repoFactory.getSkuOriginRepo();
    shipmentDocumentRepo: ShipmentDocumentRepo = this.repoFactory.getShipmentDocumentRepo();
    productRepo: ProductRepo = this.repoFactory.getProductRepo();

    async creditShipment(
        siteId: number,
        reqShipmentModel: ShipmentModel,
        reqSkuModels: SkuModel[],
        reqSkuOriginModels: SkuOriginModel[],
        reqShipmentDocumentModels: ShipmentDocumentModel[],
    ): Promise<{ shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[] }> {

        const skuRepo = this.repoFactory.getSkuRepo();
        const skuOriginRepo = this.repoFactory.getSkuOriginRepo();
        const shipmentDocumentRepo = this.repoFactory.getShipmentDocumentRepo();

        let shipmentModel: ShipmentModel | null = null;
        if (reqShipmentModel.isNew() === true) {
            shipmentModel = new ShipmentModel();
            shipmentModel.shipmentOriginSiteId = siteId;
            // if there is some specific fields that must be set just on creation, e.g. -> creation timestamp
        } else {
            shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(reqShipmentModel.shipmentId);
            if (shipmentModel === null) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }

            if (shipmentModel.isShipmentStatusLocked(reqShipmentModel.shipmentStatus)) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }
            shipmentModel.shipmentOriginSiteId = reqShipmentModel.shipmentOriginSiteId;
        }

        const oldShipmentStatus = shipmentModel.shipmentStatus;

        shipmentModel.shipmentName = reqShipmentModel.shipmentName;
        shipmentModel.shipmentStatus = reqShipmentModel.shipmentStatus;

        shipmentModel.shipmentConsignmentNumber = reqShipmentModel.shipmentConsignmentNumber;
        shipmentModel.shipmentDestinationSiteId = reqShipmentModel.shipmentDestinationSiteId;
        shipmentModel.shipmentDateOfShipment = reqShipmentModel.shipmentDateOfShipment;
        shipmentModel.shipmentDateOfArrival = reqShipmentModel.shipmentDateOfArrival;
        shipmentModel.shipmentDltAnchored = reqShipmentModel.shipmentDltAnchored;
        shipmentModel.shipmentDltProof = reqShipmentModel.shipmentDltProof;

        if (reqShipmentModel.shipmentDeleted !== SV.NOT_EXISTS) {
            shipmentModel.shipmentDeleted = reqShipmentModel.shipmentDeleted;
        }

        shipmentModel.shipmentId = (await this.shipmentRepo.save(shipmentModel)).shipmentId;

        // create notification

        if (shipmentModel.isStatusChangeForNotification(oldShipmentStatus)) {
            const notificationService = this.servicesFactory.getNotificationService();
            notificationService.createNotification(shipmentModel.shipmentId, shipmentModel.shipmentStatus);
        }

        // delete missing skuModels
        const skuModDelDbWhere = new DatabaseWhere();

        skuModDelDbWhere.andClause([
            new DatabaseWhereClause(SkuModel.P_SKU_ID, '!=', reqSkuModels.map((s) => s.skuId)),
            new DatabaseWhereClause(SkuModel.P_SHIPMENT_ID, '=', shipmentModel.shipmentId),
        ])

        const skuToDeleteModels = await this.skuRepo.fetch(skuModDelDbWhere);
        await this.skuRepo.deleteByPrimaryValues(skuToDeleteModels.map((s) => s.skuId))

        // credit sku models
        const skuModels = []
        for (let i = 0; i < reqSkuModels.length; i++) {
            const reqSkuModel = reqSkuModels[i];

            let skuModel: SkuModel | null = null;

            if (reqSkuModel.isNew() === true || reqSkuModel.skuId < 0) {
                skuModel = new SkuModel();
                skuModel.shipmentId = shipmentModel.shipmentId;
            } else {
                skuModel = await skuRepo.fetchByPrimaryValue(reqSkuModel.skuId);
                if (skuModel === null) {
                    throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
                }
            }

            skuModel.productId = reqSkuModel.productId;
            skuModel.quantity = reqSkuModel.quantity;
            skuModel.pricePerUnit = reqSkuModel.pricePerUnit;
            skuModel.currency = reqSkuModel.currency;
            skuModel.skuId = (await skuRepo.save(skuModel)).skuId;

            // change referenceId in origin to new actual id
            const reqSkuOriginModel = reqSkuOriginModels.find((reqSkuOModel) => reqSkuOModel.skuId === reqSkuModel.skuId)
            if (reqSkuOriginModel !== undefined) {
                reqSkuOriginModel.skuId = skuModel.skuId;
            }

            skuModels.push(skuModel);
        }

        // delete missing skuOriginModels
        const skuOriginModDelDbWhere = new DatabaseWhere();

        skuOriginModDelDbWhere.clause(new DatabaseWhereClause(SkuOriginModel.P_SKU_ID, '=', skuToDeleteModels.map((s) => s.skuId)))

        await this.skuOriginRepo.delete(skuOriginModDelDbWhere);

        const skuOriginModels = [];
        for (let i = 0; i < reqSkuOriginModels.length; i++) {
            const reqSkuOriginModel = reqSkuOriginModels[i];
            let skuOriginModel: SkuOriginModel | null = null;

            if (reqSkuOriginModel.isNew() === true) {
                skuOriginModel = new SkuOriginModel();
            } else {
                skuOriginModel = await skuOriginRepo.fetchByPrimaryValue(reqSkuOriginModel.skuOriginId);
                if (skuOriginModel === null) {
                    throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
                }
            }

            skuOriginModel.skuId = reqSkuOriginModel.skuId;
            skuOriginModel.shipmentId = reqSkuOriginModel.shipmentId;
            skuOriginModel.skuOriginId = (await skuOriginRepo.save(skuOriginModel)).skuOriginId;

            skuOriginModels.push(skuOriginModel);
        }

        const shipmentDocumentModels = [];

        const docuDelDbWhere = new DatabaseWhere();
        docuDelDbWhere.andClause([
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_DOCUMENT_ID, '!=', reqShipmentDocumentModels.map((s) => s.shipmentDocumentId)),
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_ID, '=', shipmentModel.shipmentId),
        ])
        await shipmentDocumentRepo.delete(docuDelDbWhere);

        // delete document files
        const storagePath = shipmentModel.getStoragePath();
        try {
            const documentNames: string[] = await fs.readdir(storagePath);

            const set = new Set(reqShipmentDocumentModels.map((m) => m.shipmentDocumentId.toString()))
            for (let i = 0; i < documentNames.length; i++) {
                const documentName = documentNames[i];
                // if (reqShipmentDocumentModels.find((s) => s.shipmentDocumentId === parseInt(documentName)) === undefined) {
                if (set.has(documentName) === false) {
                    await fs.rm(path.join(storagePath, documentName));
                }
            }

            if ((await fs.readdir(storagePath)).length === 0) {
                await fs.rmdir(storagePath);
            }
        } catch (err) {

        }

        for (let i = 0; i < reqShipmentDocumentModels.length; i++) {
            const reqShipmentDocumentModel = reqShipmentDocumentModels[i];
            let shipmentDocumentModel: ShipmentDocumentModel | null = null;

            if (reqShipmentDocumentModel.isNew() === true) {
                shipmentDocumentModel = new ShipmentDocumentModel();
            } else {
                shipmentDocumentModel = await shipmentDocumentRepo.fetchByPrimaryValue(reqShipmentDocumentModel.shipmentDocumentId);
                if (shipmentDocumentModel === null) {
                    throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
                }
            }

            shipmentDocumentModel.shipmentId = shipmentModel.shipmentId;
            shipmentDocumentModel.documentType = reqShipmentDocumentModel.documentType;
            shipmentDocumentModel.shipmentDocumentUrl = reqShipmentDocumentModel.shipmentDocumentUrl;
            shipmentDocumentModel.sizeInBytes = reqShipmentDocumentModel.sizeInBytes;
            shipmentDocumentModel.name = reqShipmentDocumentModel.name;
            shipmentDocumentModel.mimeType = reqShipmentDocumentModel.mimeType;
            shipmentDocumentModel.shipmentDocumentId = (await shipmentDocumentRepo.save(shipmentDocumentModel)).shipmentDocumentId;

            shipmentDocumentModels.push(shipmentDocumentModel);
        }

        return { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels };
    }

    async uploadShipmentDocument(reqShipmentDocumentModel: ShipmentDocumentModel): Promise<ShipmentDocumentModel> {
        let shipmentDocumentModel: ShipmentDocumentModel | null = null;
        const shipmentDocumentRepo = this.shipmentDocumentRepo;

        shipmentDocumentModel = new ShipmentDocumentModel();

        if (reqShipmentDocumentModel.shipmentDocumentUrl.startsWith(ShipmentDocumentModel.FILE_DATA_STRING_BEGIN)) {
            const base64Buffer = reqShipmentDocumentModel.shipmentDocumentUrl.substring(reqShipmentDocumentModel.shipmentDocumentUrl.indexOf(',') + 1);
            const documentBuffer = Buffer.from(base64Buffer, 'base64');

            reqShipmentDocumentModel.shipmentDocumentUrl = SV.Strings.EMPTY;
            shipmentDocumentModel.shipmentDocumentId = (await shipmentDocumentRepo.save(shipmentDocumentModel)).shipmentDocumentId;

            const shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(reqShipmentDocumentModel.shipmentId);

            const storagePath = shipmentModel.getStoragePath();
            await fs.mkdir(storagePath, { 'recursive': true });
            const documentPath = shipmentModel.getShipmentDocumentStoragePath(shipmentDocumentModel.shipmentDocumentId);

            console.log(documentPath);
            await fs.writeFile(documentPath, documentBuffer);
            reqShipmentDocumentModel.sizeInBytes = (await fs.stat(documentPath)).size;
            reqShipmentDocumentModel.gupdateShipmentDocumentUrl();
        }

        shipmentDocumentModel.shipmentId = reqShipmentDocumentModel.shipmentId;
        shipmentDocumentModel.documentType = reqShipmentDocumentModel.documentType;
        shipmentDocumentModel.shipmentDocumentUrl = reqShipmentDocumentModel.shipmentDocumentUrl;
        shipmentDocumentModel.sizeInBytes = reqShipmentDocumentModel.sizeInBytes;
        shipmentDocumentModel.name = reqShipmentDocumentModel.name;
        shipmentDocumentModel.mimeType = reqShipmentDocumentModel.mimeType;

        shipmentDocumentModel.shipmentDocumentId = (await shipmentDocumentRepo.save(shipmentDocumentModel)).shipmentDocumentId;

        return shipmentDocumentModel;

    }

    async fetchShipmentDocumentById(shipmentDocumentId: number): Promise<ShipmentDocumentModel> {
        return this.shipmentDocumentRepo.fetchByPrimaryValue(shipmentDocumentId);
    }

    async fetchShipmentsByFilter(
        siteId: number,
        page: number,
        searchBy: string,
        sortBy: number,
        from: number,
        to: number,
    ): Promise<{ shipmentModels: Array<ShipmentModel>, totalSize: number }> {
        const shipmentFilter = new ShipmentFilter();
        shipmentFilter.page = page;
        shipmentFilter.searchBy = searchBy;
        shipmentFilter.sortBy = sortBy;
        shipmentFilter.siteId = siteId;

        const shipmentModels = await this.shipmentRepo.fetchByFilter(shipmentFilter);

        if (shipmentModels === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        return {
            shipmentModels: shipmentModels.slice(from, to),
            totalSize: shipmentModels.length,
        }
    }

    async fetchShipmentById(shipmentId: number): Promise<{ shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[] }> {

        const shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(shipmentId);
        if (shipmentModel === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        const skuDbWhere = new DatabaseWhere();
        skuDbWhere.clause(new DatabaseWhereClause(SkuModelH.P_SHIPMENT_ID, '=', shipmentId));
        const skuModels = await this.skuRepo.fetch(skuDbWhere);

        const skuoriginDbWhere = new DatabaseWhere();
        skuoriginDbWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ID, '=', skuModels.map((s) => s.skuId)));
        const skuOriginModels = await this.skuOriginRepo.fetch(skuoriginDbWhere);

        const shipmentDocumentsDbWhere = new DatabaseWhere();
        shipmentDocumentsDbWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_ID, '=', shipmentId));
        const shipmentDocumentModels = await this.shipmentDocumentRepo.fetch(shipmentDocumentsDbWhere);

        return { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels };
    }

    async fetchShipmentsWhereProductLeftByProductId(productId: number, siteId): Promise<{ shipmentModels: ShipmentModel[], skuModels: SkuModel[] }> {
        const skuDbWhere = new DatabaseWhere();
        let { skuModels } = await this.fetchSkusInStock(siteId);

        skuModels = skuModels.filter((s) => s.productId === productId);
        const shipmentModels = await this.shipmentRepo.fetchByPrimaryValues(skuModels.map((s) => s.shipmentId));

        return { shipmentModels, skuModels };
    }

    async fetchProductsInStock(siteId: number, searchBy: string, sortBy: number, from: number, to: number): Promise<{ skuModels: SkuModel[], productModels: ProductModel[], totalSkuSize: number }> {
        let { skuModels, productModels } = await this.fetchSkusInStock(siteId);
        const sign = sortBy / Math.abs(sortBy);

        skuModels = skuModels.sort((a: SkuModel, b: SkuModel) => {

            const productNameA = productModels.find((productJson: ProductModel) => productJson.productId === a.productId).productName;
            const productNameB = productModels.find((productJson: ProductModel) => productJson.productId === b.productId).productName;

            switch (Math.abs(sortBy)) {
                case SkuFilter.S_SORT_BY_NAME:
                    return productNameA.localeCompare(productNameB) * sign;
                default:
                    return (a.skuId - b.skuId) * sign;

            }
        })

        if (searchBy !== SV.Strings.EMPTY) {

            skuModels = skuModels.filter((skuModel: SkuModel) => {
                if (skuModel.skuId.toString().includes(searchBy.toLocaleLowerCase())) {
                    return true;
                }

                if (productModels.find((p: ProductModel) => p.productId === skuModel.productId).productName.toLowerCase().includes(searchBy.toLocaleLowerCase())) {
                    return true;
                }

                return false;
            });
        }

        const totalSkuSize = skuModels.length;

        skuModels = skuModels.slice(from, to);
        productModels = productModels.filter((p) => skuModels.find((s) => s.productId === p.productId) !== undefined)

        return { skuModels, productModels, totalSkuSize };
    }

    async fetchSkusInStock(siteId: number): Promise<{ skuModels: SkuModel[], productModels: ProductModel[] }> {

        const shipmentFilter = new ShipmentFilter();
        shipmentFilter.siteId = siteId;
        shipmentFilter.page = ShipmentFilter.S_PAGE_STATUS_INCOMMING;
        shipmentFilter.status = ShipmentModel.S_STATUS_RECEIVED;

        const shipmentsDeliveredHere = await this.shipmentRepo.fetchByFilter(shipmentFilter);

        const skusInShipmentsDbWhere = new DatabaseWhere();
        skusInShipmentsDbWhere.clause(new DatabaseWhereClause(SkuModel.P_SHIPMENT_ID, '=', shipmentsDeliveredHere.map((s) => s.shipmentId)));
        const skusInShipments = await this.skuRepo.fetch(skusInShipmentsDbWhere);

        const skuOriginsFromShipmentsDbWhere = new DatabaseWhere();
        skuOriginsFromShipmentsDbWhere.clause(new DatabaseWhereClause(SkuOriginModel.P_SHIPMENT_ID, '=', shipmentsDeliveredHere.map((s) => s.shipmentId)));
        const skuoriginsFromShipments = await this.skuOriginRepo.fetch(skuOriginsFromShipmentsDbWhere);

        const skusInSkuOrigins = await this.skuRepo.fetchByPrimaryValues(skuoriginsFromShipments.map((s) => s.skuId));

        shipmentsDeliveredHere.forEach((shipmentModel: ShipmentModel) => {
            skusInShipments.filter((s) => s.shipmentId === shipmentModel.shipmentId)
                .forEach((skuModel: SkuModel) => {
                    let skuQuantity = skuModel.quantity;

                    skuoriginsFromShipments.filter((s) => s.shipmentId === shipmentModel.shipmentId)
                        .forEach((skuoriginModel: SkuOriginModel) => {
                            const skuInThisOrigin = skusInSkuOrigins.find((s) => s.skuId === skuoriginModel.skuId);

                            if (skuInThisOrigin.productId === skuModel.productId) {
                                skuQuantity -= skuInThisOrigin.quantity;
                            }
                        })

                    skuModel.quantity = skuQuantity;
                })
        })

        const skuModels = skusInShipments.filter((s) => s.quantity > 0);
        const productModels = await this.productRepo.fetchByPrimaryValues(skuModels.map((s) => s.productId));

        return { skuModels, productModels };
    }
}
