import React, { MouseEventHandler } from 'react';
import { inject, observer } from 'mobx-react';

import { MenuItem } from '@material-ui/core';

import S from '../../../common/js/utilities/Main';
import { formatNumber, formatPrice } from '../../../common/js/helpers/NumeralHelper';
import AlertStore from '../../../common/js/stores/AlertStore';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import SiteStore from '../../../common/js/stores/SiteStore';
import AccountSessionStore from '../../../common/js/stores/AccountSessionStore';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
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
import SiteModel from '../../../common/js/models/SiteModel';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SelectSearchable from '../../../common/js/components-inc/SelectSearchable';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';
import AppStore from '../../../common/js/stores/AppStore';
import CountryModel from '../../../common/js/models/CountryModel';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ProductStore from '../../../common/js/stores/ProductStore';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';

interface Props extends PopupWindowProps {
    alertStore: AlertStore;
    appStore: AppStore;
    siteStore: SiteStore;
    accountSessionStore: AccountSessionStore;
    popupStore: PopupShipmentStore;
    productStore: ProductStore;
    shipmentStore: ShipmentStore;
}

interface State {
    manufacturedPlace: number
}

class ShipmentPopup extends PopupWindow<Props, State> {

    onClickLocallyManufactured: (_: number, e: MouseEventHandler<HTMLDivElement>) => void;
    onClickFromShipment: (_: number, e: MouseEventHandler<HTMLDivElement>) => void;

    shipmentApi: ShipmentApi

    constructor(props: Props) {
        super(props);

        this.state = {
            manufacturedPlace: S.INT_TRUE,
        };

        this.onClickLocallyManufactured = this.onClickChangeManufacturedPlace.bind(this, S.INT_TRUE);
        this.onClickFromShipment = this.onClickChangeManufacturedPlace.bind(this, S.INT_FALSE);

        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

    }

    getCssClassName() {
        return 'ShipmentPopup PopupPadding PopupBox';
    }

    isRemovable() {
        return false;
    }

    isManufacturePlaceLocal() {
        return this.state.manufacturedPlace === S.INT_TRUE;
    }

