import AbsApi from './AbsApi';
import {CreditShipmentReq, FetchShipmentsByFilterReq, FetchShipmentsByIdReq} from '../network-requests/ShipmentApiReq';
import {CreditShipmentRes, FetchShipmentsByFilterRes, FetchShipmentsByIdRes} from '../network-responses/ShipmentApiRes';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import storageHelper from '../helpers/StorageHelper';
import ShipmentStatusConstsH from '../../../../../backend/modules/product-group-module/shipment-module/ShipmentStatusModel.h';
import S from '../utilities/Main';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import SkuModel from '../models/product-module/SkuModel';

export default class ShipmentApi extends AbsApi {

    creditShipment (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], callback: () => void) {
        this.disableActions();
        
        setTimeout(() => {
            this.enableActions();

            const req = new CreditShipmentReq(shipmentModel, skuOriginModels, skuModels);

            let json = {
                shipmentJson: null,
                skuOriginJsons: [],
                skuJsons: [],
            }

            //if not specified set shipment to not sent
            if(shipmentModel.shipmentStatus === undefined){
                shipmentModel.shipmentStatus = ShipmentStatusConstsH.S_STATUS_DRAFT;
            }

            //save shipment to storageHelper
            //set new id or get old one

            json.shipmentJson = {
                shipmentId: S.Strings.NOT_EXISTS
            }

            if (shipmentModel.isNew() === true) {
                let nextId;

                if (storageHelper.shipmentsJson.length > 0) {
                    const lastShipmentJson = storageHelper.shipmentsJson[storageHelper.shipmentsJson.length - 1];
                    nextId = (parseInt(lastShipmentJson.shipmentId) + 1).toString();
                } else {
                    nextId = '1';
                }

                json.shipmentJson.shipmentId = nextId;
            } else {
                const shipmentJson = storageHelper.shipmentsJson.find((t) => t.shipmentId === shipmentModel.shipmentId);
                json.shipmentJson.shipmentId = shipmentJson.shipmentId;
            }

            shipmentModel.shipmentId = json.shipmentJson.shipmentId;
            json.shipmentJson = storageHelper.shipmentsJson.find((t) => t.shipmentId === json.shipmentJson.shipmentId);

            if (json.shipmentJson !== undefined) {
                Object.assign(json.shipmentJson, shipmentModel.toJson());
            } else {
                storageHelper.shipmentsJson.push(shipmentModel.toJson());
                json.shipmentJson = shipmentModel.toJson();
            }


            //save skuModels to storageHelper
            skuModels.forEach((skuModel) => {
                let skuId = S.Strings.NOT_EXISTS;

                //set new id or get old one
                if (skuModel.isNew() === true) {
                    let nextId;

                    if (storageHelper.skusJson.length > 0) {
                        const lastSkusJson = storageHelper.skusJson[storageHelper.skusJson.length - 1];
                        nextId = (parseInt(lastSkusJson.skuId) + 1).toString();
                    } else {
                        nextId = '1';
                    }

                    skuId = nextId;

                    //change referenceId in origin to new actual id
                    let skuOriginModel = skuOriginModels.find((skuOriginModel) => skuOriginModel.skuId === skuModel.skuId)
                    if(skuOriginModel !== undefined){
                        skuOriginModel.skuId = skuId;
                    }
                } else {
                    skuId = skuModel.skuId;
                }

                skuModel.skuId = skuId;
                
                let skuJson = storageHelper.skusJson.find((s) => s.skuId === skuId);

                if (skuJson !== undefined) {
                    Object.assign(skuJson, skuModel.toJson());
                } else {
                    skuJson = skuModel.toJson();
                    storageHelper.skusJson.push(skuJson);
                }

                json.skuJsons.push(skuJson);
            })


            //save shkuOrigins to storageHelper
            skuOriginModels.forEach((skuOriginModel) => {
                let skuOriginId = S.Strings.NOT_EXISTS;

                //set new id or get old one
                if (skuOriginModel.isNew() === true) {
                    let nextId;
                    
                    if (storageHelper.skuOriginsJson.length > 0) {
                        const lastSkuOriginJson = storageHelper.skuOriginsJson[storageHelper.skuOriginsJson.length - 1];
                        nextId = (parseInt(lastSkuOriginJson.skuOriginId) + 1).toString();
                    } else {
                        nextId = '1';
                    }

                    skuOriginId = nextId;
                } else {
                    skuOriginId = skuOriginModel.skuOriginId;
                }

                skuOriginModel.skuOriginId = skuOriginId;
                
                let skuOriginJson = storageHelper.skuOriginsJson.find((s) => s.skuOriginId === skuOriginId);
                
                if (skuOriginJson !== undefined) {
                    Object.assign(skuOriginJson, skuOriginModel.toJson());
                } else {
                    skuOriginJson = skuOriginModel.toJson();
                    storageHelper.skuOriginsJson.push(skuOriginJson);
                }

                skuOriginJson.shipmentId = json.shipmentJson.shipmentId;

                json.skuOriginJsons.push(skuOriginJson);
            })

            
            const res = new CreditShipmentRes(json);

            storageHelper.save();
            callback(res);
        }, 100);
    }

    fetchShipmentByFilter(filter: string, pageSize: number, pageNumber: number, callback: (shipmentModels: ShipmentModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchShipmentsByFilterReq(filter, pageSize, pageNumber);
            
            //Server code
            const json = {
                shipmentJsons: [],
            }

            if(filter !== S.Strings.EMPTY && typeof filter === 'string'){
                storageHelper.shipmentsJson.forEach((shipmentJson: ShipmentModel) => {
                    
                    let occurance = 0;  

                    if(shipmentJson.shipmentId.includes(filter)){
                        occurance++;
                    }

                    if(shipmentJson.shipmentName.includes(filter)){
                        occurance++;
                    }

                    let originSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentOriginSiteId);
                    let originCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === originSite.countryId);
                    if(originSite.siteName.includes(filter)){
                        occurance++;
                    }
                    if(originCountry.countryName.includes(filter)){
                        occurance++;
                    }

                    let destinationSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentDestinationSiteId);
                    let destinationCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === destinationSite.countryId);
                    if(destinationSite.siteName.includes(filter)){
                        occurance++;
                    }
                    if(destinationCountry.countryName.includes(filter)){
                        occurance++;
                    }
                    
                    if(new Date(shipmentJson.shipmentDateOfShipment).formatCalendarDateAndTime().includes(filter)){
                        occurance++;
                    }

                    if(new Date(shipmentJson.shipmentDateOfArrival).formatCalendarDateAndTime().includes(filter)){
                        occurance++;
                    }

                    shipmentJson.occurance = occurance;

                    json.shipmentJsons.push(shipmentJson);
                });
            }
            
            json.shipmentJsons.sort((a, b) => a.occurance > b.occurance ? 1:-1)

            let totalSize = json.shipmentJsons.length;
            let sliceBegin = totalSize - pageNumber * pageSize;
            let sliceEnd = sliceBegin + pageSize;
            
            json.shipmentJsons = json.shipmentJsons.slice(sliceBegin < 0 ? 0 : sliceBegin, sliceEnd);
            //end server code

            const res = new FetchShipmentsByFilterRes(json);

            callback(res.shipmentModels);
        }, 100);
    }

    fetchShipmentById(shipmentId: string, callback: (shipmentModel: ShipmentModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchShipmentsByIdReq(shipmentId);
            
            //Server code
            let json = {
                shipmentJson: storageHelper.shipmentsJson.find((shipmentJson) => shipmentJson.shipmentId === shipmentId),
            
            }

            console.log(json);
            
            const res = new FetchShipmentsByIdRes(json);

            callback(res.shipmentModel);
    }, 100);
}

}