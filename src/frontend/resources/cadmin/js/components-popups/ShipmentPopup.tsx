import React, { MouseEventHandler } from 'react';
import { inject, observer } from 'mobx-react';

import { MenuItem } from '@material-ui/core';

import S from '../../../common/js/utilities/Main';
import NumralHelper from '../../../common/js/helpers/NumeralHelper';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import Input, { InputType } from '../../../common/js/components-inc/Input';
import Select from '../../../common/js/components-inc/Select';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Table from '../../../common/js/components-inc/Table';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import Expandable from '../components-inc/Expandable';

import SvgAdd from '@material-ui/icons/Add';
import SvgDelete from '../../../common/svg/delete.svg';
import SvgSave from '../../../common/svg/save.svg';
import '../../css/components-popups/shipment-popup.css';
import { runInAction } from 'mobx';

interface Props extends PopupWindowProps {
    popupStore: PopupShipmentStore;
}

interface State {
    manufacturedPlace: number
}

class ShipmentPopup extends PopupWindow < Props, State > {

    onClickLocallyManufactured: (_: number, e: MouseEventHandler < HTMLDivElement >) => void;
    onClickFromShipment: (_: number, e: MouseEventHandler < HTMLDivElement >) => void;

    constructor(props: Props) {
        super(props);

        this.state = {
            manufacturedPlace: S.INT_TRUE,
        };

        this.onClickLocallyManufactured = this.onClickChangeManufacturedPlace.bind(this, S.INT_TRUE);
        this.onClickFromShipment = this.onClickChangeManufacturedPlace.bind(this, S.INT_FALSE);
    }

    getCssClassName() {
        return 'ShipmentPopup PopupPadding PopupBox';
    }

    isRemovable() {
        return false;
    }

    onClickTabProducts = () => {
        this.props.popupStore.setTabProducts();
    }

    onClickTabDocuments = () => {
        this.props.popupStore.setTabDocuments();
    }

    onClickChangeManufacturedPlace(value) {
        this.props.popupStore.buildSkuOriginModel.setLocallyProcuded();

        this.setState({
            manufacturedPlace: value,
        });
    }

    onChangeConsigmentId = (value) => {
        this.props.popupStore.shipmentModel.shipmentConsignmentNumber = value;
    }

    onClickAddSku = () => {
        const popupStore = this.props.popupStore;
    }

