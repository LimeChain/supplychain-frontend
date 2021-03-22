import React, { RefObject } from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../common/js/utilities/Main';
import AppStore from '../../../common/js/stores/AppStore';
import AlertStore from '../../../common/js/stores/AlertStore';
import ProductApi from '../../../common/js/api/ProductApi';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import ProductModel from '../../../common/js/models/product-module/ProductModel';

import Popover from '../../../common/js/components-inc/Popover';

import SvgProductEdit from '../../../common/svg/product-edit.svg';
import SvgProductDelete from '../../../common/svg/product-delete.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './../../css/components-inc/product-row-menu.css';

interface Props {
    show: number
    productModel: ProductModel;
    onFinishDelete: () => void;
    appStore: AppStore
    alertStore: AlertStore
    popupProductStore: PopupProductStore
    productStore: ProductStore
}

interface State {
    show: boolean
}

class ProductRowMenu extends React.Component < Props, State > {

    productApi: ProductApi;

    nodes: {
        root: RefObject < HTMLDivElement >,
    };

    constructor(props) {
        super(props);

        this.nodes = {
            'root': React.createRef(),
        };

        this.state = {
            show: false,
        }

        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    onClickEditProduct = () => {
        this.props.popupProductStore.signalShow(this.props.productModel.clone(), ((savedProductModel) => {
            Object.assign(this.props.productModel, savedProductModel);
        }));
        this.toggleOpenState();
    }

    onClickDeleteProduct = () => {
        this.props.alertStore.show('You are about to delete a product', () => {
            this.props.productModel.markAsDeleted();
            this.productApi.creditProduct(this.props.productModel, () => {
                this.props.onFinishDelete();
            });
        }, () => {});
        this.toggleOpenState();
    }

    toggleOpenState = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    render() {
        return (
            <div className={'ProductRowMenu'} ref={this.nodes.root}>
                {this.props.productModel.productEditable && <>
                    <MoreHorizIcon onClick={this.toggleOpenState} />

                    <Popover classes={{ root: 'ProductRowMenuPopover' }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={this.toggleOpenState}
                        open={this.state.show}
                        anchorEl={this.nodes.root.current}>
                        <div className = { 'MenuBox' }>
                            <div className={'MenuItem FlexRow Clickable'} onClick={this.onClickEditProduct}>
                                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgProductEdit }}></div>
                                Edit
                            </div>
                            {this.props.productModel.productDeletable &&
                            <div className={'MenuItem FlexRow Clickable'} onClick={this.onClickDeleteProduct}>
                                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgProductDelete }}></div>
                                Delete
                            </div>}
                        </div>
                    </Popover>
                    </>
                }
            </div>
        );
    }

}

export default inject('productStore', 'popupProductStore', 'appStore', 'alertStore')(observer(ProductRowMenu));
