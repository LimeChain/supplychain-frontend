import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';

import './../../css/components-pages/page-dashboard-component.css';
import Notifications from '../components-inc/Notifications';

interface Props extends ContextPageComponentProps {
}

export default class DashboardPageComponent extends ContextPageComponent < Props > {

    static layout() {
        const MobXComponent = inject('appStore','alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DashboardPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDashboard';
    }


    renderContent() {
        return (
            <>
                <Header page = { PagesCAdmin.DASHBOARD } />
                <div className = {` PageContent FlexColumn`}>
                    <Notifications notifications = {this.props.notificationStore.screenNotificationModels}/>
                    
                    <div className = { `PageHeader` }>Dashboard</div>
                    <div className = { `ContentHolder FlexRow` }>
                        <div className = { `FlexColumn` }>
                            <div className = { `FlexRow` }>
                                <div className = { `TotalShipmentsBox DashboardBox` }>
                                    <div className = { `DashboardBoxHeader` }>Total Shipments</div>
                                </div>
                                <div className = { `ProductsInStockBox DashboardBox` }>
                                    <div className = { `DashboardBoxHeader` }>Products In Stock</div>
                                </div>
                            </div>
                            <div className = { `RecentShipmentsBox DashboardBox` }>
                                <div className = { `DashboardBoxHeader` }>Recent Shipments</div>
                            </div>
                        </div>
                        <div className = { `RightDashboardBox DashboardBox` }>

                        </div>
                    </div>

                </div>
            </>
        )
    }
}
