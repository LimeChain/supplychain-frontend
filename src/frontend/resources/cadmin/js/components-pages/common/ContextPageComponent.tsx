import NotificationApi from '../../../../common/js/api/NotificationApi';
import ShipmentApi from '../../../../common/js/api/ShipmentApi';
import SiteApi from '../../../../common/js/api/SiteApi';

import PageComponent, { PageComponentProps } from '../../../../common/js/components-pages/PageComponent';
import NotificationStore from '../../../../common/js/stores/NotificationStore';
import ShipmentStore from '../../../../common/js/stores/ShipmentStore';
import SiteStore from '../../../../common/js/stores/SiteStore';
import S from '../../../../common/js/utilities/Main';

export interface ContextPageComponentProps extends PageComponentProps {
    siteStore: SiteStore;
    notificationStore: NotificationStore;
    shipmentStore: ShipmentStore;
}

export default class ContextPageComponent < Pr extends ContextPageComponentProps, St = {}, SS = any > extends PageComponent < Pr, St, SS > {
    shipmentApi: ShipmentApi;
    notificationApi: NotificationApi;
    siteApi: SiteApi;

    constructor(props: Pr) {
        super(props);
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.notificationApi = new NotificationApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.siteApi = new SiteApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
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
            this.notificationApi.fetchNotificationsByFilter(S.INT_FALSE, 0, NotificationStore.NOTIFICATION_SHOW_COUNT, (notificationModels, totalSize) => {
                this.props.notificationStore.onScreenData(notificationModels, totalSize);
                onRequest();
            })

            this.siteApi.fetchAllSites((siteModels, countryModels) => {
                this.props.siteStore.onScreenData(siteModels, countryModels);
            })
        });

    }

}
