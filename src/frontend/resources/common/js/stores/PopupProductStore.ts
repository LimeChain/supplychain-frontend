import { makeObservable, observable } from 'mobx';
import InputStateHelper from '../helpers/InputStateHelper';
import ProductModel from '../models/product-module/ProductModel';
import S from '../utilities/Main';
import PopupStore from './PopupStore';

export default class PopupProductStore extends PopupStore {

    static FIELDS_PRODUCT = ['name', 'unit', 'description'];

    @observable productModel: ProductModel;

    inputStateHelperProduct: InputStateHelper;
    onFinish: (savedProductModel: ProductModel) => void;

    constructor() {
        super();

        this.inputStateHelperProduct = new InputStateHelper(PopupProductStore.FIELDS_PRODUCT, (key, value) => {
            switch (key) {
                case PopupProductStore.FIELDS_PRODUCT[0]:
                    this.productModel.productName = value;
                    break;
                case PopupProductStore.FIELDS_PRODUCT[1]:
                    this.productModel.productUnit = value === S.Strings.EMPTY ? S.NOT_EXISTS : value;
                    break;
                case PopupProductStore.FIELDS_PRODUCT[2]:
                    this.productModel.productDescription = value;
                    break;
                default:
                    break;
            }
        })

        makeObservable(this);
    }

    signalShow(productModel: ProductModel, onFinish: (savedProductModel: ProductModel) => void) {
        this.productModel = productModel;
        this.onFinish = onFinish;
        this.show();
    }

}
