/* global TR */

import React from 'react';

import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';

import './../../css/components-pages/page-not-found-component.css';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import PageComponent from '../../../common/js/components-pages/PageComponent';
import { inject, observer } from 'mobx-react';
import Config from '../../../../../../builds/dev-generated/Config';
import Notifications from '../../../cadmin/js/components-inc/Notifications';

interface Props extends ContextPageComponentProps {
}

export default class PageNotFoundComponent extends ContextPageComponent < Props > {

    static layout() {
        const MobXComponent = inject('appStore')(observer(PageNotFoundComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageNotFound';
    }

    renderContent() {
        return (
            <div style = { { 'width': '1000px', 'height': '500px', 'margin': 'auto' } } className = { 'FlexSingleCenter' } >
                <LayoutBlock className = {` PageContent `}>
                    <div className = {` ErrorCodeText `}>
                        404
                    </div>
                    <div className = {` ErrorHeader `}>
                        OOPS! NOTHING WAS FOUND
                    </div>
                    <div className = {` ErrorMessage `}>
                        The page you are looking for might have been removed, had its name changed or is temporary unavailable. 
                        <a href = {`${Config.URL.ROOT}`}>Return to homepage</a>
                    </div>
                </LayoutBlock>
            </div>
        )
    }
}
