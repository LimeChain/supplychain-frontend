import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import ShipmentModel from '../../Shipment/Model/ShipmentModel';
import ShipmentDocumentModel from '../Model/ShipmentDocumentModel';
import ShipmentDocumentRepoG from './ShipmentDocumentRepoG';

export default class ShipmentDocumentRepo extends ShipmentDocumentRepoG {

    async deleteUnused(shipmentModel: ShipmentModel, usedShipmentDocumentModels: ShipmentDocumentModel[]) {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.andClause([
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_DOCUMENT_ID, '!=', usedShipmentDocumentModels.map((s) => s.shipmentDocumentId)),
            new DatabaseWhereClause(ShipmentDocumentModel.P_SHIPMENT_ID, '=', shipmentModel.shipmentId),
        ]);

        return this.delete(databaseWhere);
    }

}
