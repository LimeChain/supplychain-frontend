// version 3.0.0
import React, { MouseEvent } from 'react';

import S from '../utilities/Main';

import PopupStore from '../stores/PopupStore';

import SvgClose from '@material-ui/icons/Clear';
import '../../css/components-core/popup-window.css';

let popupCounter = 0;

export interface PopupWindowProps {
    popupStore: PopupStore;
}

export default class PopupWindowComponent < Pr extends PopupWindowProps = PopupWindowProps, St = {}, SS = any > extends React.Component < Pr, St, SS > {

    visibleFlag: boolean = false;
    nodes: {
        popupWindow: React.RefObject < HTMLDivElement >,
    };

    constructor(props: Pr) {
        super(props);

        this.nodes = {
            'popupWindow': React.createRef(),
        };
    }

    componentDidUpdate() {
        if (this.visibleFlag === this.props.popupStore.visible) {
            return;
        }

        this.visibleFlag = this.props.popupStore.visible;
        if (this.visibleFlag === true) {
            if (++popupCounter === 1) {
                S.CSS.addClass(document.documentElement, 'OverflowHiddenPopup');
            }
        } else if (--popupCounter === 0) {
            S.CSS.removeClass(document.documentElement, 'OverflowHiddenPopup');
        }
    }

    getCssClassName() {
        return S.Strings.EMPTY;
    }

    hasClose() {
        return true;
    }

    isRemovable() {
        return true;
    }

    onWheel = (e: React.WheelEvent < HTMLElement >) => {
        e.preventDefault();
        this.nodes.popupWindow.current.scrollTop += e.deltaY * 10;
    }

    onClickClose = (e: MouseEvent) => {
        e.stopPropagation();
        this.props.popupStore.hide();
    }

    render() {
        const { popupStore } = this.props;

        return (
            <div
                className = { `PopupWindowWrapper ${this.getCssClassName()} Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(popupStore.visible)}`}
                onClick = { this.isRemovable() === true ? popupStore.hide : undefined }
                onWheel = { this.onWheel } >

                <div ref = { this.nodes.popupWindow } className = { 'PopupWindow' } onClick = { S.stopPropagation } onWheel = { S.stopPropagation } >

                    { popupStore.visible === true && (
                        <>
                            <div className = { 'ScrollableContent Scrolls' } >
                                { this.hasClose() === true && (
                                    <div
                                        className = { 'Close SVG Size Clickable' }
                                        onClick = { this.onClickClose } >
                                        <SvgClose />
                                    </div>
                                ) }
                                { this.renderContent() }
                            </div>
                        </>
                    ) }

                </div>

            </div>
        );
    }

    renderContent(): React.ReactNode | null {
        return null;
    }

}
