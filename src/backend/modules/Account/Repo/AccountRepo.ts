import DatabaseWhere from '../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../utilities/database/DatabaseWhereClause';
import AccountModel from '../Model/AccountModel';
import AccountModelH from '../Model/AccountModelH';
import AccountRepoG from './AccountRepoG';

export default class AccountRepo extends AccountRepoG {

    async fetchByEmail(email: string): Promise < AccountModel > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AccountModelH.P_EMAIL, '=', email));
        const accountModel = await this.fetch(databaseWhere);
        return accountModel === null ? null : accountModel[0];
    }

}
