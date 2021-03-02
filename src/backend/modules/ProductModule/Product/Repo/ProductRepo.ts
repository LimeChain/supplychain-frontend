import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import ProductFilter from '../Utils/ProductFilter';
import ProductRepoG from './ProductRepoG';

export default class ProductRepo extends ProductRepoG {
    async fetchByFilter(productFilter: ProductFilter) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.orderColumn = productFilter.getSortColumn();
        databaseWhere.orderType = productFilter.order;

        return this.fetch(databaseWhere);
    }
}
