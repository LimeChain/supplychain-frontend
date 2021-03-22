import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import ShipmentModel from '../../../ShipmentModule/Shipment/Model/ShipmentModel';
import SkuModel from '../Model/SkuModel';
import SkuRepoG from './SkuRepoG';
import SkuRepoH from './SkuRepoH';

export default class SkuRepo extends SkuRepoG {

    async deleteUnused(shipmentModel: ShipmentModel, skuModels: SkuModel[]): Promise < SkuModel[] > {
        const databaseWhere = new DatabaseWhere();

        databaseWhere.andClause([
            new DatabaseWhereClause(SkuModel.P_SKU_ID, '!=', skuModels.map((s) => s.skuId)),
            new DatabaseWhereClause(SkuModel.P_SHIPMENT_ID, '=', shipmentModel.shipmentId),
        ])

        const skuToDeleteModels = await this.fetch(databaseWhere);
        await this.deleteByPrimaryValues(skuToDeleteModels.map((s) => s.skuId))
        return skuToDeleteModels;
    }

    async saveWithPrimaryKey(skuModel: SkuModel) {
        const repoObj = skuModel.toRepo();
        repoObj.getPrimaryValueForInsert = () => {
            return repoObj.skuId;
        };
        this.db.save(SkuRepoH.TABLE_NAME, repoObj);
    }

}
