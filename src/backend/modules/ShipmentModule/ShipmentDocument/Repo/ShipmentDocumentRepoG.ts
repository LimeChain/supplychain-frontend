import ShipmentDocumentRepoH from './ShipmentDocumentRepoH';
import ShipmentDocumentModel from '../Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../Model/ShipmentDocumentModelH';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../../utilities/database/Repo';


export default class ShipmentDocumentRepoG extends Repo {

    async save(model: ShipmentDocumentModel, props: number[] | null = null): Promise < ShipmentDocumentModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: ShipmentDocumentModel, props: number[] | null = null): Promise < ShipmentDocumentModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(ShipmentDocumentRepoH.TABLE_NAME, repoObj);
        return ShipmentDocumentModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: ShipmentDocumentModel, props: number[] | null = null): Promise < ShipmentDocumentModel > {
        const map = ShipmentDocumentModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: ShipmentDocumentModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ShipmentDocumentModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(ShipmentDocumentRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentDocumentModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentDocumentModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ShipmentDocumentModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, ShipmentDocumentModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(ShipmentDocumentRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = ShipmentDocumentRepoH.instanceByDbRow(row);
            return ShipmentDocumentModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ShipmentDocumentModel[] > {
        const map = ShipmentDocumentModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.shipmentDocumentId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, ShipmentDocumentModel > > {
        const models = await this.fetch(databaseWhere, props);
        return ShipmentDocumentModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < ShipmentDocumentModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < ShipmentDocumentModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, ShipmentDocumentModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return ShipmentDocumentModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(ShipmentDocumentModelG.matchModelToRepoProp);
        await this.db.delete(ShipmentDocumentRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
