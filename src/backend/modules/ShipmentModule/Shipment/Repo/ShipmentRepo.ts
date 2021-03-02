import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import ShipmentModel from '../Model/ShipmentModel';
import ShipmentModelH from '../Model/ShipmentModelH';
import ShipmentFilter from '../Utils/ShipmentFilter';
import ShipmentRepoG from './ShipmentRepoG';

export default class ShipmentRepo extends ShipmentRepoG {
    async fetchByFilter(shipmentFilter: ShipmentFilter): Promise<Array<ShipmentModel>> {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.orderColumn = shipmentFilter.getSortColumn();
        databaseWhere.orderType = shipmentFilter.getSortOrder();
        databaseWhere.orClause([
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', shipmentFilter.filterId),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_NAME, '=', shipmentFilter.filterName),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '=', shipmentFilter.filterStatus),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID, '=', shipmentFilter.filterOriginSiteId),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID, '=', shipmentFilter.filterDestinationSiteId),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT, '=', shipmentFilter.filterDateOfShipment),
            new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL, '=', shipmentFilter.filterDateOfArrival),
        ])

        return this.fetch(databaseWhere);
    }
}
