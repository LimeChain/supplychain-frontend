import React from 'react';
import { inject, observer } from 'mobx-react';
import { MenuItem } from '@material-ui/core';

import ProductModelConsts from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelConsts'

import S from '../../../common/js/utilities/Main';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import AppStore from '../../../common/js/stores/AppStore';
import AlertStore from '../../../common/js/stores/AlertStore';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ProductApi from '../../../common/js/api/ProductApi';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Input from '../../../common/js/components-inc/Input';
import Select from '../../../common/js/components-inc/Select';
import Button from '../../../common/js/components-inc/Button';
import Actions from '../../../common/js/components-inc/Actions';

import SvgAdd from '@material-ui/icons/Add';
import '../../css/components-popups/product-popup.css';

interface Props extends PopupWindowProps {
    popupStore: PopupProductStore;
    appStore: AppStore;
    alertStore: AlertStore;
}

class ProductPopup extends PopupWindow<Props> {

    productApi: ProductApi

    constructor(props: Props) {
        super(props);

        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    getCssClassName() {
        return 'ProductPopup PopupPadding PopupBox';
    }

    addProduct = () => {
        const inputStateHelperProduct = this.props.popupStore.inputStateHelperProduct;
        if (inputStateHelperProduct.getValues() === null) {
            return;
        }

        const onFinish = this.props.popupStore.onFinish;
        const productModel = this.props.popupStore.productModel;
        this.productApi.creditProduct(productModel, () => {
            this.props.popupStore.hide();
            onFinish(productModel);
        });
    }

    renderContent() {
        const productModel = this.props.popupStore.productModel;

        const FIELDS = PopupProductStore.FIELDS_PRODUCT;
        const inputStateHelperProduct = this.props.popupStore.inputStateHelperProduct;

        inputStateHelperProduct.updateValues([
            productModel.productName,
            productModel.productUnit === S.NOT_EXISTS ? S.Strings.EMPTY : productModel.productUnit,
            productModel.productDescription,
        ]);

        return (
            <div className={'PopupWindowContent'} >
                <LayoutBlock className={'ProductPopupInputs'} direction={LayoutBlock.DIRECTION_COLUMN}>
                    <div className={'PopupHeader'} >Add Product</div>
                    <Input
                        className={'NameInput'}
                        label = { 'Name' }
                        placeholder = { 'Enter name of the product' }
                        value={inputStateHelperProduct.values.get(FIELDS[0])}
                        error={inputStateHelperProduct.errors.get(FIELDS[0])}
                        onChange={inputStateHelperProduct.onChanges.get(FIELDS[0])} />
                    <Select
                        className={'UnitSelect'}
                        label = { 'Unit of measurement' }
                        placeholder = { 'Kg' }
                        value={inputStateHelperProduct.values.get(FIELDS[1])}
                        error={inputStateHelperProduct.errors.get(FIELDS[1])}
                        onChange={inputStateHelperProduct.onChanges.get(FIELDS[1])}
                        displayEmpty={true}>
                        {Object.keys(ProductModelConsts).map((constName) => {
                            const itemKey = ProductModelConsts[constName];
                            const itemValue = ProductModel.getUnitName(itemKey);

                            return (
                                <MenuItem key={itemKey} value={itemKey}> {itemValue} </MenuItem>
                            )
                        })}
                    </Select>
                    <Input
                        className={'NameInput'}
                        label = { 'Description' }
                        placeholder = { 'Enter additional information for the product' }
                        multiline = { true }
                        value={inputStateHelperProduct.values.get(FIELDS[2])}
                        error={inputStateHelperProduct.errors.get(FIELDS[2])}
                        onChange={inputStateHelperProduct.onChanges.get(FIELDS[2])} />
                    <Actions className = { 'Actions' }>
                        <Button onClick={this.addProduct} disabled = { inputStateHelperProduct.isValid() === false }>
                            <div className={'FlexRow'}>
                                <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                {productModel.isNew() === false ? 'Save' : 'Add product'} 
                            </div>
                        </Button>
                    </Actions>
                </LayoutBlock>
            </div >
        )
    }

}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        appStore: stores.appStore,
        popupStore: stores.popupProductStore,
    }
})(observer(ProductPopup));
