import React from 'react';

import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../../css/components-inc/expandable.css';
import S from '../../../common/js/utilities/Main';

interface Props extends AccordionProps {
    accordionSummary: any;
    accordionSummaryClasses?: string;
    accordionDetails: any;
    accordionDetailsClasses?: string;
    children?: React.ReactNode;
    arrowOffset?: boolean;
}

export default class Expandable extends React.Component < Props > {

    static defaultProps: any;

    render() {
        const { accordionSummary, accordionSummaryClasses, accordionDetails, accordionDetailsClasses, className, ...props } = this.props;
        return (
            <Accordion {...props} className = { `Expandable ${S.CSS.getClassName(this.props.arrowOffset, 'ExpandableArrowOffset')} ${className}` } >
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

Expandable.defaultProps = {
    accordionSummaryClasses: S.Strings.EMPTY,
    accordionDetailsClasses: S.Strings.EMPTY,
    arrowOffset: true,
}
