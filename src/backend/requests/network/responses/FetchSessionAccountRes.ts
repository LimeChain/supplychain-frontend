import AccountModel from '../../../modules/Account/Model/AccountModel';
import AccountModelG from '../../../modules/Account/Model/AccountModelG';
import AccountModelH from '../../../modules/Account/Model/AccountModelH';

export default class FetchSessionAccountRes {

    accountJson: AccountModel;

    constructor(accountModel: AccountModel) {
        this.accountJson = accountModel === null ? null : accountModel.toNetwork();
    }

}
