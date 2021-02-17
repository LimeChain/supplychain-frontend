import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export class UploadShipmentDocumentReq {

    shipmentDocument: any;

    constructor(shipmentDocumentModel: ShipmentDocumentModel) {
        this.shipmentDocument = shipmentDocumentModel.toJson();
    }

}