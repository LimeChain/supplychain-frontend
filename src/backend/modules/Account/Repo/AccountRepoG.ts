import AccountRepoH from './AccountRepoH';
import AccountModel from '../Model/AccountModel';
import AccountModelG from '../Model/AccountModelG';
import AccountModelH from '../Model/AccountModelH';
import DatabaseWhere from '../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../utilities/database/Repo';


export default class AccountRepoG extends Repo {

    async save(model: AccountModel, props: number[] | null = null): Promise < AccountModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: AccountModel, props: number[] | null = null): Promise < AccountModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(AccountRepoH.TABLE_NAME, repoObj);
        return AccountModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: AccountModel, props: number[] | null = null): Promise < AccountModel > {
        const map = AccountModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: AccountModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(AccountModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(AccountRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AccountModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AccountModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(AccountModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, AccountModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(AccountRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = AccountRepoH.instanceByDbRow(row);
            return AccountModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AccountModel[] > {
        const map = AccountModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.accountId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, AccountModel > > {
        const models = await this.fetch(databaseWhere, props);
        return AccountModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < AccountModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AccountModelH.P_ACCOUNT_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < AccountModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AccountModelH.P_ACCOUNT_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, AccountModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return AccountModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(AccountModelG.matchModelToRepoProp);
        await this.db.delete(AccountRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AccountModelH.P_ACCOUNT_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AccountModelH.P_ACCOUNT_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
