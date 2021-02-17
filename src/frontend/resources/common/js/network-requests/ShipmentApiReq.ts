import ShipmentStatusConstsH from '../../../../../backend/modules/product-group-module/shipment-module/ShipmentStatusModel.h';
import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';

export class CreditShipmentReq {

    shipmentModel: ShipmentModel
    skuOriginModels: SkuOriginModel[]
    skuModels: SkuModel[]
    
    constructor(shipmentModel: ShipmentModel, skuOriginModels: SkuOriginModel[], skuModels: SkuModel[]) {
        this.shipmentModel = shipmentModel.toJson();
        this.skuOriginModels = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuModels = skuModels.map((skuModel) => skuModel.toJson());
    }   
}

export class FetchShipmentsByFilterReq {
    filter: string
    pageSize: number
    pageNumber: number

    constructor(filter, pageSize, pageNumber){
        this.filter = filter;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}

export class FetchShipmentsByIdReq {
    shipmentId: string

    constructor(shipmentId: string){
        this.shipmentId = shipmentId;
    }
}