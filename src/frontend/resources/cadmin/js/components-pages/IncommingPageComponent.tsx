import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

import './../../css/components-pages/page-incomming-component.css';
import Notifications from '../components-inc/Notifications';

interface Props extends ContextPageComponentProps {
}

export default class IncommingPageComponent extends ContextPageComponent<Props> {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(IncommingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageIncomming';
    }

    renderContent() {
        return (
            <>
                <Sidebar page={PagesCAdmin.INCOMMING} />
                <div className={' PageContent FlexColumn'}>
                    <Notifications notifications={this.props.notificationStore.screenNotificationModels} />
                </div>
            </>
        )
    }
}
