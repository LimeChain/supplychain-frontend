import SV from '../../../utilities/SV';
import AccountModelG from './AccountModelG';

export default class AccountModel extends AccountModelG {

    static S_ROLE_DEFAULT: number = 1;

    constructor() {
        super();
        this.role = AccountModel.S_ROLE_DEFAULT;
        this.active = SV.TRUE;
        this.invitation = SV.FALSE;
    }

    toNetwork(): any {
        const json = super.toNetwork();
        delete json.pass;
        delete json.salt;
        return json;
    }

}
