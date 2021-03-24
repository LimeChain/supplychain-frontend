export default class ShipmentDocumentModel {

    shipmentDocumentId: number
    shipmentId: number
    documentType: number;
    mimeType: string;
    shipmentDocumentUrl: string
    sizeInBytes: number;
    name: string;

    primaryValueInInsert: boolean = true

}
