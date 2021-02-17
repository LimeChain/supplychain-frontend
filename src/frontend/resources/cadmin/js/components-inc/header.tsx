import React from 'react';
import PropTypes from 'prop-types';

import Config from '../../../../../../builds/dev-generated/Config';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import SvgLoading from '../../../common/svg/loading.svg';
import SvgDashboard from '../../../common/svg/dashboard.svg';
import SvgProducts from '../../../common/svg/products.svg';
import SvgDrafts from '../../../common/svg/drafts.svg';
import SvgOutgoing from '../../../common/svg/outgoing.svg';
import SvgIncomming from '../../../common/svg/incomming.svg';


import '../../css/components-inc/header.css';
import S from '../../../common/js/utilities/Main';

interface Props {
    page: string;
}

export default class Header extends React.Component < Props > {

    render() {
        return (
            <div className = { 'Sidebar' } >
                <div className = { 'FlexColumn' } >
                    <a className = { 'SidebarLogoA' } href = { PagesCAdmin.DASHBOARD } ><img className = { 'SidebarLogo' } src = { `${Config.URL.Resources.Common.IMG}/logo.png` } /></a>
                    <div className = { 'StartRight' }>
                        <div onClick = {() => window.location.href = PagesCAdmin.DASHBOARD} 
                            className = { `SidebarButton FlexColumn ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DASHBOARD)}`}>
                            <div className = { `SVG` } dangerouslySetInnerHTML = {{ __html: SvgDashboard }}></div>
                            Dashboard 
                        </div>
                        <div onClick = {() => window.location.href = PagesCAdmin.PRODUCTS} 
                            className = { `SidebarButton FlexColumn ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.PRODUCTS)}`}>
                            <div className = { `SVG` } dangerouslySetInnerHTML = {{ __html: SvgProducts }}></div>
                            Products
                        </div>
                        <div onClick = {() => window.location.href = PagesCAdmin.DRAFTS} 
                            className = { `SidebarButton FlexColumn ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DRAFTS)}`}>
                            <div className = { `SVG` } dangerouslySetInnerHTML = {{ __html: SvgDrafts }}></div>
                            Drafts
                        </div>
                        <div onClick = {() => window.location.href = PagesCAdmin.OUTGOING}
                             className = { `SidebarButton FlexColumn ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.OUTGOING)}`}>
                            <div className = { `SVG` } dangerouslySetInnerHTML = {{ __html: SvgOutgoing }}></div>
                            Outgoing
                        </div>
                        <div onClick = {() => window.location.href = PagesCAdmin.INCOMMING}
                             className = { `SidebarButton FlexColumn ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.INCOMMING)}`}>
                            <div className = { `SVG` } dangerouslySetInnerHTML = {{ __html: SvgIncomming }}></div>
                            Incomming
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
