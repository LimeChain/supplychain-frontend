import React from 'react';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import { inject, observer } from 'mobx-react';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';

interface Props extends PopupWindowProps {
    popupStore: PopupProductStore;
}

class ProductPopup extends PopupWindow < Props > {

    getCssClassName() {
        return 'ProductPopup PopupPadding PopupBox';
    }

    renderContent() {
        return (
            <div className = { 'PopupWindowContent' }>
                Hello popup!
            </div>
        )
    }

}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        appStore: stores.appStore,
        popupStore: stores.popupProductStore,
    }
})(observer(ProductPopup));
