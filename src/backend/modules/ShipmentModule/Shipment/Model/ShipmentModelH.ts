
            
export default class ShipmentModelH {

    static primaryValueInInsert = true;

    static P_SHIPMENT_ID = 1;
    static P_SHIPMENT_CONSIGNMENT_NUMBER = 2;
    static P_SHIPMENT_NAME = 3;
    static P_SHIPMENT_STATUS = 4;
    static P_SHIPMENT_ORIGIN_SITE_ID = 5;
    static P_SHIPMENT_DESTINATION_SITE_ID = 6;
    static P_SHIPMENT_DATE_OF_SHIPMENT = 7;
    static P_SHIPMENT_DATE_OF_ARRIVAL = 8;
    static P_SHIPMENT_DLT_PROOF = 9;
    static P_SHIPMENT_HASH = 10;
    static P_SHIPMENT_DELETED = 11;
    static PROPERTIES = [ShipmentModelH.P_SHIPMENT_ID,
        ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER,
        ShipmentModelH.P_SHIPMENT_NAME,
        ShipmentModelH.P_SHIPMENT_STATUS,
        ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT,
        ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL,
        ShipmentModelH.P_SHIPMENT_DLT_PROOF,
        ShipmentModelH.P_SHIPMENT_HASH,
        ShipmentModelH.P_SHIPMENT_DELETED];

    shipmentId: number;
    shipmentConsignmentNumber: string;
    shipmentName: string;
    shipmentStatus: number;
    shipmentOriginSiteId: number;
    shipmentDestinationSiteId: number;
    shipmentDateOfShipment: number;
    shipmentDateOfArrival: number;
    shipmentDltProof: string;
    shipmentHash: string;
    shipmentDeleted: number;

}
