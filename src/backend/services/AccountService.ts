import AccountModel from '../modules/Account/Model/AccountModel';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import SF from '../utilities/SF';
import Service from './common/Service';

export default class AccountService extends Service {

    async fetchSessionAccounts(accountId: number): Promise < AccountModel | null > {
        const accountRepo = this.repoFactory.getAccountRepo();
        return accountRepo.fetchByPrimaryValue(accountId);
    }

    async login(login: string, pass: string) {
        const accountRepo = this.repoFactory.getAccountRepo();
        const accountModel = await accountRepo.fetchByEmail(login);
        if (accountModel === null) {
            throw new StateException(Response.S_STATUS_ERROR);
        }

        let hashPassword = null;
        try {
            hashPassword = await SF.hashPassword(pass, accountModel.salt);
        } catch (e) {
            throw new StateException(Response.S_STATUS_ERROR);
        }

        if (accountModel.pass !== hashPassword) {
            throw new StateException(Response.S_STATUS_ERROR);
        }

        accountModel.lastLoginTimestamp = Date.now();
        await accountRepo.save(accountModel);

        return accountModel;
    }

    async logout() {

    }

}
