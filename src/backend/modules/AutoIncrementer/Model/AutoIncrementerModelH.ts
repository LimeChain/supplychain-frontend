
            
export default class AutoIncrementerModelH {

    static primaryValueInInsert = true;

    static P_AUTO_INCREMENTER_ID = 1;
    static P_NEXT_PRODUCT_ID = 2;
    static P_NEXT_SKU_ID = 3;
    static P_NEXT_SKU_ORIGIN_ID = 4;
    static P_NEXT_SHIPMENT_ID = 5;
    static P_NEXT_SHIPMENT_DOCUMENT_ID = 6;
    static PROPERTIES = [AutoIncrementerModelH.P_AUTO_INCREMENTER_ID,
        AutoIncrementerModelH.P_NEXT_PRODUCT_ID,
        AutoIncrementerModelH.P_NEXT_SKU_ID,
        AutoIncrementerModelH.P_NEXT_SKU_ORIGIN_ID,
        AutoIncrementerModelH.P_NEXT_SHIPMENT_ID,
        AutoIncrementerModelH.P_NEXT_SHIPMENT_DOCUMENT_ID];

    autoIncrementerId: number;
    nextProductId: number;
    nextSkuId: number;
    nextSkuOriginId: number;
    nextShipmentId: number;
    nextShipmentDocumentId: number;

}
