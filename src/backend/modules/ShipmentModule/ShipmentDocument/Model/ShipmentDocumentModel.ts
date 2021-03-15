import SV from '../../../../utilities/SV';
import ShipmentDocumentModelG from './ShipmentDocumentModelG';

export default class ShipmentDocumentModel extends ShipmentDocumentModelG {

    static S_DOCUMENT_TYPE_CRM_DOCUMENT: number = 1;
    static S_DOCUMENT_TYPE_BILL_OF_LANDING: number = 2;
    static S_DOCUMENT_TYPE_INVOICE: number = 3;
    static S_DOCUMENT_TYPE_INSURANCE_POLICY: number = 4;
    static S_DOCUMENT_TYPE_BANK: number = 5;
    static S_DOCUMENT_TYPE_PUBLIC_AUTH: number = 6;
    static S_DOCUMENT_TYPE_RECEIPT: number = 7;
    static S_DOCUMENT_TYPE_OTHER: number = 8;

    isNew(): boolean {
        return this.shipmentId === SV.NOT_EXISTS;
    }

}
