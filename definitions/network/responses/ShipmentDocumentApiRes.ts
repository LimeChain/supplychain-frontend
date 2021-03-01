

export class UploadShipmentDocumentRes {

    shipmentDocumentModel: ShipmentDocumentModel;

    constructor(json) {
        this.shipmentDocumentModel = ShipmentDocumentModel.fromJson(json.shipmentDocument);
    }

}