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
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import TableHelper from '../../../common/js/helpers/TableHelper';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import Table from '../../../common/js/components-inc/Table';
import SvgArrowRight from '../../../common/svg/arrow-right.svg';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
}

interface State {
    sortBy: number;
}

export default class DraftsPageComponent extends ContextPageComponent<Props, State> {
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    constructor(props: Props) {
        super(props);

        this.state = {
            sortBy: S.NOT_EXISTS,
        };

        this.tableHelper = new TableHelper(
            ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID,
            [
                [ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 2],
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 4],
                [ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT, 6],
            ],
            this.fetchShipments,
        )

    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(DraftsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.fetchShipments();
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDrafts';
    }

    // jsonSku = (skuId, skuProductId, skuQuantity, skuPricePerUnit, skuCurrency) => {
    //     return {
    //         'skuId': skuId,
    //         'productId': skuProductId,
    //         'quantity': skuQuantity,
    //         'pricePerUnit': skuPricePerUnit,
    //         'currency': skuCurrency,
    //     }
    // }

    // jsonSkuOrigin = (skuOriginId, skuId, shipmentId) => {
    //     return {
    //         'skuOriginId': skuOriginId,
    //         'skuId': skuId,
    //         'shipmentId': shipmentId,
    //     }
    // }

    // jsonShipment = (shipmentId, shipmentConsignmentNumber, name, status, shipmentOriginSiteId, shipmentDestinationSiteId, dateOfShipment, dateOfArrival, shipmentDltAnchored, shipmentDltProof, shipmentDeleted) => {
    //     return {
    //         'shipmentId': shipmentId,
    //         'shipmentConsignmentNumber': shipmentConsignmentNumber,
    //         'shipmentName': name,
    //         'shipmentStatus': status,
    //         'shipmentOriginSiteId': shipmentOriginSiteId,
    //         'shipmentDestinationSiteId': shipmentDestinationSiteId,
    //         'shipmentDateOfShipment': dateOfShipment,
    //         'shipmentDateOfArrival': dateOfArrival,
    //         'shipmentDltAnchored': shipmentDltAnchored,
    //         'shipmentDltProof': shipmentDltProof,
    //         'shipmentDeleted': shipmentDeleted,
    //     }
    // }

    // jsonShipmentDocument = (shipmentDocumentId, shipmentId, documentType, documentUrl) => {
    //     return {
    //         'shipmentDocumentId': shipmentDocumentId,
    //         'shipmentId': shipmentId,
    //         'documentType': documentType,
    //         'shipmentDocumentUrl': documentUrl,
    //     }
    // }

    // saveShipment = () => {
    //     const shipmentModel = ShipmentModel.fromJson(this.jsonShipment('1', 'ererherh', 'Chairs to Germany but edited', ShipmentConstsH.S_STATUS_IN_TRANSIT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE));
    //     // const shipmentModel = ShipmentModel.fromJson(this.jsonShipment(S.Strings.NOT_EXISTS, '155366', 'new shipment test add', ShipmentConstsH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE));

    //     const skuModels = [
    //         SkuModel.fromJson(this.jsonSku('-1', '1', 23, 41, SkuConstsH.S_CURRENCY_EUR)),
    //         SkuModel.fromJson(this.jsonSku('1', '4', 21241243, 411111, SkuConstsH.S_CURRENCY_EUR)),
    //         SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '2', 2342, 412, SkuConstsH.S_CURRENCY_EUR)),
    //         SkuModel.fromJson(this.jsonSku(S.Strings.NOT_EXISTS, '3', 23445, 413, SkuConstsH.S_CURRENCY_EUR)),
    //     ]

    //     const skuOriginModels = [
    //         // SkuOriginModel.fromJson(this.jsonSkuOrigin(1, 2, 2)),
    //         SkuOriginModel.fromJson(this.jsonSkuOrigin(S.Strings.NOT_EXISTS, '-1', '1')),
    //     ]

    //     const shipmentDocumentModels = [
    //         ShipmentDocumentModel.fromJson(this.jsonShipmentDocument(S.Strings.NOT_EXISTS, S.Strings.NOT_EXISTS, ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK, 'aeraerg/aergaergaerg/aerg/aer/ga/er')),
    //     ]

    //     this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, () => {
    //         console.log(shipmentModel);
    //     });
    // }

