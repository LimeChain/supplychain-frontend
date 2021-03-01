import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export class UploadShipmentDocumentReq {

    shipmentDocumentJson: any;

    constructor(shipmentDocumentModel: ShipmentDocumentModel) {
        this.shipmentDocumentJson = shipmentDocumentModel.toJson();
    }

}