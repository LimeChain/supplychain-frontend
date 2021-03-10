import DatabaseWhere from '../../../../utilities/database/DatabaseWhere'
import SV from '../../../../utilities/SV'
import SkuModelH from '../Model/SkuModelH'

export default class SkuFilter {
    static S_SORT_BY_ID: number = 1
    static S_SORT_BY_NAME: number = 2

    sortBy: number = SV.NOT_EXISTS

    getSortColumn(): number | null {
        switch (Math.abs(this.sortBy)) {
            case SkuFilter.S_SORT_BY_ID:
                return SkuModelH.P_SKU_ID;
            case SkuFilter.S_SORT_BY_NAME:
                return SkuModelH.P_SKU_ID;
            default:
                return null;
        }
    }

    getSortOrder(): string {
        return this.sortBy > 0 ? DatabaseWhere.ORDER_DIRECTION_ASC : DatabaseWhere.ORDER_DIRECTION_DESC;
    }
}
