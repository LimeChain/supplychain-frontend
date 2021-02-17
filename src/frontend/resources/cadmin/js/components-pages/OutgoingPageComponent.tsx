import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';

import './../../css/components-pages/page-outgoing-component.css';
import Notifications from '../components-inc/Notifications';

interface Props extends ContextPageComponentProps {
}

export default class OutgoingPageComponent extends ContextPageComponent < Props > {

    static layout() {
        const MobXComponent = inject('appStore','alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(OutgoingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageOutgoing';
    }

    renderContent() {
        return (
            <>
                <Header page = { PagesCAdmin.OUTGOING} />
                <div className = {` PageContent FlexColumn`}>
                    <Notifications notifications = {this.props.notificationStore.screenNotificationModels}/>
                </div>
            </>
        )
    }
}
