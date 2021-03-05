import S from '../utilities/Main';

export default class AccountModel {

    accountId: string;
    countryId: string;
    email: string;
    name: string;
    role: number;
    active: number;
    invitation: number;
    registerTimestamp: number;
    lastLoginTimestamp: number;

    constructor() {
        this.accountId = S.Strings.NOT_EXISTS;
        this.countryId = S.Strings.NOT_EXISTS;
        this.email = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.active = S.INT_TRUE;
        this.invitation = S.INT_FALSE;
        this.registerTimestamp = 0;
        this.lastLoginTimestamp = 0;
    }

    isNew(): boolean {
        return this.accountId === S.Strings.NOT_EXISTS;
    }

    clone(): AccountModel {
        return Object.assign(new AccountModel(), this);
    }

    toJSON(): any {
        return {
            'accountId': this.accountId,
            'countryId': this.countryId,
            'email': this.email,
            'name': this.name,
            'role': this.role,
            'active': this.active,
            'invitation': this.invitation,
            'registerTimestamp': parseInt(this.registerTimestamp / 1000 as unknown as string),
            'lastLoginTimestamp': parseInt(this.lastLoginTimestamp / 1000 as unknown as string),
        }
    }

    static fromJSON(json): AccountModel {
        if (json === null) {
            return null;
        }

        const model = new AccountModel();

        model.accountId = (json.accountId || model.accountId).toString();
        model.countryId = (json.countryId || model.countryId).toString();
        model.email = json.email || model.email;
        model.name = json.name || model.name;
        model.role = parseInt(json.role || model.role);
        model.active = parseInt(json.active || model.active);
        model.invitation = parseInt(json.invitation || model.invitation);
        model.registerTimestamp = 1000 * parseInt(json.registerTimestamp || model.registerTimestamp);
        model.lastLoginTimestamp = 1000 * parseInt(json.lastLoginTimestamp || model.lastLoginTimestamp);

        return model;
    }

}