    isManufactureFromShipment() {
        return this.state.manufacturedPlace === S.INT_FALSE;
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

    onClickMaxQuantity = () => {
        const popupStore = this.props.popupStore;
        const shipmentStore = this.props.shipmentStore;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;
        popupStore.buildSkuModel.quantity = shipmentStore.getSourceMaxAvailableQuantity(buildSkuOriginModel.shipmentId);
    }

    onClickAddSku = () => {
        const popupStore = this.props.popupStore;
        const FIELDS = this.isManufacturePlaceLocal() === true ? PopupShipmentStore.FIELDS_ADD_SKU_LOCALLY_PRODUCED_SUBSET : PopupShipmentStore.FIELDS_ADD_SKU;
        if (popupStore.buildSkuInputStateHelper.getValues(FIELDS) === null) {
            return;
        }

        popupStore.addSkuFromBuild();
    }

    onClickDeleteSku(i: number) {
        this.props.alertStore.show('You are about to delete the SKU.', () => {
            const popupStore = this.props.popupStore;
            popupStore.deleteSkuByIndex(i);
        }, () => { });

    }

    onClickSubmitShipment = () => {
        const popupStore = this.props.popupStore;
        if (popupStore.shipmentInputStateHelper.getValues() === null) {
            return;
        }

        this.props.popupStore.shipmentModel.shipmentStatus = ShipmentConstsH.S_STATUS_IN_TRANSIT;
        this.props.popupStore.shipmentModel.shipmentDateOfShipment = Date.now();
        this.creditShipment();
        this.props.popupStore.hide();
    }

    onClickSaveAsDraft = () => {
        this.props.popupStore.shipmentModel.shipmentStatus = ShipmentConstsH.S_STATUS_DRAFT;
        this.creditShipment();
        this.props.popupStore.hide();
    }

    creditShipment = () => {
        const popupStore = this.props.popupStore;
        const shipmentModel = popupStore.shipmentModel;
        const onFinish = popupStore.onFinish;
        const accountModel = this.props.accountSessionStore.accountModel;
        popupStore.shipmentModel.shipmentOriginSiteId = accountModel.siteId;

        this.shipmentApi.creditShipment(popupStore.shipmentModel, popupStore.skuModels, popupStore.skuOriginModels, [], () => {
            onFinish(shipmentModel);
        })
    }

    getTotalPrice() {
        return this.props.popupStore.skuModels.reduce((acc, skuModel) => {
            return acc + skuModel.getTotalPrice();
        }, 0);
    }

    renderContent() {
        const popupStore = this.props.popupStore;
        const productStore = this.props.productStore;
        const shipmentStore = this.props.shipmentStore;

        const shipmentModel = popupStore.shipmentModel;
        const buildSkuModel = popupStore.buildSkuModel;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;

        const buildSkuInputStateHelper = this.props.popupStore.buildSkuInputStateHelper;
        const shipmentInputStateHelper = this.props.popupStore.shipmentInputStateHelper;
        const FIELDS_ADD_SKU = PopupShipmentStore.FIELDS_ADD_SKU;
        const FIELDS_SHIPMENT = PopupShipmentStore.FIELDS_SHIPMENT;

        buildSkuInputStateHelper.updateValues([
            buildSkuModel.productId === S.Strings.NOT_EXISTS ? null : SelectSearchable.option(buildSkuModel.productId, productStore.getProductName(buildSkuModel.productId)),
            buildSkuOriginModel.shipmentId === S.Strings.NOT_EXISTS ? null : SelectSearchable.option(buildSkuOriginModel.shipmentId, shipmentStore.getShipmentConsignmentNumber(buildSkuOriginModel.shipmentId)),
            buildSkuModel.pricePerUnit === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.pricePerUnit.toString(),
            buildSkuModel.quantity === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.quantity.toString(),
        ]);

        shipmentInputStateHelper.updateValues([
            shipmentModel.shipmentConsignmentNumber,
            shipmentModel.shipmentDestinationSiteId === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : shipmentModel.shipmentDestinationSiteId,
        ]);

        return (
            <div className={'PopupWindowContent LargeContent'} >
                <div className={'PopupHeader FlexRow'} >
                    <div className={'PopupTitle'}>New shipment</div>
                    <LayoutBlock direction={LayoutBlock.DIRECTION_ROW} >
                        <Input
                            placeholder={'Enter consigment ID'}
                            value={shipmentInputStateHelper.values.get(FIELDS_SHIPMENT[0])}
                            error={shipmentInputStateHelper.errors.get(FIELDS_SHIPMENT[0])}
                            onChange={shipmentInputStateHelper.onChanges.get(FIELDS_SHIPMENT[0])} />
                        {this.renderFromSite()}
                        {this.renderToSite()}
                    </LayoutBlock>
                </div>
                <hr />
                <div className={'TabsHeader FlexRow'} >
                    <div className={`Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}`} onClick={this.onClickTabProducts} >Products</div>
                    <div className={`Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}`} onClick={this.onClickTabDocuments} >Documents</div>
                </div>
                <div className={'TabsContent'} >
                    <div className={`TabProducts ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}`} >
                        <Expandable
                            defaultExpanded={true}
                            accordionSummary={
                                <div className={'BlockLabel'} > Select product </div>
                            }
                            accordionDetailsClasses={'FlexColumn'}
                            accordionDetails={
                                <>
                                    <div className={'ProductManufactureQuestion'} >Is the product locally manufactured?</div>
                                    <div className={'FlexRow'} >
                                        <div className={`Radio FlexRow ${S.CSS.getActiveClassName(this.isManufacturePlaceLocal())}`} onClick={this.onClickLocallyManufactured} > Yes </div>
                                        <div className={`Radio FlexRow ${S.CSS.getActiveClassName(this.isManufactureFromShipment())}`} onClick={this.onClickFromShipment} > No </div>
                                    </div>
                                    <div className={'AddProductCnt FlexSplit'} >
                                        <LayoutBlock direction={LayoutBlock.DIRECTION_ROW} >
                                            <SelectSearchable
                                                className={'SelectProduct'}
                                                label={'Product'}
                                                placeholder = { 'Select a product' }
                                                value={buildSkuInputStateHelper.values.get(FIELDS_ADD_SKU[0])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS_ADD_SKU[0])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS_ADD_SKU[0])}
                                                options={
                                                    productStore.listProductModels.filter((productModel) => {
                                                        return popupStore.canAddProductById(productModel.productId);
                                                    }).map((productModel) => {
                                                        return SelectSearchable.option(productModel.productId, productModel.productName);
                                                    })
                                                } />
                                            {this.isManufactureFromShipment() === true && (
                                                <SelectSearchable
                                                    className={'SelectFromShipment'}
                                                    label={'From Shipment'}
                                                    placeholder={buildSkuModel.isProductSelected() === false ? 'Select a product first' : 'Select a shipment'}
                                                    value={buildSkuInputStateHelper.values.get(FIELDS_ADD_SKU[1])}
                                                    error={buildSkuInputStateHelper.errors.get(FIELDS_ADD_SKU[1])}
                                                    onChange={buildSkuInputStateHelper.onChanges.get(FIELDS_ADD_SKU[1])}
                                                    options={shipmentStore.sourceShipmentModels.map((sModel) => {
                                                        return SelectSearchable.option(sModel.shipmentId, sModel.shipmentConsignmentNumber);
                                                    })} />
                                            )}
                                            <Input
                                                className={'InputSku'}
                                                label={'SKU Value'}
                                                placeholder={'0'}
                                                InputProps={{
                                                    startAdornment: <span className={'StartAdornment'}>€</span>,
                                                }}
                                                inputType={InputType.INTEGER}
                                                value={buildSkuInputStateHelper.values.get(FIELDS_ADD_SKU[2])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS_ADD_SKU[2])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS_ADD_SKU[2])} />
                                            <Input
                                                className={'InputQuantity'}
                                                label={'Quantity'}
                                                placeholder={'0'}
                                                InputProps={ this.isManufacturePlaceLocal() === true || buildSkuOriginModel.hasShipment() === false ? undefined : {
                                                    endAdornment: <span className={'EndAdornment'} onClick = { this.onClickMaxQuantity }>max</span>,
                                                }}
                                                inputType={InputType.INTEGER}
                                                value={buildSkuInputStateHelper.values.get(FIELDS_ADD_SKU[3])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS_ADD_SKU[3])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS_ADD_SKU[3])} />
                                        </LayoutBlock>
                                        <Actions className={'StartRight'} >
                                            <Button onClick={this.onClickAddSku}>
                                                <div className={'FlexRow'} >
                                                    <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                                    Add
                                                </div>
                                            </Button>
                                        </Actions>
                                    </div>
                                </>
                            } />
                        <hr className={'MarginBottomOnly'} />
                        <div className={'BlockLabel'} >Product list</div>
                        <Table
                            widths={['7%', '33%', '11%', '11%', '11%', '11%', '11%', '5%']}
                            legend={['ID', 'Product name', 'From shipment', 'Quantity', 'Measurement', 'SKU value', 'Total value', S.Strings.EMPTY]}
                            aligns={[TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT]}
                            rows={this.renderProductRows()}
                            helper={this.props.popupStore.productTableHelper}
                            emptyLabel={'Product list is still empty'} />
                    </div>
                    <div className={`ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}`} >
                        Documnets
                    </div>
                </div>
                <hr />
                <div className={'PopupFooter FlexSplit'} >
                    <div className={'FooterLeft FlexRow'} >
                        <div className={'ItemCnt'} >
                            Items: <span>{popupStore.skuModels.length}</span>
                        </div>
                        <div className={'ItemCnt'} >
                            Price: <span>{formatPrice(this.getTotalPrice())}</span>
                        </div>
                    </div>
                    <div className={'FooterRight StartRight'} >
                        <Actions>
                            <Button type={Button.TYPE_OUTLINE} onClick={this.onClickSaveAsDraft} >
                                <div className={'FlexRow'}>
                                    <div className={'SVG Size ButtonSvg'} dangerouslySetInnerHTML={{ __html: SvgSave }} />
                                    Save as draft
                                </div>
                            </Button>
                            <Button onClick={this.onClickSubmitShipment}>Submit shipment</Button>
                        </Actions>
                    </div>
                </div>
            </div>
        )
    }

    renderFromSite() {
        const accountModel = this.props.accountSessionStore.accountModel;
        const countryModel = this.props.siteStore.getCountryModel(accountModel.countryId);
        const siteModel = this.props.siteStore.getSiteModel(accountModel.siteId);
        if (siteModel === null || countryModel === null) {
            return null;
        }

        return (
            <Select
                label={'From'}
                value={siteModel.siteId}
                readOnly={true} >
                <MenuItem value={siteModel.siteId} >{siteModel.siteName}, {countryModel.countryName}</MenuItem>
            </Select>
        )
    }

    renderToSite() {
        const shipmentInputStateHelper = this.props.popupStore.shipmentInputStateHelper;
        const FIELDS_SHIPMENT = PopupShipmentStore.FIELDS_SHIPMENT;

        const siteStore = this.props.siteStore;
        const accountModel = this.props.accountSessionStore.accountModel;
        const ownSiteModel = siteStore.getSiteModel(accountModel.siteId);
        const ownCountryModel = siteStore.getCountryModel(accountModel.countryId);
        if (ownSiteModel === null || ownCountryModel === null) {
            return null;
        }

        return (
            <Select
                label={'To'}
                value={shipmentInputStateHelper.values.get(FIELDS_SHIPMENT[1])}
                error={shipmentInputStateHelper.errors.get(FIELDS_SHIPMENT[1])}
                onChange={shipmentInputStateHelper.onChanges.get(FIELDS_SHIPMENT[1])} >
                { siteStore.screenSiteModels.map((siteModel: SiteModel, i: number) => {
                    if (ownSiteModel.siteId === siteModel.siteId) {
                        return null;
                    }

                    const countryModel = siteStore.getCountryModel(siteModel.countryId);
                    return (
                        <MenuItem key={i} value={countryModel.countryId} >{siteModel.siteName}, {countryModel.countryName}</MenuItem>
                    )
                })}
            </Select>
        )
    }

    renderProductRows() {
        const popupStore = this.props.popupStore;
        const productStore = this.props.productStore;
        const result = popupStore.skuModels.map((skuModel: SkuModel, i: number) => {
            const productModel = productStore.getProduct(skuModel.productId);
            const skuOriginModel = popupStore.getSkuOriginModel(skuModel.skuId);
            return [
                Table.cellString(skuModel.isNew() === true ? 'N/A' : skuModel.skuId.toString()),
                Table.cellString(productModel.productName),
                Table.cellString(skuOriginModel.isLocallyProduced() === true ? 'Locally produced' : `#${skuOriginModel.shipmentId}`),
                Table.cellString(skuModel.quantity.toString()),
                Table.cellString(ProductModel.getUnitName(productModel.productUnit)),
                Table.cellString(skuModel.pricePerUnit.toString()),
                Table.cellString(formatPrice(skuModel.getTotalPrice())),
                Table.cell((
                    <div className={'SVG IconDelete'} dangerouslySetInnerHTML={{ __html: SvgDelete }} onClick={this.onClickDeleteSku.bind(this, i)} />
                )),
            ];
        });

        return result;
    }

}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        appStore: stores.appStore,
        siteStore: stores.siteStore,
        accountSessionStore: stores.accountSessionStore,
        popupStore: stores.popupShipmentStore,
        productStore: stores.productStore,
        shipmentStore: stores.shipmentStore,
    }
})(observer(ShipmentPopup));
