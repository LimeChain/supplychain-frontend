import ShipmentDocumentModel from './ShipmentDocumentModel';
import ShipmentDocumentModelH from './ShipmentDocumentModelH';
import ShipmentDocumentRepoH from '../Repo/ShipmentDocumentRepoH';
import SV from '../../../../utilities/SV';


export default class ShipmentDocumentModelG extends ShipmentDocumentModelH {

    constructor() {
        super();
        this.shipmentDocumentId = SV.NOT_EXISTS;
        this.shipmentId = SV.NOT_EXISTS;
        this.documentId = SV.NOT_EXISTS;
        this.documentType = SV.NOT_EXISTS;
        this.shipmentDocumentUrl = SV.Strings.EMPTY;
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
        if (map.has(ShipmentDocumentModelH.P_DOCUMENT_ID) === true && this.documentId !== undefined) {
            repo.documentId = this.documentId;
            repo.documentIdToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_DOCUMENT_TYPE) === true && this.documentType !== undefined) {
            repo.documentType = this.documentType;
            repo.documentTypeToDb = true;
        }
        if (map.has(ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL) === true && this.shipmentDocumentUrl !== undefined) {
            repo.shipmentDocumentUrl = this.shipmentDocumentUrl;
            repo.shipmentDocumentUrlToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: ShipmentDocumentRepoH): ShipmentDocumentModel {
        const model = new ShipmentDocumentModel();

        model.shipmentDocumentId = parseInt((repo.shipmentDocumentId ?? model.shipmentDocumentId) as unknown as string);
        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);
        model.documentId = parseInt((repo.documentId ?? model.documentId) as unknown as string);
        model.documentType = parseInt((repo.documentType ?? model.documentType) as unknown as string);
        model.shipmentDocumentUrl = repo.shipmentDocumentUrl ?? model.shipmentDocumentUrl;

        return model;
    }
        

    toNetwork(): any {
        return {
            shipmentDocumentId: this.shipmentDocumentId,
            shipmentId: this.shipmentId,
            documentId: this.documentId,
            documentType: this.documentType,
            shipmentDocumentUrl: this.shipmentDocumentUrl,
        };
    }

    static fromNetwork(json: any): ShipmentDocumentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentDocumentModel();
        
        model.shipmentDocumentId = parseInt(json.shipmentDocumentId ?? model.shipmentDocumentId);
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.documentId = parseInt(json.documentId ?? model.documentId);
        model.documentType = parseInt(json.documentType ?? model.documentType);
        model.shipmentDocumentUrl = json.shipmentDocumentUrl ?? model.shipmentDocumentUrl;

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_ID:
                return ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID;
            case ShipmentDocumentModelH.P_SHIPMENT_ID:
                return ShipmentDocumentRepoH.C_SHIPMENT_ID;
            case ShipmentDocumentModelH.P_DOCUMENT_ID:
                return ShipmentDocumentRepoH.C_DOCUMENT_ID;
            case ShipmentDocumentModelH.P_DOCUMENT_TYPE:
                return ShipmentDocumentRepoH.C_DOCUMENT_TYPE;
            case ShipmentDocumentModelH.P_SHIPMENT_DOCUMENT_URL:
                return ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL;
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
