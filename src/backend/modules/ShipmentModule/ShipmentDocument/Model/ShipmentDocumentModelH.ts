
            
export default class ShipmentDocumentModelH {

    static S_DOCUMENT_TYPE_CRM_DOCUMENT = 1;
    static S_DOCUMENT_TYPE_BILL_OF_LANDING = 2;
    static S_DOCUMENT_TYPE_INVOICE = 3;
    static S_DOCUMENT_TYPE_INSURANCE_POLICY = 4;
    static S_DOCUMENT_TYPE_BANK = 5;
    static S_DOCUMENT_TYPE_PUBLIC_AUTH = 6;
    static S_DOCUMENT_TYPE_RECEIPT = 7;
    static S_DOCUMENT_TYPE_OTHER = 8;

    static P_SHIPMENT_DOCUMENT_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_DOCUMENT_TYPE = 3;
    static P_SHIPMENT_DOCUMENT_URL = 4;
    static PROPERTIES = [ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID,
        ShipmentDocumentModelH.P_SHIPMENT_ID,
        ShipmentDocumentModelH.P_DOCUMENT_TYPE,
        ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL];

    shipmentDocumentId: number;
    shipmentId: number;
    documentType: number;
    shipmentDocumentUrl: string;

}
