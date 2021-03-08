import React from 'react';

import PagesGeneral from '../../../../../../../builds/dev-generated/PagesGeneral';

import AccountApi from '../../../../common/js/api/AccountApi';
import GeneralApi from '../../../../common/js/api/GeneralApi';
import ShipmentApi from '../../../../common/js/api/ShipmentApi';
import AccountSessionStore from '../../../../common/js/stores/AccountSessionStore';
import NotificationStore from '../../../../common/js/stores/NotificationStore';
import PopupProductStore from '../../../../common/js/stores/PopupProductStore';
import PopupShipmentStore from '../../../../common/js/stores/PopupShipmentStore';
import ShipmentStore from '../../../../common/js/stores/ShipmentStore';
import SiteStore from '../../../../common/js/stores/SiteStore';
import ProductPopup from '../../components-popups/ProductPopup';
import ShipmentPopup from '../../components-popups/ShipmentPopup';

import PageComponent, { PageComponentProps } from '../../../../common/js/components-pages/PageComponent';

export interface ContextPageComponentProps extends PageComponentProps {
    accountSessionStore: AccountSessionStore;
    notificationStore: NotificationStore;
    siteStore: SiteStore;
    popupProductStore: PopupProductStore,
    popupShipmentStore: PopupShipmentStore,
}

export default class ContextPageComponent<Pr extends ContextPageComponentProps, St = {}, SS = any> extends PageComponent<Pr, St, SS> {

    accountApi: AccountApi;
    shipmentApi: ShipmentApi;
    generalApi: GeneralApi;

    static getStores() {
        return ['accountSessionStore', 'notificationStore', 'siteStore', 'popupProductStore', 'popupShipmentStore'];
    }

    constructor(props: Pr) {
        super(props);

        this.accountApi = new AccountApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.generalApi = new GeneralApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    async loadData() {
        this.props.appStore.incrementLoading();
        await super.loadData();

        return new Promise<void>((resolve, reject) => {
            let requiredParallelRequests = 0;
            let madeParallelRequests = 0;

            const onRequest = () => {
                ++madeParallelRequests;
                if (requiredParallelRequests === madeParallelRequests) {
                    this.props.appStore.decrementLoading();
                    resolve();
                }
            };

            ++requiredParallelRequests;
            this.accountApi.fetchSessionAccount((accountModel) => {
                if (accountModel === null) {
                    window.location.href = PagesGeneral.LOGIN;
                    return;
                }

                this.props.accountSessionStore.accountModel = accountModel;
                onRequest();
            });

            // ++requiredParallelRequests;
            // this.generalApi.fetchNotificationsByFilter(S.INT_FALSE, 0, NotificationStore.NOTIFICATION_SHOW_COUNT, (notificationModels, totalSize) => {
            //     this.props.notificationStore.onScreenData(notificationModels, totalSize);
            //     onRequest();
            // })

            this.generalApi.fetchAllSites((siteModels, countryModels) => {
                this.props.siteStore.onScreenData(siteModels, countryModels);
            })
        });

    }

    renderPopups() {
        return super.renderPopups().concat([
            <ProductPopup key = { 100 } />,
            <ShipmentPopup key = { 200 } />,
        ]);
    }

}
