import { makeAutoObservable } from 'mobx';
import Config from '../../../../../../../builds/dev-generated/Config';
import ShipmentConsts from '../../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
import S from '../../utilities/Main';

export default class ShipmentModel {
    static S_STATUS_DRAFT: number;
    static S_STATUS_IN_TRANSIT: number;
    static S_STATUS_RECEIVED: number;

    shipmentId: string
    shipmentConsignmentNumber: string
    shipmentName: string
    shipmentStatus: number
    shipmentOriginSiteId: string
    shipmentDestinationSiteId: string
    shipmentDateOfShipment: number
    shipmentDateOfArrival: number
    shipmentDltAnchored: number
    shipmentDltProof: string
    shipmentDeleted: number

    constructor() {
        this.shipmentId = S.Strings.NOT_EXISTS;
        this.shipmentConsignmentNumber = S.Strings.EMPTY;
        this.shipmentName = S.Strings.EMPTY;
        this.shipmentStatus = ShipmentConsts.S_STATUS_DRAFT;
        this.shipmentOriginSiteId = S.Strings.NOT_EXISTS;
        this.shipmentDestinationSiteId = S.Strings.NOT_EXISTS;
        this.shipmentDateOfShipment = S.NOT_EXISTS;
        this.shipmentDateOfArrival = S.NOT_EXISTS;
        this.shipmentDltAnchored = S.INT_FALSE;
        this.shipmentDltProof = S.Strings.EMPTY;
        this.shipmentDeleted = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    static newInstanceByOriginSiteId(siteId: string): ShipmentModel {
        const shipmentModel = new ShipmentModel();
        shipmentModel.shipmentOriginSiteId = siteId;

        return shipmentModel;
    }

    isNew(): boolean {
        return this.shipmentId === S.Strings.NOT_EXISTS
    }

    clone(): ShipmentModel {
        return Object.assign(new ShipmentModel(), this);
    }

    canSubmit(): boolean {
        return this.shipmentDestinationSiteId !== S.Strings.NOT_EXISTS && this.shipmentConsignmentNumber !== S.Strings.EMPTY;
    }

    saveAsDraft() {
        this.shipmentStatus = ShipmentConsts.S_STATUS_DRAFT;
    }

    submitShipment() {
        this.shipmentStatus = ShipmentConsts.S_STATUS_IN_TRANSIT;
        this.shipmentDateOfShipment = Date.now();
    }

    getStatusString() {
        switch (this.shipmentStatus) {
            case ShipmentConsts.S_STATUS_IN_TRANSIT:
                return 'In Transtit';
            case ShipmentConsts.S_STATUS_RECEIVED:
                return 'Received';
            default:
                return 'Unknown';
        }
    }

    getTransactionLink() {
        return `${Config.Server.TRANSACTION_VIEW_URL.replace('%s', this.shipmentDltProof || '0x4141f431e431d4413e1a4a156454141f431e431d4413e1a4a15645')}`
    }

    receiveShipment() {
        this.shipmentStatus = ShipmentConsts.S_STATUS_RECEIVED;
        this.shipmentDateOfArrival = Date.now();
    }

    isDraft(): boolean {
        return this.shipmentStatus === ShipmentConsts.S_STATUS_DRAFT;
    }

    isReceived(): boolean {
        return this.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED;
    }

    toJson(): any {
        return {
            'shipmentId': this.shipmentId,
            'shipmentConsignmentNumber': this.shipmentConsignmentNumber,
            'shipmentName': this.shipmentName,
            'shipmentStatus': this.shipmentStatus,
            'shipmentOriginSiteId': this.shipmentOriginSiteId,
            'shipmentDestinationSiteId': this.shipmentDestinationSiteId,
            'shipmentDateOfShipment': this.shipmentDateOfShipment,
            'shipmentDateOfArrival': this.shipmentDateOfArrival,
            'shipmentDltAnchored': this.shipmentDltAnchored,
            'shipmentDltProof': this.shipmentDltProof,
            'shipmentDeleted': this.shipmentDeleted,
        }
    }

    static fromJson(json): ShipmentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentModel();

        model.shipmentId = (json.shipmentId ?? model.shipmentId).toString();
        model.shipmentConsignmentNumber = json.shipmentConsignmentNumber ?? model.shipmentConsignmentNumber;
        model.shipmentName = json.shipmentName ?? model.shipmentName;
        model.shipmentStatus = json.shipmentStatus ?? model.shipmentStatus;
        model.shipmentOriginSiteId = (json.shipmentOriginSiteId ?? model.shipmentOriginSiteId).toString();
        model.shipmentDestinationSiteId = (json.shipmentDestinationSiteId ?? model.shipmentDestinationSiteId).toString();
        model.shipmentDateOfShipment = json.shipmentDateOfShipment ?? model.shipmentDateOfShipment;
        model.shipmentDateOfArrival = json.shipmentDateOfArrival ?? model.shipmentDateOfArrival;
        model.shipmentDltAnchored = json.shipmentDltAnchored ?? model.shipmentDltAnchored;
        model.shipmentDltProof = json.shipmentDltProof ?? model.shipmentDltProof;
        model.shipmentDeleted = json.shipmentDeleted ?? model.shipmentDeleted;

        return model;
    }

}
