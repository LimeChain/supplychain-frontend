import SV from '../../../../utilities/SV';
import ShipmentModelG from './ShipmentModelG';

export default class ShipmentModel extends ShipmentModelG {

    isNew(): boolean {
        return this.shipmentId === SV.NOT_EXISTS;
    }

}
