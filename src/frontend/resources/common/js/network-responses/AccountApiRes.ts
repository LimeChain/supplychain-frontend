import AccountModel from '../models/AccountModel';

export class LoginRes {

    accountModel: AccountModel;

    constructor(json) {
        this.accountModel = AccountModel.fromJSON(json.accountJson);
    }

}
