import SV from '../../../../utilities/SV';
import ShipmentDocumentModelG from './ShipmentDocumentModelG';

export default class ShipmentDocumentModel extends ShipmentDocumentModelG {
    isNew(): boolean {
        return this.shipmentId === SV.NOT_EXISTS;
    }
}
