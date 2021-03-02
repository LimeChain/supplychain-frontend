import ShipmentConstsH from '../Model/ShipmentModelH';
import SV from '../../../../utilities/SV';
import ShipmentModelG from './ShipmentModelG';

export default class ShipmentModel extends ShipmentModelG {

    isNew(): boolean {
        return this.shipmentId === SV.NOT_EXISTS;
    }

    isStatusChangeForNotification(oldShipmentStatus): boolean {
        return oldShipmentStatus !== this.shipmentStatus
            && (this.shipmentStatus === ShipmentConstsH.S_STATUS_IN_TRANSIT
                || this.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED)
    }

}
