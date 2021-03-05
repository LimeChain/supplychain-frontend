import React from 'react';

import '../../css/components-inc/page-table-footer.css';

interface Props {
    totalItems: number;
    actions: React.ReactNode,
}

export default class PageTableFooter extends React.Component < Props > {

    render() {
        return (
            <div className = { 'PageTableFooter FlexRow FlexSplit' } >
                <div className = { 'ItemsCnt FlexRow' } >
                    Items: <span>{ this.props.totalItems }</span>
                </div>
                <div className = { 'StartRight' } >
                    { this.props.actions }
                </div>
            </div>
        )
    }

}
