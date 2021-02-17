import { makeAutoObservable } from 'mobx';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export default class ShipmentDocumentStore {
    shipmentDocumentsMap: Map < string, ShipmentDocumentModel > = new Map();

    screenShipmentDocumentModels: ShipmentDocumentModel[];

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(shipmentDocumentModels: ShipmentDocumentModel[]){
        this.screenShipmentDocumentModels = shipmentDocumentModels;
        this.updateShipmentDocumentModels(shipmentDocumentModels);
    }

    updateShipmentDocumentModels(shipmentDocumentModels: ShipmentDocumentModel[]){
        const cacheMap = this.shipmentDocumentsMap;
        this.shipmentDocumentsMap = null;

        shipmentDocumentModels.forEach((shipmentDocumentModel) => {
            cacheMap.set(shipmentDocumentModel.shipmentDocumentId, shipmentDocumentModel);
        });

        this.shipmentDocumentsMap = cacheMap;
    }

}