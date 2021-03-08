import React from 'react';
import { inject, observer } from 'mobx-react';

import CountryModel from '../../../common/js/models/CountryModel';
import AccountApi from '../../../common/js/api/AccountApi';
import ProjectUtils from '../../../common/js/ProjectUtils';
import AccountSessionStore from '../../../common/js/stores/AccountSessionStore';
import AlertStore from '../../../common/js/stores/AlertStore';
import AppStore from '../../../common/js/stores/AppStore';
import SiteStore from '../../../common/js/stores/SiteStore';

import Notifications from './Notifications';

import SvgLogout from '../../../common/svg/logout.svg';
import '../../css/components-inc/page-view.css';

interface Props {
    pageTitle: string;
    accountSessionStore: AccountSessionStore;
    appStore: AppStore;
    alertStore: AlertStore;
    siteStore: SiteStore;
}

class PageView extends React.Component<Props> {

    accountApi: AccountApi;

    constructor(props: Props) {
        super(props);
        this.accountApi = new AccountApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    onClickLogout = () => {
        this.accountApi.logout();
    }

    render() {
        return (
            <div className={'PageView FlexColumn'} >
                <div className={'PageHeader FlexRow FlexSplit MarginBottom'} >
                    {this.props.pageTitle}
                    <div className={'HeaderRight FlexSplit'} >
                        <Notifications />
                        <div className="UserTab FlexRow">
                            { this.renderCountryTab() }
                            <div className="Separator"></div>
                            <div className={'SVG Logout Clickable'} dangerouslySetInnerHTML={{ __html: SvgLogout }} onClick = { this.onClickLogout } />
                        </div>
                    </div>
                </div>
                { this.props.children}
            </div>
        )
    }

    renderCountryTab() {
        const accountModel = this.props.accountSessionStore.accountModel;
        if (accountModel === null) {
            return null;
        }

        const countryModel = this.props.siteStore.getCountryModel(accountModel.countryId);
        if (countryModel === null) {
            return null;
        }

        return (
            <div className="CountryTab">
                <div className={'SVG'} dangerouslySetInnerHTML={{ __html: ProjectUtils.getCountrySvg(countryModel.countryId) }}></div>
                { countryModel.countryName}
            </div>
        )
    }

}

export default inject('appStore', 'alertStore', 'accountSessionStore', 'siteStore')(observer(PageView));
