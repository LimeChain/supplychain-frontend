import { makeAutoObservable } from 'mobx';

import ShipmentModel from '../models/shipment-module/ShipmentModel';

export default class ShipmentStore {

    shipmentsMap: Map<string, ShipmentModel> = new Map<string, ShipmentModel>();

    screenShipmentModels: ShipmentModel[] = null;

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(shipmentModels: ShipmentModel[]) {
        this.screenShipmentModels = shipmentModels;
        this.updateShipmentModels(shipmentModels);
    }

    updateShipmentModels(shipmentModels: ShipmentModel[]) {
        const cacheMap = this.shipmentsMap;
        this.shipmentsMap = null;

        shipmentModels.forEach((shipmentModel) => {
            cacheMap.set(shipmentModel.shipmentId, shipmentModel);
        });

        this.shipmentsMap = cacheMap;
    }

}
