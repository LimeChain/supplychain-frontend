export default class Session {

    static ACCOUNT_ID: number;
    static ACCOUNT_COUNTRY: number;
    static ACCOUNT_SITE: number;

    ctx: any;

    constructor(ctx) {
        this.ctx = ctx;
    }

    destroy() {
        this.ctx.session = null;
    }

    onLogin(accountId: number, countryId: number, siteId: number) {
        setProperty(this.ctx, Session.ACCOUNT_ID, accountId);
        setProperty(this.ctx, Session.ACCOUNT_COUNTRY, countryId);
        setProperty(this.ctx, Session.ACCOUNT_SITE, siteId);
    }

    getAccountId(): number {
        return getProperty(this.ctx, Session.ACCOUNT_ID);
    }

    isAdmin(): boolean {
        return this.getAccountId() !== null;
    }

}

Session.ACCOUNT_ID = 1;
Session.ACCOUNT_COUNTRY = 2;
Session.ACCOUNT_SITE = 3;

function getProperty(ctx, key) {
    if (ctx.session !== null && ctx.session[key] !== undefined) {
        return ctx.session[key];
    }

    return null;
}

function setProperty(ctx, key, value) {
    if (ctx.session === null) {
        ctx.session = {};
    }

    ctx.session[key] = value;
}

function unsetProperty(ctx, key) {
    if (ctx.session !== null) {
        delete ctx.session[key];
    }
}
