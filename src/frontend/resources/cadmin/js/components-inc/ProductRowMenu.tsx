import React, { RefObject } from 'react';
import moment from 'moment';

import './../../css/components-inc/product-row-menu.css';
import Popover from '../../../common/js/components-inc/Popover';
import S from '../../../common/js/utilities/Main';
import { inject, observer } from 'mobx-react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SvgProductEdit from '../../../common/svg/product-edit.svg';
import SvgProductDelete from '../../../common/svg/product-delete.svg';
import AppStore from '../../../common/js/stores/AppStore';
import AlertStore from '../../../common/js/stores/AlertStore';
import ProductApi from '../../../common/js/api/ProductApi';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import ProductModel from '../../../common/js/models/product-module/ProductModel';

interface Props {
    show: number
    productId: string
    appStore: AppStore
    alertStore: AlertStore
    popupProductStore: PopupProductStore
    productStore: ProductStore
}

interface State {
    show: boolean
}

class ProductRowMenu extends React.Component<Props, State> {
    productApi: ProductApi;

    nodes: {
        root: RefObject<HTMLDivElement>,
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

    editProduct = () => {
        this.props.popupProductStore.signalShow(this.props.productStore.screenProductModels.find((productModel: ProductModel) => productModel.productId === this.props.productId).clone())
    }

    deleteProduct = () => {
        // TODO: delete product
    }

    render() {
        return (
            <div className={'ProductRowMenu'} ref={this.nodes.root}>
                <MoreHorizIcon onClick={() => { this.setState({ show: true }) }} />
                <Popover classes={{ root: 'ProductRowMenuPopover' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={() => {
                        this.setState({
                            show: !this.state.show,
                        })
                    }}
                    open={this.state.show}
                    anchorEl={this.nodes.root.current}>
                    <div className={'MenuBox FlexColumn'}>
                        <div className={'MenuItem FlexRow'} onClick={this.editProduct}>
                            <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgProductEdit }}></div>
                            Edit
                        </div>
                        <div className={'MenuItem FlexRow'} onClick={this.deleteProduct}>
                            <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgProductDelete }}></div>
                            Delete
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }

}

export default inject('productStore', 'popupProductStore', 'appStore', 'alertStore', 'notificationStore')(observer(ProductRowMenu));
