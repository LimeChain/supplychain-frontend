import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';

import moment from 'moment';
import S from '../../../common/js/utilities/Main';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import PageTableFooter from '../components-inc/PageTableFooter';
import Table from '../../../common/js/components-inc/Table';
import TableHelper from '../../../common/js/helpers/TableHelper';
import PageView from '../components-inc/PageView';
import NoEntryPage from '../components-inc/NoEntryPage';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';

import SvgAdd from '@material-ui/icons/Add';
import SvgArrowRight from '../../../common/svg/arrow-right.svg';
import './../../css/components-pages/page-outgoing-component.css';
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
}

interface State {
    sortBy: number;
}

export default class OutgoingPageComponent extends ContextPageComponent<Props, State> {
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    static layout() {
        const MobXComponent = inject(...[...PageComponent.getStores(), ...ContextPageComponent.getStores(), 'shipmentStore'])(observer(OutgoingPageComponent));
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
                [ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 2],
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 4],
                [ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT, 6],
            ],
            this.fetchShipments,
        )
    }

    getPageLayoutComponentCssClassName() {
        return 'PageOutgoing';
    }

    async loadData() {
        await super.loadData();

        this.fetchShipments();
    }

    fetchShipments = () => {
        this.shipmentApi.fetchShipmentByFilter(
            PagesCAdmin.OUTGOING,
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

                <Sidebar page={PagesCAdmin.OUTGOING} />

                <PageView pageTitle={'Outgoing Shipments'} >
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
                                            searchPlaceHolder={'Search outgoing shipments'}
                                            selectedSortBy={this.tableHelper.tableState.sortKey}
                                            options={[
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
                                    )} >
                                    <Table
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

            </div>
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
                    <Button color={Button.COLOR_SCHEME_4} >{statusString}</Button>,
                ),
                Table.cellString(moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY'), 'ShipmentDateCell'),
            ])
        })

        return result;
    }

    getTableLegend = () => {
        return ['ID', 'Consignment ID', 'Shipped From', '', 'Destination', 'Status', 'Date'];
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_LEFT,
        ]
    }

    getTableWidths = () => {
        return ['5%', '30%', '15%', '10%', '15%', '15%', '10%'];
    }
}
