import DatabaseWhere from '../../../../utilities/database/DatabaseWhere'
import SV from '../../../../utilities/SV'
import ProductModelH from '../Model/ProductModelH'

export default class ProductFilter {
    static S_SORT_BY_ID: number = 1
    static S_SORT_BY_NAME: number = 2
    static S_SORT_BY_UNIT: number = 3
    static S_SORT_BY_DESCRIPTION: number = 4

    sortBy: number = SV.NOT_EXISTS
    searchBy: string = SV.Strings.EMPTY;

    getSortColumn(): number | null {
        switch (Math.abs(this.sortBy)) {
            case ProductFilter.S_SORT_BY_ID:
                return ProductModelH.P_PRODUCT_ID;
            case ProductFilter.S_SORT_BY_NAME:
                return ProductModelH.P_PRODUCT_NAME;
            case ProductFilter.S_SORT_BY_UNIT:
                return ProductModelH.P_PRODUCT_UNIT;
            case ProductFilter.S_SORT_BY_DESCRIPTION:
                return ProductModelH.P_PRODUCT_DESCRIPTION;
            default:
                return null;
        }
    }

    getSortOrder(): string {
        return this.sortBy > 0 ? DatabaseWhere.ORDER_DIRECTION_ASC : DatabaseWhere.ORDER_DIRECTION_DESC;
    }

    hasSearchWord(): boolean {
        return this.searchBy !== SV.Strings.EMPTY;
    }
}
