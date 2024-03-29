import { makeObservable, observable } from 'mobx';
import TableHelper from '../helpers/TableHelper';
import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import S from '../utilities/Main';
import PopupStore from './PopupStore';
import InputStateHelper from '../helpers/InputStateHelper';
import ProductStore from './ProductStore';
import ShipmentStore from './ShipmentStore';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

export default class PopupShipmentStore extends PopupStore {

    static POPUP_TAB_PRODUCTS: number = 1;
    static POPUP_TAB_DOCUMENTS: number = 2;

    static FIELDS_SHIPMENT = ['consignmentNumber', 'toSite'];
    static FIELDS_ADD_SKU_LOCALLY_PRODUCED_SUBSET = ['name', 'price', 'quantity'];
    static FIELDS_ADD_SKU = ['name', 'fromShipment', 'price', 'quantity'];
    static FIELDS_ADD_DOCUMENT = ['documentType'];

    @observable popupActiveTab: number = PopupShipmentStore.POPUP_TAB_PRODUCTS;
    @observable productTableHelper: TableHelper;
    @observable shipmentModel: ShipmentModel;
    @observable skuModels: SkuModel[];
    @observable skuOriginModels: SkuOriginModel[];
    @observable shipmentDocumentModels: ShipmentDocumentModel[];

    @observable buildSkuModel: SkuModel;
    @observable buildSkuOriginModel: SkuOriginModel;

    @observable dragging: boolean;
    @observable pricePerUnitDisplay: string;

    shipmentLinksRoute: string[];
    shipmentInputStateHelper: InputStateHelper;
    buildSkuInputStateHelper: InputStateHelper;
    documentInputStateHelper: InputStateHelper;
    productIdsInSkuModels: Set<string>;
    genSkuId: number;
    initialShipmentDocumentLength: number;

    productStore: ProductStore;
    shipmentStore: ShipmentStore;

    onFinish: (savedShipmentModel: ShipmentModel) => void;

    constructor(productStore: ProductStore, shipmentStore: ShipmentStore) {
        super();

        this.shipmentInputStateHelper = new InputStateHelper(PopupShipmentStore.FIELDS_SHIPMENT, (key, value) => {
            switch (key) {
                case PopupShipmentStore.FIELDS_SHIPMENT[0]:
                    this.shipmentModel.shipmentConsignmentNumber = value;
                    break;
                case PopupShipmentStore.FIELDS_SHIPMENT[1]:
                    this.shipmentModel.shipmentDestinationSiteId = value === S.Strings.EMPTY ? S.Strings.NOT_EXISTS : value;
                    break;
                default:
                    break;
            }
        });
        this.buildSkuInputStateHelper = new InputStateHelper(PopupShipmentStore.FIELDS_ADD_SKU, (key, value) => {
            switch (key) {
                case PopupShipmentStore.FIELDS_ADD_SKU[0]:
                    this.buildSkuModel.productId = value === null ? S.Strings.NOT_EXISTS : value.value;
                    if (this.buildSkuModel.productId === S.Strings.NOT_EXISTS) {
                        this.buildSkuOriginModel.shipmentId = S.Strings.NOT_EXISTS;
                    }
                    this.shipmentStore.fetchSourceShipmentsByProductId(this.buildSkuModel.productId, () => {
                    });
                    break;
                case PopupShipmentStore.FIELDS_ADD_SKU[1]:
                    this.buildSkuOriginModel.shipmentId = value === null ? S.Strings.NOT_EXISTS : value.value;
                    break;
                case PopupShipmentStore.FIELDS_ADD_SKU[2]:
                    this.buildSkuModel.pricePerUnit = Number.isNaN(parseFloat(value)) === true ? S.NOT_EXISTS : parseFloat(value);
                    this.pricePerUnitDisplay = value;
                    break;
                case PopupShipmentStore.FIELDS_ADD_SKU[3]:
                    this.buildSkuModel.quantity = value === S.Strings.EMPTY ? S.NOT_EXISTS : parseInt(value);
                    break;
                default:
                    break;
            }
        });

        this.productStore = productStore;
        this.shipmentStore = shipmentStore;

        makeObservable(this);
    }

