
            
export default class AccountModelH {

    static primaryValueInInsert = true;

    static P_ACCOUNT_ID = 1;
    static P_COUNTRY_ID = 2;
    static P_SITE_ID = 3;
    static P_EMAIL = 4;
    static P_NAME = 5;
    static P_ROLE = 6;
    static P_ACTIVE = 7;
    static P_INVITATION = 8;
    static P_REGISTER_TIMESTAMP = 9;
    static P_LAST_LOGIN_TIMESTAMP = 10;
    static P_PASS = 11;
    static P_SALT = 12;
    static PROPERTIES = [AccountModelH.P_ACCOUNT_ID,
        AccountModelH.P_COUNTRY_ID,
        AccountModelH.P_SITE_ID,
        AccountModelH.P_EMAIL,
        AccountModelH.P_NAME,
        AccountModelH.P_ROLE,
        AccountModelH.P_ACTIVE,
        AccountModelH.P_INVITATION,
        AccountModelH.P_REGISTER_TIMESTAMP,
        AccountModelH.P_LAST_LOGIN_TIMESTAMP,
        AccountModelH.P_PASS,
        AccountModelH.P_SALT];

    accountId: number;
    countryId: number;
    siteId: number;
    email: string;
    name: string;
    role: number;
    active: number;
    invitation: number;
    registerTimestamp: number;
    lastLoginTimestamp: number;
    pass: string;
    salt: string;

}
