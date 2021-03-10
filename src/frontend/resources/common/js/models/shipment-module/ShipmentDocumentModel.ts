import { makeAutoObservable } from 'mobx';
import ShipmentDocumentConstsH from '../../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';
import S from '../../utilities/Main';

export default class ShipmentDocumentModel {

    shipmentDocumentId: string
    shipmentId: string
    documentType: number;
    mimeType: string;
    shipmentDocumentUrl: string
    sizeInBytes: number;
    name: string;
    uploadProgress: number;

    constructor() {
        this.shipmentDocumentId = S.Strings.NOT_EXISTS;
        this.shipmentId = S.Strings.NOT_EXISTS;
        this.documentType = S.NOT_EXISTS;
        this.mimeType = S.Strings.EMPTY;
        this.shipmentDocumentUrl = S.Strings.EMPTY;
        this.sizeInBytes = 0;
        this.name = S.Strings.EMPTY;
        this.uploadProgress = 1;

        makeAutoObservable(this);
    }

    isUploaded(): boolean {
        return this.shipmentDocumentUrl !== S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'shipmentDocumentId': this.shipmentDocumentId,
            'shipmentId': this.shipmentId,
            'documentType': this.documentType,
            'mimeType': this.mimeType,
            'shipmentDocumentUrl': this.shipmentDocumentUrl,
            'sizeInBytes': this.sizeInBytes,
            'name': this.name,
        }
    }

    static getTypeAsString(type) {
        switch (type) {
            default:
                return S.Strings.EMPTY;
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_CRM_DOCUMENT:
                return 'CRM document';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BILL_OF_LANDING:
                return 'Bill of lading';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INVOICE:
                return 'Invoice';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INSURANCE_POLICY:
                return 'Insurance policy';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK:
                return 'Bank document';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_PUBLIC_AUTH:
                return 'Public authority issued document';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_RECEIPT:
                return 'Receipt';
            case ShipmentDocumentConstsH.S_DOCUMENT_TYPE_OTHER:
                return 'Other';
        }
    }

    static fromJson(json): ShipmentDocumentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentDocumentModel();

        model.shipmentDocumentId = (json.shipmentDocumentId ?? model.shipmentDocumentId).toString();
        model.shipmentId = (json.shipmentId ?? model.shipmentId).toString();
        model.documentType = json.documentType ?? model.documentType;
        model.mimeType = json.mimeType ?? model.mimeType;
        model.shipmentDocumentUrl = (json.shipmentDocumentUrl ?? model.shipmentDocumentUrl).toString();
        model.sizeInBytes = parseInt(json.sizeInBytes ?? model.sizeInBytes);
        model.name = json.name ?? model.name;

        return model;
    }

}
