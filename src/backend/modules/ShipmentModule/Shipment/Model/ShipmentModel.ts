import path from 'path';
import SV from '../../../../utilities/SV';
import ShipmentModelG from './ShipmentModelG';
import Config from '../../../../../../config/config';

export default class ShipmentModel extends ShipmentModelG {

    static S_STATUS_DRAFT: number = 1;
    static S_STATUS_IN_TRANSIT: number = 2;
    static S_STATUS_RECEIVED: number = 3;

    constructor() {
        super();
        this.shipmentDeleted = SV.FALSE;
    }

    isNew(): boolean {
        return this.shipmentId === SV.NOT_EXISTS;
    }

    shouldSubmitToIntegratioNode(oldShipmentStatus: number) {
        return (oldShipmentStatus === ShipmentModel.S_STATUS_DRAFT && this.shipmentStatus === ShipmentModel.S_STATUS_IN_TRANSIT) || (oldShipmentStatus === ShipmentModel.S_STATUS_IN_TRANSIT && this.shipmentStatus === ShipmentModel.S_STATUS_RECEIVED);
    }

    isStatusChangeForNotification(oldShipmentStatus: number): boolean {
        return oldShipmentStatus !== this.shipmentStatus && (this.shipmentStatus === ShipmentModel.S_STATUS_IN_TRANSIT || this.shipmentStatus === ShipmentModel.S_STATUS_RECEIVED);
    }

    isShipmentStatusLocked(newShipmentStatus) {
        return this.shipmentStatus === ShipmentModel.S_STATUS_RECEIVED && newShipmentStatus !== ShipmentModel.S_STATUS_RECEIVED;
    }

    getStoragePath() {
        return path.join(Config.Path.Root.Data.SHIPMENTS, this.shipmentId.toString());
    }

    getShipmentDocumentStoragePath(shipmentDocumentId: number) {
        return path.join(this.getStoragePath(), shipmentDocumentId.toString());
    }
}
