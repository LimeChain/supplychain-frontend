
            
export default class ShipmentDocumentModelH {



    static P_SHIPMENT_DOCUMENT_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_DOCUMENT_ID = 3;
    static P_DOCUMENT_TYPE = 4;
    static P_SHIPMENT_DOCUMENT_URL = 5;
    static PROPERTIES = [ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID,
        ShipmentDocumentModelH.P_SHIPMENT_ID,
        ShipmentDocumentModelH.P_DOCUMENT_ID,
        ShipmentDocumentModelH.P_DOCUMENT_TYPE,
        ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL];

    shipmentDocumentId: number;
    shipmentId: number;
    documentId: number;
    documentType: number;
    shipmentDocumentUrl: string;

}
