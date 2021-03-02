import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';

import './../../css/components-pages/page-products-component.css';
import Notifications from '../components-inc/Notifications';
import ProductPopup from '../components-popups/ProductPopup';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import S from '../../../common/js/utilities/Main';
import ProductFilter from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';

interface Props extends ContextPageComponentProps {
    popupProductStore: PopupProductStore;
    productStore: ProductStore;
}

export default class ProductsPageComponent extends ContextPageComponent<Props> {
    dataReady: number;
    productApi: ProductApi;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;
        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'productStore', 'popupProductStore', 'notificationStore', 'siteStore')(observer(ProductsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.productApi.fetchProductsByFilter(S.Strings.EMPTY, 3, 1, (productModels: ProductModel[]) => {
            this.props.productStore.onScreenData(productModels);
            this.dataReady = S.INT_TRUE;
        });
    }

    getPageLayoutComponentCssClassName() {
        return 'PageProducts';
    }


    renderPopups() {
        return super.renderPopups().concat([
            <ProductPopup key={1} />,
        ])
    }

    fetchProducts = () => {
        this.productApi.fetchAllProducts(4, 7, 1, 'DESC', (productModels, totalSize) => {
            console.log(productModels);
            console.log(totalSize);
        });

        this.productApi.fetchProductById('7', (productModel) => {
            console.log(productModel);
        })
    }

    renderContent() {
        return (
            <>
                <Header page={PagesCAdmin.PRODUCTS} />
                <div className={` PageContent FlexColumn`}>
                    <Notifications notifications={this.props.notificationStore.screenNotificationModels} />
                    <div onClick={this.props.popupProductStore.show}>show popup</div>
                    <div onClick={this.fetchProducts}>fetch products</div>
                </div>
            </>
        )
    }
}
