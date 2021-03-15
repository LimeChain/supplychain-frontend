export default class ShipmentModel {
    static S_STATUS_DRAFT: number;
    static S_STATUS_IN_TRANSIT: number;
    static S_STATUS_RECEIVED: number;

    shipmentId: number
    shipmentConsignmentNumber: string
    shipmentName: string
    shipmentStatus: number
    shipmentOriginSiteId: number
    shipmentDestinationSiteId: number
    shipmentDateOfShipment: number
    shipmentDateOfArrival: number
    shipmentDltAnchored: number
    shipmentDltProof: string
    shipmentDeleted: number

}
