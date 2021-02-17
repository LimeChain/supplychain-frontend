import S from '../../utilities/Main';

export default class ShipmentDocumentModel {
    shipmentDocumentId: string
    documentId: string
    documentType: number
    shipmentDocumentUrl: string

    constructor(){
        this.shipmentDocumentId = S.Strings.NOT_EXISTS;
        this.documentId = S.Strings.NOT_EXISTS;
        this.documentType = S.NOT_EXISTS;
        this.shipmentDocumentUrl = S.Strings.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'shipmentDocumentId': this.shipmentDocumentId,
            'documentId': this.documentId,
            'documentyType': this.documentType,
            'shipmentDocumentUrl': this.shipmentDocumentUrl
        }
    }

    static fromJson(json): ShipmentDocumentModel {
        if (json === null) {
            return null;
        }

        const model = new ShipmentDocumentModel();

        model.shipmentDocumentId = (json.shipmentDocumentId || model.shipmentDocumentId).toString();
        model.documentId = (json.documentId || model.documentId).toString();        
        model.documentType = json.documentType || model.documentType;
        model.shipmentDocumentUrl = (json.shipmentDocumentUrl || model.shipmentDocumentUrl).toString();

        return model;
    }


}