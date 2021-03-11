import { makeAutoObservable } from 'mobx';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import ProductApi from '../api/ProductApi';
import ShipmentApi from '../api/ShipmentApi';

import ProductModel from '../models/product-module/ProductModel';
import SkuModel from '../models/product-module/SkuModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';

export default class DashboardStore {
    static SHIPMENTS_SHOW_COUNT = 10;

    shipmentApi: ShipmentApi

    incommingShipmentsMap: Map<string, ShipmentModel> = new Map();
    outgoingShipmentsMap: Map<string, ShipmentModel> = new Map();

    isFetchingIncommingShipments: boolean = false;
    hasMoreIncommingShipments: boolean = true;

    isFetchingOutgoingShipments: boolean = false;
    hasMoreOutgoingShipments: boolean = true;

    incommingShipmentsTotalSize: number = 0;
    outgoingShipmentsTotalSize: number = 0;
    draftShipmentsTotalSize: number = 0;

    totalValueOfProducts: number = 0;

    screenIncommingShipments: ShipmentModel[] = [];
    screenOutgoingShipments: ShipmentModel[] = [];

    constructor(appStore, alertStore) {
        makeAutoObservable(this);

        this.shipmentApi = new ShipmentApi(appStore.enableActions, appStore.disableActions, alertStore.show);
    }

    onScreenIncommingData(shipmentModels: ShipmentModel[], totalSize: number) {
        this.screenIncommingShipments = shipmentModels;
        this.incommingShipmentsTotalSize = totalSize;
        this.updateShipmentModels(shipmentModels, this.incommingShipmentsMap);
    }

    onScreenOutgoingData(shipmentModels: ShipmentModel[], totalSize: number) {
        this.screenOutgoingShipments = shipmentModels;
        this.outgoingShipmentsTotalSize = totalSize;
        this.updateShipmentModels(shipmentModels, this.outgoingShipmentsMap);
    }

    appendToScreenData(shipmentModels: ShipmentModel[], screenShipmentModels: ShipmentModel[], shipmentsMap: Map<string, ShipmentModel>) {
        shipmentModels.forEach((shipmentModel) => {
            screenShipmentModels.push(shipmentModel);
            shipmentsMap.set(shipmentModel.shipmentId, shipmentModel);
        })
    }

    updateShipmentModels(shipmentModels: ShipmentModel[], shipmentsMap: Map<string, ShipmentModel>) {
        const cacheMap = shipmentsMap;
        shipmentsMap = null;

        shipmentModels.forEach((shipmentModel) => {
            cacheMap.set(shipmentModel.shipmentId, shipmentModel);
        });

        shipmentsMap = cacheMap;
    }

    fetchMoreIncommingShipments = (wipe: boolean = false) => {
        if (this.isFetchingIncommingShipments) {
            return;
        }

        this.isFetchingIncommingShipments = true;

        const from = wipe === true ? 0 : this.screenIncommingShipments.length;
        const to = from + DashboardStore.SHIPMENTS_SHOW_COUNT;

        this.shipmentApi.fetchShipmentByFilter(
            PagesCAdmin.INCOMMING,
            '',
            ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT,
            from,
            to,
            (shipmentModels: ShipmentModel[], totalSize: number) => {
                this.isFetchingIncommingShipments = false;

                this.hasMoreIncommingShipments = !(this.screenIncommingShipments.length === totalSize)

                if (this.incommingShipmentsTotalSize < totalSize && from > 0) {
                    this.fetchMoreIncommingShipments(true);
                    return;
                }

                if (wipe === true) {
                    this.onScreenIncommingData(shipmentModels, totalSize);
                } else {
                    this.appendToScreenData(shipmentModels, this.screenIncommingShipments, this.incommingShipmentsMap);
                }
            },
        )
    }

    fetchMoreOutgoingShipments(wipe: boolean = false) {
        if (this.isFetchingOutgoingShipments) {
            return;
        }

        this.isFetchingOutgoingShipments = true;

        const from = wipe === true ? 0 : this.screenOutgoingShipments.length;
        const to = from + DashboardStore.SHIPMENTS_SHOW_COUNT;

        this.shipmentApi.fetchShipmentByFilter(
            PagesCAdmin.OUTGOING,
            '',
            ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT,
            from,
            to,
            (shipmentModels: ShipmentModel[], totalSize: number) => {
                this.isFetchingOutgoingShipments = false;

                this.hasMoreOutgoingShipments = !(this.screenOutgoingShipments.length === totalSize)

                if (this.outgoingShipmentsTotalSize < totalSize && from > 0) {
                    this.fetchMoreOutgoingShipments(true);
                    return;
                }

                if (wipe === true) {
                    this.onScreenOutgoingData(shipmentModels, totalSize);
                } else {
                    this.appendToScreenData(shipmentModels, this.screenOutgoingShipments, this.outgoingShipmentsMap);
                }
            },
        )
    }

}
