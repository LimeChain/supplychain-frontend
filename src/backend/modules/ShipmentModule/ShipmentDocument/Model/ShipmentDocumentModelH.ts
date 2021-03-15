
            
export default class ShipmentDocumentModelH {



    static P_SHIPMENT_DOCUMENT_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_DOCUMENT_TYPE = 3;
    static P_MIME_TYPE = 4;
    static P_SHIPMENT_DOCUMENT_URL = 5;
    static P_SIZE_IN_BYTES = 6;
    static P_NAME = 7;
    static P_UPLOAD_PROGRESS = 8;
    static PROPERTIES = [ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID,
        ShipmentDocumentModelH.P_SHIPMENT_ID,
        ShipmentDocumentModelH.P_DOCUMENT_TYPE,
        ShipmentDocumentModelH.P_MIME_TYPE,
        ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL,
        ShipmentDocumentModelH.P_SIZE_IN_BYTES,
        ShipmentDocumentModelH.P_NAME,
        ShipmentDocumentModelH.P_UPLOAD_PROGRESS];

    shipmentDocumentId: number;
    shipmentId: number;
    documentType: number;
    mimeType: string;
    shipmentDocumentUrl: string;
    sizeInBytes: number;
    name: string;
    uploadProgress: number;

}
