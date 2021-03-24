import LoginReq from '../requests/network/requests/LoginReq';
import FetchSessionAccountRes from '../requests/network/responses/FetchSessionAccountRes';
import LoginRes from '../requests/network/responses/LoginRes';
import Context from '../utilities/network/Context';

export default class AccountController {

    async fetchSessionAccounts(context: Context) {
        const session = context.session;
        const accountId = session.getAccountId();

        let res;
        if (accountId === null) {
            res = new FetchSessionAccountRes(null);
        } else {
            const servicesFactory = context.servicesFactory;
            const accountService = servicesFactory.getAccountService();
            const accountModel = await accountService.fetchSessionAccounts(accountId);
            res = new FetchSessionAccountRes(accountModel);
        }

        context.res.set(res);
    }

    async login(context: Context) {
        const servicesFactory = context.servicesFactory;
        const session = context.session;
        const payload = context.payload;

        const req = new LoginReq(payload);

        const accountService = servicesFactory.getAccountService();
        const accountModel = await accountService.login(req.login, req.pass);

        if (accountModel !== null) {
            session.onLogin(accountModel.accountId, accountModel.countryId, accountModel.siteId);
        }

        const res = new LoginRes(accountModel);
        context.res.set(res);
    }

    async logout(context: Context) {
        const session = context.session;
        session.destroy();
    }

}
