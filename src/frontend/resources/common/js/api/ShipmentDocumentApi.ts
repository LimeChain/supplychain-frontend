import AbsApi from './AbsApi';
import storageHelper from '../helpers/StorageHelper';
import {UploadShipmentDocumentReq} from '../network-requests/ShipmentDocumentApiReq';
import {UploadShipmentDocumentRes} from '../network-responses/ShipmentDocumentApiRes';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export default class ShipmentDocumentsApi extends AbsApi {
    uploadDocument(shipmentDocumentModel: ShipmentDocumentModel, callback: () => void) {
        this.disableActions();
        
        setTimeout(() => {
            this.enableActions();

            const req = new UploadShipmentDocumentReq(shipmentDocumentModel);

            let json = {
                shipmentDocument: null
            }

            if (shipmentDocumentModel.isNew() === true) {
                let nextId;

                if (storageHelper.shipmentDocumentsJson.length > 0) {
                    const lastShipmentDocumentJson = storageHelper.shipmentDocumentsJson[storageHelper.shipmentDocumentsJson.length - 1];
                    nextId = (parseInt(lastShipmentDocumentJson.shipmentDocumentId) + 1).toString();
                } else {
                    nextId = '1';
                }

                json.shipmentDocument = {
                    shipmentDocumentId: nextId,
                };
            } else {
                const shipmentDocumentJson = storageHelper.shipmentDocumentsJson.find((t) => t.shipmentDocumentId === shipmentDocumentModel.shipmentDocumentId);
                json.shipmentDocument = ShipmentDocumentModel.fromJson(shipmentDocumentJson);
            }

            
            const res = new UploadShipmentDocumentRes(json);

            shipmentDocumentModel.shipmentDocumentId = res.shipmentDocumentModel.shipmentDocumentId;

            const shipmentDocumentJson = storageHelper.shipmentDocumentsJson.find((t) => t.shipmentDocumentId === shipmentDocumentModel.shipmentDocumentId);
            if (shipmentDocumentJson !== undefined) {
                Object.assign(shipmentDocumentJson, shipmentDocumentModel.toJson());
            } else {
                storageHelper.shipmentDocumentsJson.push(shipmentDocumentModel.toJson());
            }

            storageHelper.save();

            callback();
        }, 100);
    }
}