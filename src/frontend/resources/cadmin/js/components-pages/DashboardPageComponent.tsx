import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

import './../../css/components-pages/page-dashboard-component.css';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ProductConstsH from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelHConsts';
import PageView from '../components-inc/PageView';
import Scrollable from '../../../common/js/components-inc/Scrollable';

interface Props extends ContextPageComponentProps {
}

export default class DashboardPageComponent extends ContextPageComponent<Props> {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DashboardPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDashboard';
    }

    onClickTest = () => {
        const productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        const productModel = new ProductModel();
        productModel.productName = 'bbbb';
        productModel.productUnit = ProductConstsH.S_UNIT_PACK;
        productModel.productDescription = 'test product description but edited';
        productApi.creditProduct(productModel, () => {
            console.log('product saved id', productModel.productId);
        })
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.DASHBOARD} />

                <PageView pageTitle={'Dashboard'} >
                    {/* <div className={'PageHeader'} onClick={this.onClickTest} >Request test</div>
                    <div className={'PageHeader'}>Dashboard</div> */}

                    <div className={'Stats MarginBottom'} >
                        <div className={'WhiteBox'} ></div>
                        <div className={'WhiteBox'} ></div>
                        <div className={'WhiteBox'} ></div>
                        <div className={'WhiteBox'} ></div>
                    </div>

                    <div className={'Tables'} >
                        <Scrollable className={'WhiteBox'} >
                            {'some large content'.repeat(1000)}
                        </Scrollable>
                        <Scrollable className={'WhiteBox'} >
                            {'some large content'.repeat(10)}
                        </Scrollable>
                    </div>

                </PageView>

            </div>
        )
    }
}
