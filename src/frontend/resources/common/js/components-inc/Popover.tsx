import React from 'react';

import MuiPopover, { PopoverProps } from '@material-ui/core/Popover';

import S from '../utilities/Main';

import '../../css/components-inc/popover.css';

export default class Popover extends React.Component < PopoverProps > {

    static defaultProps: any;

    /* this is not binded */
    onEnter() {
        S.CSS.addClass(document.documentElement, 'OverflowHiddenPopover');
    }

    /* this is not binded */
    onExited() {
        S.CSS.removeClass(document.documentElement, 'OverflowHiddenPopover');
    }

    render() {
        return (
            <MuiPopover
                {...this.props}
                className = { 'Popover' }
                onEnter = { this.onEnter }
                onExited = { this.onExited } >
                { this.props.children }
            </MuiPopover>
        )
    }

}

Popover.defaultProps = {
    'anchorOrigin': {
        vertical: 'bottom',
        horizontal: 'center',
    },
    'transformOrigin': {
        vertical: 'top',
        horizontal: 'center',
    },
};
