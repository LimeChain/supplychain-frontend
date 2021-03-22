import DatabaseWhere from '../../../../utilities/database/DatabaseWhere'
import SV from '../../../../utilities/SV'
import ShipmentModelH from '../Model/ShipmentModelH'

export default class ShipmentFilter {
    static S_SORT_BY_ID: number = 1
    static S_SORT_BY_NAME: number = 2
    static S_SORT_BY_CONSIGNMENT_NUMBER: number = 3
    static S_SORT_BY_STATUS: number = 4
    static S_SORT_BY_ORIGIN_SITE_ID: number = 5
    static S_SORT_BY_DESTINATION_SITE_ID: number = 6
    static S_SORT_BY_DATE_OF_SHIPMENT: number = 7
    static S_SORT_BY_DATE_OF_ARRIVAL: number = 8

    static S_PAGE_STATUS_DRAFTS = 1
    static S_PAGE_STATUS_INCOMMING = 2
    static S_PAGE_STATUS_OUTGOING = 3
    static S_PAGE_DASHBOARD_INCOMMING = 4
    static S_PAGE_DASHBOARD_OUTGOING = 5

    siteId: number = SV.NOT_EXISTS;
    status: number = SV.NOT_EXISTS;
    page: number = SV.NOT_EXISTS;
    searchBy: string = SV.Strings.NOT_EXISTS;
    sortBy: number = -ShipmentFilter.S_SORT_BY_ID;

    getSortColumn(): number | null {
        switch (Math.abs(this.sortBy)) {
            default:
            case ShipmentFilter.S_SORT_BY_ID:
                return ShipmentModelH.P_SHIPMENT_ID;
            case ShipmentFilter.S_SORT_BY_NAME:
                return ShipmentModelH.P_SHIPMENT_NAME;
            case ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER:
                return ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER;
            case ShipmentFilter.S_SORT_BY_STATUS:
                return ShipmentModelH.P_SHIPMENT_STATUS;
            case ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID:
                return ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID;
            case ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID:
                return ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID;
        }
    }

    getSortOrder(): string {
        return this.sortBy > 0 ? DatabaseWhere.ORDER_DIRECTION_ASC : DatabaseWhere.ORDER_DIRECTION_DESC;
    }
}
