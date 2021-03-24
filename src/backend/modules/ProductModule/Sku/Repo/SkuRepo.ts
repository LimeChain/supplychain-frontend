import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import ShipmentModel from '../../../ShipmentModule/Shipment/Model/ShipmentModel';
import SkuModel from '../Model/SkuModel';
import SkuModelH from '../Model/SkuModelH';
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

    async fetchByShipmentId(shipmentId: number) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(SkuModelH.P_SHIPMENT_ID, '=', shipmentId));
        return this.fetch(databaseWhere);
    }

}