    renderContent() {
        const popupStore = this.props.popupStore;
        const buildSkuModel = popupStore.buildSkuModel;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;
        const inputStateHelperLocallyProduced = this.props.popupStore.inputStateHelperLocallyProduced;
        const FIELDS = PopupShipmentStore.FIELDS_FROM_SHIPMENT;

        runInAction(() => {
            inputStateHelperLocallyProduced.updateValues([
                buildSkuModel.productId === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.productId,
                buildSkuOriginModel.shipmentId === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : buildSkuOriginModel.shipmentId,
                buildSkuModel.pricePerUnit === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.pricePerUnit.toString(),
                buildSkuModel.quantity === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.quantity.toString(),
            ]);
        });

        return (
            <div className = { 'PopupWindowContent LargeContent' } >
                <div className = { 'PopupHeader FlexRow' } >
                    <div className = { 'PopupTitle' }>New shipment</div>
                    <LayoutBlock direction = { LayoutBlock.DIRECTION_ROW } >
                        <Input
                            placeholder = { 'Enter consigment ID' }
                            value = { this.props.popupStore.shipmentModel.shipmentConsignmentNumber }
                            onChange = { this.onChangeConsigmentId } />
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
                    <div className = { `TabProducts ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}` } >
                        <Expandable
                            defaultExpanded = { true }
                            accordionSummary = {
                                <div className = { 'BlockLabel' } > Select product </div>
                            }
                            accordionDetailsClasses = { 'FlexColumn' }
                            accordionDetails = {
                                <>
                                    <div className = { 'ProductManufactureQuestion' } >Is the product locally manufactured?</div>
                                    <div className = { 'FlexRow' } >
                                        <div className = { `Radio FlexRow ${S.CSS.getActiveClassName(this.state.manufacturedPlace === S.INT_TRUE)}` } onClick = { this.onClickLocallyManufactured } > Yes </div>
                                        <div className = { `Radio FlexRow ${S.CSS.getActiveClassName(this.state.manufacturedPlace === S.INT_FALSE)}` } onClick = { this.onClickFromShipment } > No </div>
                                    </div>
                                    <div className = { 'AddProductCnt FlexSplit' } >
                                        <LayoutBlock direction = { LayoutBlock.DIRECTION_ROW } >
                                            <Select
                                                className = { 'SelectProduct' }
                                                label = { 'Product' }
                                                value = { inputStateHelperLocallyProduced.values.get(FIELDS[0]) }
                                                error = { inputStateHelperLocallyProduced.errors.get(FIELDS[0]) }
                                                onChange = { inputStateHelperLocallyProduced.onChanges.get(FIELDS[0]) } >
                                                <MenuItem value = { 1 } >#34 Product name</MenuItem>
                                            </Select>
                                            { this.state.manufacturedPlace === S.INT_FALSE && (
                                                <Select
                                                    className = { 'SelectFromShipment' }
                                                    label = { 'From Shipment' }
                                                    value = { inputStateHelperLocallyProduced.values.get(FIELDS[1]) }
                                                    error = { inputStateHelperLocallyProduced.errors.get(FIELDS[1]) }
                                                    onChange = { inputStateHelperLocallyProduced.onChanges.get(FIELDS[1]) }>
                                                    <MenuItem value = { 1 } >#34 Shipment</MenuItem>
                                                </Select>
                                            ) }
                                            <Input
                                                className = { 'InputSku' }
                                                label = { 'SKU Value' }
                                                placeholder = { '0' }
                                                InputProps = {{
                                                    startAdornment: <span className = { 'StartAdornment' }>€</span>,
                                                }}
                                                inputType = { InputType.INTEGER }
                                                value = { inputStateHelperLocallyProduced.values.get(FIELDS[2]) }
                                                error = { inputStateHelperLocallyProduced.errors.get(FIELDS[2]) }
                                                onChange = { inputStateHelperLocallyProduced.onChanges.get(FIELDS[2]) } />
                                            <Input
                                                className = { 'InputQuantity' }
                                                label = { 'Quantity' }
                                                placeholder = { '0' }
                                                InputProps = {{
                                                    endAdornment: <span className = { 'EndAdornment' }>max</span>,
                                                }}
                                                inputType = { InputType.INTEGER }
                                                value = { inputStateHelperLocallyProduced.values.get(FIELDS[3]) }
                                                error = { inputStateHelperLocallyProduced.errors.get(FIELDS[3]) }
                                                onChange = { inputStateHelperLocallyProduced.onChanges.get(FIELDS[3]) } />
                                        </LayoutBlock>
                                        <Actions className = { 'StartRight' } >
                                            <Button>
                                                <div className = { 'FlexRow' } >
                                                    <div className = { 'SVG Size ButtonSvg' } ><SvgAdd /></div>
                                                    Add
                                                </div>
                                            </Button>
                                        </Actions>
                                    </div>
                                </>
                            } />
                        <hr className = { 'MarginBottomOnly' } />
                        <div className = { 'BlockLabel' } >Product list</div>
                        <Table
                            widths = { ['7%', '33%', '11%', '11%', '11%', '11%', '11%', '5%'] }
                            legend = { ['ID', 'Product name', 'From shipment', 'Quantity', 'Measurement', 'SKU value', 'Total value', S.Strings.EMPTY] }
                            aligns = { [TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT] }
                            rows = { this.renderProductRows() }
                            helper = { this.props.popupStore.productTableHelper }
                            emptyLabel = { 'Product list is still empty' } />
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

    renderProductRows() {
        const result = [];

        // for (let i = 0; i < 4; ++i) {
        //     result.push([
        //         Table.cellString((i * 10 + 1).toString()),
        //         Table.cellString((i * 10 + 2).toString()),
        //         Table.cellString((i * 10 + 3).toString()),
        //         Table.cellString((i * 10 + 4).toString()),
        //         Table.cellString((i * 10 + 5).toString()),
        //         Table.cellString((i * 10 + 6).toString()),
        //         Table.cellString((i * 10 + 7).toString()),
        //         Table.cell((
        //             <div className = { 'SVG IconDelete' } dangerouslySetInnerHTML = {{ __html: SvgDelete }} />
        //         )),
        //     ]);
        // }

        return result;
    }

}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        appStore: stores.appStore,
        popupStore: stores.popupShipmentStore,
    }
})(observer(ShipmentPopup));
