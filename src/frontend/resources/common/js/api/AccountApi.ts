import AbsApi from './AbsApi';
import Api from '../utilities/Api';
import AccountModel from '../models/AccountModel';
import CookieHelper from '../helpers/CookieHelper';
import PagesGeneral from '../../../../../../builds/dev-generated/PagesGeneral';
import Apis from '../../../../../../builds/dev-generated/Apis';
import { LoginReq } from '../network-requests/AccountApiReq';
import { LoginRes } from '../network-responses/AccountApiRes';
import storageHelper from '../helpers/StorageHelper';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';

export default class AccountApi extends AbsApi {

    accountApi: Api;

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.accountApi = new Api(Apis.ACCOUNT, this.enableActions, this.disableActions);
    }

    fetchSessionAccount(callback: (account: AccountModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const accounts = CookieHelper.fetchAccounts();
            callback(accounts.accountModel);
        }, 100);
    }

    login(login: string, pass: string, callback: (accountModel: AccountModel) => void) {
        const req = new LoginReq(login, pass);

        this.accountApi.req(Actions.ACCOUNT.LOGIN, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Wrong username or password');
                return;
            }

            const res = new LoginRes(json.obj);
            callback(res.accountModel);
        });
        // this.disableActions();

        // setTimeout(() => {
        //     this.enableActions();

        //     const req = new LoginReq(login, pass);

        //     /* server code */
        //     const jsonAccountModelResult = storageHelper.accountsJson.find((jsonAccountModel) => {
        //         return jsonAccountModel.email === req.login;
        //     })

        //     if (jsonAccountModelResult === undefined || pass !== 'pass') {
        //         CookieHelper.saveAccounts(null); // temporary
        //         callback(null);
        //         return;
        //     }
        //     const json = {
        //         accountJson: jsonAccountModelResult,
        //     };
        //     /* server code */

        //     const res = new LoginRes(json);
        //     CookieHelper.saveAccounts(res.accountModel); // temporary
        //     callback(res.accountModel);
        // }, 100);
    }

    logout() {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            CookieHelper.saveAccounts(null);
            window.location.href = PagesGeneral.LOGIN;
        }, 100);
    }

}
