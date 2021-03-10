// version 2.0.0
import React from 'react';
import { inject, observer } from 'mobx-react';

import AlertStore from '../stores/AlertStore';
import S from '../utilities/Main';

import '../../css/components-core/alert.css';
import Button from '../components-inc/Button';
import Actions from '../components-inc/Actions';

interface Props {
    alertStore: AlertStore;
}

class Alert extends React.Component < Props > {

    onClickPositive = () => {
        const { alertStore } = this.props;

        let handled: boolean | void = false;
        if (alertStore.positiveListener !== null) {
            handled = alertStore.positiveListener();
        }

        if (handled !== true) {
            alertStore.hide();
        }
    }

    onClickNegative = () => {
        const { alertStore } = this.props;

        let handled: boolean | void = false;
        if (alertStore.negativeListener !== null) {
            handled = alertStore.negativeListener();
        }

        if (handled !== true) {
            alertStore.hide();
        }
    }

    render() {
        const { alertStore } = this.props;

        return (
            <div className = { `AlertWrapper Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(alertStore.isVisible())}` } >
                <div className = { 'Alert ShadowDark' } >
                    <div className = { 'MsgCnt ScrollView' } >
                        <div className = { 'Msg' } >{alertStore.msg}</div>
                        { alertStore.subMsg !== S.Strings.EMPTY && (
                            <div className = { 'SubMsg' } >{alertStore.subMsg}</div>
                        )}
                    </div>

                    <Actions>

                        { alertStore.negativeLabel !== null && (
                            <Button
                                type = { Button.TYPE_OUTLINE }
                                onClick = { this.onClickNegative } >
                                {alertStore.negativeLabel}
                            </Button>
                        ) }

                        { alertStore.positiveLabel !== null && (
                            <Button
                                type = { Button.TYPE_ROUNDED }
                                onClick = { this.onClickPositive } >
                                {alertStore.positiveLabel}
                            </Button>
                        ) }

                    </Actions>
                </div>
            </div>
        )
    }

}

export default inject('alertStore')(observer(Alert));
