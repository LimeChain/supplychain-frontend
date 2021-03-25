export default class ShipmentModel {

    shipmentId: number
    shipmentConsignmentNumber: string
    shipmentName: string
    shipmentStatus: number
    shipmentOriginSiteId: number
    shipmentDestinationSiteId: number
    shipmentDateOfShipment: number
    shipmentDateOfArrival: number
    shipmentDltProof: string
    shipmentHash: string
    shipmentDeleted: number

    primaryValueInInsert: boolean = true

}
