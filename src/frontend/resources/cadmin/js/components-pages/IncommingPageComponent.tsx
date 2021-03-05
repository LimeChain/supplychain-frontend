import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';
import PageView from '../components-inc/PageView';

import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';

interface Props extends ContextPageComponentProps {
}

export default class IncommingPageComponent extends ContextPageComponent < Props > {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(IncommingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageIncomming';
    }

    renderContent() {
        return (
            <div className = { 'PageContent' } >

                <Header page = { PagesCAdmin.INCOMMING } />

                <PageView pageTitle = { 'Incoming Shipments' } >
                    <div className = { 'WhiteBox PageExtend' } >
                        <PageTable
                            header = { '1' }
                            footer = { '1' } >
                            {'some large content'.repeat(1000)}
                        </PageTable>
                    </div>
                </PageView>

            </div>
            // <>
            //     <Header page = { PagesCAdmin.INCOMMING} />
            //     <div className = {` PageContent FlexColumn`}>
            //         <Notifications notifications = {this.props.notificationStore.screenNotificationModels}/>
            //     </div>
            // </>
        )
    }
}
