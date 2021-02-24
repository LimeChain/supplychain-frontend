import CountryRepoH from './CountryRepoH';
import CountryModel from '../Model/CountryModel';
import CountryModelG from '../Model/CountryModelG';
import CountryModelH from '../Model/CountryModelH';
import DatabaseWhere from '../../../Utilities/Database/DatabaseWhere';
import DatabaseWhereClause from '../../../Utilities/Database/DatabaseWhereClause';
import Repo from '../../../Utilities/Database/Repo';


export default class CountryRepoG extends Repo {

    async save(model: CountryModel, props: number[] | null = null): Promise < CountryModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: CountryModel, props: number[] | null = null): Promise < CountryModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(CountryRepoH.TABLE_NAME, repoObj);
        return CountryModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: CountryModel, props: number[] | null = null): Promise < CountryModel > {
        const map = CountryModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: CountryModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(CountryModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(CountryRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < CountryModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < CountryModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(CountryModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, CountryModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(CountryRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = CountryRepoH.instanceByDbRow(row);
            return CountryModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < CountryModel[] > {
        const map = CountryModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.countryId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, CountryModel > > {
        const models = await this.fetch(databaseWhere, props);
        return CountryModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < CountryModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(CountryModelH.P_COUNTRY_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < CountryModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(CountryModelH.P_COUNTRY_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, CountryModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return CountryModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(CountryModelG.matchModelToRepoProp);
        await this.db.delete(CountryRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(CountryModelH.P_COUNTRY_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(CountryModelH.P_COUNTRY_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
