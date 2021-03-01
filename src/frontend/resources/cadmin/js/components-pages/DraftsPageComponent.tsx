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
import ShipmentDocumentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';
import { CreditShipmentRes } from '../../../common/js/network-responses/ShipmentApiRes';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuConstsH from '../../../../../../builds/dev-generated/ProductModule/Sku/SkuModelHConsts';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
}

export default class DraftsPageComponent extends ContextPageComponent<Props> {
    dataReady: number;
    shipmentsApi: ShipmentApi;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DraftsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadDate() {
        await super.loadData();
    }


    getPageLayoutComponentCssClassName() {
        return 'PageDrafts';
    }

    jsonSku = (skuId, skuProductId, skuQuantity, skuPricePerUnit, skuCurrency) => {
        return {
            'skuId': skuId,
            'productId': skuProductId,
            'quantity': skuQuantity,
            'pricePerUnit': skuPricePerUnit,
            'currency': skuCurrency,
        }
    }

    jsonSkuOrigin = (skuOriginId, skuId, shipmentId) => {
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

    jsonShipmentDocument = (shipmentDocumentId, shipmentId, documentType, documentUrl) => {
        return {
            'shipmentDocumentId': shipmentDocumentId,
            'shipmentId': shipmentId,
            'documentType': documentType,
            'documentUdl': documentUrl,
        }
    }

    saveShipment = () => {
        let shipmentModel =
            //ShipmentModel.fromJson(this.jsonShipment('1', 'Chairs to Germany but edited', ShipmentConstsH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 'First shipment'));
            ShipmentModel.fromJson(this.jsonShipment(S.Strings.NOT_EXISTS, 'new shipment test add', ShipmentConstsH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE));

        let skuModels = [
            SkuModel.fromJson(this.jsonSku('-1', '1', 23, 41, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku('1', '4', 21241243, 411111, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '2', 2342, 412, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '3', 23445, 413, SkuConstsH.S_CURRENCY_EUR)),
        ]

        let skuOriginModels = [
            // SkuOriginModel.fromJson(this.jsonSkuOrigin(1,1,1)),
            SkuOriginModel.fromJson(this.jsonSkuOrigin(S.Strings.NOT_EXISTS, '-1', '1')),
        ]

        let shipmentDocumentModels = [
            ShipmentDocumentModel.fromJson(this.jsonShipmentDocument(S.Strings.NOT_EXISTS, S.Strings.NOT_EXISTS, ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK, 'aeraerg/aergaergaerg/aerg/aer/ga/er'))
        ]

        this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, () => {
            console.log(shipmentModel);
        });
    }

    fetchShipments = () => {
        let filter = 'germany';

        this.shipmentApi.fetchShipmentByFilter(filter, 3, 1, (shipmentModels) => {
            console.log(shipmentModels);
        })

        this.shipmentApi.fetchShipmentById('1', (shipmentModel) => {
            console.log(shipmentModel);
        })
    }

    renderContent() {
        return (
            <>
                <Header page={PagesCAdmin.DRAFTS} />
                <div className={` PageContent FlexColumn`}>
                    <Notifications />
                    <div onClick={this.saveShipment}>add shipment</div>
                    <div onClick={this.fetchShipments}>fetch shipments</div>
                </div>
            </>
        )
    }
}
