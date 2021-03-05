import React from 'react';
import Scrollable from '../../../common/js/components-inc/Scrollable';

import '../../css/components-inc/page-table.css';

interface Props {
    header: any,
    footer: any,
}

export default class PageTable extends React.Component < Props > {

    render() {
        return (
            <div className = { 'PageTable' } >
                <div className = { 'PageTableHeaderCnt' } > { this.props.header } </div>
                <Scrollable>
                    {this.props.children}
                </Scrollable>
                <div className = { 'PageTableFooterCnt' } > { this.props.footer } </div>
            </div>
        )
    }

}
