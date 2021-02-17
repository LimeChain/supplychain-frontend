import '../../css/components-inc/select.css';

import React from 'react';

import MuiSelect, { SelectProps } from '@material-ui/core/Select';
import { InputLabel, FormControl } from '@material-ui/core';
import SvgArrowDown from '@material-ui/icons/ArrowDownward'
import S from '../utilities/Main';

export const SelectMargin = {
    NORMAL: 1,
    DENSE: 2,
}

interface Props extends SelectProps {
    className?: string;
    margin?: SelectMargin.NORMAL | SelectMargin.DENSE;
}

export default class Select extends React.Component < Props > {

    onChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e.target.value);
        }
    }

    getMargin() {
        switch (this.props.margin) {
            default:
            case SelectMargin.NORMAL:
                return 'normal';
            case SelectMargin.DENSE:
                return 'dense';
        }
    }

    /* this is not binded */
    onOpen() {
        S.CSS.addClass(document.documentElement, 'OverflowHiddenSelect');
    }

    /* this is not binded */
    onClose() {
        S.CSS.removeClass(document.documentElement, 'OverflowHiddenSelect');
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
    }

    render() {
        const margin = this.getMargin();
        return (
            <div className = { `Select ${this.props.className}` }>
                <FormControl variant = 'outlined' margin = { margin }>

                    <InputLabel
                        error = { this.props.error }
                        variant = { 'outlined' }
                        margin = { margin } >
                        { this.props.label }
                    </InputLabel>
                    <MuiSelect
                        { ...this.props }
                        onChange = { this.props.onChange !== null && this.props.readOnly !== true ? this.onChange : undefined }
                        onOpen = { this.onOpen }
                        onClose = { this.onClose }
                        IconComponent = { SvgArrowDown }
                        margin = { margin }
                        variant = { 'outlined' } />

                </FormControl>
            </div>
        )
    }

}

Select.defaultProps = {
    'className': S.Strings.EMPTY,
    'margin': SelectMargin.DENSE,
};
