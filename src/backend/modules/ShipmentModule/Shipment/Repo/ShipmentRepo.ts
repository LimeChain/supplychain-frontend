import DatabaseWhere from '../../../../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../../../../utilities/database/DatabaseWhereClause';
import SV from '../../../../utilities/SV';
import ShipmentModel from '../Model/ShipmentModel';
import ShipmentModelH from '../Model/ShipmentModelH';
import ShipmentFilter from '../Utils/ShipmentFilter';
import ShipmentRepoG from './ShipmentRepoG';

export default class ShipmentRepo extends ShipmentRepoG {

    async fetchByFilter(shipmentFilter: ShipmentFilter): Promise<Array<ShipmentModel>> {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.orderColumn = shipmentFilter.getSortColumn();
        databaseWhere.orderType = shipmentFilter.getSortOrder();

        databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DELETED, '=', SV.FALSE))

        const dateForFetch = Date.now() - 1000 * 60 * 60 * 24 * 31;
        // filter by page
        if (shipmentFilter.page === ShipmentFilter.S_PAGE_STATUS_DRAFTS) {
            databaseWhere.andClause([
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '=', ShipmentModel.S_STATUS_DRAFT),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID, '=', shipmentFilter.siteId),
            ]);
        } else if (shipmentFilter.page === ShipmentFilter.S_PAGE_STATUS_INCOMMING) {
            databaseWhere.andClause([
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '!=', ShipmentModel.S_STATUS_DRAFT),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID, '=', shipmentFilter.siteId),
            ]);
        } else if (shipmentFilter.page === ShipmentFilter.S_PAGE_STATUS_OUTGOING) {
            databaseWhere.andClause([
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '!=', ShipmentModel.S_STATUS_DRAFT),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID, '=', shipmentFilter.siteId),
            ]);
        } else if (shipmentFilter.page === ShipmentFilter.S_PAGE_DASHBOARD_INCOMMING) {
            databaseWhere.andClause([
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '!=', ShipmentModel.S_STATUS_DRAFT),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID, '=', shipmentFilter.siteId),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT, '>', dateForFetch),
            ]);
        } else if (shipmentFilter.page === ShipmentFilter.S_PAGE_DASHBOARD_OUTGOING) {
            databaseWhere.andClause([
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '!=', ShipmentModel.S_STATUS_DRAFT),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID, '=', shipmentFilter.siteId),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT, '>', dateForFetch),
            ]);
        }

        if (shipmentFilter.status !== SV.NOT_EXISTS) {
            databaseWhere.clause(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_STATUS, '=', shipmentFilter.status));
        }

        if (shipmentFilter.searchBy !== SV.Strings.NOT_EXISTS) {

            const filterClauses = [
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_NAME, 'LIKE', `%${shipmentFilter.searchBy}%`),
                new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER, 'LIKE', `%${shipmentFilter.searchBy}%`),
            ];

            if (!Number.isNaN(parseInt(shipmentFilter.searchBy))) {
                filterClauses.push(new DatabaseWhereClause(ShipmentModelH.P_SHIPMENT_ID, '=', parseInt(shipmentFilter.searchBy)));
            }

            databaseWhere.orClause(filterClauses);
        }

        return this.fetch(databaseWhere);
    }

}
