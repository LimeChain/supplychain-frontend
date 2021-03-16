import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

import './../../css/components-pages/page-drafts-component.css';
import S from '../../../common/js/utilities/Main';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
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
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import PopupSubmitShipmentStatusStore from '../../../common/js/stores/PopupSubmitShipmentStatusStore';
import PopupStore from '../../../common/js/stores/PopupStore';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
    popupSubmitShipmentStatusStore: PopupSubmitShipmentStatusStore;
}

interface State {
    sortBy: number;
}

export default class DraftsPageComponent extends ContextPageComponent<Props, State> {

    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    static layout() {
        const MobXComponent = inject(...[...PageComponent.getStores(), ...ContextPageComponent.getStores(), 'shipmentStore', 'popupSubmitShipmentStatusStore'])(observer(DraftsPageComponent));
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
                [ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID, 3],
            ],
            this.fetchShipments,
            8,
        )

    }

    async loadData() {
        await super.loadData();

        this.fetchShipments();
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDrafts';
    }

    fetchShipments = () => {
        const tableState = this.tableHelper.tableState;

        this.shipmentApi.fetchShipmentByFilter(

            PagesCAdmin.DRAFTS,
            this.searchWord,
            tableState.sortKey,
            tableState.from,
            tableState.to(),
            (shipmentModels, totalSize) => {
                this.props.shipmentStore.onScreenData(shipmentModels);
                tableState.total = totalSize;
            },
        )
    }

    fetchShipmentsInit = () => {
        const tableState = this.tableHelper.tableState;
        tableState.pageZero();
        this.fetchShipments();
    }

    onChangeSearchWord = (searchWord) => {
        this.searchWord = searchWord;
        this.fetchShipments();
    }

    onChangeSortBy = (sortBy) => {
        this.tableHelper.tableState.sortKey = sortBy;
        this.fetchShipments();
    }

    onClickSubmitShipmentRowAction(sourceShipmentModel: ShipmentModel, e) {
        e.stopPropagation();

        const alertStore = this.props.alertStore;
        alertStore.msg = 'Are you sure you want to submit shipment?';
        alertStore.subMsg = 'This action cannot be reversed';
        alertStore.positiveLabel = 'Submit';
        alertStore.negativeLabel = 'Cancel';
        alertStore.positiveListener = () => {
            const run = async () => {
                const shipmentId = sourceShipmentModel.shipmentId;
                this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
                    shipmentModel.submitShipment();
                    this.shipmentApi.creditShipment(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, () => {
                        this.fetchShipmentsInit();
                        this.props.popupSubmitShipmentStatusStore.signalShow(PopupSubmitShipmentStatusStore.ACTION_NAME_SUBMITTED);
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

    onClickShipment = (i: number) => {
        const sourceShipmentModel = this.props.shipmentStore.screenShipmentModels[i];
        const shipmentId = sourceShipmentModel.shipmentId;
        this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
            this.props.popupShipmentStore.signalShow(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, (savedShipmentModel: ShipmentModel) => {
                if (savedShipmentModel.isDraft() === true) {
                    Object.assign(sourceShipmentModel, savedShipmentModel);
                } else {
                    this.fetchShipmentsInit();
                }
            });
        });

    }

    onClickCreateNewShipment = () => {
        const shipmentModel = ShipmentModel.newInstanceByOriginSiteId(this.props.accountSessionStore.accountModel.siteId);
        this.props.popupShipmentStore.signalShow(shipmentModel, [], [], [], this.fetchShipmentsInit);
    }

    renderContent() {
        return (
            <div className={'PageContent'} >
                <Sidebar page={PagesCAdmin.DRAFTS} />

                <PageView pageTitle={'Drafts'} >
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
                                            searchPlaceHolder={'Search drafts'}
                                            selectedSortBy={this.state.sortBy}
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
                                        rows={this.renderRows()}
                                        onClickRow={this.onClickShipment} />
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

            let destinationString = '';

            if (destinationSiteModel !== undefined) {
                const destinationCountryModel = this.props.siteStore.screenCountryModels.find((countryModel) => countryModel.countryId === destinationSiteModel.countryId);
                destinationString = `${destinationSiteModel.siteName}, ${destinationCountryModel.countryName}`
            } else {
                destinationString = 'N/A';
            }

            result.push([
                Table.cellString(`#${shipmentModel.shipmentId}`),
                Table.cellString(originCountryModel.countryName),
                Table.cell(<div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgArrowRight }}></div>),
                Table.cellString(destinationString),
                Table.cell(
                    <Actions>
                        <Button color={Button.COLOR_SCHEME_2} >In Preparation</Button>
                    </Actions>,
                ),
                Table.cell(
                    <Actions>
                        <Button disabled={shipmentModel.canSubmit() === false} onClick={this.onClickSubmitShipmentRowAction.bind(this, shipmentModel)}>
                            Submit
                        </Button>
                    </Actions>,
                ),
            ])
        })

        return result;
    }

    getTableLegend = () => {
        return ['ID', 'Shipped From', '', 'Destination', 'Status', 'Action'];
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return ['5%', '10%', '8%', '47%', '15%', '15%'];
    }
}
