import React, { MouseEventHandler } from 'react';
import { inject, observer } from 'mobx-react';

import { MenuItem } from '@material-ui/core';

import S from '../../../common/js/utilities/Main';
import NumralHelper from '../../../common/js/helpers/NumeralHelper';
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

interface Props extends PopupWindowProps {
    alertStore: AlertStore;
    appStore: AppStore;
    siteStore: SiteStore;
    accountSessionStore: AccountSessionStore;
    popupStore: PopupShipmentStore;
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
        const FIELDS = this.state.manufacturedPlace === S.INT_TRUE ? PopupShipmentStore.FIELDS_LOCALLY_PRODUCED : PopupShipmentStore.FIELDS_FROM_SHIPMENT;
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
        const { countryModel, siteModel } = this.getFromSite();

        this.props.popupStore.shipmentModel.shipmentOriginSiteId = siteModel.siteId;

        this.shipmentApi.creditShipment(
            this.props.popupStore.shipmentModel,
            this.props.popupStore.skuModels,
            this.props.popupStore.skuOriginModels,
            [],
            () => {
                console.log('submitted');
            },
        )
    }

    renderContent() {
        const popupStore = this.props.popupStore;
        const shipmentModel = popupStore.shipmentModel;
        const buildSkuModel = popupStore.buildSkuModel;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;
        const buildSkuInputStateHelper = this.props.popupStore.buildSkuInputStateHelper;
        const FIELDS = PopupShipmentStore.FIELDS_FROM_SHIPMENT;

        buildSkuInputStateHelper.updateValues([
            buildSkuModel.productId === S.Strings.NOT_EXISTS ? null : buildSkuModel.productId,
            buildSkuOriginModel.shipmentId === S.Strings.NOT_EXISTS ? null : buildSkuOriginModel.shipmentId,
            buildSkuModel.pricePerUnit === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.pricePerUnit.toString(),
            buildSkuModel.quantity === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.quantity.toString(),
        ]);

        return (
            <div className={'PopupWindowContent LargeContent'} >
                <div className={'PopupHeader FlexRow'} >
                    <div className={'PopupTitle'}>New shipment</div>
                    <LayoutBlock direction={LayoutBlock.DIRECTION_ROW} >
                        <Input
                            placeholder={'Enter consigment ID'}
                            value={shipmentModel.shipmentConsignmentNumber}
                            onChange={this.onChangeConsigmentId} />
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
                                        <div className={`Radio FlexRow ${S.CSS.getActiveClassName(this.state.manufacturedPlace === S.INT_TRUE)}`} onClick={this.onClickLocallyManufactured} > Yes </div>
                                        <div className={`Radio FlexRow ${S.CSS.getActiveClassName(this.state.manufacturedPlace === S.INT_FALSE)}`} onClick={this.onClickFromShipment} > No </div>
                                    </div>
                                    <div className={'AddProductCnt FlexSplit'} >
                                        <LayoutBlock direction={LayoutBlock.DIRECTION_ROW} >
                                            <SelectSearchable
                                                className={'SelectProduct'}
                                                label={'Product'}
                                                value={buildSkuInputStateHelper.values.get(FIELDS[0])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS[0])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS[0])}
                                                options={[
                                                    SelectSearchable.option('1', '#35 Product name'),
                                                ]} />
                                            {this.state.manufacturedPlace === S.INT_FALSE && (
                                                <SelectSearchable
                                                    className={'SelectFromShipment'}
                                                    label={'From Shipment'}
                                                    value={buildSkuInputStateHelper.values.get(FIELDS[1])}
                                                    error={buildSkuInputStateHelper.errors.get(FIELDS[1])}
                                                    onChange={buildSkuInputStateHelper.onChanges.get(FIELDS[1])}
                                                    options={[
                                                        SelectSearchable.option('1', '#34 Shipment'),
                                                    ]} />
                                            )}
                                            <Input
                                                className={'InputSku'}
                                                label={'SKU Value'}
                                                placeholder={'0'}
                                                InputProps={{
                                                    startAdornment: <span className={'StartAdornment'}>€</span>,
                                                }}
                                                inputType={InputType.INTEGER}
                                                value={buildSkuInputStateHelper.values.get(FIELDS[2])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS[2])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS[2])} />
                                            <Input
                                                className={'InputQuantity'}
                                                label={'Quantity'}
                                                placeholder={'0'}
                                                InputProps={{
                                                    endAdornment: <span className={'EndAdornment'}>max</span>,
                                                }}
                                                inputType={InputType.INTEGER}
                                                value={buildSkuInputStateHelper.values.get(FIELDS[3])}
                                                error={buildSkuInputStateHelper.errors.get(FIELDS[3])}
                                                onChange={buildSkuInputStateHelper.onChanges.get(FIELDS[3])} />
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
                            Price: <span>{NumralHelper(1431).format()}</span>
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

    getFromSite = (): { countryModel: CountryModel, siteModel: SiteModel } => {
        const accountModel = this.props.accountSessionStore.accountModel;
        const countryModel = this.props.siteStore.getCountryModel(accountModel.countryId);
        if (countryModel === null) {
            return null;
        }

        const siteModel = this.props.siteStore.getFirstSiteModelByCountryId(countryModel.countryId);

        return { countryModel, siteModel };
    }

    renderFromSite() {

        const { countryModel, siteModel } = this.getFromSite();

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
        const shipmentModel = this.props.popupStore.shipmentModel;
        const shipmentInputStateHelper = this.props.popupStore.shipmentInputStateHelper;
        const FIELDS = PopupShipmentStore.FIELDS_SHIPMENT;

        shipmentInputStateHelper.updateValues([
            shipmentModel.shipmentDestinationSiteId === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : shipmentModel.shipmentDestinationSiteId,
        ]);

        const siteStore = this.props.siteStore;
        const accountModel = this.props.accountSessionStore.accountModel;
        const ownCountryModel = siteStore.getCountryModel(accountModel.countryId);
        if (ownCountryModel === null) {
            return null;
        }

        const ownSiteModel = this.props.siteStore.getFirstSiteModelByCountryId(ownCountryModel.countryId);
        return (
            <Select
                label={'To'}
                value={shipmentInputStateHelper.values.get(FIELDS[0])}
                error={shipmentInputStateHelper.errors.get(FIELDS[0])}
                onChange={shipmentInputStateHelper.onChanges.get(FIELDS[0])} >
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
        const result = popupStore.skuModels.map((skuModel: SkuModel, i: number) => {
            return [
                Table.cellString(skuModel.isNew() === true ? 'N/A' : skuModel.skuId.toString()),
                Table.cellString('Product name'),
                Table.cellString('from shipment'),
                Table.cellString(skuModel.quantity.toString()),
                Table.cellString('Measurement'),
                Table.cellString(skuModel.pricePerUnit.toString()),
                Table.cellString('total price'),
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
    }
})(observer(ShipmentPopup));
