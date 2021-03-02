import Payload from '../../../utilities/network/Payload';
import ShipmentDocumentModel from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';

export default class UploadShipmentDocumentReq {

    shipmentDocumentModel: ShipmentDocumentModel;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentDocumentModel = ShipmentDocumentModel.fromNetwork(json.shipmentDocumentJson);
    }

}
