import SkuOriginRepoH from './SkuOriginRepoH';
import SkuOriginModel from '../Model/SkuOriginModel';
import SkuOriginModelG from '../Model/SkuOriginModelG';
import SkuOriginModelH from '../Model/SkuOriginModelH';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../../utilities/database/Repo';


export default class SkuOriginRepoG extends Repo {

    async save(model: SkuOriginModel, props: number[] | null = null): Promise < SkuOriginModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: SkuOriginModel, props: number[] | null = null): Promise < SkuOriginModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(SkuOriginRepoH.TABLE_NAME, repoObj);
        return SkuOriginModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: SkuOriginModel, props: number[] | null = null): Promise < SkuOriginModel > {
        const map = SkuOriginModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: SkuOriginModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SkuOriginModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(SkuOriginRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuOriginModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuOriginModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SkuOriginModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, SkuOriginModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(SkuOriginRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = SkuOriginRepoH.instanceByDbRow(row);
            return SkuOriginModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuOriginModel[] > {
        const map = SkuOriginModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.skuOriginId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, SkuOriginModel > > {
        const models = await this.fetch(databaseWhere, props);
        return SkuOriginModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < SkuOriginModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ORIGIN_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < SkuOriginModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ORIGIN_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, SkuOriginModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return SkuOriginModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(SkuOriginModelG.matchModelToRepoProp);
        await this.db.delete(SkuOriginRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ORIGIN_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ORIGIN_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
