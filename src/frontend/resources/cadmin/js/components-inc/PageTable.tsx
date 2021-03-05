import React from 'react';
import Scrollable from '../../../common/js/components-inc/Scrollable';
import S from '../../../common/js/utilities/Main';

import '../../css/components-inc/page-table.css';

interface Props {
    className?: string;
    header: any,
    footer: any,
}

export default class PageTable extends React.Component < Props > {

    static defaultProps: any;

    render() {
        return (
            <div className = { `PageTable FlexColumn ${this.props.className}` } >
                <div className = { 'PageTableHeaderCnt' } > { this.props.header } </div>
                <Scrollable>
                    {this.props.children}
                </Scrollable>
                <div className = { 'PageTableFooterCnt' } > { this.props.footer } </div>
            </div>
        )
    }

}

PageTable.defaultProps = {
    'className': S.Strings.EMPTY,
};