    fetchShipments = () => {

        this.shipmentApi.fetchShipmentByFilter(
            PagesCAdmin.DRAFTS,
            this.searchWord,
            this.tableHelper.tableState.sortKey,
            this.tableHelper.tableState.from,
            this.tableHelper.tableState.to(),
            (shipmentModels, totalSize) => {
                this.props.shipmentStore.onScreenData(shipmentModels);
                this.tableHelper.tableState.total = totalSize;
            },
        )
    }

    onChangeSearchWord = (searchWord) => {
        this.searchWord = searchWord;
        this.fetchShipments();
    }

    onChangeSortBy = (sortBy) => {
        this.tableHelper.tableState.sortKey = sortBy;
        this.fetchShipments();
    }

    newShipmentPopup = () => {
        this.props.popupShipmentStore.signalShow(new ShipmentModel(), [], []);
    }

    renderContent() {
        return (
            <div className={'PageContent'} >
                <Sidebar page={PagesCAdmin.DRAFTS} />

                <PageView pageTitle={'Drafts'} >
                    {this.props.shipmentStore.screenShipmentModels === null && (
                        'Loading'
                    )}
                    {this.props.shipmentStore.screenShipmentModels !== null && (
                        <>
                            {this.tableHelper.tableState.total === 0 && this.searchWord === S.Strings.EMPTY && (
                                <NoEntryPage modelName='shipment' subText='Create shipment as a draft or submit one' buttonText='New Shipment' buttonFunction={this.newShipmentPopup} />
                            )}
                            {(this.tableHelper.tableState.total > 0 || this.searchWord !== S.Strings.EMPTY) && (
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
                                    <TableDesktop
                                        className={'ShipmentsTable'}
                                        legend={this.getTableLegend()}
                                        widths={this.getTableWidths()}
                                        aligns={this.getTableAligns()}
                                        helper={this.tableHelper}
                                        rows={this.renderRows()}
                                        showPaging={true}
                                    >
                                    </TableDesktop>
                                </PageTable>
                            )}
                        </>
                    )}
                </PageView>

            </div>
        )
    }

    getTableLegend = () => {
        return ['ID', 'Consignment ID', 'Shipped From', '', 'Destination', 'Status', 'Date'];
    }

    renderRows = () => {
        const result = [];

        this.props.shipmentStore.screenShipmentModels.forEach((shipmentModel: ShipmentModel) => {
            const originSiteModel = this.props.siteStore.screenSiteModels.find((siteModel) => siteModel.siteId === shipmentModel.shipmentOriginSiteId);
            const originCountryModel = this.props.siteStore.screenCountryModels.find((countryModel) => countryModel.countryId === originSiteModel.countryId);

            const destinationSiteModel = this.props.siteStore.screenSiteModels.find((siteModel) => siteModel.siteId === shipmentModel.shipmentDestinationSiteId);
            const destinationCountryModel = this.props.siteStore.screenCountryModels.find((countryModel) => countryModel.countryId === destinationSiteModel.countryId);

            result.push([
                Table.cellString(`#${shipmentModel.shipmentId}`),
                Table.cellString(originCountryModel.countryName),
                Table.cell(<div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgArrowRight }}></div>),
                Table.cellString(`${destinationSiteModel.siteName}, ${destinationCountryModel.countryName}`),
                Table.cell(
                    <div className={'ShipmentStatusCell FlexColumn'} >In Transit</div>,
                ),
                Table.cell(
                    <Actions>
                        <Button onClick={() => this.submitShipmentRowAction(shipmentModel.shipmentId)}>
                            Submit
                        </Button>
                    </Actions>,
                ),
            ])
        })

        return result;
    }

    submitShipmentRowAction = (shipmentId) => {
        const shipmentModelClone = this.props.shipmentStore.screenShipmentModels.find((shipmentModel) => shipmentModel.shipmentId === shipmentId).clone();

        shipmentModelClone.shipmentStatus = ShipmentConstsH.S_STATUS_IN_TRANSIT;

        this.shipmentApi.creditShipment(
            shipmentModelClone,
            [],
            [],
            [],
            () => {
                this.props.shipmentStore.screenShipmentModels.find((shipmentModel) => shipmentModel.shipmentId === shipmentId).shipmentStatus = shipmentModelClone.shipmentStatus;
            },
        )
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_LEFT,
        ]
    }

    getTableWidths = () => {
        return ['5%', '10%', '8%', '5%', '47%', '15%', '10%'];
    }
}
