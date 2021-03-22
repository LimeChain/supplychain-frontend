import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import S from '../../../common/js/utilities/Main';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import PageTableFooter from '../components-inc/PageTableFooter';
import Sidebar from '../components-inc/Sidebar';
import PageView from '../components-inc/PageView';
import PageTable from '../components-inc/PageTable';
import Button from '../../../common/js/components-inc/Button';
import NoEntryPage from '../components-inc/NoEntryPage';
import Actions from '../../../common/js/components-inc/Actions';
import SvgArrowRight from '../../../common/svg/arrow-right.svg';

import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import TableHelper from '../../../common/js/helpers/TableHelper';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import Table from '../../../common/js/components-inc/Table';
import moment from 'moment';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import PopupStore from '../../../common/js/stores/PopupStore';
import PopupSubmitShipmentStatusStore from '../../../common/js/stores/PopupSubmitShipmentStatusStore';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
    popupSubmitShipmentStatusStore: PopupSubmitShipmentStatusStore;
}

interface State {
    sortBy: number;
}

export default class IncommingPageComponent extends ContextPageComponent<Props, State> {
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    static layout() {
        const MobXComponent = inject(...[...PageComponent.getStores(), ...ContextPageComponent.getStores(), 'shipmentStore', 'popupSubmitShipmentStatusStore'])(observer(IncommingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            sortBy: S.NOT_EXISTS,
        };

        this.tableHelper = new TableHelper(
            ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER,
            [
                [ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER, 1],
                [ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 2],
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 4],
                [ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT, 6],
            ],
            this.fetchShipments,
            8,
        )
    }

    getPageLayoutComponentCssClassName() {
        return 'PageIncomming';
    }

    async loadData() {
        await super.loadData();

        this.fetchShipments();
    }

    fetchShipments = () => {
        const tableState = this.tableHelper.tableState;
        this.shipmentApi.fetchShipmentByFilter(ShipmentFilter.S_PAGE_STATUS_INCOMMING, this.searchWord, tableState.sortKey, tableState.from, tableState.to(), (shipmentModels, totalSize) => {
            this.props.shipmentStore.onScreenData(shipmentModels);
            this.tableHelper.tableState.total = totalSize;
        });
    }

    onChangeSearchWord = (searchWord) => {
        this.searchWord = searchWord;
        this.fetchShipments();
    }

    onChangeSortBy = (sortBy) => {
        this.tableHelper.tableState.sortKey = sortBy;
        this.fetchShipments();
    }

