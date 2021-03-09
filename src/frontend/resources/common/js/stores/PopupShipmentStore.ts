import { makeObservable, observable } from 'mobx';
import TableHelper from '../helpers/TableHelper';
import ProductModel from '../models/product-module/ProductModel';
import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';
import PopupStore from './PopupStore';
import InputStateHelper from '../helpers/InputStateHelper';

export default class PopupShipmentStore extends PopupStore {

    static POPUP_TAB_PRODUCTS: number = 1;
    static POPUP_TAB_DOCUMENTS: number = 2;

    static FIELDS_SHIPMENT = ['toSite'];
    static FIELDS_LOCALLY_PRODUCED = ['name', 'price', 'quantity'];
    static FIELDS_FROM_SHIPMENT = ['name', 'fromShipment', 'price', 'quantity'];

    @observable popupActiveTab: number = PopupShipmentStore.POPUP_TAB_PRODUCTS;
    @observable productTableHelper: TableHelper;
    @observable shipmentModel: ShipmentModel;
    @observable skuModels: SkuModel[];
    @observable skuOriginModels: SkuOriginModel[];

    @observable buildSkuModel: SkuModel;
    @observable buildSkuOriginModel: SkuOriginModel;

    shipmentInputStateHelper: InputStateHelper;
    buildSkuInputStateHelper: InputStateHelper;
    genSkuId: 0;

    constructor() {
        super();

        this.shipmentInputStateHelper = new InputStateHelper(PopupShipmentStore.FIELDS_SHIPMENT, (key, value) => {
            switch (key) {
                case PopupShipmentStore.FIELDS_SHIPMENT[0]:
                    this.shipmentModel.shipmentDestinationSiteId = value === S.Strings.EMPTY ? S.Strings.NOT_EXISTS : value;
                    break;
                default:
                    break;
            }
        });
        this.buildSkuInputStateHelper = new InputStateHelper(PopupShipmentStore.FIELDS_FROM_SHIPMENT, (key, value) => {
            switch (key) {
                case PopupShipmentStore.FIELDS_FROM_SHIPMENT[0]:
                    this.buildSkuModel.productId = value === null ? S.Strings.NOT_EXISTS : value;
                    break;
                case PopupShipmentStore.FIELDS_FROM_SHIPMENT[1]:
                    this.buildSkuOriginModel.shipmentId = value === null ? S.Strings.NOT_EXISTS : value;
                    break;
                case PopupShipmentStore.FIELDS_FROM_SHIPMENT[2]:
                    this.buildSkuModel.pricePerUnit = value === S.Strings.EMPTY ? S.NOT_EXISTS : parseInt(value);
                    break;
                case PopupShipmentStore.FIELDS_FROM_SHIPMENT[3]:
                    this.buildSkuModel.quantity = value === S.Strings.EMPTY ? S.NOT_EXISTS : parseInt(value);
                    break;
                default:
                    break;
            }
        });

        makeObservable(this);
    }

    signalShow(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[]) {
        this.popupActiveTab = PopupShipmentStore.POPUP_TAB_PRODUCTS;
        this.productTableHelper = new TableHelper(S.NOT_EXISTS, [], () => {});
        this.shipmentModel = shipmentModel;
        this.skuModels = skuModels;
        this.skuOriginModels = skuOriginModels;
        this.buildSkuModel = new SkuModel();
        this.buildSkuOriginModel = new SkuOriginModel();
        this.genSkuId = 0;
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

    addSkuFromBuild() {
        this.buildSkuModel.skuId = (--this.genSkuId).toString();
        this.buildSkuOriginModel.skuId = this.buildSkuModel.skuId;

        this.skuModels.push(this.buildSkuModel);
        this.skuOriginModels.push(this.buildSkuOriginModel);

        this.buildSkuModel = new SkuModel();
        this.buildSkuOriginModel = new SkuOriginModel();
    }

    deleteSkuByIndex(i: number) {
        this.skuModels.splice(i, 1);
    }

}
