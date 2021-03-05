import PagesGeneral from '../../../../../../../builds/dev-generated/PagesGeneral';
import AccountApi from '../../../../common/js/api/AccountApi';
import GeneralApi from '../../../../common/js/api/GeneralApi';
import ShipmentApi from '../../../../common/js/api/ShipmentApi';
import PageComponent, { PageComponentProps } from '../../../../common/js/components-pages/PageComponent';
import AccountSessionStore from '../../../../common/js/stores/AccountSessionStore';
import NotificationStore from '../../../../common/js/stores/NotificationStore';
import ShipmentStore from '../../../../common/js/stores/ShipmentStore';
import SiteStore from '../../../../common/js/stores/SiteStore';
import S from '../../../../common/js/utilities/Main';

export interface ContextPageComponentProps extends PageComponentProps {
    siteStore: SiteStore;
    notificationStore: NotificationStore;
    shipmentStore: ShipmentStore;
    accountSessionStore: AccountSessionStore;
}

export default class ContextPageComponent<Pr extends ContextPageComponentProps, St = {}, SS = any> extends PageComponent<Pr, St, SS> {

    accountApi: AccountApi;
    shipmentApi: ShipmentApi;
    generalApi: GeneralApi;

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

            ++requiredParallelRequests;
            this.generalApi.fetchNotificationsByFilter(S.INT_FALSE, 0, NotificationStore.NOTIFICATION_SHOW_COUNT, (notificationModels, totalSize) => {
                this.props.notificationStore.onScreenData(notificationModels, totalSize);
                onRequest();
            })

            this.generalApi.fetchAllSites((siteModels, countryModels) => {
                this.props.siteStore.onScreenData(siteModels, countryModels);
            })
        });

    }

}
