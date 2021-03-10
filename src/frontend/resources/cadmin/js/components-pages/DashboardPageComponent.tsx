import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

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
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import moment from 'moment';
import ProjectUtils from '../../../common/js/ProjectUtils';

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
        this.shipmentApi.fetchShipmentByFilter(PagesCAdmin.DRAFTS, '', 1, 0, 1, (shipmentModels: ShipmentModel[], totalSize: number) => {
            this.props.dashboardStore.draftShipmentsTotalSize = totalSize;
        })
    }

    fetchProductsInStockData = () => {
        this.shipmentApi.fetchTotalValueInStock((totalValue: number) => {
            this.props.dashboardStore.totalValueOfProducts = totalValue;
        });
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.DASHBOARD} />

                <PageView pageTitle={'Dashboard'} >
                    <div className={'Stats MarginBottom'} >
                        <div className={'WhiteBox FlexRow'} >
                            <div className='StatIcon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.outgoingShipmentsTotalSize}</div>
                                <div className='StatInfo'>Total Outgoing Shipments</div>
                            </div>
                        </div>
                        <div className={'WhiteBox FlexRow'} >
                            <div className='StatIcon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.incommingShipmentsTotalSize}</div>
                                <div className='StatInfo'>Total Incomming Shipments</div>
                            </div>
                        </div>
                        <div className={'WhiteBox FlexRow'} >
                            <div className='StatIcon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgNotification }} /></div>
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.totalValueOfProducts}</div>
                                <div className='StatInfo'>Total value of products in stock</div>
                            </div>
                            <div className='StatMoreInfo'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgMoreInfo }} /></div>
                        </div>
                        <div className={'WhiteBox FlexRow'} >
                            <div className='FlexColumn'>
                                <div className='StatData'>{this.props.dashboardStore.draftShipmentsTotalSize}</div>
                                <div className='StatInfo'>Prepared Shipments</div>
                            </div>
                            <div className='SeeAll'>See All</div>
                        </div>
                    </div>

                    <div className={'Tables PageExtend'} >
                        <Scrollable className={'WhiteBox FlexColumn'} >
                            <div className='Tableheader'></div>
                            <div className='TableContainer'>
                                {this.props.dashboardStore.screenOutgoingShipments.map((shipmentModel: ShipmentModel) => <div className={' ShipmentLine FlexRow '} key={shipmentModel.shipmentId}>
                                    <div className='ShipmentLineIcon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }} /></div>
                                    <div className={'ShipmentLineInfo FlexColumn'}>
                                        <div className='FlexRow'>
                                            <div className={'SVG'} dangerouslySetInnerHTML={{
                                                __html: ProjectUtils.getCountrySvg(
                                                    this.props.siteStore.countriesMap.get(this.props.siteStore.sitesMap.get(shipmentModel.shipmentOriginSiteId).countryId).countryId,
                                                ),
                                            }} />
                                            <div className={'ConsignmentNumber'}>#{shipmentModel.shipmentConsignmentNumber}</div>
                                        </div>
                                        <div>Sent {moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY')}</div>
                                    </div>
                                    <div className={'ShipmentLineStatus'}>
                                        <Button color={shipmentModel.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >
                                            {shipmentModel.getStatusString()}
                                        </Button>
                                    </div>
                                </div>)
                                }
                                {/* {this.props.notificationStore.hasMore
                                    ? <LoadingIndicator className={'LoadingIndicator'} margin={'0'} /> : ''
                                } */}
                            </div>
                        </Scrollable>
                        <Scrollable className={'WhiteBox FlexColumn'} >
                            <div className='Tableheader'></div>
                            <div className='TableContainer'>
                                {this.props.dashboardStore.screenIncommingShipments.map((shipmentModel: ShipmentModel) => <div className={' ShipmentLine FlexRow '} key={shipmentModel.shipmentId}>
                                    <div className='ShipmentLineIcon'><div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} /></div>
                                    <div className={'ShipmentLineInfo FlexColumn'}>
                                        <div className='FlexRow'>
                                            <div className={'SVG'} dangerouslySetInnerHTML={{
                                                __html: ProjectUtils.getCountrySvg(
                                                    this.props.siteStore.countriesMap.get(this.props.siteStore.sitesMap.get(shipmentModel.shipmentOriginSiteId).countryId).countryId,
                                                ),
                                            }} />
                                            <div className={'ConsignmentNumber'}>#{shipmentModel.shipmentConsignmentNumber}</div>
                                        </div>
                                        <div>Sent {moment(shipmentModel.shipmentDateOfShipment).format('DD MMM YYYY')}</div>
                                    </div>
                                    <div className={'ShipmentLineStatus'}>
                                        <Button color={shipmentModel.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED ? Button.COLOR_SCHEME_2 : Button.COLOR_SCHEME_4} >
                                            {shipmentModel.getStatusString()}
                                        </Button>
                                    </div>
                                </div>)
                                }
                                {/* {this.props.notificationStore.hasMore
                                    ? <LoadingIndicator className={'LoadingIndicator'} margin={'0'} /> : ''
                                } */}
                            </div>
                        </Scrollable>
                    </div>

                </PageView>

            </div>
        )
    }
}
