import GeneralApiH from './GeneralApi.h';
import GeneralController from '../../../controllers/GeneralController';
import GrpcController from '../../../controllers/GrpcController';
import Context from '../../../utilities/helpers/Context';

export default class GeneralApi extends GeneralApiH {

    generalController: GeneralController;
    grpcController: GrpcController;

    constructor() {
        super();
        this.generalController = new GeneralController();
        this.grpcController = new GrpcController();
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case GeneralApiH.Actions.GRPCTEST:
                await this.grpcController.grpcTest(context);
                break;
            default:
                break;
        }
    }
}
