export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: Array < SkuOriginModel >
    skuJsons: Array < SkuModel >
    shipmentDocumentJsons: Array < ShipmentDocumentModel >
}

export class FetchShipmentsByFilterReq {
    searchBy: string
    sortBy: number
    from: number
    to: number
}

export class FetchTotalValueInStockReq {
}

export class FetchProductsInStockReq {
    searchBy: string
    sortBy: number
    from: number
    to: number
}

export class FetchShipmentsWithProductQuantityLeftByProductIdReq {

    productId: string
}

export class FetchShipmentByIdReq {

    shipmentId: string
}
