import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import { formatDashboardBigPrice } from '../../../common/js/helpers/NumeralHelper';
import SvgNotification from '../../../common/svg/notification.svg';
import SvgMoreInfo from '../../../common/svg/more-info.svg';
import './../../css/components-pages/page-dashboard-component.css';
import PageView from '../components-inc/PageView';
import Scrollable from '../../../common/js/components-inc/Scrollable';
import DashboardStore from '../../../common/js/stores/DashboardStore';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import SvgIncomming from '../../../common/svg/incomming.svg';
import SvgOutgoing from '../../../common/svg/outgoing.svg';
import Button from '../../../common/js/components-inc/Button';
import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import moment from 'moment';
import ProjectUtils from '../../../common/js/ProjectUtils';
import Tooltip from '../../../common/js/components-inc/Tooltip';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import S from '../../../common/js/utilities/Main';

interface Props extends ContextPageComponentProps {
    dashboardStore: DashboardStore
}

export default class DashboardPageComponent extends ContextPageComponent<Props> {

    static layout() {
        const MobXComponent = inject(...[...PageComponent.getStores(), ...ContextPageComponent.getStores(), 'dashboardStore'])(observer(DashboardPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageDashboard';
    }

    async loadData() {
        await super.loadData();

        this.props.dashboardStore.fetchMoreIncommingShipments(true);
        this.props.dashboardStore.fetchMoreOutgoingShipments(true);
        this.fetchDraftShipmentsData();
        this.fetchProductsInStockData();
    }

    fetchDraftShipmentsData = () => {
        this.shipmentApi.fetchShipmentByFilter(ShipmentFilter.S_PAGE_STATUS_DRAFTS, S.Strings.EMPTY, ShipmentFilter.S_SORT_BY_ID, 0, 1, (shipmentModels: ShipmentModel[], totalSize: number) => {
            this.props.dashboardStore.draftShipmentsTotalSize = totalSize;
        })
    }

    fetchProductsInStockData = () => {
        this.shipmentApi.fetchTotalValueInStock((totalValue: number) => {
            this.props.dashboardStore.totalValueOfProducts = totalValue;
        });
    }

    onScrollOutgoingShipments = (event) => {
        if (!this.props.dashboardStore.hasMoreOutgoingShipments) {
            return;
        }
        this.onScrollFetchShipments(event, this.props.dashboardStore.fetchMoreOutgoingShipments);
    }

    onScrollIncommingShipments = (event) => {
        if (!this.props.dashboardStore.hasMoreIncommingShipments) {
            return;
        }
        this.onScrollFetchShipments(event, this.props.dashboardStore.fetchMoreIncommingShipments);
    }

    onScrollFetchShipments = (event, fetchMoreFunc: (boolean) => void) => {
        const container = event.target.querySelector('.TableContainer');

        const lastShipmentLine = container.querySelector('.ShipmentLine:nth-last-child(2)');
        if (container.scrollTop + container.offsetHeight + lastShipmentLine.offsetHeight > lastShipmentLine.offsetTop) {
            fetchMoreFunc(false);
        }
    }

    onClickShipmentLine = (sModel: ShipmentModel) => {
        this.shipmentApi.fetchShipmentById(sModel.shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
            this.props.popupShipmentStore.signalShow(sModel, skuModels, skuOriginModels, shipmentDocumentModels, (savedShipmentModel: ShipmentModel) => {
                if (sModel.isReceived() === false && savedShipmentModel.isReceived() === true) {
                    Object.assign(sModel, savedShipmentModel);
                }

                this.fetchProductsInStockData();
            });
        });
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.DASHBOARD} />

                <PageView pageTitle={'Dashboard'} >
                    <div className={'Stats MarginBottom'} >
                        <div className={'WhiteBox FlexRow'} >
                            <div className='Icon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.outgoingShipmentsTotalSize}</div>
                                <div className='StatInfo'>Total Outgoing Shipments</div>
                            </div>
                        </div>
                        <div className={'WhiteBox FlexRow'} >
                            <div className='Icon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.incommingShipmentsTotalSize}</div>
                                <div className='StatInfo'>Total Incoming Shipments</div>
                            </div>
                        </div>
                        <div className={'WhiteBox FlexRow FlexSplit'} >
                            <div className='Icon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgNotification }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{formatDashboardBigPrice(this.props.dashboardStore.totalValueOfProducts)}</div>
                                <div className='StatInfo '>Total value of products in stock</div>
                            </div>
                            <div className='StatMoreInfo StartRight FlexColumn'>
                                <Tooltip title={<div className={'Tooltip'}>VAT is not included</div>} placement={'bottom-end'}>
                                    <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgMoreInfo }} />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={'WhiteBox FlexRow FlexSplit'} >
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.draftShipmentsTotalSize}</div>
                                <div className='StatInfo'>Prepared Shipments</div>
                            </div>
                            <a href={PagesCAdmin.DRAFTS} className='SeeAll StartRight'>See All</a>
                        </div>
                    </div>

                    <div className={'Tables PageExtend'} >
                        <div className={'WhiteBox FlexColumn TableSection'} onScroll={this.onScrollOutgoingShipments}>
                            <div className='TableHeader'>Recent Outgoing</div>
                            <Scrollable>
                                <div className='TableContainer'>

                                    {this.props.dashboardStore.screenOutgoingShipments
                                        .map((shipmentModel: ShipmentModel) => <div onClick={() => this.onClickShipmentLine(shipmentModel)} className={'ShipmentLine FlexRow FlexSplit'} key={shipmentModel.shipmentId}>
                                            <div className='Icon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }} /></div>
                                            <div className={'ShipmentLineInfo FlexColumn'}>
                                                <div className='FlexRow'>
                                                    <div className={'SVG'} dangerouslySetInnerHTML={{
                                                        __html: ProjectUtils.getCountrySvg(
                                                            this.props.siteStore.countriesMap.get(this.props.siteStore.sitesMap.get(shipmentModel.shipmentOriginSiteId).countryId).countryId,
                                                        ),
                                                    }} />
                                                    <div className={'ConsignmentNumber'}>#{shipmentModel.shipmentConsignmentNumber}</div>
                                                </div>
                                                <div className='TimeStamp'>Sent {moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY')}</div>
                                            </div>
                                            <div className={'ShipmentLineStatus StartRight'}>
                                                <Button color={shipmentModel.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >
                                                    {shipmentModel.getStatusString()}
                                                </Button>
                                            </div>
                                        </div>)
                                    }
                                    {this.props.dashboardStore.isFetchingOutgoingShipments
                                        && <LoadingIndicator className={'LoadingIndicator'} margin={'0'} />
                                    }
                                </div>
                            </Scrollable>
                        </div>
                        <div className={'WhiteBox FlexColumn TableSection'} onScroll={this.onScrollIncommingShipments}>
                            <div className='TableHeader'>Recent Incoming</div>
                            <Scrollable >
                                <div className='TableContainer'>
                                    {this.props.dashboardStore.screenIncommingShipments.map((shipmentModel: ShipmentModel) => <div onClick={() => this.onClickShipmentLine(shipmentModel)} className={' ShipmentLine FlexRow FlexSplit'} key={shipmentModel.shipmentId}>
                                        <div className='Icon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} /></div>
                                        <div className={'ShipmentLineInfo FlexColumn'}>
                                            <div className='FlexRow'>
                                                <div className={'SVG'} dangerouslySetInnerHTML={{
                                                    __html: ProjectUtils.getCountrySvg(
                                                        this.props.siteStore.countriesMap.get(this.props.siteStore.sitesMap.get(shipmentModel.shipmentOriginSiteId).countryId).countryId,
                                                    ),
                                                }} />
                                                <div className={'ConsignmentNumber'}>#{shipmentModel.shipmentConsignmentNumber}</div>
                                            </div>
                                            <div className='TimeStamp'>Sent {moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY')}</div>
                                        </div>
                                        <div className={'ShipmentLineStatus StartRight'}>
                                            <Button color={shipmentModel.shipmentStatus === ShipmentConsts.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >
                                                {shipmentModel.getStatusString()}
                                            </Button>
                                        </div>
                                    </div>)
                                    }
                                    {this.props.dashboardStore.isFetchingIncommingShipments
                                        && <LoadingIndicator className={'LoadingIndicator'} margin={'0'} />
                                    }
                                </div>
                            </Scrollable>
                        </div>
                    </div>

                </PageView>

            </div >
        )
    }
}
