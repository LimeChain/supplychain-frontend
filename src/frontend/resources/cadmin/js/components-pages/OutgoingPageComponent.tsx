import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import ProductFilterConsts from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';

import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import Notifications from '../components-inc/Notifications';

import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import PageTableFooter from '../components-inc/PageTableFooter';

import './../../css/components-pages/page-outgoing-component.css';
import Table from '../../../common/js/components-inc/Table';
import TableHelper from '../../../common/js/helpers/TableHelper';
import PageView from '../components-inc/PageView';
import NoEntryPage from '../components-inc/NoEntryPage';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import S from '../../../common/js/utilities/Main';

interface Props extends ContextPageComponentProps {
}

interface State {
    searchWord: string;
    sortBy: number;
}

export default class OutgoingPageComponent extends ContextPageComponent<Props, State> {
    showNoEntryPage: boolean = true;

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(OutgoingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            searchWord: S.Strings.EMPTY,
            sortBy: S.NOT_EXISTS,
        };
    }

    getPageLayoutComponentCssClassName() {
        return 'PageOutgoing';
    }

    async loadData() {
        await super.loadData();
        // TODO: fetch shipments
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

                <Sidebar page={PagesCAdmin.OUTGOING} />

                <PageView pageTitle={'Outgoing Shipments'} >
                    {this.showNoEntryPage
                        ? <NoEntryPage modelName='shipment' subText='Create shipment as a draft or submit one' buttonText='New Shipment' buttonFunction={this.newShipmentPopup} />
                        : <PageTable
                            className={'WhiteBox PageExtend'}
                            header={(
                                <PageTableHeader
                                    searchPlaceHolder={'Search outgoing shipments'}
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
                        </PageTable>}
                </PageView>

            </div>
        )
    }
}
