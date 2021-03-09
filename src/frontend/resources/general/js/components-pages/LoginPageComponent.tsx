import React from 'react';
import { inject, observer } from 'mobx-react';

import Config from '../../../../../../builds/dev-generated/Config';

import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import PageComponent from '../../../common/js/components-pages/PageComponent';

import './../../css/components-pages/page-login-component.css';
import Button from '../../../common/js/components-inc/Button';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Input from '../../../common/js/components-inc/Input';
import CountryModel from '../../../common/js/models/CountryModel';
import SiteModel from '../../../common/js/models/SiteModel';
import { MenuItem } from '@material-ui/core';
import Select from '../../../common/js/components-inc/Select';
import Actions from '../../../common/js/components-inc/Actions';
import InputStateHelper from '../../../common/js/helpers/InputStateHelper';
import AccountApi from '../../../common/js/api/AccountApi';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import S from '../../../common/js/utilities/Main';
import ProjectUtils from '../../../common/js/ProjectUtils';
import SiteStore from '../../../common/js/stores/SiteStore';
import GeneralApi from '../../../common/js/api/GeneralApi';

interface Props extends ContextPageComponentProps {
    siteStore: SiteStore;
}

const FIELDS = ['country', 'pass'];

export default class PageNotFoundComponent extends ContextPageComponent < Props > {

    inputStateHelper: InputStateHelper;
    accountApi: AccountApi;
    generalApi: GeneralApi;

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'siteStore')(observer(PageNotFoundComponent));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);

        this.accountApi = new AccountApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.generalApi = new GeneralApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

        this.inputStateHelper = new InputStateHelper(FIELDS, () => {
            this.setState({})
        });
        this.inputStateHelper.updateValues([
            `${SiteModel.ID_BERLIN},${CountryModel.ID_GERMANY}`,
            S.Strings.EMPTY,
        ]);
    }

    componentDidMount() {
        super.componentDidMount();
        this.generalApi.fetchAllSites((siteModels, countryModels) => {
            this.props.siteStore.onScreenData(siteModels, countryModels);
        });
    }

    getPageLayoutComponentCssClassName() {
        return 'PageLogin';
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onClickLogin();
        }
    }

    onClickLogin = () => {
        const values = this.inputStateHelper.getValues();
        if (values === null) {
            return;
        }

        const combinedId = values.get(FIELDS[0]).split(',');
        const siteId = combinedId[0];
        const countryId = combinedId[1];
        const pass = values.get(FIELDS[1]);

        let email = S.Strings.EMPTY;
        switch (countryId) {
            case CountryModel.ID_GERMANY:
                email = 'germany@pwc.com';
                break;
            case CountryModel.ID_NETHERLANDS:
                email = 'netherlands@pwc.com';
                break;
            default:
        }

        this.accountApi.login(email, pass, (accountModel) => {
            if (accountModel === null) {
                this.props.alertStore.show('Wrong username/password');
                return;
            }

            window.location.href = PagesCAdmin.DASHBOARD;
        });
    }

    renderContent() {
        const siteStore = this.props.siteStore;

        return (
            <div className = { 'PageContent FlexSingleCenter' } style = { ProjectUtils.makeBgImgStyle(`${Config.URL.Resources.General.IMG}/login-bg.png`) } >

                <div className = { 'LoginBox FlexColumn' } >

                    <div className = { 'Title' } > Welcome! </div>
                    <div className = { 'Subtitle' } > Enter your credentials to access your account </div>

                    <LayoutBlock className = { 'LoginForm' } >
                        <Select
                            label = { 'Choose site and country' }
                            value = { this.inputStateHelper.values.get(FIELDS[0]) }
                            error = { this.inputStateHelper.errors.get(FIELDS[0]) }
                            onChange = { this.inputStateHelper.onChanges.get(FIELDS[0]) } >
                            { siteStore.screenSiteModels.map((siteModel, i) => {
                                const countryModel = siteStore.getCountryModel(siteModel.countryId);
                                return (
                                    <MenuItem key = { i } value = { `${siteModel.siteId},${countryModel.countryId}` } >
                                        <div className ={ 'FlexRow' }>
                                            <div className = { 'SVG LoginPageIconFlag' } dangerouslySetInnerHTML = {{ __html: ProjectUtils.getCountrySvg(countryModel.countryId) }} /> { siteModel.siteName }, { countryModel.countryName }
                                        </div>
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <Input
                            label = { 'Password' }
                            type = { 'password' }
                            value = { this.inputStateHelper.values.get(FIELDS[1]) }
                            error = { this.inputStateHelper.errors.get(FIELDS[1]) }
                            onChange = { this.inputStateHelper.onChanges.get(FIELDS[1]) }
                            onKeyPress = { this.onKeyPress } />
                        <Actions layout = { Actions.LAYOUT_COLUMN_FULL } >
                            <Button onClick = { this.onClickLogin }>Login</Button>
                        </Actions>
                    </LayoutBlock>
                </div>

            </div>
        )
    }
}
