import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';

export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: SkuOriginModel[]
    skuJsons: SkuModel[]
    shipmentDocumentJsons: ShipmentDocumentModel[]

    constructor(shipmentModel: ShipmentModel, skuOriginModels: SkuOriginModel[], skuModels: SkuModel[], shipmentDocumentModels: ShipmentDocumentModel[]) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
        this.shipmentDocumentJsons = shipmentDocumentModels.map((shipmentDocument) => shipmentDocument.toJson());
    }
}

export class DeleteShipmentReq {
    shipmentId: string

    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }
}

export class FetchShipmentsByFilterReq {
    filterId: string
    filterName: string
    filterStatus: number
    filterOriginSiteId: string
    filterDestinationSiteId: string
    filterDateOfShipment: number
    filterDateOfArrival: number
    sortBy: number
    from: number
    to: number

    constructor(
        filterId: string,
        filterName: string,
        filterStatus: number,
        filterOriginSiteId: string,
        filterDestinationSiteId: string,
        filterDateOfShipment: number,
        filterDateOfArrival: number,
        sortBy: number,
        from: number,
        to: number
    ) {
        this.filterId = filterId;
        this.filterName = filterName;
        this.filterStatus = filterStatus;
        this.filterOriginSiteId = filterOriginSiteId;
        this.filterDestinationSiteId = filterDestinationSiteId;
        this.filterDateOfShipment = filterDateOfShipment;
        this.filterDateOfArrival = filterDateOfArrival;
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }
}

export class FetchShipmentByIdReq {
    shipmentId: string

    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }
}
