import React from 'react';

import { FormControl } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import MuiAutocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';

import S from '../utilities/Main';

import Input from './Input';

import SvgArrowDropDown from '@material-ui/icons/KeyboardArrowDown'
import '../../css/components-inc/select-searchable.css';

interface Option {
    value: any,
    label: any,
}

interface Props extends AutocompleteProps < Option, true, true, false > {
    onChange: (value: any) => void;
    label?: string;
    error?: boolean;
    readOnly?: boolean;
}

export default class SelectSearchable extends React.Component < Props > {

    static defaultProps: any;

    static option(value: any, label: any = null): Option {
        if (label === null) {
            label = value;
        }

        return {
            'value': value,
            'label': label,
        }
    }

    onChange = (_, value) => {
        this.props.onChange(value);
    }

    getOptionLabel = (option: Option) => {
        return option.label === undefined ? S.Strings.EMPTY : option.label;
    }

    getOptionSelected = (option: Option, value: Option) => {
        return option.value === value.value;
    }

    render() {
        const { error, label, onChange, readOnly, className, ...props } = this.props;
        return (
            <div className = { `SelectSearchable ${className}` }>
                <FormControl variant = { 'standard' } >
                    <MuiAutocomplete
                        { ...props }
                        PopperComponent = { SelectSearchablePopper }
                        onChange = { this.props.onChange !== null && readOnly !== true ? this.onChange : null }
                        getOptionLabel = { this.getOptionLabel }
                        getOptionSelected = { this.getOptionSelected }
                        filterSelectedOptions = { true }
                        popupIcon = { <SvgArrowDropDown /> }
                        renderInput = { (params) => (
                            <Input
                                { ...params }
                                label = { label }
                                error = { error }
                                fullWidth />
                        )} />
                </FormControl>
            </div>
        );
    }
}

class SelectSearchablePopper extends React.Component {

    render() {
        return (
            <Popper id = { 'searchable-select-popper' } {...this.props} />
        );
    }

}

SelectSearchable.defaultProps = {
    'className': S.Strings.EMPTY,
};
