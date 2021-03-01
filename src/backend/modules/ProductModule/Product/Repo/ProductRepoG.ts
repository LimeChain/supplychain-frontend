import ProductRepoH from './ProductRepoH';
import ProductModel from '../Model/ProductModel';
import ProductModelG from '../Model/ProductModelG';
import ProductModelH from '../Model/ProductModelH';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import Repo from '../../../../utilities/database/Repo';


export default class ProductRepoG extends Repo {

    async save(model: ProductModel, props: number[] | null = null): Promise < ProductModel > {
        let savedModel = await this.savePrimitiveProperties(model, props);
        savedModel.copyRefProperties(model);
        savedModel = await this.saveRefProperties(savedModel, props);
        return savedModel;
    }

    async savePrimitiveProperties(model: ProductModel, props: number[] | null = null): Promise < ProductModel > {
        let repoObj = model.toRepo(props);
        repoObj = await this.db.save(ProductRepoH.TABLE_NAME, repoObj);
        return ProductModelG.fromRepo(repoObj);
    }

    async saveRefProperties(model: ProductModel, props: number[] | null = null): Promise < ProductModel > {
        const map = ProductModel.getPropsAsMap(props);



        return model;
    }

    async updatePrimitiveProperties(model: ProductModel, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < void > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ProductModelG.matchModelToRepoProp);
        const repoObj = model.toRepo(props);
        await this.db.update(ProductRepoH.TABLE_NAME, repoObj, databaseWhere);
    }

    async fetch(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ProductModel[] > {
        let models = await this.fetchPrimitiveProperties(databaseWhere, props);
        models = await this.fetchRefProperties(models, databaseWhere, props);

        return models;
    }

    async fetchPrimitiveProperties(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ProductModel[] > {
        databaseWhere = databaseWhere ?? new DatabaseWhere();
        databaseWhere.convertFromModelToRepoColumns(ProductModelG.matchModelToRepoProp);
        const columns = DatabaseWhere.makeRepoColumns(props, ProductModelG.matchModelToRepoProp);
        const dbRows = await this.db.fetch(ProductRepoH.TABLE_NAME, columns, databaseWhere);

        const models = dbRows.map((row) => {
            const repoObj = ProductRepoH.instanceByDbRow(row);
            return ProductModelG.fromRepo(repoObj);
        });

        return models;
    }

    async fetchRefProperties(models, databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < ProductModel[] > {
        const map = ProductModel.getPropsAsMap(props);

        const ids = models.map((model) => {
            return model.productId;
        });



        return models;
    }

    async fetchAsMap(databaseWhere: DatabaseWhere | null = null, props: number[] | null = null): Promise < Map < number, ProductModel > > {
        const models = await this.fetch(databaseWhere, props);
        return ProductModelG.asMap(models);
    }

    async fetchByPrimaryValue(value: number, props: number[] | null = null): Promise < ProductModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', value));
        const models = await this.fetch(databaseWhere, props);
        return models.length > 0 ? models[0] : null;
    }

    async fetchByPrimaryValues(values: number[], props: number[] | null = null): Promise < ProductModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', values));
        return await this.fetch(databaseWhere, props);
    }

    async fetchByPrimaryValuesAsMap(values: number[], props: number[] | null = null): Promise < Map < number, ProductModel > > {
        const models = await this.fetchByPrimaryValues(values, props);
        return ProductModelG.asMap(models);
    }

    async delete(databaseWhere: DatabaseWhere): Promise < void > {
        databaseWhere.convertFromModelToRepoColumns(ProductModelG.matchModelToRepoProp);
        await this.db.delete(ProductRepoH.TABLE_NAME, databaseWhere);
    }

    async deleteByPrimaryValue(value: number): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', value));
        await this.delete(databaseWhere);
    }

    async deleteByPrimaryValues(values: number[]): Promise < void > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', values));
        await this.delete(databaseWhere);
    }

}