    signalShow(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[], onFinish: (savedShipmentModel: ShipmentModel) => void) {
        this.popupActiveTab = PopupShipmentStore.POPUP_TAB_PRODUCTS;
        this.productTableHelper = new TableHelper(S.NOT_EXISTS, [], () => { });
        this.shipmentLinksRoute = [];
        this.shipmentModel = shipmentModel.clone();
        this.skuModels = skuModels;
        this.skuOriginModels = skuOriginModels;
        this.shipmentDocumentModels = shipmentDocumentModels;
        this.buildSkuModel = new SkuModel();
        this.buildSkuOriginModel = new SkuOriginModel();
        this.dragging = false;
        this.pricePerUnitDisplay = S.Strings.EMPTY;
        this.genSkuId = 0;
        this.initialShipmentDocumentLength = shipmentDocumentModels.length;
        this.onFinish = onFinish;
        this.productIdsInSkuModels = new Set();
        skuModels.forEach((skuModel: SkuModel) => {
            this.productIdsInSkuModels.add(skuModel.productId);
        });

        this.productStore.fetchProductsList(() => {
            this.show();
        });
    }

    addToShipmentRoute(
        resetRoute: boolean,
        shipmentModel: ShipmentModel,
        skuModels: SkuModel[],
        skuOriginModels: SkuOriginModel[],
        shipmentDocumentModels: ShipmentDocumentModel[],
    ) {
        if (!resetRoute) {
            if (this.shipmentLinksRoute.length === 0) {
                this.shipmentLinksRoute.push(this.shipmentModel.shipmentId);
            }

            this.shipmentLinksRoute.push(shipmentModel.shipmentId);
        }

        this.shipmentModel = shipmentModel;
        this.skuModels = skuModels;
        this.skuOriginModels = skuOriginModels;
        this.shipmentDocumentModels = shipmentDocumentModels;
    }

    moveToShipmentLinkRoute(shipmentLinkIndex: number, callback: (shipmentId: string) => void) {
        const shipmentId = this.shipmentLinksRoute[shipmentLinkIndex];
        this.shipmentLinksRoute = this.shipmentLinksRoute.slice(0, shipmentLinkIndex);

        callback(shipmentId);
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

        this.productIdsInSkuModels.add(this.buildSkuModel.productId);

        this.skuModels.push(this.buildSkuModel);
        this.skuOriginModels.push(this.buildSkuOriginModel);

        this.buildSkuModel = new SkuModel();
        this.buildSkuOriginModel = new SkuOriginModel();
        this.pricePerUnitDisplay = S.Strings.EMPTY;
    }

    getSkuOriginModel(skuId: string): SkuOriginModel | null {
        return this.skuOriginModels.find((t) => t.skuId === skuId) ?? null;
    }

    deleteSkuByIndex(i: number) {
        const skuModel = this.skuModels[i];
        this.skuModels.splice(i, 1);
        this.productIdsInSkuModels.delete(skuModel.productId);

        const skuOriginModel = this.skuOriginModels[i];
        this.skuOriginModels.splice(i, 1);
    }

    canAddProductById(productId: string) {
        return this.productIdsInSkuModels.has(productId) === false;
    }

    onStartUploading(totalFiles: number): ShipmentDocumentModel[] {
        const result = [];
        for (let i = totalFiles; i-- > 0;) {
            const model = new ShipmentDocumentModel();
            model.uploadProgress = 0;
            this.shipmentDocumentModels.push(model);
            result.push(model);
        }
        return result;
    }

    deleteDocument(shipmentDocumentModel: ShipmentDocumentModel) {
        const index = this.shipmentDocumentModels.indexOf(shipmentDocumentModel);
        if (index !== -1) {
            this.shipmentDocumentModels.splice(index, 1);
        }
    }

    isAuditMode() {
        return this.popupMode === PopupShipmentStore.POPUP_MODE_AUDIT;
    }

}
