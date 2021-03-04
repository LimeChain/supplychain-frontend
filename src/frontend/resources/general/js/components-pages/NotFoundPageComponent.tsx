import React from 'react';
import { inject, observer } from 'mobx-react';

import Config from '../../../../../../builds/dev-generated/Config';

import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import PageComponent from '../../../common/js/components-pages/PageComponent';

import './../../css/components-pages/page-not-found-component.css';
import Button from '../../../common/js/components-inc/Button';

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
            <div className = { 'PageContent FlexSingleCenter FlexColumn' } >
                <div className = { 'ErrorCodeText' } >404</div>
                <div className = { 'ErrorHeader' } >Oops! Nothing was found</div>
                <div className = { 'ErrorMessage' } >
                    The page you are looking for might have been removed, had its name changed or is temporary unavailable.
                    <Button type = { Button.TYPE_TEXT_INLINE } href = {`${Config.URL.ROOT}`} >Return to homepage</Button>
                </div>
            </div>
        )
    }
}
