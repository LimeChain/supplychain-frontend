export default class ShipmentDocumentRepoH {

    static TABLE_NAME = 'shipment_documents';
    static C_SHIPMENT_DOCUMENT_ID = 'shipmentDocumentId';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_DOCUMENT_TYPE = 'documentType';
    static C_SHIPMENT_DOCUMENT_URL = 'shipmentDocumentUrl';
        
    shipmentDocumentId: number | null;
    shipmentDocumentIdToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    documentType: number | null;
    documentTypeToDb: boolean;
    shipmentDocumentUrl: string | null;
    shipmentDocumentUrlToDb: boolean;
    
    constructor() {
        this.shipmentDocumentId = null;
        this.shipmentDocumentIdToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
        this.documentType = null;
        this.documentTypeToDb = false;
        this.shipmentDocumentUrl = null;
        this.shipmentDocumentUrlToDb = false;
    }
    
    static instanceByDbRow(row): ShipmentDocumentRepoH {
        const repo = new ShipmentDocumentRepoH();
    
        repo.shipmentDocumentId = row[ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID] ?? repo.shipmentDocumentId;
        repo.shipmentId = row[ShipmentDocumentRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.documentType = row[ShipmentDocumentRepoH.C_DOCUMENT_TYPE] ?? repo.documentType;
        repo.shipmentDocumentUrl = row[ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL] ?? repo.shipmentDocumentUrl;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.shipmentDocumentId;
    }

    setPrimaryValue(value: number): void {
        this.shipmentDocumentId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.shipmentIdToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_SHIPMENT_ID);
            values.push(this.shipmentId === null ? null : this.shipmentId.toString());
        }

        if (this.documentTypeToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_DOCUMENT_TYPE);
            values.push(this.documentType === null ? null : this.documentType.toString());
        }

        if (this.shipmentDocumentUrlToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL);
            values.push(this.shipmentDocumentUrl === null ? null : this.shipmentDocumentUrl.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID, this.shipmentDocumentId];
    }

}
