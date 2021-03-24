import AutoIncrementerRepoH from './AutoIncrementerRepoH';
import AutoIncrementerModel from '../Model/AutoIncrementerModel';
import AutoIncrementerModelG from '../Model/AutoIncrementerModelG';
import AutoIncrementerModelH from '../Model/AutoIncrementerModelH';
import DatabaseWhere from '../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../utilities/database/Repo';


export default class AutoIncrementerRepoG extends Repo {

    async save(model: AutoIncrementerModel, props: number[] | null = null): Promise < AutoIncrementerModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: AutoIncrementerModel, props: number[] | null = null): Promise < AutoIncrementerModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(AutoIncrementerRepoH.TABLE_NAME, repoObj);
        return AutoIncrementerModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: AutoIncrementerModel, props: number[] | null = null): Promise < AutoIncrementerModel > {
        const map = AutoIncrementerModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: AutoIncrementerModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(AutoIncrementerModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(AutoIncrementerRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AutoIncrementerModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AutoIncrementerModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(AutoIncrementerModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, AutoIncrementerModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(AutoIncrementerRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = AutoIncrementerRepoH.instanceByDbRow(row);
            return AutoIncrementerModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < AutoIncrementerModel[] > {
        const map = AutoIncrementerModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.autoIncrementerId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, AutoIncrementerModel > > {
        const models = await this.fetch(databaseWhere, props);
        return AutoIncrementerModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < AutoIncrementerModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AutoIncrementerModelH.P_AUTO_INCREMENTER_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < AutoIncrementerModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AutoIncrementerModelH.P_AUTO_INCREMENTER_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, AutoIncrementerModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return AutoIncrementerModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(AutoIncrementerModelG.matchModelToRepoProp);
        await this.db.delete(AutoIncrementerRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AutoIncrementerModelH.P_AUTO_INCREMENTER_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(AutoIncrementerModelH.P_AUTO_INCREMENTER_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
