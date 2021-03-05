import React from 'react';

import Notifications from './Notifications';

import SvgLogout from '../../../common/svg/logout.svg';
import SvgFlag from '../../../common/svg/flags/germany.svg';

import '../../css/components-inc/page-view.css';

interface Props {
    pageTitle: string;
}

export default class PageView extends React.Component<Props> {

    render() {
        return (
            <div className={'PageView FlexColumn'} >
                <div className={'PageHeader FlexRow FlexSplit MarginBottom'} >
                    {this.props.pageTitle}
                    <div className={'HeaderRight FlexSplit'} >
                        <Notifications />
                        <div className="UserTab FlexRow">
                            <div className="CountryTab">
                                <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgFlag }}></div>
                            Germany
                            </div>
                            <div className="Separator"></div>
                            <div className={'SVG Logout'} dangerouslySetInnerHTML={{ __html: SvgLogout }}></div>
                        </div>
                    </div>
                </div>
                { this.props.children}
            </div>
        )
    }

}
