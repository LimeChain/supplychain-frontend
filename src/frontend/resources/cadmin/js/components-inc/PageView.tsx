import React from 'react';

import Notifications from './Notifications';

import '../../css/components-inc/page-view.css';

interface Props {
    pageTitle: string;
}

export default class PageView extends React.Component < Props > {

    render() {
        return (
            <div className = { 'PageView FlexColumn' } >
                <div className = { 'PageHeader FlexRow FlexSplit MarginBottom' } >
                    { this.props.pageTitle }
                    <div className = { 'FlexSplit' } >
                        <Notifications />
                    </div>
                </div>
                { this.props.children }
            </div>
        )
    }

}
