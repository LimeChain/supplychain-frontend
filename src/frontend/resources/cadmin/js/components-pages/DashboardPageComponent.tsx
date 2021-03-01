import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';

import './../../css/components-pages/page-dashboard-component.css';
import Notifications from '../components-inc/Notifications';
import Chart from '../../../common/js/components-inc/Chart';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ProductModelH from '../../../../../backend/modules/ProductModule/Product/Model/ProductModelH';
import ProductConstsH from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelHConsts';

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
        productModel.productName = 'test product name2';
        productModel.productUnit = ProductConstsH.S_UNIT_KG;
        productModel.productDescription = 'test product description';

        productApi.creditProduct(productModel, () => {
            console.log('product saved id', productModel.productId);
        })
    }

    renderContent() {
        return (
            <>
                <Header page={PagesCAdmin.DASHBOARD} />
                <div className={' PageContent FlexColumn'}>
                    <Notifications />

                    <div className={'PageHeader'} onClick={this.onClickTest} >Request test</div>
                    <div className={'PageHeader'}>Dashboard</div>
                    <div className={'ContentHolder FlexRow'}>
                        <div className={'FlexColumn'}>
                            <div className={'FlexRow'}>
                                <div className={'TotalShipmentsBox DashboardBox'}>
                                    <div className={'DashboardBoxHeader'}>Total Shipments</div>
                                </div>
                                <div className={'ProductsInStockBox DashboardBox'}>
                                    <div className={'DashboardBoxHeader'}>Products In Stock</div>
                                </div>
                            </div>
                            <div className={'RecentShipmentsBox DashboardBox'}>
                                <div className={'DashboardBoxHeader'}>Recent Shipments</div>
                            </div>
                        </div>
                        <div className={'RightDashboardBox DashboardBox'}>

                        </div>
                    </div>

                </div>
            </>
        )
    }
}
