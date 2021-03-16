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

export class FetchShipmentsByFilterReq {
    page: number
    searchBy: string
    sortBy: number
    from: number
    to: number

    constructor(page: number, searchBy: string, sortBy: number, from: number, to: number) {
        this.page = page;
        this.searchBy = searchBy;
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }
}

export class FetchTotalValueInStockReq {
}

export class FetchProductsInStockReq {
    searchBy: string
    sortBy: number
    from: number
    to: number

    constructor(searchBy: string, sortBy: number, from: number, to: number) {
        this.searchBy = searchBy;
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }
}

export class FetchShipmentsWithProductQuantityLeftByProductIdReq {

    productId: string

    constructor(productId: string) {
        this.productId = productId;
    }
}

export class FetchShipmentByIdReq {

    shipmentId: string

    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }
}
