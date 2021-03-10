import { makeAutoObservable } from 'mobx';
import ShipmentApi from '../api/ShipmentApi';
import SkuModel from '../models/product-module/SkuModel';

import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';
import AlertStore from './AlertStore';
import AppStore from './AppStore';

export default class ShipmentStore {

    shipmentsMap: Map<string, ShipmentModel> = new Map<string, ShipmentModel>();

    screenShipmentModels: ShipmentModel[] = null;
    sourceShipmentModels: ShipmentModel[] = [];
    sourceMaxAvailableQuantitiesMap: Map<string, number> = new Map();

    shipmentApi: ShipmentApi;

    constructor(appStore: AppStore, alertStore: AlertStore) {
        this.shipmentApi = new ShipmentApi(appStore.enableActions, appStore.disableActions, alertStore.show);
        makeAutoObservable(this);
    }

    onScreenData(shipmentModels: ShipmentModel[]) {
        this.screenShipmentModels = shipmentModels;
        this.updateShipmentModels(shipmentModels);
    }

    onSourceShipment(shipmentModels: ShipmentModel[], skuModels: SkuModel[]) {

        this.sourceShipmentModels = shipmentModels;
        this.sourceMaxAvailableQuantitiesMap.clear();

        this.sourceShipmentModels.forEach((shipmentModel: ShipmentModel) => {
            this.sourceMaxAvailableQuantitiesMap.set(
                shipmentModel.shipmentId,
                skuModels.find((skuModel: SkuModel) => skuModel.shipmentId === shipmentModel.shipmentId).quantity,
            );
        })

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

        this.shipmentApi.fetchShipmentsWhereProductLeftByProductId(productId, (skuModels: SkuModel[], shipmentModels: ShipmentModel[]) => {
            this.onSourceShipment(shipmentModels, skuModels);
        })

        callback();
    }

}
