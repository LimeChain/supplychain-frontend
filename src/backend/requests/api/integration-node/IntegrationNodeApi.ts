import IntegrationNodeApiH from './IntegrationNodeApi.h';
import GeneralController from '../../../controllers/GeneralController';
import GrpcController from '../../../controllers/GrpcController';
import Context from '../../../utilities/network/Context';
import IntegrationNodeController from '../../../controllers/IntegrationNodeController';

export default class IntegrationNodeApi extends IntegrationNodeApiH {

    integrationNodeController: IntegrationNodeController;

    constructor() {
        super();
        this.integrationNodeController = new IntegrationNodeController();
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case IntegrationNodeApiH.Actions.CREDIT_SHIPMENT:
                await this.integrationNodeController.creditShipment(context);
                break;
            case IntegrationNodeApiH.Actions.CREDIT_PRODUCT:
                await this.integrationNodeController.creditProduct(context);
                break;
            default:
                break;
        }
    }
}
