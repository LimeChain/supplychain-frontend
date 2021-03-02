import DatabaseWhere from "../../../../utilities/database/DatabaseWhere"
import SV from "../../../../utilities/SV"
import ShipmentModelH from "../Model/ShipmentModelH"

export default class ShipmentFilter {
    static S_SORT_BY_ID: number = 1
    static S_SORT_BY_NAME: number = 2
    static S_SORT_BY_STATUS: number = 3
    static S_SORT_BY_ORIGIN_SITE_ID: number = 4
    static S_SORT_BY_DESTINATION_SITE_ID: number = 5
    static S_SORT_BY_DATE_OF_SHIPMENT: number = 6
    static S_SORT_BY_DATE_OF_ARRIVAL: number = 7

    filterId: number = SV.NOT_EXISTS
    filterName: string = SV.Strings.NOT_EXISTS
    filterStatus: number = SV.NOT_EXISTS
    filterOriginSiteId: number = SV.NOT_EXISTS
    filterDestinationSiteId: number = SV.NOT_EXISTS
    filterDateOfShipment: number = SV.NOT_EXISTS
    filterDateOfArrival: number = SV.NOT_EXISTS
    sortBy: number = SV.NOT_EXISTS

    getSortColumn(): number | null {
        switch (Math.abs(this.sortBy)) {
            case ShipmentFilter.S_SORT_BY_ID:
                return ShipmentModelH.P_SHIPMENT_ID;
            case ShipmentFilter.S_SORT_BY_NAME:
                return ShipmentModelH.P_SHIPMENT_NAME;
            case ShipmentFilter.S_SORT_BY_STATUS:
                return ShipmentModelH.P_SHIPMENT_STATUS;
            case ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID:
                return ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID;
            case ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID:
                return ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID;
            default:
                return null;
        }
    }

    getSortOrder(): string {
        return this.sortBy > 0 ? DatabaseWhere.ORDER_DIRECTION_ASC : DatabaseWhere.ORDER_DIRECTION_DESC;
    }
}