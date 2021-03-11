import React from 'react';
import { inject, observer } from 'mobx-react';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import PopupSubmitShipmentStatusStore from '../../../common/js/stores/PopupSubmitShipmentStatusStore';

import SvgSuccess from '../../../common/svg/submit-success.svg';
import '../../css/components-popups/submit-shipment-status-popup.css';

interface Props extends PopupWindowProps {
    popupStore: PopupSubmitShipmentStatusStore;
}

class SubmitShipmentStatusPopup extends PopupWindow<Props> {

    getCssClassName() {
        return 'SubmitShipmentStatusPopup PopupPadding PopupBox';
    }

    hasClose() {
        return false;
    }

    isRemovable() {
        return false;
    }

    renderContent() {
        return (
            <div className={'PopupWindowContent SmallContent FlexColumn'} >
                <div className={'SVG IconSuccess'} dangerouslySetInnerHTML={{ __html: SvgSuccess }} />
                <div className={'Label'} >Shipment is successfully {this.props.popupStore.getStatusNameString()}!</div>
            </div>
        )
    }

}

export default inject((stores) => {
    return {
        popupStore: stores.popupSubmitShipmentStatusStore,
    }
})(observer(SubmitShipmentStatusPopup));
