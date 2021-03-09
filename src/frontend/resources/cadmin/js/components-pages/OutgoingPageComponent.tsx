import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import ProductFilterConsts from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';

import S from '../../../common/js/utilities/Main';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import Notifications from '../components-inc/Notifications';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import PageTableFooter from '../components-inc/PageTableFooter';
import Table from '../../../common/js/components-inc/Table';
import TableHelper from '../../../common/js/helpers/TableHelper';
import PageView from '../components-inc/PageView';
import NoEntryPage from '../components-inc/NoEntryPage';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';

import SvgAdd from '@material-ui/icons/Add';
import SvgArrowRight from '../../../common/svg/arrow-right.svg';
import './../../css/components-pages/page-outgoing-component.css';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import CookieHelper from '../helpers/CookieHelper';

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
                [ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 1],
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 2],
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
        console.log(sortBy);

        this.tableHelper.tableState.sortKey = sortBy;

        this.fetchShipments();
    }

    newShipmentPopup = () => {
        this.props.popupShipmentStore.signalShow(new ShipmentModel(), [], []);
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

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.OUTGOING} />

                <PageView pageTitle={'Outgoing Shipments'} >
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
                                            searchPlaceHolder={'Search outgoing shipments'}
                                            selectedSortBy={this.tableHelper.tableState.sortKey}
                                            options={[
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID, 'Shipped From'),
                                                new PageTableHeaderSortByStruct(ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 'Destination'),
                                            ]}
                                            onChangeSearchWord={this.onChangeSearchWord}
                                            onChangeSortBy={this.onChangeSortBy} />
                                    )}
                                    footer={(
                                        <PageTableFooter
                                            totalItems={this.tableHelper.tableState.total}
                                            actions={(
                                                <Actions>
                                                    <Button>
                                                        <div className={'FlexRow'}>
                                                            <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                                Create Shipment
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
        return ['ID', 'Shipped From', 'Destination', 'Status', 'Action'];
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
                Table.cell(
                    <div className="FlexRpw ShipmentOriginCells">
                        {originCountryModel.countryName}
                        <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgArrowRight }}></div>
                    </div>,
                ),
                Table.cellString(`${destinationSiteModel.siteName}, ${destinationCountryModel.countryName}`),
                Table.cell(
                    <div className={'ShipmentStatusCell'} >In Preparation</div>,
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

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return ['10%', '20%', '20%', '30%', '5%'];
    }
}
