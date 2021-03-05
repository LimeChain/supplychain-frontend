import React from 'react';
import PropTypes from 'prop-types';

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

interface Props {
    page: string;
}

interface State {
    expanded: boolean;
}

export default class Sidebar extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = { expanded: true };
    }

    controlAccordion = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        return (
            <div className={'Sidebar'} >
                <div className={'FlexColumn'} >
                    <div className={'StartRight'}>
                        <div className={'SidebarHeader'}>System Name</div>
                        <a href={PagesCAdmin.DASHBOARD}
                            className={`SidebarButton FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DASHBOARD)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgDashboard }}></div>
                            Dashboard
                        </a>
                        <div className={'SidebarButton'} >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <div className={`SidebarButton FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.PRODUCTS)}`}>
                                        <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgProducts }}></div>
                                        Products
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className={'SidebarSubmenu'}>
                                    <ul>
                                        <li><a href={PagesCAdmin.PRODUCTS_LIST} />Product List</li>
                                        <li><a href={PagesCAdmin.PRODUCTS_IN_STOCK} />In Stock</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <a href={PagesCAdmin.DRAFTS}
                            className={`SidebarButton FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.DRAFTS)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgDrafts }}></div>
                            Drafts
                        </a>
                        <a href={PagesCAdmin.OUTGOING}
                            className={`SidebarButton FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.OUTGOING)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgOutgoing }}></div>
                            Outgoing
                        </a>
                        <a href={PagesCAdmin.INCOMMING}
                            className={`SidebarButton FlexRow ${S.CSS.getActiveClassName(this.props.page === PagesCAdmin.INCOMMING)}`}>
                            <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgIncomming }}></div>
                            Incomming
                        </a>
                    </div>
                </div>
            </div >
        )
    }

}
