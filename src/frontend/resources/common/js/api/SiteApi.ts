import AbsApi from './AbsApi';
import storageHelper from '../helpers/StorageHelper';
import {UploadShipmentDocumentReq} from '../network-requests/ShipmentDocumentApiReq';
import {UploadShipmentDocumentRes} from '../network-responses/ShipmentDocumentApiRes';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';
import { FetchAllSitesReq } from '../network-requests/SiteApiReq';
import { FetchAllSitesRes } from '../network-responses/SiteApiRes';
import SiteModel from '../models/SiteModel';
import CountryModel from '../models/CountryModel';

export default class SiteApi extends AbsApi {
    fetchAllSites( callback: (siteModels: SiteModel[], countryModels: CountryModel[]) => void) {
        this.disableActions();
        
        setTimeout(() => {
            this.enableActions();

            const req = new FetchAllSitesReq();

            let json = {
                siteJsons: storageHelper.sitesJson,
                countryJsons: storageHelper.countriesJson,
            }

            
            const res = new FetchAllSitesRes(json);
            callback(res.siteModels, res.countryModels);
        }, 100);
    }
}