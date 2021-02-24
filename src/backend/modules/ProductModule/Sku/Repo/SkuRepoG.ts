import SkuRepoH from './SkuRepoH';
import SkuModel from '../Model/SkuModel';
import SkuModelG from '../Model/SkuModelG';
import SkuModelH from '../Model/SkuModelH';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../../utilities/database/Repo';


export default class SkuRepoG extends Repo {

    async save(model: SkuModel, props: number[] | null = null): Promise < SkuModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: SkuModel, props: number[] | null = null): Promise < SkuModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(SkuRepoH.TABLE_NAME, repoObj);
        return SkuModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: SkuModel, props: number[] | null = null): Promise < SkuModel > {
        const map = SkuModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: SkuModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SkuModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(SkuRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(SkuModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, SkuModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(SkuRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = SkuRepoH.instanceByDbRow(row);
            return SkuModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < SkuModel[] > {
        const map = SkuModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.skuId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, SkuModel > > {
        const models = await this.fetch(databaseWhere, props);
        return SkuModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < SkuModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuModelH.P_SKU_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < SkuModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuModelH.P_SKU_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, SkuModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return SkuModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(SkuModelG.matchModelToRepoProp);
        await this.db.delete(SkuRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuModelH.P_SKU_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuModelH.P_SKU_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
