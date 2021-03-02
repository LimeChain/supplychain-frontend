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

export default class ShipmentService extends Service {
    shipmentRepo: ShipmentRepo = this.repoFactory.getShipmentRepo();

    async creditShipment(reqShipmentModel: ShipmentModel, reqSkuModels: SkuModel[], reqSkuOriginModels: SkuOriginModel[], reqShipmentDocumentModels: ShipmentDocumentModel[]): Promise<ShipmentModel> {

        const skuRepo = this.repoFactory.getSkuRepo();
        const skuOriginRepo = this.repoFactory.getSkuOriginRepo();
        const shipmentDocumentRepo = this.repoFactory.getShipmentDocumentRepo();

        let shipmentModel: ShipmentModel | null = null;
        if (reqShipmentModel.isNew() === true) {
            shipmentModel = new ShipmentModel();
            shipmentModel.shipmentDeleted = SV.FALSE;
            // if there is some specific fields that must be set just on creation, e.g. -> creation timestamp
        } else {
            shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(reqShipmentModel.shipmentId);
            if (shipmentModel === null) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }

            if (shipmentModel.isShipmentStatusLocked(reqShipmentModel.shipmentStatus)) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }
        }

        const oldShipmentStatus = shipmentModel.shipmentStatus;

        // create notification if shipment sent or received
        if (reqShipmentModel.shipmentStatus !== SV.NOT_EXISTS) {
            shipmentModel.shipmentStatus = reqShipmentModel.shipmentStatus;
            // create notification

            if (shipmentModel.isStatusChangeForNotification(oldShipmentStatus)) {
                const notificationService = this.servicesFactory.getNotificationService();
                notificationService.createNotification(shipmentModel.shipmentId, shipmentModel.shipmentStatus);
            }
        }

        shipmentModel.shipmentName = reqShipmentModel.shipmentName;
        shipmentModel.shipmentConsignmentNumber = reqShipmentModel.shipmentConsignmentNumber;
        shipmentModel.shipmentOriginSiteId = reqShipmentModel.shipmentOriginSiteId;
        shipmentModel.shipmentDestinationSiteId = reqShipmentModel.shipmentDestinationSiteId;
        shipmentModel.shipmentDateOfShipment = reqShipmentModel.shipmentDateOfShipment;
        shipmentModel.shipmentDateOfArrival = reqShipmentModel.shipmentDateOfArrival;
        shipmentModel.shipmentDltAnchored = reqShipmentModel.shipmentDltAnchored;
        shipmentModel.shipmentDltProof = reqShipmentModel.shipmentDltProof;
        shipmentModel.shipmentId = (await this.shipmentRepo.save(shipmentModel)).shipmentId;

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
            const reqSkuOriginModel = reqSkuOriginModels.find((reqSkuOriginModel) => reqSkuOriginModel.skuId === reqSkuModel.skuId)
            if (reqSkuOriginModel !== undefined) {
                reqSkuOriginModel.skuId = skuModel.skuId;
            }

            skuModels.push(skuModel);
        }

        const skuOriginModels = [];
        for (let i = 0; i < reqSkuOriginModels.length; i++) {
            const reqSkuOriginModel = reqSkuOriginModels[i];
            let skuOriginModel: SkuOriginModel | null = null;

            if (reqSkuOriginModel.isNew() === true) {
                skuOriginModel = new SkuOriginModel();
                skuOriginModel.shipmentId = shipmentModel.shipmentId;
            } else {
                skuOriginModel = await skuOriginRepo.fetchByPrimaryValue(reqSkuOriginModel.skuOriginId);
                if (skuOriginModel === null) {
                    throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
                }
            }

            skuOriginModel.skuId = reqSkuOriginModel.skuId;
            skuOriginModel.skuOriginId = (await skuOriginRepo.save(skuOriginModel)).skuOriginId;

            skuOriginModels.push(skuOriginModel);
        }

        const shipmentDocumentModels = [];

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
            shipmentDocumentModel.shipmentId = (await shipmentDocumentRepo.save(shipmentDocumentModel)).shipmentId;

            shipmentDocumentModels.push(shipmentDocumentModel);
        }

        return shipmentModel;
    }

    async fetchShipmentsByFilter(
        filterId: number,
        filterName: string,
        filterStatus: number,
        filterOriginSiteId: number,
        filterDestinationSiteId: number,
        filterDateOfShipment: number,
        filterDateOfArrival: number,
        sortBy: number,
        from: number,
        to: number,
    ): Promise<{ shipmentModels: Array<ShipmentModel>, totalSize: number }> {

        const shipmentFilter = new ShipmentFilter();
        shipmentFilter.filterId = filterId;
        shipmentFilter.filterName = filterName;
        shipmentFilter.filterStatus = filterStatus;
        shipmentFilter.filterOriginSiteId = filterOriginSiteId;
        shipmentFilter.filterDestinationSiteId = filterDestinationSiteId;
        shipmentFilter.filterDateOfShipment = filterDateOfShipment;
        shipmentFilter.filterDateOfArrival = filterDateOfArrival;
        shipmentFilter.sortBy = sortBy;

        const shipmentModels = await this.shipmentRepo.fetchByFilter(shipmentFilter);

        if (shipmentModels === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        return {
            shipmentModels: shipmentModels.slice(from, to),
            totalSize: shipmentModels.length,
        }
    }

    async fetchShipmentById(shipmentId: number): Promise<ShipmentModel> {

        const shipmentModel = await this.shipmentRepo.fetchByPrimaryValue(shipmentId);
        if (shipmentModel === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        return shipmentModel;
    }
}
