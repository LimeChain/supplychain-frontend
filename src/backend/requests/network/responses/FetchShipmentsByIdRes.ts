import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';            
            
export default class FetchShipmentsByIdRes {

    shipmentJson: ShipmentModel[];;

    constructor(shipmentModel: ShipmentModel[]) {
        this.shipmentJson = [];
        for (let i = 0; i < shipmentModel.length; ++i) {
            this.shipmentJson.push(shipmentModel[i].toNetwork());
        }
    }

}