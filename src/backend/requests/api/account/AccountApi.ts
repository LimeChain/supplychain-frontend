import AccountsApiH from './AccountApi.h';
import AccountController from '../../../controllers/AccountController';
import Context from '../../../utilities/network/Context';

export default class AccountsApi extends AccountsApiH {

    accountController: AccountController;

    constructor() {
        super();
        this.accountController = new AccountController()
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case AccountsApiH.Actions.FETCH_SESSION_ACCOUNTS:
                await this.accountController.fetchSessionAccounts(context);
                break;
            case AccountsApi.Actions.LOGIN:
                await this.accountController.login(context);
                break;
            case AccountsApi.Actions.LOGOUT:
                await this.accountController.logout(context);
                break;
            default:
                break;
        }
    }
}
