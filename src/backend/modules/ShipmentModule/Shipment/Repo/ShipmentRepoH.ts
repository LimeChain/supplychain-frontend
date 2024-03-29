export default class ShipmentRepoH {

    static TABLE_NAME = 'shipments';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_SHIPMENT_CONSIGNMENT_NUMBER = 'shipmentConsignmentNumber';
    static C_SHIPMENT_NAME = 'shipmentName';
    static C_SHIPMENT_STATUS = 'shipmentStatus';
    static C_SHIPMENT_ORIGIN_SITE_ID = 'shipmentOriginSiteId';
    static C_SHIPMENT_DESTINATION_SITE_ID = 'shipmentDestinationSiteId';
    static C_SHIPMENT_DATE_OF_SHIPMENT = 'shipmentDateOfShipment';
    static C_SHIPMENT_DATE_OF_ARRIVAL = 'shipmentDateOfArrival';
    static C_SHIPMENT_DLT_PROOF = 'shipmentDltProof';
    static C_SHIPMENT_HASH = 'shipmentHash';
    static C_SHIPMENT_DELETED = 'shipmentDeleted';
        
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
    shipmentDltProof: string | null;
    shipmentDltProofToDb: boolean;
    shipmentHash: string | null;
    shipmentHashToDb: boolean;
    shipmentDeleted: number | null;
    shipmentDeletedToDb: boolean;
    
    constructor() {
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
        this.shipmentDltProof = null;
        this.shipmentDltProofToDb = false;
        this.shipmentHash = null;
        this.shipmentHashToDb = false;
        this.shipmentDeleted = null;
        this.shipmentDeletedToDb = false;
    }
    
    static instanceByDbRow(row): ShipmentRepoH {
        const repo = new ShipmentRepoH();
    
        repo.shipmentId = row[ShipmentRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.shipmentConsignmentNumber = row[ShipmentRepoH.C_SHIPMENT_CONSIGNMENT_NUMBER] ?? repo.shipmentConsignmentNumber;
        repo.shipmentName = row[ShipmentRepoH.C_SHIPMENT_NAME] ?? repo.shipmentName;
        repo.shipmentStatus = row[ShipmentRepoH.C_SHIPMENT_STATUS] ?? repo.shipmentStatus;
        repo.shipmentOriginSiteId = row[ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID] ?? repo.shipmentOriginSiteId;
        repo.shipmentDestinationSiteId = row[ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID] ?? repo.shipmentDestinationSiteId;
        repo.shipmentDateOfShipment = row[ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT] ?? repo.shipmentDateOfShipment;
        repo.shipmentDateOfArrival = row[ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL] ?? repo.shipmentDateOfArrival;
        repo.shipmentDltProof = row[ShipmentRepoH.C_SHIPMENT_DLT_PROOF] ?? repo.shipmentDltProof;
        repo.shipmentHash = row[ShipmentRepoH.C_SHIPMENT_HASH] ?? repo.shipmentHash;
        repo.shipmentDeleted = row[ShipmentRepoH.C_SHIPMENT_DELETED] ?? repo.shipmentDeleted;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.shipmentId;
    }

    setPrimaryValue(value: number): void {
        this.shipmentId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return this.getPrimaryValue();
    }

    getDbPairs() {
        const columns = [];
        const values = [];

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

        if (this.shipmentDltProofToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DLT_PROOF);
            values.push(this.shipmentDltProof === null ? null : this.shipmentDltProof.toString());
        }

        if (this.shipmentHashToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_HASH);
            values.push(this.shipmentHash === null ? null : this.shipmentHash.toString());
        }

        if (this.shipmentDeletedToDb === true) {
            columns.push(ShipmentRepoH.C_SHIPMENT_DELETED);
            values.push(this.shipmentDeleted === null ? null : this.shipmentDeleted.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [ShipmentRepoH.C_SHIPMENT_ID, this.shipmentId];
    }

}
