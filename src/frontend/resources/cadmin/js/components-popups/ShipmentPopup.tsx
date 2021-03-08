import React from 'react';
import { inject, observer } from 'mobx-react';

import { MenuItem } from '@material-ui/core';

import NumralHelper from '../../../common/js/helpers/NumeralHelper';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import Input from '../../../common/js/components-inc/Input';
import Select from '../../../common/js/components-inc/Select';

import SvgSave from '../../../common/svg/save.svg';
import '../../css/components-popups/shipment-popup.css';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import S from '../../../common/js/utilities/Main';

interface Props extends PopupWindowProps {
    popupStore: PopupShipmentStore;
}

class ShipmentPopup extends PopupWindow < Props > {

    getCssClassName() {
        return 'ShipmentPopup PopupPadding PopupBox';
    }

    onClickTabProducts = () => {
        this.props.popupStore.setTabProducts();
    }

    onClickTabDocuments = () => {
        this.props.popupStore.setTabDocuments();
    }

    renderContent() {
        return (
            <div className = { 'PopupWindowContent LargeContent' } >
                <div className = { 'PopupHeader FlexRow' } >
                    <div className = { 'PopupTitle' }>New shipment</div>
                    <LayoutBlock direction = { LayoutBlock.DIRECTION_ROW } >
                        <Input
                            placeholder = { 'Enter consigment ID' } />
                        <Select
                            label = { 'From' }
                            value = { 1 }
                            readOnly = { true } >
                            <MenuItem value = { 1 } >Berlin, Germany</MenuItem>
                        </Select>
                        <Select
                            label = { 'To' } >
                            <MenuItem value = { 1 } >Berlin, Germany</MenuItem>
                            <MenuItem value = { 2 }>Rotherdam, Netherlands</MenuItem>
                        </Select>
                    </LayoutBlock>
                </div>
                <hr />
                <div className = { 'TabsHeader FlexRow' } >
                    <div className = { `Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}` } onClick = { this.onClickTabProducts } >Products</div>
                    <div className = { `Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}` } onClick = { this.onClickTabDocuments } >Documents</div>
                </div>
                <div className = { 'TabsContent' } >
                    <div className = { `ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}` } >
                        Products
                    </div>
                    <div className = { `ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}` } >
                        Documnets
                    </div>
                </div>
                <hr />
                <div className = { 'PopupFooter FlexSplit' } >
                    <div className = { 'FooterLeft FlexRow' } >
                        <div className = { 'ItemCnt' } >
                            Items: <span>3</span>
                        </div>
                        <div className = { 'ItemCnt' } >
                            Price: <span>{NumralHelper(1431).format()}</span>
                        </div>
                    </div>
                    <div className = { 'FooterRight StartRight' } >
                        <Actions>
                            <Button type = { Button.TYPE_OUTLINE } >
                                <div className={'FlexRow'}>
                                    <div className = { 'SVG Size ButtonSvg' } dangerouslySetInnerHTML = {{ __html: SvgSave }} />
                                    Save as draft
                                </div>
                            </Button>
                            <Button>Submit shipment</Button>
                        </Actions>
                    </div>
                </div>
            </div>
        )
    }

}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        appStore: stores.appStore,
        popupStore: stores.popupShipmentStore,
    }
})(observer(ShipmentPopup));
