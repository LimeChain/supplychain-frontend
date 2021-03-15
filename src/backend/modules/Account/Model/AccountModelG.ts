import AccountModel from './AccountModel';
import AccountModelH from './AccountModelH';
import AccountRepoH from '../Repo/AccountRepoH';
import SV from '../../../utilities/SV';


export default class AccountModelG extends AccountModelH {

    constructor() {
        super();
        this.accountId = SV.NOT_EXISTS;
        this.countryId = SV.NOT_EXISTS;
        this.siteId = SV.NOT_EXISTS;
        this.email = SV.Strings.EMPTY;
        this.name = SV.Strings.EMPTY;
        this.role = SV.NOT_EXISTS;
        this.active = SV.NOT_EXISTS;
        this.invitation = SV.NOT_EXISTS;
        this.registerTimestamp = SV.NOT_EXISTS;
        this.lastLoginTimestamp = SV.NOT_EXISTS;
        this.pass = SV.Strings.EMPTY;
        this.salt = SV.Strings.EMPTY;
    }

    copyRefProperties(sourceModel: AccountModel): void {

    }

    static asMap(models: AccountModel[]): Map < any, AccountModel > {
        const map = new Map < any, AccountModel >();

        models.forEach((m) => {
            map.set(m.accountId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): AccountRepoH {
        const map = AccountModelG.getPropsAsMap(props);

        const repo = new AccountRepoH();

        if (map.has(AccountModelH.P_ACCOUNT_ID) === true && this.accountId !== undefined) {
            repo.accountId = this.accountId;
            repo.accountIdToDb = true;
        }
        if (map.has(AccountModelH.P_COUNTRY_ID) === true && this.countryId !== undefined) {
            repo.countryId = this.countryId;
            repo.countryIdToDb = true;
        }
        if (map.has(AccountModelH.P_SITE_ID) === true && this.siteId !== undefined) {
            repo.siteId = this.siteId;
            repo.siteIdToDb = true;
        }
        if (map.has(AccountModelH.P_EMAIL) === true && this.email !== undefined) {
            repo.email = this.email;
            repo.emailToDb = true;
        }
        if (map.has(AccountModelH.P_NAME) === true && this.name !== undefined) {
            repo.name = this.name;
            repo.nameToDb = true;
        }
        if (map.has(AccountModelH.P_ROLE) === true && this.role !== undefined) {
            repo.role = this.role;
            repo.roleToDb = true;
        }
        if (map.has(AccountModelH.P_ACTIVE) === true && this.active !== undefined) {
            repo.active = this.active;
            repo.activeToDb = true;
        }
        if (map.has(AccountModelH.P_INVITATION) === true && this.invitation !== undefined) {
            repo.invitation = this.invitation;
            repo.invitationToDb = true;
        }
        if (map.has(AccountModelH.P_REGISTER_TIMESTAMP) === true && this.registerTimestamp !== undefined) {
            repo.registerTimestamp = this.registerTimestamp;
            repo.registerTimestampToDb = true;
        }
        if (map.has(AccountModelH.P_LAST_LOGIN_TIMESTAMP) === true && this.lastLoginTimestamp !== undefined) {
            repo.lastLoginTimestamp = this.lastLoginTimestamp;
            repo.lastLoginTimestampToDb = true;
        }
        if (map.has(AccountModelH.P_PASS) === true && this.pass !== undefined) {
            repo.pass = this.pass;
            repo.passToDb = true;
        }
        if (map.has(AccountModelH.P_SALT) === true && this.salt !== undefined) {
            repo.salt = this.salt;
            repo.saltToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: AccountRepoH): AccountModel {
        const model = new AccountModel();

        model.accountId = parseInt((repo.accountId ?? model.accountId) as unknown as string);
        model.countryId = parseInt((repo.countryId ?? model.countryId) as unknown as string);
        model.siteId = parseInt((repo.siteId ?? model.siteId) as unknown as string);
        model.email = repo.email ?? model.email;
        model.name = repo.name ?? model.name;
        model.role = parseInt((repo.role ?? model.role) as unknown as string);
        model.active = parseInt((repo.active ?? model.active) as unknown as string);
        model.invitation = parseInt((repo.invitation ?? model.invitation) as unknown as string);
        model.registerTimestamp = parseInt((repo.registerTimestamp ?? model.registerTimestamp) as unknown as string);
        model.lastLoginTimestamp = parseInt((repo.lastLoginTimestamp ?? model.lastLoginTimestamp) as unknown as string);
        model.pass = repo.pass ?? model.pass;
        model.salt = repo.salt ?? model.salt;

        return model;
    }
        

    toNetwork(): any {
        return {
            accountId: this.accountId,
            countryId: this.countryId,
            siteId: this.siteId,
            email: this.email,
            name: this.name,
            role: this.role,
            active: this.active,
            invitation: this.invitation,
            registerTimestamp: this.registerTimestamp,
            lastLoginTimestamp: this.lastLoginTimestamp,
            pass: this.pass,
            salt: this.salt,
        };
    }

    static fromNetwork(json: any): AccountModel {
        if (json === null) {
            return null;
        }

        const model = new AccountModel();
        
        model.accountId = parseInt(json.accountId ?? model.accountId);
        model.countryId = parseInt(json.countryId ?? model.countryId);
        model.siteId = parseInt(json.siteId ?? model.siteId);
        model.email = json.email ?? model.email;
        model.name = json.name ?? model.name;
        model.role = parseInt(json.role ?? model.role);
        model.active = parseInt(json.active ?? model.active);
        model.invitation = parseInt(json.invitation ?? model.invitation);
        model.registerTimestamp = parseInt(json.registerTimestamp ?? model.registerTimestamp);
        model.lastLoginTimestamp = parseInt(json.lastLoginTimestamp ?? model.lastLoginTimestamp);
        model.pass = json.pass ?? model.pass;
        model.salt = json.salt ?? model.salt;

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case AccountModelH.P_ACCOUNT_ID:
                return AccountRepoH.C_ACCOUNT_ID;
            case AccountModelH.P_COUNTRY_ID:
                return AccountRepoH.C_COUNTRY_ID;
            case AccountModelH.P_SITE_ID:
                return AccountRepoH.C_SITE_ID;
            case AccountModelH.P_EMAIL:
                return AccountRepoH.C_EMAIL;
            case AccountModelH.P_NAME:
                return AccountRepoH.C_NAME;
            case AccountModelH.P_ROLE:
                return AccountRepoH.C_ROLE;
            case AccountModelH.P_ACTIVE:
                return AccountRepoH.C_ACTIVE;
            case AccountModelH.P_INVITATION:
                return AccountRepoH.C_INVITATION;
            case AccountModelH.P_REGISTER_TIMESTAMP:
                return AccountRepoH.C_REGISTER_TIMESTAMP;
            case AccountModelH.P_LAST_LOGIN_TIMESTAMP:
                return AccountRepoH.C_LAST_LOGIN_TIMESTAMP;
            case AccountModelH.P_PASS:
                return AccountRepoH.C_PASS;
            case AccountModelH.P_SALT:
                return AccountRepoH.C_SALT;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? AccountModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
