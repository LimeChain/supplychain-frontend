import AbsApi from './AbsApi';
import storageHelper from '../helpers/StorageHelper';
import NotificationModel from '../models/NotificationModel';
import { FetchAllSitesReq, FetchNotificationsByFilterReq } from '../network-requests/GeneralApiReq';
import { FetchAllSitesRes, FetchNotificationsByFilterRes } from '../network-responses/GeneralApiRes';
import SiteModel from '../models/SiteModel';
import CountryModel from '../models/CountryModel';
import Api from '../utilities/Api';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';
import Apis from '../../../../../../builds/dev-generated/Apis';

export default class GeneralApi extends AbsApi {

    generalApi: Api

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.generalApi = new Api(Apis.GENERAL, this.enableActions, this.disableActions);
    }

    fetchNotificationsByFilter(notificationRead: number, from: number, to: number, callback: (notificationModels: NotificationModel[], totalSize: number) => void) {
        const req = new FetchNotificationsByFilterReq(notificationRead, from, to);

        this.generalApi.req(Actions.GENERAL.FETCH_NOTIFICATIONS_BY_FILTER, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchNotificationsByFilterRes(json.obj);

            callback(res.notificationModels, res.totalSize);

        });
    }

    fetchAllSites(callback: (siteModels: SiteModel[], countryModels: CountryModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchAllSitesReq();

            const json = {
                siteJsons: storageHelper.sitesJson,
                countryJsons: storageHelper.countriesJson,
            }

            const res = new FetchAllSitesRes(json);
            callback(res.siteModels, res.countryModels);
        }, 100);
    }

}
