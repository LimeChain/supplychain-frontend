
export class UploadShipmentDocumentReq {

    shipmentDocumentJson: ShipmentDocumentModel;

    constructor(shipmentDocumentModel: ShipmentDocumentModel) {
        this.shipmentDocumentJson = shipmentDocumentModel.toJson();
    }

}