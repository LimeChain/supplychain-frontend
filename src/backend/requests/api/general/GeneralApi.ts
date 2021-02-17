import GeneralApiH from './GeneralApi.h';
import GeneralController from '../../../controllers/GeneralController';
import GrpcController from '../../../controllers/GrpcController';
import Session from '../../../utilities/Session';
import Response from '../../network-response/Response';
import ServicesFactory from '../../../services/common/ServicesFactory';
import Payload from '../../../utilities/helpers/Payload';

export default class GeneralApi extends GeneralApiH {

    generalController: GeneralController;
    grpcController: GrpcController;

    constructor() {
        super();
        this.generalController = new GeneralController();
        this.grpcController = new GrpcController();
    }

    async processRequest(payload: Payload, res: Response, session: Session, servicesFactory: ServicesFactory) {
        switch (payload.action) {
            case GeneralApiH.Actions.GRPCTEST:
                await this.grpcController.grpcTest(payload, res, session, servicesFactory);
                break;
            default:
                break;
        }
    }
}
