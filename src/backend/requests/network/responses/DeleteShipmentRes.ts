import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';            
            
export default class DeleteShipmentRes {

    shipmentJson: ShipmentModel;

    constructor(shipmentModel: ShipmentModel) {
        this.shipmentJson = shipmentModel.toNetwork();
    }

}