    onClickReceiveShipmentRowAction = (sourceShipmentModel: ShipmentModel, e) => {
        e.stopPropagation();

        const alertStore = this.props.alertStore;
        alertStore.msg = 'Are you sure you want to receive shipment?';
        alertStore.subMsg = 'This action cannot be reversed';
        alertStore.positiveLabel = 'Receive';
        alertStore.negativeLabel = 'Cancel';
        alertStore.positiveListener = () => {
            const run = async () => {
                const shipmentId = sourceShipmentModel.shipmentId;
                this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
                    shipmentModel.receiveShipment();
                    this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, () => {
                        Object.assign(sourceShipmentModel, shipmentModel);
                        this.props.popupSubmitShipmentStatusStore.signalShow(PopupSubmitShipmentStatusStore.ACTION_NAME_RECEIVED);
                        setTimeout(() => {
                            this.props.popupSubmitShipmentStatusStore.hide();
                        }, 2000);
                    });
                });
            }
            run();
        }
        alertStore.visible = true;
    }

    onClickCreateNewShipment = () => {
        const shipmentModel = ShipmentModel.newInstanceByOriginSiteId(this.props.accountSessionStore.accountModel.siteId);
        this.props.popupShipmentStore.signalShow(shipmentModel, [], [], [], () => {
            // creating a shipment from incoming page results in no any change on this page so we can do nothing
        });
    }

    onClickShipment = (i: number) => {
        const sourceShipmentModel = this.props.shipmentStore.screenShipmentModels[i];
        const shipmentId = sourceShipmentModel.shipmentId;
        this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
            this.props.popupShipmentStore.signalShow(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, (savedShipmentModel: ShipmentModel) => {
                if (savedShipmentModel.isReceived() === true) {
                    Object.assign(sourceShipmentModel, savedShipmentModel);
                }
            });
        });

    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.INCOMMING} />

                <PageView pageTitle={'Incoming Shipments'} >
                    {this.props.shipmentStore.screenShipmentModels === null && (
                        <LoadingIndicator margin={'auto'} />
                    )}
                    {this.props.shipmentStore.screenShipmentModels !== null && (
                        <>
                            {this.tableHelper.tableState.total === 0 && this.searchWord === S.Strings.EMPTY && (
                                <NoEntryPage modelName='shipment' subText='Create shipment as a draft or submit one' buttonText='New Shipment' buttonFunction={this.onClickCreateNewShipment} />
                            )}
                            {(this.tableHelper.tableState.total > 0 || this.searchWord !== S.Strings.EMPTY) && (
                                <PageTable
                                    className={'WhiteBox PageExtend'}
                                    header={(
                                        <PageTableHeader
                                            searchPlaceHolder={'Search incoming shipments'}
                                            selectedSortBy={this.tableHelper.tableState.sortKey}
                                            options={[
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER, 'Consignment Number'),
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 'Shipped From'),
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 'Destination'),
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT, 'Date'),
                                            ]}
                                            onChangeSearchWord={this.onChangeSearchWord}
                                            onChangeSortBy={this.onChangeSortBy} />
                                    )}
                                    footer={(
                                        <PageTableFooter
                                            totalItems={this.tableHelper.tableState.total}
                                        // actions={(
                                        //     <Actions>
                                        //         <Button onClick={this.onClickCreateNewShipment}>
                                        //             <div className={'FlexRow'}>
                                        //                 <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                        //         Create Shipment
                                        //             </div>
                                        //         </Button>
                                        //     </Actions>
                                        // )}
                                        />
                                    )} ><Table
                                        className={'ShipmentsTable'}
                                        legend={this.getTableLegend()}
                                        widths={this.getTableWidths()}
                                        aligns={this.getTableAligns()}
                                        helper={this.tableHelper}
                                        rows={this.renderRows()}
                                        onClickRow={this.onClickShipment} />
                                </PageTable>
                            )}
                        </>
                    )}
                </PageView>

            </div >
        )
    }

    renderRows = () => {
        const result = [];

        this.props.shipmentStore.screenShipmentModels.forEach((shipmentModel: ShipmentModel) => {
            const originSiteModel = this.props.siteStore.screenSiteModels.find((siteModel) => siteModel.siteId === shipmentModel.shipmentOriginSiteId);
            const originCountryModel = this.props.siteStore.screenCountryModels.find((countryModel) => countryModel.countryId === originSiteModel.countryId);

            const destinationSiteModel = this.props.siteStore.screenSiteModels.find((siteModel) => siteModel.siteId === shipmentModel.shipmentDestinationSiteId);
            const destinationCountryModel = this.props.siteStore.screenCountryModels.find((countryModel) => countryModel.countryId === destinationSiteModel.countryId);

            const statusString = '';

            result.push([
                Table.cellString(`#${shipmentModel.shipmentId}`),
                Table.cellString(shipmentModel.shipmentConsignmentNumber),
                Table.cellString(originCountryModel.countryName),
                Table.cell(<div className={'SVG IconDestination'} dangerouslySetInnerHTML={{ __html: SvgArrowRight }}></div>),
                Table.cellString(`${destinationSiteModel.siteName}, ${destinationCountryModel.countryName}`),
                Table.cell(
                    <Actions>
                        <Button color={shipmentModel.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >{shipmentModel.getStatusString()}</Button>
                    </Actions>,
                ),
                Table.cellString(moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY'), 'ShipmentDateCell'),
                Table.cell(
                    <Actions>
                        <Button color={shipmentModel.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} disabled={shipmentModel.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED} onClick={(e) => this.onClickReceiveShipmentRowAction(shipmentModel, e)}>
                            Goods Received
                        </Button>
                    </Actions>,
                ),
            ])
        })

        return result;
    }

    getTableLegend = () => {
        return ['ID', 'Consignment ID', 'Shipped From', '', 'Destination', 'Status', 'Date', 'Action'];
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
            TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return ['5%', '15%', '10%', '5%', '30%', '15%', '5%', '15%'];
    }
}
