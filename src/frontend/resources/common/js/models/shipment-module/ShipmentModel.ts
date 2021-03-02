import S from '../../utilities/Main';

import ShipmentStatusModelH from '../../../../../../backend/modules/product-group-module/shipment-module/ShipmentStatusModel.h';


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
        this.shipmentStatus = S.NOT_EXISTS;
        this.shipmentOriginSiteId = S.Strings.NOT_EXISTS;
        this.shipmentDestinationSiteId = S.Strings.NOT_EXISTS;
        this.shipmentDateOfShipment = S.NOT_EXISTS;
        this.shipmentDateOfArrival = S.NOT_EXISTS;
        this.shipmentDltAnchored = S.INT_FALSE;
        this.shipmentDltProof = S.Strings.EMPTY;
        this.shipmentDeleted = S.NOT_EXISTS;
    }

    isNew(): boolean {
        return this.shipmentId === S.Strings.NOT_EXISTS
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

        model.shipmentId = (json.shipmentId || model.shipmentId).toString();
        model.shipmentConsignmentNumber = json.shipmentConsignmentNumber || model.shipmentConsignmentNumber;
        model.shipmentName = json.shipmentName || model.shipmentName;
        model.shipmentStatus = json.shipmentStatus || model.shipmentStatus;
        model.shipmentOriginSiteId = (json.shipmentOriginSiteId || model.shipmentOriginSiteId).toString();
        model.shipmentDestinationSiteId = (json.shipmentDestinationSiteId || model.shipmentDestinationSiteId).toString();
        model.shipmentDateOfShipment = json.shipmentDateOfShipment || model.shipmentDateOfShipment;
        model.shipmentDateOfArrival = json.shipmentDateOfArrival || model.shipmentDateOfArrival;
        model.shipmentDltAnchored = json.shipmentDltAnchored || model.shipmentDltAnchored;
        model.shipmentDltProof = json.shipmentDltProof || model.shipmentDltProof;
        model.shipmentDeleted = json.shipmentDeleted || model.shipmentDeleted;

        return model;
    }

}