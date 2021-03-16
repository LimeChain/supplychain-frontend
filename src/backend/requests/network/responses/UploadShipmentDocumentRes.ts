import ShipmentDocumentModel from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';            
            
export default class UploadShipmentDocumentRes {

    shipmentDocumentJson: ShipmentDocumentModel;

    constructor(shipmentDocumentModel: ShipmentDocumentModel) {
        this.shipmentDocumentJson = shipmentDocumentModel === null ? null : shipmentDocumentModel.toNetwork();
    }

}