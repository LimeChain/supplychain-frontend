import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';

export class CreditShipmentRes {

    shipmentModel: ShipmentModel;
    skuOriginModels: SkuOriginModel[]
    skuModels: SkuModel[]
    shipmentDocumentModels: ShipmentDocumentModel[]

    constructor(json) {

        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
        this.skuOriginModels = json.skuOriginJsons.map((skuOriginJson) => SkuOriginModel.fromJson(skuOriginJson));
        this.skuModels = json.skuJsons.map((skuJson) => SkuModel.fromJson(skuJson));
        this.shipmentDocumentModels = json.shipmentDocumentJsons.map((shipmentDocumentJson) => ShipmentDocumentModel.fromJson(shipmentDocumentJson));
    }
}

export class FetchShipmentsByFilterRes {
    shipmentModels: ShipmentModel[];
    totalSize: number;

    constructor(json) {
        this.shipmentModels = [];
        this.totalSize = json.totalSize;

        for (const shipmentJson of json.shipmentJsons) {
            this.shipmentModels.push(ShipmentModel.fromJson(shipmentJson));
        }

    }
}

export class FetchShipmentsWithProductQuantityLeftByProductIdRes {
    shipmentModels: ShipmentModel[];
    productQuantitiesLeft: number[];

    constructor(json) {
        this.productQuantitiesLeft = json.productQuantitiesLeft
        this.shipmentModels = json.shipmentJsons.map((shipmentJson: ShipmentModel) => ShipmentModel.fromJson(shipmentJson));
    }
}

export class FetchShipmentsByIdRes {
    shipmentModel: ShipmentModel;

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
    }
}
