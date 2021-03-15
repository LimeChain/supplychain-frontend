
            
export default class ShipmentModelH {



    static P_S__S_T_A_T_U_S__D_R_A_F_T = 1;
    static P_S__S_T_A_T_U_S__I_N__T_R_A_N_S_I_T = 2;
    static P_S__S_T_A_T_U_S__R_E_C_E_I_V_E_D = 3;
    static P_SHIPMENT_ID = 4;
    static P_SHIPMENT_CONSIGNMENT_NUMBER = 5;
    static P_SHIPMENT_NAME = 6;
    static P_SHIPMENT_STATUS = 7;
    static P_SHIPMENT_ORIGIN_SITE_ID = 8;
    static P_SHIPMENT_DESTINATION_SITE_ID = 9;
    static P_SHIPMENT_DATE_OF_SHIPMENT = 10;
    static P_SHIPMENT_DATE_OF_ARRIVAL = 11;
    static P_SHIPMENT_DLT_ANCHORED = 12;
    static P_SHIPMENT_DLT_PROOF = 13;
    static P_SHIPMENT_DELETED = 14;
    static PROPERTIES = [ShipmentModelH.P_S__S_T_A_T_U_S__D_R_A_F_T,
        ShipmentModelH.P_S__S_T_A_T_U_S__I_N__T_R_A_N_S_I_T,
        ShipmentModelH.P_S__S_T_A_T_U_S__R_E_C_E_I_V_E_D,
        ShipmentModelH.P_SHIPMENT_ID,
        ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER,
        ShipmentModelH.P_SHIPMENT_NAME,
        ShipmentModelH.P_SHIPMENT_STATUS,
        ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID,
        ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT,
        ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL,
        ShipmentModelH.P_SHIPMENT_DLT_ANCHORED,
        ShipmentModelH.P_SHIPMENT_DLT_PROOF,
        ShipmentModelH.P_SHIPMENT_DELETED];

    s_STATUS_DRAFT: number;
    s_STATUS_IN_TRANSIT: number;
    s_STATUS_RECEIVED: number;
    shipmentId: number;
    shipmentConsignmentNumber: string;
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
