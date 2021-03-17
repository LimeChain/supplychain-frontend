import GeneralApiH from './GeneralApi.h';
import GeneralController from '../../../controllers/GeneralController';
import GrpcController from '../../../controllers/GrpcController';
import Context from '../../../utilities/network/Context';

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
            case GeneralApi.Actions.FETCH_NOTIFICATIONS_BY_FILTER:
                await this.generalController.fetchNotificationsByFilter(context);
                break;
            case GeneralApi.Actions.FETCH_ALL_SITES:
                await this.generalController.fetchAllSites(context);
                break;
            case GeneralApi.Actions.READ_NOTIFICATION_BY_ID:
                await this.generalController.readNotificationById(context);
                break;
            case GeneralApi.Actions.READ_ALL_NOTIFICATIONS:
                await this.generalController.readAllNotifications(context);
                break;
            default:
                break;
        }
    }
}
