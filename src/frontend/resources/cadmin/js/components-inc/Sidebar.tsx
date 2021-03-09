import React, { Fragment } from 'react';

import Config from '../../../../../../builds/dev-generated/Config';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SvgLoading from '../../../common/svg/loading.svg';
import SvgDashboard from '../../../common/svg/dashboard.svg';
import SvgProducts from '../../../common/svg/products.svg';
import SvgDrafts from '../../../common/svg/drafts.svg';
import SvgOutgoing from '../../../common/svg/outgoing.svg';
import SvgIncomming from '../../../common/svg/incomming.svg';
import SvgArrowDown from '../../../common/svg/arrow-down.svg';
import '../../css/components-inc/sidebar.css';
import S from '../../../common/js/utilities/Main';
import Expandable from './Expandable';

interface Props {
    page: string;
}

export default class Sidebar extends React.Component < Props > {

    render() {
        return (
            <div className={'Sidebar'} >
                <div className={'FlexColumn'} >
                    <div className={'StartRight'}>
                        <div className={'SidebarHeader'}>VAT Check</div>
                        <a
                            href={PagesCAdmin.DASHBOARD}
                            className={`SidebarButton SidebarButtonMarginTop Transition FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DASHBOARD)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgDashboard }} />
                            Dashboard
                        </a>
                        <div className = { 'SidebarButtonMarginTop' } >
                            <Expandable
                                arrowOffset = { false }
                                defaultExpanded = { this.props.page === PagesCAdmin.PRODUCTS || this.props.page === PagesCAdmin.PRODUCTS_IN_STOCK }
                                accordionSummary={
                                    <div className={'FlexRow'}>
                                        <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgProducts }} />
                                        Products
                                    </div>
                                }
                                accordionSummaryClasses={`SidebarButton ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.PRODUCTS || this.props.page === PagesCAdmin.PRODUCTS_IN_STOCK)}`}
                                accordionDetails={
                                    <Fragment>
                                        <div className="FirstLinkSeparator LinkSeparator" />
                                        <div className={`FlexRow SubmenuLink Transition ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.PRODUCTS)}`}>
                                            <a href={PagesCAdmin.PRODUCTS} >Product List</a>
                                        </div>
                                        <div className="LinkSeparator" />
                                        <div className={`FlexRow SubmenuLink Transition ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.PRODUCTS_IN_STOCK)}`}>
                                            <a href={PagesCAdmin.PRODUCTS_IN_STOCK}>In Stock</a>
                                        </div>
                                    </Fragment>
                                }
                                accordionDetailsClasses={'SidebarSubmenu FlexColumn'} />
                        </div>
                        <a
                            href={PagesCAdmin.DRAFTS}
                            className={`SidebarButton SidebarButtonMarginTop Transition FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DRAFTS)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgDrafts }} />
                            Drafts
                        </a>
                        <a
                            href={PagesCAdmin.OUTGOING}
                            className={`SidebarButton SidebarButtonMarginTop Transition FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.OUTGOING)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }} />
                            Outgoing
                        </a>
                        <a
                            href={PagesCAdmin.INCOMMING}
                            className={`SidebarButton SidebarButtonMarginTop Transition FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.INCOMMING)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} />
                            Incomming
                        </a>
                    </div>
                </div>
            </div >
        )
    }

}
