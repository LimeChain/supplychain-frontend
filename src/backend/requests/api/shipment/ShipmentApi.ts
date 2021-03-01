import ShipmentController from '../../../controllers/ShipmentController';
import Context from '../../../utilities/network/Context';
import ShipmentApiH from './ShipmentApi.h';

export default class ShipmentApi extends ShipmentApiH {

    shipmentController: ShipmentController;

    constructor() {
        super();
        this.shipmentController = new ShipmentController();
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case ShipmentApiH.Actions.CREDIT:
                await this.shipmentController.creditShipment(context);
                break;
            default:
                break;
        }
    }
}
