import React from 'react';

import Config from '../../../../../../builds/dev-generated/Config';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../../css/components-inc/expandable.css';

interface Props {
    expanded: boolean;
    accordionSummary: any;
    accordionSummaryClasses: string;
    accordionDetails: any;
    accordionDetailsClasses: string;
}

export default class Expandable extends React.Component<Props> {
    render() {
        return (
            < Accordion defaultExpanded={this.props.page === PagesCAdmin.PRODUCTS || this.props.page === PagesCAdmin.PRODUCTS_IN_STOCK} >
                <AccordionSummary className={this.props.accordionSummaryClasses} expandIcon={<ExpandMoreIcon />}>
                    {this.props.accordionSummary}
                </AccordionSummary>
                <AccordionDetails className={this.props.accordionDetailsClasses}>
                    {this.props.accordionDetails}
                </AccordionDetails>
            </Accordion >
        )
    }
}
