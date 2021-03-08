import React from 'react';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import { inject, observer } from 'mobx-react';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Input, { InputType } from '../../../common/js/components-inc/Input';
import { InputLabel, MenuItem } from '@material-ui/core';
import Select from '../../../common/js/components-inc/Select';
import ProductModelHConsts from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelHConsts'
import ProductModelH from '../../../../../backend/modules/ProductModule/Product/Model/ProductModelH';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import SvgAdd from '@material-ui/icons/Add';
import ProductApi from '../../../common/js/api/ProductApi';
import AppStore from '../../../common/js/stores/AppStore';
import Button from '../../../common/js/components-inc/Button';
import Actions from '../../../common/js/components-inc/Actions';
import AlertStore from '../../../common/js/stores/AlertStore';
import InputStateHelper from '../../../common/js/helpers/InputStateHelper';
import S from '../../../common/js/utilities/Main';
import { runInAction } from 'mobx';

interface Props extends PopupWindowProps {
    popupStore: PopupProductStore;
    appStore: AppStore;
    alertStore: AlertStore;
}

class ProductPopup extends PopupWindow<Props, State> {

    productApi: ProductApi

    constructor(props: Props) {
        super(props);

        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    getCssClassName() {
        return 'ProductPopup PopupPadding PopupBox';
    }

    addProduct = () => {
        this.productApi.creditProduct(this.props.popupStore.productModel, () => {
            this.props.popupStore.hide();
        });
    }

    renderContent() {
        const productModel = this.props.popupStore.productModel;

        const FIELDS = PopupProductStore.FIELDS_PRODUCT;
        const inputStateHelperProduct = this.props.popupStore.inputStateHelperProduct;

        runInAction(() => {
            inputStateHelperProduct.updateValues([
                productModel.productName === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : productModel.productName,
                productModel.productUnit === S.NOT_EXISTS ? S.NOT_EXISTS : productModel.productUnit,
                productModel.productDescription === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : productModel.productDescription,
            ]);
        });
        return (
            <div className={'PopupWindowContent'} >
                <LayoutBlock className={'ProductPopupInputs'} direction={LayoutBlock.DIRECTION_COLUMN}>
                    <div className={'PopupHeader'} >Add Product</div>
                    <div>
                        <div className={'InputLabel'}>Name</div>
                        <Input
                            className={'NameInput'}
                            inputType={InputType.TEXT}
                            value={inputStateHelperProduct.values.get(FIELDS[0])}
                            error={inputStateHelperProduct.errors.get(FIELDS[0])}
                            onChange={inputStateHelperProduct.onChanges.get(FIELDS[0])} />
                    </div>
                    <div>
                        <div className={'InputLabel'}>Unit of measurement</div>
                        <Select
                            className={'UnitSelect'}
                            value={inputStateHelperProduct.values.get(FIELDS[1])}
                            error={inputStateHelperProduct.errors.get(FIELDS[1])}
                            onChange={inputStateHelperProduct.onChanges.get(FIELDS[1])}
                            displayEmpty={true}>
                            {Object.keys(ProductModelHConsts).map((constName) => {
                                const itemKey = ProductModelHConsts[constName];
                                const itemValue = ProductModel.getUnitName(itemKey);

                                return (
                                    <MenuItem key={itemKey} value={itemKey}> {itemValue} </MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                    <div>
                        <div className={'InputLabel'}>Description</div>
                        <Input
                            className={'NameInput'}
                            inputType={InputType.TEXT}
                            value={inputStateHelperProduct.values.get(FIELDS[2])}
                            error={inputStateHelperProduct.errors.get(FIELDS[2])}
                            onChange={inputStateHelperProduct.onChanges.get(FIELDS[2])} />
                    </div>
                    <Actions>
                        <Button onClick={this.addProduct}>
                            <div className={'FlexRow'}>
                                <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                Add product
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
