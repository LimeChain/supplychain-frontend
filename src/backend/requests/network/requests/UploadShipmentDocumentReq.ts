import Payload from '../../../utilities/network/Payload';
import ShipmentDocumentModel from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';
            
export default class UploadShipmentDocumentReq {
    
    shipmentDocument: ShipmentDocumentModel;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentDocument = ShipmentDocumentModel.fromNetwork(json.shipmentDocument);
    }

}