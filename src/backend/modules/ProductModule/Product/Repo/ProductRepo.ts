import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import SV from '../../../../utilities/SV';
import ProductModel from '../Model/ProductModel';
import ProductModelH from '../Model/ProductModelH';
import ProductFilter from '../Utils/ProductFilter';
import ProductRepoG from './ProductRepoG';
import ProductRepoH from './ProductRepoH';

export default class ProductRepo extends ProductRepoG {

    async fetchByFilter(productFilter: ProductFilter): Promise < ProductModel[] > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModel.P_PRODUCT_DELETED, '=', SV.FALSE));
        databaseWhere.orderColumn = productFilter.getSortColumn();
        databaseWhere.orderType = productFilter.getSortOrder();
        if (productFilter.hasSearchWord() === true) {
            databaseWhere.orClause([
                new DatabaseWhereClause(ProductModel.P_PRODUCT_ID, 'LIKE', `%${productFilter.searchBy}%`),
                new DatabaseWhereClause(ProductModel.P_PRODUCT_NAME, 'LIKE', `%${productFilter.searchBy}%`),
                new DatabaseWhereClause(ProductModel.P_PRODUCT_DESCRIPTION, 'LIKE', `%${productFilter.searchBy}%`),
            ]);
        }

        return this.fetch(databaseWhere);
    }

    async fetchByPrimaryValueNotDeleted(productId: number): Promise < ProductModel | null > {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ProductModel.P_PRODUCT_ID, '=', productId));
        databaseWhere.clause(new DatabaseWhereClause(ProductModel.P_PRODUCT_DELETED, '=', SV.FALSE));
        const productModels = await this.fetch(databaseWhere);
        return productModels.length === 0 ? null : productModels[0];
    }

    async changeDeletableStatus(productIds: number[], newDeletableStatus: number) {
        let oldDelStatus = SV.TRUE;

        if (newDeletableStatus === SV.TRUE) {
            oldDelStatus = SV.FALSE
        }

        const produtcDbWhere = new DatabaseWhere();
        produtcDbWhere.andClause([
            new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', productIds),
            new DatabaseWhereClause(ProductModelH.P_PRODUCT_DELETABLE, '=', oldDelStatus),
        ])

        const productModels = await this.fetch(produtcDbWhere);
        for (let i = 0; i < productModels.length; i++) {
            productModels[i].setNewDeletableStatus(newDeletableStatus);
            await this.save(productModels[i]);
        }
    }

    async markAsUneditable(productIds: number[]) {
        const produtcDbWhere = new DatabaseWhere();
        produtcDbWhere.andClause([
            new DatabaseWhereClause(ProductModelH.P_PRODUCT_ID, '=', productIds),
            new DatabaseWhereClause(ProductModelH.P_PRODUCT_EDITABLE, '=', SV.TRUE),
        ])

        const productModels = await this.fetch(produtcDbWhere);
        for (let i = 0; i < productModels.length; i++) {
            productModels[i].markAsUneditable();
            await this.save(productModels[i]);
        }
    }

}
