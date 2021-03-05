import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import Header from '../components-inc/header';
import PageView from '../components-inc/PageView';

import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import S from '../../../common/js/utilities/Main';
import PageTableFooter from '../components-inc/PageTableFooter';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';

interface Props extends ContextPageComponentProps {
}

interface State {
    searchWord: string;
    sortBy: number;
}

export default class IncommingPageComponent extends ContextPageComponent<Props, State> {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(IncommingPageComponent));
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
        return 'PageIncomming';
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

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.INCOMMING} />

                <PageView pageTitle={'Incoming Shipments'} >
                    <PageTable
                        className={'WhiteBox PageExtend'}
                        header={(
                            <PageTableHeader
                                searchPlaceHolder={'Search incoming shipments'}
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
                </PageView>

            </div>
            // <>
            //     <Header page = { PagesCAdmin.INCOMMING} />
            //     <div className = {` PageContent FlexColumn`}>
            //         <Notifications notifications = {this.props.notificationStore.screenNotificationModels}/>
            //     </div>
            // </>
        )
    }
}
