import { makeObservable, observable } from 'mobx';
import ProductModel from '../models/product-module/ProductModel';
import PopupStore from './PopupStore';

export default class PopupProductStore extends PopupStore {

    productModel: ProductModel;

    constructor() {
        super();
        makeObservable(this);
    }

}
