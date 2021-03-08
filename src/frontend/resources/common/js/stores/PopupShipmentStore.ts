import { makeObservable, observable } from 'mobx';
import TableHelper from '../helpers/TableHelper';
import ProductModel from '../models/product-module/ProductModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';
import PopupStore from './PopupStore';

export default class PopupShipmentStore extends PopupStore {

    static POPUP_TAB_PRODUCTS: number = 1;
    static POPUP_TAB_DOCUMENTS: number = 2;

    @observable popupActiveTab: number = PopupShipmentStore.POPUP_TAB_PRODUCTS;
    @observable shipmentModel: ShipmentModel;
    @observable productTableHelper: TableHelper;

    constructor() {
        super();
        makeObservable(this);
    }

    signalShow(shipmentModel: ShipmentModel) {
        this.popupActiveTab = PopupShipmentStore.POPUP_TAB_PRODUCTS;
        this.shipmentModel = shipmentModel;
        this.productTableHelper = new TableHelper(-2, [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 6],
        ]);
        this.show();
    }

    setTabProducts() {
        this.popupActiveTab = PopupShipmentStore.POPUP_TAB_PRODUCTS
    }

    setTabDocuments() {
        this.popupActiveTab = PopupShipmentStore.POPUP_TAB_DOCUMENTS
    }

    isActiveTabProducts() {
        return this.popupActiveTab === PopupShipmentStore.POPUP_TAB_PRODUCTS;
    }

    isActiveTabDocuments() {
        return this.popupActiveTab === PopupShipmentStore.POPUP_TAB_DOCUMENTS;
    }

}
