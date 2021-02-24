import SiteRepoH from './SiteRepoH';
import SiteModel from '../Model/SiteModel';
import SiteModelG from '../Model/SiteModelG';
import SiteModelH from '../Model/SiteModelH';
import DatabaseWhere from '../../../Utilities/Database/DatabaseWhere';
import DatabaseWhereClause from '../../../Utilities/Database/DatabaseWhereClause';
import Repo from '../../../Utilities/Database/Repo';


export default class SiteRepoG extends Repo {

    async save(model: SiteModel, props: number[] | null = null): Promise < SiteModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: SiteModel, props: number[] | null = null): Promise < SiteModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(SiteRepoH.TABLE_NAME, repoObj);
        return SiteModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: SiteModel, props: number[] | null = null): Promise < SiteModel > {
        const map = SiteModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: SiteModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SiteModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(SiteRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SiteModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SiteModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SiteModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, SiteModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(SiteRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = SiteRepoH.instanceByDbRow(row);
            return SiteModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SiteModel[] > {
        const map = SiteModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.siteId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, SiteModel > > {
        const models = await this.fetch(databaseWhere, props);
        return SiteModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < SiteModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SiteModelH.P_SITE_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < SiteModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SiteModelH.P_SITE_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, SiteModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return SiteModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(SiteModelG.matchModelToRepoProp);
        await this.db.delete(SiteRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SiteModelH.P_SITE_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SiteModelH.P_SITE_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
