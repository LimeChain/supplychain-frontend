
export default class ShipmentModel {

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


    static S_STATUS_DRAFT: number = 1;
    static S_STATUS_IN_TRANSIT: number = 2;
    static S_STATUS_RECEIVED: number = 3;
}