import ShipmentModel from './ShipmentModel';
import ShipmentModelH from './ShipmentModelH';
import ShipmentRepoH from '../Repo/ShipmentRepoH';
import SV from '../../../../utilities/SV';


export default class ShipmentModelG extends ShipmentModelH {

    constructor() {
        super();
        this.shipmentId = SV.NOT_EXISTS;
        this.shipmentConsignmentNumber = SV.Strings.EMPTY;
        this.shipmentName = SV.Strings.EMPTY;
        this.shipmentStatus = SV.NOT_EXISTS;
        this.shipmentOriginSiteId = SV.NOT_EXISTS;
        this.shipmentDestinationSiteId = SV.NOT_EXISTS;
        this.shipmentDateOfShipment = SV.NOT_EXISTS;
        this.shipmentDateOfArrival = SV.NOT_EXISTS;
        this.shipmentDltProof = SV.Strings.EMPTY;
        this.shipmentHash = SV.Strings.EMPTY;
        this.shipmentDeleted = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: ShipmentModel): void {

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
        if (map.has(ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER) === true && this.shipmentConsignmentNumber !== undefined) {
            repo.shipmentConsignmentNumber = this.shipmentConsignmentNumber;
            repo.shipmentConsignmentNumberToDb = true;
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
        if (map.has(ShipmentModelH.P_SHIPMENT_DLT_PROOF) === true && this.shipmentDltProof !== undefined) {
            repo.shipmentDltProof = this.shipmentDltProof;
            repo.shipmentDltProofToDb = true;
        }
        if (map.has(ShipmentModelH.P_SHIPMENT_HASH) === true && this.shipmentHash !== undefined) {
            repo.shipmentHash = this.shipmentHash;
            repo.shipmentHashToDb = true;
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
        model.shipmentConsignmentNumber = repo.shipmentConsignmentNumber ?? model.shipmentConsignmentNumber;
        model.shipmentName = repo.shipmentName ?? model.shipmentName;
        model.shipmentStatus = parseInt((repo.shipmentStatus ?? model.shipmentStatus) as unknown as string);
        model.shipmentOriginSiteId = parseInt((repo.shipmentOriginSiteId ?? model.shipmentOriginSiteId) as unknown as string);
        model.shipmentDestinationSiteId = parseInt((repo.shipmentDestinationSiteId ?? model.shipmentDestinationSiteId) as unknown as string);
        model.shipmentDateOfShipment = parseInt((repo.shipmentDateOfShipment ?? model.shipmentDateOfShipment) as unknown as string);
        model.shipmentDateOfArrival = parseInt((repo.shipmentDateOfArrival ?? model.shipmentDateOfArrival) as unknown as string);
        model.shipmentDltProof = repo.shipmentDltProof ?? model.shipmentDltProof;
        model.shipmentHash = repo.shipmentHash ?? model.shipmentHash;
        model.shipmentDeleted = parseInt((repo.shipmentDeleted ?? model.shipmentDeleted) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            shipmentId: this.shipmentId,
            shipmentConsignmentNumber: this.shipmentConsignmentNumber,
            shipmentName: this.shipmentName,
            shipmentStatus: this.shipmentStatus,
            shipmentOriginSiteId: this.shipmentOriginSiteId,
            shipmentDestinationSiteId: this.shipmentDestinationSiteId,
            shipmentDateOfShipment: this.shipmentDateOfShipment,
            shipmentDateOfArrival: this.shipmentDateOfArrival,
            shipmentDltProof: this.shipmentDltProof,
            shipmentHash: this.shipmentHash,
            shipmentDeleted: this.shipmentDeleted,
        };
    }

    static fromNetwork(json: any): ShipmentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentModel();
        
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.shipmentConsignmentNumber = json.shipmentConsignmentNumber ?? model.shipmentConsignmentNumber;
        model.shipmentName = json.shipmentName ?? model.shipmentName;
        model.shipmentStatus = parseInt(json.shipmentStatus ?? model.shipmentStatus);
        model.shipmentOriginSiteId = parseInt(json.shipmentOriginSiteId ?? model.shipmentOriginSiteId);
        model.shipmentDestinationSiteId = parseInt(json.shipmentDestinationSiteId ?? model.shipmentDestinationSiteId);
        model.shipmentDateOfShipment = parseInt(json.shipmentDateOfShipment ?? model.shipmentDateOfShipment);
        model.shipmentDateOfArrival = parseInt(json.shipmentDateOfArrival ?? model.shipmentDateOfArrival);
        model.shipmentDltProof = json.shipmentDltProof ?? model.shipmentDltProof;
        model.shipmentHash = json.shipmentHash ?? model.shipmentHash;
        model.shipmentDeleted = parseInt(json.shipmentDeleted ?? model.shipmentDeleted);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case ShipmentModelH.P_SHIPMENT_ID:
                return ShipmentRepoH.C_SHIPMENT_ID;
            case ShipmentModelH.P_SHIPMENT_CONSIGNMENT_NUMBER:
                return ShipmentRepoH.C_SHIPMENT_CONSIGNMENT_NUMBER;
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
            case ShipmentModelH.P_SHIPMENT_DLT_PROOF:
                return ShipmentRepoH.C_SHIPMENT_DLT_PROOF;
            case ShipmentModelH.P_SHIPMENT_HASH:
                return ShipmentRepoH.C_SHIPMENT_HASH;
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
