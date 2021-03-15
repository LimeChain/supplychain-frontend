export default class AccountRepoH {

    static TABLE_NAME = 'accounts';
    static C_ACCOUNT_ID = 'accountId';
    static C_COUNTRY_ID = 'countryId';
    static C_SITE_ID = 'siteId';
    static C_EMAIL = 'email';
    static C_NAME = 'name';
    static C_ROLE = 'role';
    static C_ACTIVE = 'active';
    static C_INVITATION = 'invitation';
    static C_REGISTER_TIMESTAMP = 'registerTimestamp';
    static C_LAST_LOGIN_TIMESTAMP = 'lastLoginTimestamp';
    static C_PASS = 'pass';
    static C_SALT = 'salt';
        
    accountId: number | null;
    accountIdToDb: boolean;
    countryId: number | null;
    countryIdToDb: boolean;
    siteId: number | null;
    siteIdToDb: boolean;
    email: string | null;
    emailToDb: boolean;
    name: string | null;
    nameToDb: boolean;
    role: number | null;
    roleToDb: boolean;
    active: number | null;
    activeToDb: boolean;
    invitation: number | null;
    invitationToDb: boolean;
    registerTimestamp: number | null;
    registerTimestampToDb: boolean;
    lastLoginTimestamp: number | null;
    lastLoginTimestampToDb: boolean;
    pass: string | null;
    passToDb: boolean;
    salt: string | null;
    saltToDb: boolean;
    
    constructor() {
        this.accountId = null;
        this.accountIdToDb = false;
        this.countryId = null;
        this.countryIdToDb = false;
        this.siteId = null;
        this.siteIdToDb = false;
        this.email = null;
        this.emailToDb = false;
        this.name = null;
        this.nameToDb = false;
        this.role = null;
        this.roleToDb = false;
        this.active = null;
        this.activeToDb = false;
        this.invitation = null;
        this.invitationToDb = false;
        this.registerTimestamp = null;
        this.registerTimestampToDb = false;
        this.lastLoginTimestamp = null;
        this.lastLoginTimestampToDb = false;
        this.pass = null;
        this.passToDb = false;
        this.salt = null;
        this.saltToDb = false;
    }
    
    static instanceByDbRow(row): AccountRepoH {
        const repo = new AccountRepoH();
    
        repo.accountId = row[AccountRepoH.C_ACCOUNT_ID] ?? repo.accountId;
        repo.countryId = row[AccountRepoH.C_COUNTRY_ID] ?? repo.countryId;
        repo.siteId = row[AccountRepoH.C_SITE_ID] ?? repo.siteId;
        repo.email = row[AccountRepoH.C_EMAIL] ?? repo.email;
        repo.name = row[AccountRepoH.C_NAME] ?? repo.name;
        repo.role = row[AccountRepoH.C_ROLE] ?? repo.role;
        repo.active = row[AccountRepoH.C_ACTIVE] ?? repo.active;
        repo.invitation = row[AccountRepoH.C_INVITATION] ?? repo.invitation;
        repo.registerTimestamp = row[AccountRepoH.C_REGISTER_TIMESTAMP] ?? repo.registerTimestamp;
        repo.lastLoginTimestamp = row[AccountRepoH.C_LAST_LOGIN_TIMESTAMP] ?? repo.lastLoginTimestamp;
        repo.pass = row[AccountRepoH.C_PASS] ?? repo.pass;
        repo.salt = row[AccountRepoH.C_SALT] ?? repo.salt;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.accountId;
    }

    setPrimaryValue(value: number): void {
        this.accountId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.countryIdToDb === true) {
            columns.push(AccountRepoH.C_COUNTRY_ID);
            values.push(this.countryId === null ? null : this.countryId.toString());
        }

        if (this.siteIdToDb === true) {
            columns.push(AccountRepoH.C_SITE_ID);
            values.push(this.siteId === null ? null : this.siteId.toString());
        }

        if (this.emailToDb === true) {
            columns.push(AccountRepoH.C_EMAIL);
            values.push(this.email === null ? null : this.email.toString());
        }

        if (this.nameToDb === true) {
            columns.push(AccountRepoH.C_NAME);
            values.push(this.name === null ? null : this.name.toString());
        }

        if (this.roleToDb === true) {
            columns.push(AccountRepoH.C_ROLE);
            values.push(this.role === null ? null : this.role.toString());
        }

        if (this.activeToDb === true) {
            columns.push(AccountRepoH.C_ACTIVE);
            values.push(this.active === null ? null : this.active.toString());
        }

        if (this.invitationToDb === true) {
            columns.push(AccountRepoH.C_INVITATION);
            values.push(this.invitation === null ? null : this.invitation.toString());
        }

        if (this.registerTimestampToDb === true) {
            columns.push(AccountRepoH.C_REGISTER_TIMESTAMP);
            values.push(this.registerTimestamp === null ? null : this.registerTimestamp.toString());
        }

        if (this.lastLoginTimestampToDb === true) {
            columns.push(AccountRepoH.C_LAST_LOGIN_TIMESTAMP);
            values.push(this.lastLoginTimestamp === null ? null : this.lastLoginTimestamp.toString());
        }

        if (this.passToDb === true) {
            columns.push(AccountRepoH.C_PASS);
            values.push(this.pass === null ? null : this.pass.toString());
        }

        if (this.saltToDb === true) {
            columns.push(AccountRepoH.C_SALT);
            values.push(this.salt === null ? null : this.salt.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [AccountRepoH.C_ACCOUNT_ID, this.accountId];
    }

}
