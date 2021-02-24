import ShipmentModel from './ShipmentModel';
import ShipmentModelH from './ShipmentModelH';
import ShipmentRepoH from '../Repo/ShipmentRepoH';
import SV from '../../../../utilities/SV';
import ShipmentDocumentModel from '../../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';

export default class ShipmentModelG extends ShipmentModelH {

    constructor() {
        super();
        this.shipmentId = SV.NOT_EXISTS;
        this.shipmentName = SV.Strings.EMPTY;
        this.shipmentStatus = SV.NOT_EXISTS;
        this.shipmentOriginSiteId = SV.NOT_EXISTS;
        this.shipmentDestinationSiteId = SV.NOT_EXISTS;
        this.shipmentDateOfShipment = SV.NOT_EXISTS;
        this.shipmentDateOfArrival = SV.NOT_EXISTS;
        this.shipmentDltAnchored = SV.NOT_EXISTS;
        this.shipmentDltProof = SV.Strings.EMPTY;
        this.shipmentDeleted = SV.NOT_EXISTS;
        this.test = [];
    }

    copyRefProperties(sourceModel: ShipmentModel): void {
        this.test = sourceModel.test;
    }

    static asMap(models: ShipmentModel[]): Map < any, ShipmentModel > {
        const map = new Map < any, ShipmentModel >();

        models.forEach((m) => {
            map.set(m.shipmentId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): ShipmentRepoH {
        const map = ShipmentModelG.getPropsAsMap(props);

        const repo = new ShipmentRepoH();

        if (map.has(ShipmentModelH.P_SHIPMENT_ID) === true && this.shipmentId !== undefined) {
            repo.shipmentId = this.shipmentId;
            repo.shipmentIdToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_NAME) === true && this.shipmentName !== undefined) {
            repo.shipmentName = this.shipmentName;
            repo.shipmentNameToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_STATUS) === true && this.shipmentStatus !== undefined) {
            repo.shipmentStatus = this.shipmentStatus;
            repo.shipmentStatusToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID) === true && this.shipmentOriginSiteId !== undefined) {
            repo.shipmentOriginSiteId = this.shipmentOriginSiteId;
            repo.shipmentOriginSiteIdToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID) === true && this.shipmentDestinationSiteId !== undefined) {
            repo.shipmentDestinationSiteId = this.shipmentDestinationSiteId;
            repo.shipmentDestinationSiteIdToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT) === true && this.shipmentDateOfShipment !== undefined) {
            repo.shipmentDateOfShipment = this.shipmentDateOfShipment;
            repo.shipmentDateOfShipmentToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL) === true && this.shipmentDateOfArrival !== undefined) {
            repo.shipmentDateOfArrival = this.shipmentDateOfArrival;
            repo.shipmentDateOfArrivalToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DLT_ANCHORED) === true && this.shipmentDltAnchored !== undefined) {
            repo.shipmentDltAnchored = this.shipmentDltAnchored;
            repo.shipmentDltAnchoredToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DLT_PROOF) === true && this.shipmentDltProof !== undefined) {
            repo.shipmentDltProof = this.shipmentDltProof;
            repo.shipmentDltProofToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_DELETED) === true && this.shipmentDeleted !== undefined) {
            repo.shipmentDeleted = this.shipmentDeleted;
            repo.shipmentDeletedToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: ShipmentRepoH): ShipmentModel {
        const model = new ShipmentModel();

        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);
        model.shipmentName = repo.shipmentName ?? model.shipmentName;
        model.shipmentStatus = parseInt((repo.shipmentStatus ?? model.shipmentStatus) as unknown as string);
        model.shipmentOriginSiteId = parseInt((repo.shipmentOriginSiteId ?? model.shipmentOriginSiteId) as unknown as string);
        model.shipmentDestinationSiteId = parseInt((repo.shipmentDestinationSiteId ?? model.shipmentDestinationSiteId) as unknown as string);
        model.shipmentDateOfShipment = parseInt((repo.shipmentDateOfShipment ?? model.shipmentDateOfShipment) as unknown as string);
        model.shipmentDateOfArrival = parseInt((repo.shipmentDateOfArrival ?? model.shipmentDateOfArrival) as unknown as string);
        model.shipmentDltAnchored = parseInt((repo.shipmentDltAnchored ?? model.shipmentDltAnchored) as unknown as string);
        model.shipmentDltProof = repo.shipmentDltProof ?? model.shipmentDltProof;
        model.shipmentDeleted = parseInt((repo.shipmentDeleted ?? model.shipmentDeleted) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            shipmentId: this.shipmentId,
            shipmentName: this.shipmentName,
            shipmentStatus: this.shipmentStatus,
            shipmentOriginSiteId: this.shipmentOriginSiteId,
            shipmentDestinationSiteId: this.shipmentDestinationSiteId,
            shipmentDateOfShipment: this.shipmentDateOfShipment,
            shipmentDateOfArrival: this.shipmentDateOfArrival,
            shipmentDltAnchored: this.shipmentDltAnchored,
            shipmentDltProof: this.shipmentDltProof,
            shipmentDeleted: this.shipmentDeleted,
            test: this.test.map((m) => {
                return m.toNetwork();
            }),
        };
    }

    static fromNetwork(json: any): ShipmentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentModel();
        
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.shipmentName = json.shipmentName ?? model.shipmentName;
        model.shipmentStatus = parseInt(json.shipmentStatus ?? model.shipmentStatus);
        model.shipmentOriginSiteId = parseInt(json.shipmentOriginSiteId ?? model.shipmentOriginSiteId);
        model.shipmentDestinationSiteId = parseInt(json.shipmentDestinationSiteId ?? model.shipmentDestinationSiteId);
        model.shipmentDateOfShipment = parseInt(json.shipmentDateOfShipment ?? model.shipmentDateOfShipment);
        model.shipmentDateOfArrival = parseInt(json.shipmentDateOfArrival ?? model.shipmentDateOfArrival);
        model.shipmentDltAnchored = parseInt(json.shipmentDltAnchored ?? model.shipmentDltAnchored);
        model.shipmentDltProof = json.shipmentDltProof ?? model.shipmentDltProof;
        model.shipmentDeleted = parseInt(json.shipmentDeleted ?? model.shipmentDeleted);
        (json.test ?? model.test).map((j) => {
            return ShipmentDocumentModel.fromNetwork(j);
        });

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case ShipmentModelH.P_SHIPMENT_ID:
                return ShipmentRepoH.C_SHIPMENT_ID;
            case ShipmentModelH.P_SHIPMENT_NAME:
                return ShipmentRepoH.C_SHIPMENT_NAME;
            case ShipmentModelH.P_SHIPMENT_STATUS:
                return ShipmentRepoH.C_SHIPMENT_STATUS;
            case ShipmentModelH.P_SHIPMENT_ORIGIN_SITE_ID:
                return ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID;
            case ShipmentModelH.P_SHIPMENT_DESTINATION_SITE_ID:
                return ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID;
            case ShipmentModelH.P_SHIPMENT_DATE_OF_SHIPMENT:
                return ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT;
            case ShipmentModelH.P_SHIPMENT_DATE_OF_ARRIVAL:
                return ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL;
            case ShipmentModelH.P_SHIPMENT_DLT_ANCHORED:
                return ShipmentRepoH.C_SHIPMENT_DLT_ANCHORED;
            case ShipmentModelH.P_SHIPMENT_DLT_PROOF:
                return ShipmentRepoH.C_SHIPMENT_DLT_PROOF;
            case ShipmentModelH.P_SHIPMENT_DELETED:
                return ShipmentRepoH.C_SHIPMENT_DELETED;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? ShipmentModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
