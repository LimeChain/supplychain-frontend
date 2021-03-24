import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import ShipmentModel from '../../Shipment/Model/ShipmentModel';
import ShipmentDocumentModel from '../Model/ShipmentDocumentModel';
import ShipmentDocumentModelH from '../Model/ShipmentDocumentModelH';
import ShipmentDocumentRepoG from './ShipmentDocumentRepoG';
import ShipmentDocumentRepoH from './ShipmentDocumentRepoH';

export default class ShipmentDocumentRepo extends ShipmentDocumentRepoG {

    async deleteUnused(shipmentModel: ShipmentModel, usedShipmentDocumentModels: ShipmentDocumentModel[]) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.andClause([
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_DOCUMENT_ID, '!=', usedShipmentDocumentModels.map((s) => s.shipmentDocumentId)),
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_ID, '=', shipmentModel.shipmentId),
        ]);

        return this.delete(databaseWhere);
    }

    async fetchForShipment(shipmentIds: number[]) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_SHIPMENT_ID, '=', shipmentIds));
        databaseWhere.clause(new DatabaseWhereClause(ShipmentDocumentModelH.P_DOCUMENT_TYPE, '!=', ShipmentDocumentModel.S_DOCUMENT_TYPE_JUST_UPLOADED));
        return this.fetch(databaseWhere);
    }

}
