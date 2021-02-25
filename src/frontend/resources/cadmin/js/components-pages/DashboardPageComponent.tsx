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

interface Props extends ContextPageComponentProps {
}

export default class DashboardPageComponent extends ContextPageComponent < Props > {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DashboardPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDashboard';
    }

    onClickTest = () => {
        const api = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

        const shipmentModel = new ShipmentModel();
        shipmentModel.shipmentName = `Test shipment: ${Date.now()}`;
        api.example(shipmentModel, () => {
            console.log('saved id', shipmentModel.shipmentId);
        });
    }

    renderContent() {
        return (
            <>
                <Header page = { PagesCAdmin.DASHBOARD } />
                <div className = {' PageContent FlexColumn'}>
                    <Notifications />

                    <div className = { 'PageHeader' } onClick = { this.onClickTest } >Request test</div>
                    <div className = { 'PageHeader' }>Dashboard</div>
                    <div className = { 'ContentHolder FlexRow' }>
                        <div className = { 'FlexColumn' }>
                            <div className = { 'FlexRow' }>
                                <div className = { 'TotalShipmentsBox DashboardBox' }>
                                    <div className = { 'DashboardBoxHeader' }>Total Shipments</div>
                                </div>
                                <div className = { 'ProductsInStockBox DashboardBox' }>
                                    <div className = { 'DashboardBoxHeader' }>Products In Stock</div>
                                </div>
                            </div>
                            <div className = { 'RecentShipmentsBox DashboardBox' }>
                                <div className = { 'DashboardBoxHeader' }>Recent Shipments</div>
                            </div>
                        </div>
                        <div className = { 'RightDashboardBox DashboardBox' }>

                        </div>
                    </div>

                    <Chart
                        labels = { ['Label 1', 'Label 2'] }
                        data = { [Chart.makeChartDataSet('Sublabel 1', [1, 2], 'red')] }
                        type = { Chart.TYPE_LINE } />

                </div>
            </>
        )
    }
}
