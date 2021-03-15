export default class ShipmentDocumentRepoH {

    static TABLE_NAME = 'shipment_documents';
    static C_SHIPMENT_DOCUMENT_ID = 'shipmentDocumentId';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_DOCUMENT_TYPE = 'documentType';
    static C_MIME_TYPE = 'mimeType';
    static C_SHIPMENT_DOCUMENT_URL = 'shipmentDocumentUrl';
    static C_SIZE_IN_BYTES = 'sizeInBytes';
    static C_NAME = 'name';
    static C_UPLOAD_PROGRESS = 'uploadProgress';
        
    shipmentDocumentId: number | null;
    shipmentDocumentIdToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    documentType: number | null;
    documentTypeToDb: boolean;
    mimeType: string | null;
    mimeTypeToDb: boolean;
    shipmentDocumentUrl: string | null;
    shipmentDocumentUrlToDb: boolean;
    sizeInBytes: number | null;
    sizeInBytesToDb: boolean;
    name: string | null;
    nameToDb: boolean;
    uploadProgress: number | null;
    uploadProgressToDb: boolean;
    
    constructor() {
        this.shipmentDocumentId = null;
        this.shipmentDocumentIdToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
        this.documentType = null;
        this.documentTypeToDb = false;
        this.mimeType = null;
        this.mimeTypeToDb = false;
        this.shipmentDocumentUrl = null;
        this.shipmentDocumentUrlToDb = false;
        this.sizeInBytes = null;
        this.sizeInBytesToDb = false;
        this.name = null;
        this.nameToDb = false;
        this.uploadProgress = null;
        this.uploadProgressToDb = false;
    }
    
    static instanceByDbRow(row): ShipmentDocumentRepoH {
        const repo = new ShipmentDocumentRepoH();
    
        repo.shipmentDocumentId = row[ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID] ?? repo.shipmentDocumentId;
        repo.shipmentId = row[ShipmentDocumentRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.documentType = row[ShipmentDocumentRepoH.C_DOCUMENT_TYPE] ?? repo.documentType;
        repo.mimeType = row[ShipmentDocumentRepoH.C_MIME_TYPE] ?? repo.mimeType;
        repo.shipmentDocumentUrl = row[ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL] ?? repo.shipmentDocumentUrl;
        repo.sizeInBytes = row[ShipmentDocumentRepoH.C_SIZE_IN_BYTES] ?? repo.sizeInBytes;
        repo.name = row[ShipmentDocumentRepoH.C_NAME] ?? repo.name;
        repo.uploadProgress = row[ShipmentDocumentRepoH.C_UPLOAD_PROGRESS] ?? repo.uploadProgress;

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

        if (this.mimeTypeToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_MIME_TYPE);
            values.push(this.mimeType === null ? null : this.mimeType.toString());
        }

        if (this.shipmentDocumentUrlToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL);
            values.push(this.shipmentDocumentUrl === null ? null : this.shipmentDocumentUrl.toString());
        }

        if (this.sizeInBytesToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_SIZE_IN_BYTES);
            values.push(this.sizeInBytes === null ? null : this.sizeInBytes.toString());
        }

        if (this.nameToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_NAME);
            values.push(this.name === null ? null : this.name.toString());
        }

        if (this.uploadProgressToDb === true) {
            columns.push(ShipmentDocumentRepoH.C_UPLOAD_PROGRESS);
            values.push(this.uploadProgress === null ? null : this.uploadProgress.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID, this.shipmentDocumentId];
    }

}
