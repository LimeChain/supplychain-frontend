import AbsApi from './AbsApi';
import Api from '../utilities/Api';
import AccountModel from '../models/AccountModel';
import CookieHelper from '../helpers/CookieHelper';
import PagesGeneral from '../../../../../../builds/dev-generated/PagesGeneral';
import { LoginReq } from '../network-requests/AccountApiReq';
import { LoginRes } from '../network-responses/AccountApiRes';
import storageHelper from '../helpers/StorageHelper';

export default class AccountApi extends AbsApi {

    accountApi: Api;

    fetchSessionAccount(callback: (account: AccountModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const accounts = CookieHelper.fetchAccounts();
            callback(accounts.accountModel);
        }, 100);
    }

    login(login: string, pass: string, callback: (accountModel: AccountModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new LoginReq(login, pass);

            /* server code */
            const jsonAccountModelResult = storageHelper.accountsJson.find((jsonAccountModel) => {
                return jsonAccountModel.email === req.login;
            })

            if (jsonAccountModelResult === undefined || pass !== 'pass') {
                CookieHelper.saveAccounts(null); // temporary
                callback(null);
                return;
            }
            const json = {
                accountJson: jsonAccountModelResult,
            };
            /* server code */

            const res = new LoginRes(json);
            CookieHelper.saveAccounts(res.accountModel); // temporary
            callback(res.accountModel);
        }, 100);
    }

    logout() {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            CookieHelper.saveUser(null);
            window.location.href = PagesGeneral.LOGIN;
        }, 100);
    }

}
