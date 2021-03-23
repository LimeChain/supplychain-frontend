import ShipmentDocumentConsts from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelConsts';
import ShipmentApiH from '../../../../requests/api/shipment/ShipmentApi.h';
import SV from '../../../../utilities/SV';
import ShipmentDocumentModelG from './ShipmentDocumentModelG';
import Params from '../../../../utilities/Params';

export default class ShipmentDocumentModel extends ShipmentDocumentModelG {

    static FILE_DATA_STRING_BEGIN: string = 'data:'

    static S_DOCUMENT_TYPE_JUST_UPLOADED: number = 0;
    static S_DOCUMENT_TYPE_CRM_DOCUMENT: number = 1;
    static S_DOCUMENT_TYPE_BILL_OF_LANDING: number = 2;
    static S_DOCUMENT_TYPE_INVOICE: number = 3;
    static S_DOCUMENT_TYPE_INSURANCE_POLICY: number = 4;
    static S_DOCUMENT_TYPE_BANK: number = 5;
    static S_DOCUMENT_TYPE_PUBLIC_AUTH: number = 6;
    static S_DOCUMENT_TYPE_RECEIPT: number = 7;
    static S_DOCUMENT_TYPE_OTHER: number = 8;

    constructor() {
        super();
        this.documentType = ShipmentDocumentModel.S_DOCUMENT_TYPE_JUST_UPLOADED;
    }

    isNew(): boolean {
        return this.shipmentDocumentId === SV.NOT_EXISTS;
    }

    updateShipmentDocumentUrl() {
        this.shipmentDocumentUrl = `${ShipmentApiH.URL}?${Params.ACTION}=${ShipmentApiH.Actions.FETCH_SHIPMENT_DOCUMENT_FILE}&${Params.ID}=${this.shipmentDocumentId}`;
    }

}
