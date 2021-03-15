export class CreditShipmentRes {

    shipmentModel: ShipmentModel;
    skuOriginModels: Array < SkuOriginModel >;
    skuModels: Array < SkuModel >;
    shipmentDocumentModels: Array < ShipmentDocumentModel >;

}

export class FetchShipmentsByFilterRes {
    shipmentModels: Array < ShipmentModel >;
    totalSize: number;
}

export class FetchProductsInStockRes {
    skuModels: Array < SkuModel >;
    productModels: Array < ProductModel >;
    totalSkuSize: number;
}

export class FetchTotalValueInStockRes {
    totalValue: number
}

export class FetchShipmentsWithProductQuantityLeftByProductIdRes {
    skuModels: Array < SkuModel >;
    shipmentModels: Array < ShipmentModel >;
}

export class FetchShipmentsByIdRes {

    shipmentModel: ShipmentModel;
    skuModels: Array < SkuModel >;
    skuOriginModels: Array < SkuOriginModel >;
    shipmentDocumentModels: Array < ShipmentDocumentModel >;

}
