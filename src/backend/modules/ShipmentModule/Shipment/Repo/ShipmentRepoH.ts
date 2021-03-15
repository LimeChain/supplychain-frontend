export default class ShipmentRepoH {

    static TABLE_NAME = 'shipments';
    static C_S__S_T_A_T_U_S__D_R_A_F_T = 'S_STATUS_DRAFT';
    static C_S__S_T_A_T_U_S__I_N__T_R_A_N_S_I_T = 'S_STATUS_IN_TRANSIT';
    static C_S__S_T_A_T_U_S__R_E_C_E_I_V_E_D = 'S_STATUS_RECEIVED';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_SHIPMENT_CONSIGNMENT_NUMBER = 'shipmentConsignmentNumber';
    static C_SHIPMENT_NAME = 'shipmentName';
    static C_SHIPMENT_STATUS = 'shipmentStatus';
    static C_SHIPMENT_ORIGIN_SITE_ID = 'shipmentOriginSiteId';
    static C_SHIPMENT_DESTINATION_SITE_ID = 'shipmentDestinationSiteId';
    static C_SHIPMENT_DATE_OF_SHIPMENT = 'shipmentDateOfShipment';
    static C_SHIPMENT_DATE_OF_ARRIVAL = 'shipmentDateOfArrival';
    static C_SHIPMENT_DLT_ANCHORED = 'shipmentDltAnchored';
    static C_SHIPMENT_DLT_PROOF = 'shipmentDltProof';
    static C_SHIPMENT_DELETED = 'shipmentDeleted';
        
    s_STATUS_DRAFT: number | null;
    s_STATUS_DRAFTToDb: boolean;
    s_STATUS_IN_TRANSIT: number | null;
    s_STATUS_IN_TRANSITToDb: boolean;
    s_STATUS_RECEIVED: number | null;
    s_STATUS_RECEIVEDToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    shipmentConsignmentNumber: string | null;
    shipmentConsignmentNumberToDb: boolean;
    shipmentName: string | null;
    shipmentNameToDb: boolean;
    shipmentStatus: number | null;
    shipmentStatusToDb: boolean;
    shipmentOriginSiteId: number | null;
    shipmentOriginSiteIdToDb: boolean;
    shipmentDestinationSiteId: number | null;
    shipmentDestinationSiteIdToDb: boolean;
    shipmentDateOfShipment: number | null;
    shipmentDateOfShipmentToDb: boolean;
    shipmentDateOfArrival: number | null;
    shipmentDateOfArrivalToDb: boolean;
    shipmentDltAnchored: number | null;
    shipmentDltAnchoredToDb: boolean;
    shipmentDltProof: string | null;
    shipmentDltProofToDb: boolean;
    shipmentDeleted: number | null;
    shipmentDeletedToDb: boolean;
    
    constructor() {
        this.s_STATUS_DRAFT = null;
        this.s_STATUS_DRAFTToDb = false;
        this.s_STATUS_IN_TRANSIT = null;
        this.s_STATUS_IN_TRANSITToDb = false;
        this.s_STATUS_RECEIVED = null;
        this.s_STATUS_RECEIVEDToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
        this.shipmentConsignmentNumber = null;
        this.shipmentConsignmentNumberToDb = false;
        this.shipmentName = null;
        this.shipmentNameToDb = false;
        this.shipmentStatus = null;
        this.shipmentStatusToDb = false;
        this.shipmentOriginSiteId = null;
        this.shipmentOriginSiteIdToDb = false;
        this.shipmentDestinationSiteId = null;
        this.shipmentDestinationSiteIdToDb = false;
        this.shipmentDateOfShipment = null;
        this.shipmentDateOfShipmentToDb = false;
        this.shipmentDateOfArrival = null;
        this.shipmentDateOfArrivalToDb = false;
        this.shipmentDltAnchored = null;
        this.shipmentDltAnchoredToDb = false;
        this.shipmentDltProof = null;
        this.shipmentDltProofToDb = false;
        this.shipmentDeleted = null;
        this.shipmentDeletedToDb = false;
    }
    
    static instanceByDbRow(row): ShipmentRepoH {
        const repo = new ShipmentRepoH();
    
        repo.s_STATUS_DRAFT = row[ShipmentRepoH.C_S__S_T_A_T_U_S__D_R_A_F_T] ?? repo.s_STATUS_DRAFT;
        repo.s_STATUS_IN_TRANSIT = row[ShipmentRepoH.C_S__S_T_A_T_U_S__I_N__T_R_A_N_S_I_T] ?? repo.s_STATUS_IN_TRANSIT;
        repo.s_STATUS_RECEIVED = row[ShipmentRepoH.C_S__S_T_A_T_U_S__R_E_C_E_I_V_E_D] ?? repo.s_STATUS_RECEIVED;
        repo.shipmentId = row[ShipmentRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.shipmentConsignmentNumber = row[ShipmentRepoH.C_SHIPMENT_CONSIGNMENT_NUMBER] ?? repo.shipmentConsignmentNumber;
        repo.shipmentName = row[ShipmentRepoH.C_SHIPMENT_NAME] ?? repo.shipmentName;
        repo.shipmentStatus = row[ShipmentRepoH.C_SHIPMENT_STATUS] ?? repo.shipmentStatus;
        repo.shipmentOriginSiteId = row[ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID] ?? repo.shipmentOriginSiteId;
        repo.shipmentDestinationSiteId = row[ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID] ?? repo.shipmentDestinationSiteId;
        repo.shipmentDateOfShipment = row[ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT] ?? repo.shipmentDateOfShipment;
        repo.shipmentDateOfArrival = row[ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL] ?? repo.shipmentDateOfArrival;
        repo.shipmentDltAnchored = row[ShipmentRepoH.C_SHIPMENT_DLT_ANCHORED] ?? repo.shipmentDltAnchored;
        repo.shipmentDltProof = row[ShipmentRepoH.C_SHIPMENT_DLT_PROOF] ?? repo.shipmentDltProof;
        repo.shipmentDeleted = row[ShipmentRepoH.C_SHIPMENT_DELETED] ?? repo.shipmentDeleted;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.s_STATUS_DRAFT;
    }

    setPrimaryValue(value: number): void {
        this.s_STATUS_DRAFT = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.s_STATUS_IN_TRANSITToDb === true) {
            columns.push(ShipmentRepoH.C_S__S_T_A_T_U_S__I_N__T_R_A_N_S_I_T);
            values.push(this.s_STATUS_IN_TRANSIT === null ? null : this.s_STATUS_IN_TRANSIT.toString());
        }

        if (this.s_STATUS_RECEIVEDToDb === true) {
            columns.push(ShipmentRepoH.C_S__S_T_A_T_U_S__R_E_C_E_I_V_E_D);
            values.push(this.s_STATUS_RECEIVED === null ? null : this.s_STATUS_RECEIVED.toString());
        }

        if (this.shipmentIdToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_ID);
            values.push(this.shipmentId === null ? null : this.shipmentId.toString());
        }

        if (this.shipmentConsignmentNumberToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_CONSIGNMENT_NUMBER);
            values.push(this.shipmentConsignmentNumber === null ? null : this.shipmentConsignmentNumber.toString());
        }

        if (this.shipmentNameToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_NAME);
            values.push(this.shipmentName === null ? null : this.shipmentName.toString());
        }

        if (this.shipmentStatusToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_STATUS);
            values.push(this.shipmentStatus === null ? null : this.shipmentStatus.toString());
        }

        if (this.shipmentOriginSiteIdToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID);
            values.push(this.shipmentOriginSiteId === null ? null : this.shipmentOriginSiteId.toString());
        }

        if (this.shipmentDestinationSiteIdToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID);
            values.push(this.shipmentDestinationSiteId === null ? null : this.shipmentDestinationSiteId.toString());
        }

        if (this.shipmentDateOfShipmentToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT);
            values.push(this.shipmentDateOfShipment === null ? null : this.shipmentDateOfShipment.toString());
        }

        if (this.shipmentDateOfArrivalToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL);
            values.push(this.shipmentDateOfArrival === null ? null : this.shipmentDateOfArrival.toString());
        }

        if (this.shipmentDltAnchoredToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DLT_ANCHORED);
            values.push(this.shipmentDltAnchored === null ? null : this.shipmentDltAnchored.toString());
        }

        if (this.shipmentDltProofToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DLT_PROOF);
            values.push(this.shipmentDltProof === null ? null : this.shipmentDltProof.toString());
        }

        if (this.shipmentDeletedToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DELETED);
            values.push(this.shipmentDeleted === null ? null : this.shipmentDeleted.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [ShipmentRepoH.C_S__S_T_A_T_U_S__D_R_A_F_T, this.s_STATUS_DRAFT];
    }

}
