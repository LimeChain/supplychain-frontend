
            
export default class SkuModelH {

    static S_TYPE_A = 1;

    static P_SKU_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_PRODUCT_ID = 3;
    static P_QUANTITY = 4;
    static P_PRICE_PER_UNIT = 5;
    static P_CURRENCY = 6;
    static PROPERTIES = [SkuModelH.P_SKU_ID,
        SkuModelH.P_SHIPMENT_ID,
        SkuModelH.P_PRODUCT_ID,
        SkuModelH.P_QUANTITY,
        SkuModelH.P_PRICE_PER_UNIT,
        SkuModelH.P_CURRENCY];

    skuId: number;
    shipmentId: number;
    productId: number;
    quantity: number;
    pricePerUnit: number;
    currency: number;

}
