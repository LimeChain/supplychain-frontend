import React from 'react';
import S from '../utilities/Main';

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';

import TableHelper from '../helpers/TableHelper';
import Paging from './Paging';

import '../../css/components-inc/table-desktop.css';
import { observer } from 'mobx-react';

export interface TableDesktopProps {
    className?: string;
    widths: string[];
    legend: string[];
    aligns?: number[];
    helper: TableHelper;
    rows: any[];
    onClickRow?: () => void;
    showPaging?: boolean;
    emptyLabel?: string,
}

class TableDesktop extends React.Component < TableDesktopProps > {

    static defaultProps: any;

    static ALIGN_LEFT: number = 1;
    static ALIGN_CENTER: number = 2;
    static ALIGN_RIGHT: number = 3;

    getCellStyle(index: number) {
        const widths = this.props.widths;

        return {
            'width': widths[index],
        };
    }

    getCellAlign(index: number) {
        const aligns = this.props.aligns;
        if (aligns === null) {
            return S.Strings.EMPTY;
        }

        switch (aligns[index]) {
            default:
            case TableDesktop.ALIGN_LEFT:
                return 'TableCellAlignLeft';
            case TableDesktop.ALIGN_CENTER:
                return 'TableCellAlignCenter';
            case TableDesktop.ALIGN_RIGHT:
                return 'TableCellAlignRight';
        }
    }

    onClickLegendCell(index: number) {
        const helper = this.props.helper;
        if (helper.isTableSortIndexClickable(index) === false) {
            return;
        }

        const sortKey = helper.getTableSortKey(index);
        if (Math.abs(helper.tableState.sortKey) === sortKey) {
            helper.updateTableSortDirection();
        } else {
            helper.updateTableSort(sortKey);
        }
    }

    onClickRow(rowIndex: number) {
        if (this.props.onClickRow !== null) {
            this.props.onClickRow(rowIndex);
        }
    }

    render() {
        return (
            <div className = { `Table TableDesktop ${this.props.className}` } >
                { this.renderLegend() }
                { this.renderRows() }
                { this.props.showPaging === true && (
                    <Paging helper = { this.props.helper } />
                ) }
            </div>
        )
    }

    renderLegend() {
        const helper = this.props.helper
        const legend = this.props.legend;
        const legendRow = [];

        for (let i = 0; i < legend.length; ++i) {
            legendRow.push((
                <div
                    key = { i }
                    className = { `TableCell FlexRow ${this.getCellAlign(i)} ${S.CSS.getClassName(helper.isTableSortIndexClickable(i), 'Clickable')} ${S.CSS.getClassName(helper.getTableSortIndex() === i, 'Sorted')}` }
                    style = { this.getCellStyle(i) }
                    onClick = { this.onClickLegendCell.bind(this, i) } >

                    { legend[i] }
                    { this.renderSortArrow(i) }

                </div>
            ))
        }

        return (
            <div className = { 'TableRow Legend' } > { legendRow } </div>
        )
    }

    renderSortArrow(index: number) {
        const helper = this.props.helper;
        const sortIndex = helper.getTableSortIndex();
        if (sortIndex !== index) {
            return null;
        }

        return helper.tableState.sortKey > 0 ? <ArrowUpIcon/> : <ArrowDownIcon/>;
    }

    renderRows() {
        const rows = this.props.rows;
        if (rows.length === 0) {
            return (
                <div className = { 'Empty FlexSingleCenter' } > { this.props.emptyLabel } </div>
            );
        }

        const helper = this.props.helper;
        const tableSortIndex = helper.getTableSortIndex();
        const resultRows = [];

        for (let i = 0; i < rows.length; ++i) {
            const row = rows[i];
            const resultRow = [];
            for (let j = 0; j < row.length; ++j) {
                resultRow.push((
                    <div key = { j } className = { `TableCell FlexRow ${this.getCellAlign(j)} ${S.CSS.getClassName(tableSortIndex === j, 'Sorted')}` } style = { this.getCellStyle(j) } > { row[j].content } </div>
                ))
            }
            resultRows.push((
                <div key = { i } className = { 'TableRow Transition' } onClick = { this.onClickRow.bind(this, i) } > { resultRow } </div>
            ));
        }

        return resultRows;
    }

}

TableDesktop.defaultProps = {
    'className': S.Strings.EMPTY,
    'aligns': null,
    'onClickRow': null,
    'showPaging': true,
    'emptyLabel': 'No results found',
};

export default observer(TableDesktop);
