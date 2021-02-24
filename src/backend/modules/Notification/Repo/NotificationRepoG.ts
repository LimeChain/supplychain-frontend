import NotificationRepoH from './NotificationRepoH';
import NotificationModel from '../Model/NotificationModel';
import NotificationModelG from '../Model/NotificationModelG';
import NotificationModelH from '../Model/NotificationModelH';
import DatabaseWhere from '../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../utilities/database/Repo';


export default class NotificationRepoG extends Repo {

    async save(model: NotificationModel, props: number[] | null = null): Promise < NotificationModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: NotificationModel, props: number[] | null = null): Promise < NotificationModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(NotificationRepoH.TABLE_NAME, repoObj);
        return NotificationModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: NotificationModel, props: number[] | null = null): Promise < NotificationModel > {
        const map = NotificationModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: NotificationModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(NotificationModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(NotificationRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < NotificationModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < NotificationModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(NotificationModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, NotificationModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(NotificationRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = NotificationRepoH.instanceByDbRow(row);
            return NotificationModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < NotificationModel[] > {
        const map = NotificationModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.notificationId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, NotificationModel > > {
        const models = await this.fetch(databaseWhere, props);
        return NotificationModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < NotificationModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < NotificationModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, NotificationModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return NotificationModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(NotificationModelG.matchModelToRepoProp);
        await this.db.delete(NotificationRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
