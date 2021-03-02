export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: Array<SkuOriginModel>
    skuJsons: Array<SkuModel>
    shipmentDocumentJsons: Array<ShipmentDocumentModel>

    constructor(shipmentModel: ShipmentModel, skuOriginModels: Array<SkuOriginModel>, skuModels: Array<SkuModel>, shipmentDocumentModels: Array<ShipmentDocumentModel>) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
        this.shipmentDocumentJsons = shipmentDocumentModels.map((shipmentDocumentModel) => shipmentDocumentModel.toJson());
    }
}

export class FetchShipmentsByFilterReq {
    filterId: number
    filterName: string
    filterStatus: number
    filterOriginSiteId: number
    filterDestinationSiteId: number
    filterDateOfShipment: number
    filterDateOfArrival: number
    sortBy: number
    from: number
    to: number

    constructor(
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
    shipmentId: number

    constructor(shipmentId: number) {
        this.shipmentId = shipmentId;
    }
}
