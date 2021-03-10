import ProductModel from '../models/product-module/ProductModel';
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
        this.totalSize = Number.parseInt(json.totalSize);
        this.shipmentModels = json.shipmentJsons.map((shipmentJson: ShipmentModel) => ShipmentModel.fromJson(shipmentJson));
    }
}

export class FetchProductsInStockRes {
    skuModels: SkuModel[];
    productModels: ProductModel[];
    totalSkuSize: number;

    constructor(json) {
        this.skuModels = json.skuJsons.map((skuJson: SkuModel) => SkuModel.fromJson(skuJson));
        this.productModels = json.productJsons.map((productJson: SkuModel) => ProductModel.fromJson(productJson));
        this.totalSkuSize = Number.parseInt(json.totalSkuSize);
    }
}

export class FetchShipmentsWithProductQuantityLeftByProductIdRes {
    skuModels: SkuModel[];
    shipmentModels: ShipmentModel[];

    constructor(json) {
        this.skuModels = json.skuJsons.map((skuJson: SkuModel) => SkuModel.fromJson(skuJson));
        this.shipmentModels = json.shipmentJsons.map((shipmentJson: ShipmentModel) => ShipmentModel.fromJson(shipmentJson));
    }
}

export class FetchShipmentsByIdRes {
    shipmentModel: ShipmentModel;

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
    }
}
