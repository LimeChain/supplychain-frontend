import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import SkuModel from '../../Sku/Model/SkuModel';
import SkuOriginModel from '../Model/SkuOriginModel';
import SkuOriginModelH from '../Model/SkuOriginModelH';
import SkuOriginRepoG from './SkuOriginRepoG';
import SkuOriginRepoH from './SkuOriginRepoH';

export default class SkuOriginRepo extends SkuOriginRepoG {

    async deleteUnused(skuModels: SkuModel[]) {
        const skuOriginModDelDbWhere = new DatabaseWhere();
        skuOriginModDelDbWhere.clause(new DatabaseWhereClause(SkuOriginModel.P_SKU_ID, '=', skuModels.map((s) => s.skuId)))

        await this.delete(skuOriginModDelDbWhere);
    }

    async saveWithPrimaryKey(skuOriginModel: SkuOriginModel) {
        const repoObj = skuOriginModel.toRepo();
        repoObj.getPrimaryValueForInsert = () => {
            return repoObj.skuOriginId;
        };
        this.db.save(SkuOriginRepoH.TABLE_NAME, repoObj);
    }

    async fetchBySkuIds(skuIds: number[]) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuOriginModelH.P_SKU_ID, '=', skuIds));
        return this.fetch(databaseWhere);
    }

}
