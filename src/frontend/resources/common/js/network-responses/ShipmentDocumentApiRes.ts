import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export class UploadShipmentDocumentRes {

    shipmentDocumentModel: any;

    constructor(json) {
        this.shipmentDocumentModel = ShipmentDocumentModel.fromJson(json.shipmentDocumentJson);
    }

}
