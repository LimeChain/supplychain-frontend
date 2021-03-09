import '../../css/components-inc/select.css';

import React from 'react';

import MuiSelect, { SelectProps } from '@material-ui/core/Select';
import { InputLabel, FormControl } from '@material-ui/core';
import SvgArrowDropDown from '@material-ui/icons/KeyboardArrowDown'
import S from '../utilities/Main';

// export const SelectMargin = {
//     NORMAL: 1,
//     DENSE: 2,
// }

interface Props extends SelectProps {
    className?: string;
    placeholder?: string;
    onChange?: null | ((value: unknown) => boolean | void);
    // margin?: SelectMargin.NORMAL | SelectMargin.DENSE;
}

export default class Select extends React.Component < Props > {

    static defaultProps: any;

    onChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e.target.value);
        }
    }

    // getMargin() {
    //     switch (this.props.margin) {
    //         default:
    //         case SelectMargin.NORMAL:
    //             return 'normal';
    //         case SelectMargin.DENSE:
    //             return 'dense';
    //     }
    // }

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
        // const margin = this.getMargin();
        return (
            <div className = { `Select ${this.props.className}` }>
                <FormControl variant = 'standard'>

                    { this.props.label !== undefined && (
                        <InputLabel
                            error = { this.props.error }
                            variant = { 'standard' }
                            shrink = { true } >
                            { this.props.label }
                        </InputLabel>
                    ) }
                    <MuiSelect
                        { ...this.props }
                        onChange = { this.props.onChange !== null && this.props.readOnly !== true ? this.onChange : undefined }
                        onOpen = { this.onOpen }
                        onClose = { this.onClose }
                        IconComponent = { this.props.readOnly === true ? EmptyArrowComponent : SvgArrowDropDown }
                        renderValue = { this.props.value === S.Strings.EMPTY ? this.renderSelectValue : undefined }
                        variant = { 'standard' } />

                </FormControl>
            </div>
        )
    }

    renderSelectValue = (value: any) => {
        if (this.props.displayEmpty !== true) {
            return value;
        }

        return (
            <span className = { 'Placeholder' } >{this.props.placeholder}</span>
        );
    }

}

class EmptyArrowComponent extends React.Component {

    render() {
        return null;
    }

}

Select.defaultProps = {
    'className': S.Strings.EMPTY,
    // 'margin': SelectMargin.DENSE,
};
