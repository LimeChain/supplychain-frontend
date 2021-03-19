const AccountModelH = require('../../modules/Account/Model/AccountModelH').default;
const { default: SiteModel } = require('../../modules/Site/Model/SiteModel')
const { default: DatabaseWhere } = require('../../utilities/database/DatabaseWhere')
const { default: DatabaseWhereClause } = require('../../utilities/database/DatabaseWhereClause')
const RepoFactory = require('../../utilities/database/RepoFactory').default;

module.exports = class Migration20210319135531 {

    async up(db) {
        const repoFactory = new RepoFactory(db);
        const siteRepo = repoFactory.getSiteRepo();
        const accountRepo = repoFactory.getAccountRepo();

        const siteModel = await siteRepo.fetchByPrimaryValue(SiteModel.S_ROTHERDAM);
        siteModel.siteName = 'Rotterdam';
        await siteRepo.save(siteModel);

        const accountDBWhere = new DatabaseWhere();
        accountDBWhere.clause(new DatabaseWhereClause(AccountModelH.P_SITE_ID, '=', SiteModel.S_ROTHERDAM))
        const accountModels = await accountRepo.fetch(accountDBWhere);

        accountModels[0].name = 'Rotterdam, Netherlands';
        await accountRepo.save(accountModels[0]);
    }

    async down(db) {

    }

}
