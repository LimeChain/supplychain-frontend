import LoginReq from "../requests/network/requests/LoginReq";
import LoginRes from "../requests/network/responses/LoginRes";
import Context from "../utilities/network/Context";

export default class AccountController {

    async fetchSessionAccounts(context: Context) {
    }

    async login(context: Context) {
        const servicesFactory = context.servicesFactory;
        const session = context.session;
        const payload = context.payload;

        const req = new LoginReq(payload);

        const accountService = servicesFactory.getAccountService();
        const accountModel = await accountService.login(req.login, req.pass);

        if (accountModel !== null) {
            session.onLogin(accountModel.accountId, accountModel.siteId, accountModel.countryId);
        }

        const res = new LoginRes(accountModel);
        context.res.set(res);
    }

    async logout(context: Context) {
        
    }

}