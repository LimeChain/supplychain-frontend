import ShipmentRepoH from './ShipmentRepoH';
import ShipmentModel from '../Model/ShipmentModel';
import ShipmentModelG from '../Model/ShipmentModelG';
import ShipmentModelH from '../Model/ShipmentModelH';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../../utilities/database/Repo';


export default class ShipmentRepoG extends Repo {

    async save(model: ShipmentModel, props: number[] | null = null): Promise < ShipmentModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: ShipmentModel, props: number[] | null = null): Promise < ShipmentModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(ShipmentRepoH.TABLE_NAME, repoObj);
        return ShipmentModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: ShipmentModel, props: number[] | null = null): Promise < ShipmentModel > {
        const map = ShipmentModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: ShipmentModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ShipmentModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(ShipmentRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ShipmentModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, ShipmentModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(ShipmentRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = ShipmentRepoH.instanceByDbRow(row);
            return ShipmentModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentModel[] > {
        const map = ShipmentModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.shipmentId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, ShipmentModel > > {
        const models = await this.fetch(databaseWhere, props);
        return ShipmentModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < ShipmentModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < ShipmentModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, ShipmentModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return ShipmentModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(ShipmentModelG.matchModelToRepoProp);
        await this.db.delete(ShipmentRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
