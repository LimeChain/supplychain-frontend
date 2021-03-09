import { makeAutoObservable } from 'mobx';
import ShipmentApi from '../api/ShipmentApi';

import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';
import AlertStore from './AlertStore';
import AppStore from './AppStore';

export default class ShipmentStore {

    shipmentsMap: Map<string, ShipmentModel> = new Map<string, ShipmentModel>();

    screenShipmentModels: ShipmentModel[] = null;
    sourceShipmentModels: ShipmentModel[] = [];
    sourceMaxAvailableQuantitiesMap: Map < string, number > = new Map();

    shipmentApi: ShipmentApi;

    constructor(appStore: AppStore, alertStore: AlertStore) {
        this.shipmentApi = new ShipmentApi(appStore.enableActions, appStore.disableActions, alertStore.show);
        makeAutoObservable(this);
    }

    onScreenData(shipmentModels: ShipmentModel[]) {
        this.screenShipmentModels = shipmentModels;
        this.updateShipmentModels(shipmentModels);
    }

    onSourceShipment(shipmentModels: ShipmentModel[], sourceMaxAvailableQuantities: number[]) {
        this.sourceShipmentModels = shipmentModels;
        this.sourceMaxAvailableQuantitiesMap.clear();
        for (let i = shipmentModels.length; i-- > 0;) {
            this.sourceMaxAvailableQuantitiesMap.set(shipmentModels[i].shipmentId, sourceMaxAvailableQuantities[i]);
        }
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

    getShipment(shipmentId: string): ShipmentModel | null {
        return this.shipmentsMap.get(shipmentId) ?? null;
    }

    getShipmentConsignmentNumber(shipmentId: string): string {
        return this.getShipment(shipmentId)?.shipmentConsignmentNumber ?? S.Strings.EMPTY;
    }

    getSourceMaxAvailableQuantity(shipmentId: string): number {
        return this.sourceMaxAvailableQuantitiesMap.get(shipmentId) ?? 0;
    }

    fetchSourceShipmentsByProductId(productId: string, callback: () => void) {
        if (productId === S.Strings.NOT_EXISTS) {
            this.onSourceShipment([], []);
            return;
        }

        const model = new ShipmentModel();
        model.shipmentId = '1';
        model.shipmentConsignmentNumber = 'test 1';
        this.onSourceShipment([model], [10]);
        callback();
    }

}
