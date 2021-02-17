import SkuModel from "../models/product-module/SkuModel";
import SkuOriginModel from "../models/product-module/SkuOriginModel";
import ShipmentModel from "../models/shipment-module/ShipmentModel";

export class CreditShipmentRes {

    shipmentModel: ShipmentModel;
    skuOriginModels: SkuOriginModel[]
    skuModels: SkuModel[]

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
        this.skuOriginModels = json.skuOriginJsons.map((skuOriginJson) => SkuOriginModel.fromJson(skuOriginJson));
        this.skuModels = json.skuJsons.map((skuJson) => SkuModel.fromJson(skuJson));
    }
}

export class FetchShipmentsByFilterRes {
    shipmentModels: ShipmentModel[];

    constructor(json) {
        this.shipmentModels = [];
        
        for(let shipmentJson of json.shipmentJsons){
            this.shipmentModels.push(ShipmentModel.fromJson(shipmentJson));
        }
        
    }
}

export class FetchShipmentsByIdRes {
    shipmentModel: ShipmentModel;

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
    }
}