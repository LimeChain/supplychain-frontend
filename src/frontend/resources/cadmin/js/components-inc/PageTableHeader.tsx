import { MenuItem } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import Select from '../../../common/js/components-inc/Select';
import TimeoutHelper from '../../../common/js/helpers/TimeoutHelper';
import S from '../../../common/js/utilities/Main';

import SvgSearch from '../../../common/svg/search.svg';
import '../../css/components-inc/page-table-header.css';

interface Props {
    searchPlaceHolder: string;
    selectedSortBy: number;
    options: PageTableHeaderSortByStruct[];
    onChangeSearchWord: (value: string) => void;
    onChangeSortBy: (value: number) => void;
}

interface State {
    searchWord: string;
}

export default class PageTableHeader extends React.Component < Props, State > {

    timeoutHelper: TimeoutHelper;

    constructor(props: Props) {
        super(props);

        this.state = {
            'searchWord': S.Strings.EMPTY,
        };

        this.timeoutHelper = new TimeoutHelper();
    }

    onChangeSearchWord = (e: ChangeEvent < HTMLInputElement >) => {
        this.setState({
            searchWord: e.target.value,
        }, () => {
            this.timeoutHelper.signal(this.onTimeoutChangedSearchWord);
        });

    }

    onTimeoutChangedSearchWord = () => {
        this.props.onChangeSearchWord(this.state.searchWord);
    }

    onChangeSortBy = (value: any) => {
        this.props.onChangeSortBy(value === S.Strings.EMPTY ? S.NOT_EXISTS : value);
    }

    render() {
        return (
            <div className = { 'PageTableHeader FlexSplit FlexRow' } >
                <div className = { 'SVG IconSearch' } dangerouslySetInnerHTML = {{ __html: SvgSearch }} />
                <input
                    className ={ 'SearchInput' }
                    value = { this.state.searchWord }
                    placeholder = { this.props.searchPlaceHolder }
                    onChange = { this.onChangeSearchWord } />
                <Select
                    className = { 'SelectSortBy StartRight' }
                    placeholder = { 'Sort by' }
                    value = { this.props.selectedSortBy === S.NOT_EXISTS ? S.Strings.EMPTY : Math.abs(this.props.selectedSortBy) }
                    onChange = { this.onChangeSortBy }
                    displayEmpty = { true }>
                    { this.props.options.map((item, i: number) => {
                        return (
                            <MenuItem key = { i } value = { item.key }> { item.value } </MenuItem>
                        )
                    }) }
                </Select>
            </div>
        )
    }

}

export class PageTableHeaderSortByStruct {

    key: number;
    value: string;

    constructor(key: number, value: string) {
        this.key = key;
        this.value = value;
    }

}
