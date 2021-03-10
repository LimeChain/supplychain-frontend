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
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;

}

interface State {
    sortBy: number;
}

export default class IncommingPageComponent extends ContextPageComponent<Props, State> {
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    static layout() {
        const MobXComponent = inject(...[...PageComponent.getStores(), ...ContextPageComponent.getStores(), 'shipmentStore'])(observer(IncommingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            sortBy: S.NOT_EXISTS,
        };

        this.tableHelper = new TableHelper(
            ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID,
            [
                [ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER, 1],
                [ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 2],
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 4],
                [ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT, 6],
            ],
            this.fetchShipments,
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
        this.shipmentApi.fetchShipmentByFilter(
            PagesCAdmin.INCOMMING,
            this.searchWord,
            this.tableHelper.tableState.sortKey,
            this.tableHelper.tableState.from,
            this.tableHelper.tableState.to(),
            (shipmentModels, totalSize) => {
                console.log(shipmentModels);

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

    onClickCreateNewShipment = () => {
        this.props.popupShipmentStore.signalShow(new ShipmentModel(), [], [], () => {
            const tableState = this.tableHelper.tableState;
            tableState.pageZero();
            this.fetchShipments();
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
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER, 'Sonsignment Number'),
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
                                            actions={(
                                                <Actions>
                                                    <Button onClick={this.onClickCreateNewShipment}>
                                                        <div className={'FlexRow'}>
                                                            <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                                    Create Shipment
                                                        </div>
                                                    </Button>
                                                </Actions>
                                            )} />
                                    )} ><Table
                                        className={'ShipmentsTable'}
                                        legend={this.getTableLegend()}
                                        widths={this.getTableWidths()}
                                        aligns={this.getTableAligns()}
                                        helper={this.tableHelper}
                                        rows={this.renderRows()} />
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

            let statusString = '';

            switch (shipmentModel.shipmentStatus) {
                case ShipmentConstsH.S_STATUS_IN_TRANSIT:
                    statusString = 'In Transtit';
                    break;
                case ShipmentConstsH.S_STATUS_RECEIVED:
                    statusString = 'Received';
                    break;
                default:
                    statusString = 'Unknown';
                    break;
            }

            result.push([
                Table.cellString(`#${shipmentModel.shipmentId}`),
                Table.cellString(shipmentModel.shipmentConsignmentNumber),
                Table.cellString(originCountryModel.countryName),
                Table.cell(<div className={'SVG IconDestination'} dangerouslySetInnerHTML={{ __html: SvgArrowRight }}></div>),
                Table.cellString(`${destinationSiteModel.siteName}, ${destinationCountryModel.countryName}`),
                Table.cell(
                    <Button color={shipmentModel.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >{statusString}</Button>,
                ),
                Table.cellString(moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY'), 'ShipmentDateCell'),
                Table.cell(
                    <Actions>
                        <Button disabled={shipmentModel.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED} onClick={() => this.receiveShipmentRowAction(shipmentModel.shipmentId)}>
                            Goods Received
                        </Button>
                    </Actions>,
                ),
            ])
        })

        return result;
    }

    receiveShipmentRowAction = (shipmentId) => {
        const shipmentModel = this.props.shipmentStore.screenShipmentModels.find((sModel: ShipmentModel) => sModel.shipmentId === shipmentId);
        const shipmentModelClone = shipmentModel.clone();

        shipmentModelClone.shipmentStatus = ShipmentConstsH.S_STATUS_RECEIVED;
        shipmentModelClone.shipmentDateOfArrival = Date.now();

        this.shipmentApi.creditShipment(
            shipmentModelClone,
            [],
            [],
            [],
            () => {
                this.props.shipmentStore.screenShipmentModels.find((sModel) => sModel.shipmentId === shipmentId).shipmentStatus = shipmentModelClone.shipmentStatus;
                this.fetchShipments();
            },
        )
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
