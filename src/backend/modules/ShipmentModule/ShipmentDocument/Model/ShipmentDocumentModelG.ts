import ShipmentDocumentModel from './ShipmentDocumentModel';
import ShipmentDocumentModelH from './ShipmentDocumentModelH';
import ShipmentDocumentRepoH from '../Repo/ShipmentDocumentRepoH';
import SV from '../../../../utilities/SV';


export default class ShipmentDocumentModelG extends ShipmentDocumentModelH {

    constructor() {
        super();
        this.shipmentDocumentId = SV.NOT_EXISTS;
        this.shipmentId = SV.NOT_EXISTS;
        this.documentType = SV.NOT_EXISTS;
        this.mimeType = SV.Strings.EMPTY;
        this.shipmentDocumentUrl = SV.Strings.EMPTY;
        this.sizeInBytes = SV.NOT_EXISTS;
        this.name = SV.Strings.EMPTY;
        this.uploadProgress = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: ShipmentDocumentModel): void {

    }

    static asMap(models: ShipmentDocumentModel[]): Map < any, ShipmentDocumentModel > {
        const map = new Map < any, ShipmentDocumentModel >();

        models.forEach((m) => {
            map.set(m.shipmentDocumentId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): ShipmentDocumentRepoH {
        const map = ShipmentDocumentModelG.getPropsAsMap(props);

        const repo = new ShipmentDocumentRepoH();

        if (map.has(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID) === true && this.shipmentDocumentId !== undefined) {
            repo.shipmentDocumentId = this.shipmentDocumentId;
            repo.shipmentDocumentIdToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_SHIPMENT_ID) === true && this.shipmentId !== undefined) {
            repo.shipmentId = this.shipmentId;
            repo.shipmentIdToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_DOCUMENT_TYPE) === true && this.documentType !== undefined) {
            repo.documentType = this.documentType;
            repo.documentTypeToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_MIME_TYPE) === true && this.mimeType !== undefined) {
            repo.mimeType = this.mimeType;
            repo.mimeTypeToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL) === true && this.shipmentDocumentUrl !== undefined) {
            repo.shipmentDocumentUrl = this.shipmentDocumentUrl;
            repo.shipmentDocumentUrlToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_SIZE_IN_BYTES) === true && this.sizeInBytes !== undefined) {
            repo.sizeInBytes = this.sizeInBytes;
            repo.sizeInBytesToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_NAME) === true && this.name !== undefined) {
            repo.name = this.name;
            repo.nameToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_UPLOAD_PROGRESS) === true && this.uploadProgress !== undefined) {
            repo.uploadProgress = this.uploadProgress;
            repo.uploadProgressToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: ShipmentDocumentRepoH): ShipmentDocumentModel {
        const model = new ShipmentDocumentModel();

        model.shipmentDocumentId = parseInt((repo.shipmentDocumentId ?? model.shipmentDocumentId) as unknown as string);
        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);
        model.documentType = parseInt((repo.documentType ?? model.documentType) as unknown as string);
        model.mimeType = repo.mimeType ?? model.mimeType;
        model.shipmentDocumentUrl = repo.shipmentDocumentUrl ?? model.shipmentDocumentUrl;
        model.sizeInBytes = parseInt((repo.sizeInBytes ?? model.sizeInBytes) as unknown as string);
        model.name = repo.name ?? model.name;
        model.uploadProgress = parseInt((repo.uploadProgress ?? model.uploadProgress) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            shipmentDocumentId: this.shipmentDocumentId,
            shipmentId: this.shipmentId,
            documentType: this.documentType,
            mimeType: this.mimeType,
            shipmentDocumentUrl: this.shipmentDocumentUrl,
            sizeInBytes: this.sizeInBytes,
            name: this.name,
            uploadProgress: this.uploadProgress,
        };
    }

    static fromNetwork(json: any): ShipmentDocumentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentDocumentModel();
        
        model.shipmentDocumentId = parseInt(json.shipmentDocumentId ?? model.shipmentDocumentId);
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.documentType = parseInt(json.documentType ?? model.documentType);
        model.mimeType = json.mimeType ?? model.mimeType;
        model.shipmentDocumentUrl = json.shipmentDocumentUrl ?? model.shipmentDocumentUrl;
        model.sizeInBytes = parseInt(json.sizeInBytes ?? model.sizeInBytes);
        model.name = json.name ?? model.name;
        model.uploadProgress = parseInt(json.uploadProgress ?? model.uploadProgress);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID:
                return ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID;
            case ShipmentDocumentModelH.P_SHIPMENT_ID:
                return ShipmentDocumentRepoH.C_SHIPMENT_ID;
            case ShipmentDocumentModelH.P_DOCUMENT_TYPE:
                return ShipmentDocumentRepoH.C_DOCUMENT_TYPE;
            case ShipmentDocumentModelH.P_MIME_TYPE:
                return ShipmentDocumentRepoH.C_MIME_TYPE;
            case ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL:
                return ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL;
            case ShipmentDocumentModelH.P_SIZE_IN_BYTES:
                return ShipmentDocumentRepoH.C_SIZE_IN_BYTES;
            case ShipmentDocumentModelH.P_NAME:
                return ShipmentDocumentRepoH.C_NAME;
            case ShipmentDocumentModelH.P_UPLOAD_PROGRESS:
                return ShipmentDocumentRepoH.C_UPLOAD_PROGRESS;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? ShipmentDocumentModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
