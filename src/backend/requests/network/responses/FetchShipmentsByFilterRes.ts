import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';            
            
export default class FetchShipmentsByFilterRes {

    shipmentJsons: ShipmentModel[];;
    totalSize: number;

    constructor(shipmentModels: ShipmentModel[], totalSize: number) {
        this.shipmentJsons = [];
        for (let i = 0; i < shipmentModels.length; ++i) {
            this.shipmentJsons.push(shipmentModels[i].toNetwork());
        }
        this.totalSize = totalSize;
    }

}