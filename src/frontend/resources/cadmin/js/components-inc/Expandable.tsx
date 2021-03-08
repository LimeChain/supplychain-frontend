import React from 'react';

import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../../css/components-inc/expandable.css';

interface Props extends AccordionProps {
    accordionSummary: any;
    accordionSummaryClasses?: string;
    accordionDetails: any;
    accordionDetailsClasses?: string;
}

export default class Expandable extends React.Component < Props > {

    render() {
        const { accordionSummary, accordionSummaryClasses, accordionDetails, accordionDetailsClasses, className, ...props } = this.props;
        return (
            <Accordion {...props} className = { `Expandable ${className}` } >
                <AccordionSummary className={accordionSummaryClasses} expandIcon={<ExpandMoreIcon />}>
                    {accordionSummary}
                </AccordionSummary>
                <AccordionDetails className={accordionDetailsClasses}>
                    {accordionDetails}
                </AccordionDetails>
            </Accordion >
        )
    }

}
