import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

import './../../css/components-pages/page-drafts-component.css';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import S from '../../../common/js/utilities/Main';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentDocumentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';
import { CreditShipmentRes } from '../../../common/js/network-responses/ShipmentApiRes';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuConstsH from '../../../../../../builds/dev-generated/ProductModule/Sku/SkuModelHConsts';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import PageView from '../components-inc/PageView';
import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';

import PageTableFooter from '../components-inc/PageTableFooter';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import NoEntryPage from '../components-inc/NoEntryPage';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
}

interface State {
    searchWord: string;
    sortBy: number;
}

export default class DraftsPageComponent extends ContextPageComponent<Props, State> {
    dataReady: number;
    shipmentsApi: ShipmentApi;
    showNoEntryPage: boolean = false;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

        this.state = {
            searchWord: S.Strings.EMPTY,
            sortBy: S.NOT_EXISTS,
        };
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DraftsPageComponent));
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

    jsonShipment = (shipmentId, shipmentConsignmentNumber, name, status, shipmentOriginSiteId, shipmentDestinationSiteId, dateOfShipment, dateOfArrival, shipmentDltAnchored, shipmentDltProof, shipmentDeleted) => {
        return {
            'shipmentId': shipmentId,
            'shipmentConsignmentNumber': shipmentConsignmentNumber,
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
            'shipmentDocumentUrl': documentUrl,
        }
    }

    saveShipment = () => {
        const shipmentModel = ShipmentModel.fromJson(this.jsonShipment('1', 'ererherh', 'Chairs to Germany but edited', ShipmentConstsH.S_STATUS_IN_TRANSIT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE));
        // const shipmentModel = ShipmentModel.fromJson(this.jsonShipment(S.Strings.NOT_EXISTS, '155366', 'new shipment test add', ShipmentConstsH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE));

        const skuModels = [
            SkuModel.fromJson(this.jsonSku('-1', '1', 23, 41, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku('1', '4', 21241243, 411111, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '2', 2342, 412, SkuConstsH.S_CURRENCY_EUR)),
            SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '3', 23445, 413, SkuConstsH.S_CURRENCY_EUR)),
        ]

        const skuOriginModels = [
            // SkuOriginModel.fromJson(this.jsonSkuOrigin(1, 2, 2)),
            SkuOriginModel.fromJson(this.jsonSkuOrigin(S.Strings.NOT_EXISTS, '-1', '1')),
        ]

        const shipmentDocumentModels = [
            ShipmentDocumentModel.fromJson(this.jsonShipmentDocument(S.Strings.NOT_EXISTS, S.Strings.NOT_EXISTS, ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK, 'aeraerg/aergaergaerg/aerg/aer/ga/er')),
        ]

        this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, () => {
            console.log(shipmentModel);
        });
    }

    fetchShipments = () => {
        const filter = 'germany';

        // this.shipmentApi.fetchShipmentByFilter(
        //     null,
        //     S.Strings.EMPTY,
        //     ShipmentConstsH.S_STATUS_DRAFT,
        //     null,
        //     null,
        //     null,
        //     null,
        //     1,
        //     0,
        //     1,
        //     (shipmentModels, totalSize) => {
        //         console.log(shipmentModels);
        //         console.log(totalSize);

        //     }
        // )

        this.shipmentApi.fetchShipmentById('1', (shipmentModel) => {
            console.log(shipmentModel);
        })
    }

    onChangeSearchWord = (searchWord) => {
        this.setState({
            searchWord,
        });
    }

    onChangeSortBy = (sortBy) => {
        this.setState({
            sortBy,
        });
    }

    newShipmentPopup = () => {
        // TODO: open new shipment popup

    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.DRAFTS} />

                <PageView pageTitle={'Drafts'} >
                    {this.showNoEntryPage === true && (
                        <NoEntryPage modelName='shipment' subText='Create shipment as a draft or submit one' buttonText='New Shipment' buttonFunction={this.newShipmentPopup} />
                    )}
                    {this.showNoEntryPage === false && (
                        <PageTable
                            className={'WhiteBox PageExtend'}
                            header={(
                                <PageTableHeader
                                    searchPlaceHolder={'Search drafts'}
                                    selectedSortBy={this.state.sortBy}
                                    options={[
                                        new PageTableHeaderSortByStruct(5, 'Name'),
                                        new PageTableHeaderSortByStruct(10, 'Site'),
                                    ]}
                                    onChangeSearchWord={this.onChangeSearchWord}
                                    onChangeSortBy={this.onChangeSortBy} />
                            )}
                            footer={(
                                <PageTableFooter
                                    totalItems={5}
                                    actions={(
                                        <Actions>
                                            <Button>
                                                <div className={'FlexRow'}>
                                                    <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                            Add product
                                                </div>
                                            </Button>
                                        </Actions>
                                    )} />
                            )} >
                            {'some large content'.repeat(10)}
                        </PageTable>
                    )}
                </PageView>

            </div>

        // <>
        //     <Header page={PagesCAdmin.DRAFTS} />
        //     <div className={' PageContent FlexColumn'}>
        //         <Notifications />
        //         <div onClick={this.saveShipment}>add shipment</div>
        //         <div onClick={this.fetchShipments}>fetch shipments</div>
        //     </div>
        // </>
        )
    }
}
