import SkuModel from '../../../../../../definitions/modules/ProductModule/SkuModel';
import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import SkuOriginModel from '../Model/SkuOriginModel';
import SkuOriginRepoG from './SkuOriginRepoG';

export default class SkuOriginRepo extends SkuOriginRepoG {

    async deleteUnused(skuModels: SkuModel[]) {
        const skuOriginModDelDbWhere = new DatabaseWhere();
        skuOriginModDelDbWhere.clause(new DatabaseWhereClause(SkuOriginModel.P_SKU_ID, '=', skuModels.map((s) => s.skuId)))

        await this.delete(skuOriginModDelDbWhere);
    }

}
