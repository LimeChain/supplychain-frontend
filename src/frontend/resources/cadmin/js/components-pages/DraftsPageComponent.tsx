import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';

import './../../css/components-pages/page-drafts-component.css';
import Notifications from '../components-inc/Notifications';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import S from '../../../common/js/utilities/Main';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentStatusModelH from '../../../../../backend/modules/product-group-module/shipment-module/ShipmentStatusModel.h';
import { CreditShipmentRes } from '../../../common/js/network-responses/ShipmentApiRes';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import CurrencyModelH from '../../../../../backend/modules/product-group-module/product-module/CurrencyModel.h';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
}

export default class DraftsPageComponent extends ContextPageComponent < Props > {
    dataReady: number;
    shipmentsApi: ShipmentApi;

    constructor(props: Props){
        super(props);
        this.dataReady = S.INT_FALSE;
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    static layout() {
        const MobXComponent = inject('appStore','alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DraftsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadDate() {
        await super.loadData();
    }


    getPageLayoutComponentCssClassName() {
        return 'PageDrafts';
    }

    jsonSku = ( skuId, skuProductId, skuQuantity, skuPricePerUnit, skuCurrency) => {
        return {
            'skuId': skuId,
            'skuProductId': skuProductId,
            'skuQuantity': skuQuantity,
            'skuPricePerUnit': skuPricePerUnit,
            'skuCurrency': skuCurrency,
        }
    }

    jsonSkuOrigin = ( skuOriginId, skuId, shipmentId) => {
        return {
            'skuOriginId': skuOriginId,
            'skuId': skuId,
            'shipmentId': shipmentId,
        }
    }

    jsonShipment = (shipmentId, name, status, shipmentOriginSiteId, shipmentDestinationSiteId, dateOfShipment, dateOfArrival, shipmentDltAnchored, shipmentDltProof, shipmentDeleted) => {
        return {
            'shipmentId': shipmentId,
            'shipmentName': name,
            'shipmentStatus': status,
            'shipmentOriginSiteId': shipmentOriginSiteId,
            'shipmentDestinationSiteId': shipmentDestinationSiteId,
            'shipmentDateOfShipment': dateOfShipment,
            'shipmentDateOfArrival': dateOfArrival,
            'shipmentDltAnchored': shipmentDltAnchored,
            'shipmentDltProof': shipmentDltProof,
            'shipmentDeleted': shipmentDeleted,
        }
    }

    saveShipment = () => {
        let shipmentModel = 
            //ShipmentModel.fromJson(this.jsonShipment('1', 'Chairs to Germany but edited', ShipmentStatusModelH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 'First shipment'));
             ShipmentModel.fromJson(this.jsonShipment(S.Strings.NOT_EXISTS, 'new shipment test add', ShipmentStatusModelH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS,1,1,S.INT_FALSE));
        
        let skuModels = [
            SkuModel.fromJson(this.jsonSku('-1', '1', 23, 41, CurrencyModelH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku('1', '4', 21241243, 411111, CurrencyModelH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '2', 2342, 412, CurrencyModelH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '3', 23445, 413, CurrencyModelH.S_CURRENCY_EUR)),
        ]
     
        let skuOriginModels = [
            SkuOriginModel.fromJson(this.jsonSkuOrigin(1,1,1)),
            SkuOriginModel.fromJson(this.jsonSkuOrigin(S.Strings.NOT_EXISTS,'-1','1')),
        ]

        this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, (res: CreditShipmentRes) =>{
            console.log(res);
        });
    }

    fetchShipments = () => {
        let filter = 'germany';

        this.shipmentApi.fetchShipmentByFilter(filter, 3,1,(shipmentModels) => {
            console.log(shipmentModels);
        })

        this.shipmentApi.fetchShipmentById('1', (shipmentModel) => {
            console.log(shipmentModel);
        })
    }

    renderContent() {
        return (
            <>
                <Header page = { PagesCAdmin.DRAFTS} />
                <div className = {` PageContent FlexColumn`}>
                    <Notifications notifications = {this.props.notificationStore.screenNotificationModels}/>
                    <div onClick = { this.saveShipment }>add shipment</div>
                    <div onClick = { this.fetchShipments }>fetch shipments</div>
                </div>
            </>
        )
    }
}
