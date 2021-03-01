
            
export default class ShipmentModelH {

    static S_STATUS_DRAFT = 1;
    static S_STATUS_IN_TRANSIT = 2;
    static S_STATUS_RECEIVED = 3;

    static P_SHIPMENT_ID = 1;
    static P_SHIPMENT_NAME = 2;
    static P_SHIPMENT_STATUS = 3;
    static P_SHIPMENT_ORIGIN_SITE_ID = 4;
    static P_SHIPMENT_DESTINATION_SITE_ID = 5;
    static P_SHIPMENT_DATE_OF_SHIPMENT = 6;
    static P_SHIPMENT_DATE_OF_ARRIVAL = 7;
    static P_SHIPMENT_DLT_ANCHORED = 8;
    static P_SHIPMENT_DLT_PROOF = 9;
    static P_SHIPMENT_DELETED = 10;
    static PROPERTIES = [ShipmentModelH.P_SHIPMENT_ID,
        ShipmentModelH.P_SHIPMENT_NAME,
        ShipmentModelH.P_SHIPMENT_STATUS,
        ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT,
        ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL,
        ShipmentModelH.P_SHIPMENT_DLT_ANCHORED,
        ShipmentModelH.P_SHIPMENT_DLT_PROOF,
        ShipmentModelH.P_SHIPMENT_DELETED];

    shipmentId: number;
    shipmentName: string;
    shipmentStatus: number;
    shipmentOriginSiteId: number;
    shipmentDestinationSiteId: number;
    shipmentDateOfShipment: number;
    shipmentDateOfArrival: number;
    shipmentDltAnchored: number;
    shipmentDltProof: string;
    shipmentDeleted: number;

}
