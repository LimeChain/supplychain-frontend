import React, { MouseEventHandler, RefObject } from 'react';
import { inject, observer } from 'mobx-react';

import { MenuItem } from '@material-ui/core';

import ShipmentDocumentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';

import S from '../../../common/js/utilities/Main';
import { formatBytes, formatPrice } from '../../../common/js/helpers/NumeralHelper';
import AlertStore from '../../../common/js/stores/AlertStore';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import SiteStore from '../../../common/js/stores/SiteStore';
import AccountSessionStore from '../../../common/js/stores/AccountSessionStore';
import AppStore from '../../../common/js/stores/AppStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import PopupSubmitShipmentStatusStore from '../../../common/js/stores/PopupSubmitShipmentStatusStore';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import SiteModel from '../../../common/js/models/SiteModel';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import ShipmentApi from '../../../common/js/api/ShipmentApi';

import PopupWindow, { PopupWindowProps } from '../../../common/js/components-core/PopupWindow';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import Input, { InputType } from '../../../common/js/components-inc/Input';
import Select from '../../../common/js/components-inc/Select';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Table from '../../../common/js/components-inc/Table';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import Expandable from '../components-inc/Expandable';
import UploaderComponent from '../../../common/js/components-core/UploaderComponent';
import SelectSearchable from '../../../common/js/components-inc/SelectSearchable';

import SvgCheck from '@material-ui/icons/Check';
import SvgClear from '@material-ui/icons/Clear';
import SvgAdd from '@material-ui/icons/Add';
import SvgAttachment from '../../../common/svg/attachment.svg';
import SvgDelete from '../../../common/svg/delete.svg';
import SvgSave from '../../../common/svg/save.svg';
import SvgDownload from '../../../common/svg/download.svg';
import '../../css/components-popups/shipment-popup.css';

interface Props extends PopupWindowProps {
    alertStore: AlertStore;
    appStore: AppStore;
    siteStore: SiteStore;
    accountSessionStore: AccountSessionStore;
    popupStore: PopupShipmentStore;
    productStore: ProductStore;
    shipmentStore: ShipmentStore;
    popupSubmitShipmentStatusStore: PopupSubmitShipmentStatusStore;
    auditMode: boolean;
}

interface State {
    manufacturedPlace: number
}

class ShipmentPopup extends PopupWindow<Props, State> {

    onClickLocallyManufactured: (_: number, e: MouseEventHandler<HTMLDivElement>) => void;
    onClickFromShipment: (_: number, e: MouseEventHandler<HTMLDivElement>) => void;

    shipmentApi: ShipmentApi;
    dragTimeout: NodeJS.Timeout;

    iNodes: {
        'uploader': RefObject<UploaderComponent>,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            manufacturedPlace: S.INT_TRUE,
        };

        this.iNodes = {
            'uploader': React.createRef(),
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

        const alertStore = this.props.alertStore;
        alertStore.msg = 'Are you sure you want to submit shipment?';
        alertStore.subMsg = 'This action cannot be reversed';
        alertStore.positiveLabel = 'Submit';
        alertStore.negativeLabel = 'Cancel';
        alertStore.positiveListener = () => {
            const run = async () => {
                popupStore.shipmentModel.submitShipment();
                await this.creditShipment();
                this.props.popupSubmitShipmentStatusStore.show();
                setTimeout(() => {
                    this.props.popupSubmitShipmentStatusStore.hide();
                    popupStore.hide();
                }, 2000);
            }
            run();
        }
        alertStore.visible = true;
    }

    onClickSaveAsDraft = async () => {
        this.props.popupStore.shipmentModel.saveAsDraft();
        await this.creditShipment();
        this.props.popupStore.hide();
    }

    onClickDeleteDocument(shipmentDocumentModel: ShipmentDocumentModel) {
        this.props.popupStore.deleteDocument(shipmentDocumentModel);
    }

    onChangeDocumentType(shipmentDocumentModel: ShipmentDocumentModel, value: number) {
        shipmentDocumentModel.documentType = value;
    }

    onDrop = (e) => {
        e.preventDefault();

        this.props.popupStore.dragging = false;

        let files = [];
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    const file = e.dataTransfer.items[i].getAsFile();
                    files.push(file);
                }
            }
        } else {
            files = e.dataTransfer.files;
        }

        this.iNodes.uploader.current.uploader.uploadFiles(files);
    }

    onDropWrapper = (e) => {
        e.preventDefault();

        this.props.popupStore.dragging = false;
    }

    onDragOverWrapper = (e) => {
        this.props.popupStore.dragging = true;
        clearTimeout(this.dragTimeout);
        this.dragTimeout = setTimeout(() => {
            this.props.popupStore.dragging = false;
        }, 1000);
        e.preventDefault();
    }

    creditShipment = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const popupStore = this.props.popupStore;
            const shipmentModel = popupStore.shipmentModel;
            const onFinish = popupStore.onFinish;
            const accountModel = this.props.accountSessionStore.accountModel;
            popupStore.shipmentModel.shipmentOriginSiteId = accountModel.siteId;

            this.shipmentApi.creditShipment(popupStore.shipmentModel, popupStore.skuModels, popupStore.skuOriginModels, popupStore.shipmentDocumentModels, () => {
                onFinish(shipmentModel);
                resolve();
            })
        });
    }

    getTotalPrice() {
        return this.props.popupStore.skuModels.reduce((acc, skuModel) => {
            return acc + skuModel.getTotalPrice();
        }, 0);
    }

    makeDocumentUploadParams() {
        const popupStore = this.props.popupStore;
        let shipmentDocumentModels = null;

        return {
            'maxSize': 1 << 30, // 1GB
            'controller': 'http://localhost:8001/resources/common/img/favicon/favicon-16x16.png',
            'progressWindow': false,
            'onExceedLimit': () => {
                this.props.alertStore.show('Max files size is 1GB.');
            },
            onBeforeStart: (totalFiles: number) => {
                shipmentDocumentModels = popupStore.onStartUploading(totalFiles);
            },
            onProgress: (loaded: number, total: number, files: any[], i: number) => {
                shipmentDocumentModels[i].uploadProgress = loaded / total;
                shipmentDocumentModels[i].name = files[i].name;
                shipmentDocumentModels[i].sizeInBytes = files[i].size;
                shipmentDocumentModels[i].mimeType = files[i].type;
            },
            onUpload: (base64File, response, files: any[], i: number) => {
                shipmentDocumentModels[i].uploadProgress = 1;
                shipmentDocumentModels[i].shipmentDocumentUrl = base64File;
            },
        }
    }

    render() {
        const { popupStore } = this.props;

        return (
            <div
                className={`PopupWindowWrapper ${this.getCssClassName()} Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(popupStore.visible)}`}
                onClick={this.isRemovable() === true ? popupStore.hide : undefined}
                onWheel={this.onWheel}
                onDrop={this.onDropWrapper}
                onDragOver={this.onDragOverWrapper} >

                <div ref={this.nodes.popupWindow} className={'PopupWindow'} onClick={S.stopPropagation} onWheel={S.stopPropagation} >

                    {popupStore.visible === true && (
                        <>
                            <div className={'ScrollableContent Scrolls'} >
                                {this.hasClose() === true && (
                                    <div
                                        className={'Close SVG Size Clickable'}
                                        onClick={this.onClickClose} >
                                        <SvgClear />
                                    </div>
                                )}
                                {this.renderContent()}
                            </div>
                        </>
                    )}

                </div>

            </div>
        );
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
                    <div className={'PopupTitle'}>{this.props.popupStore.shipmentModel.isDraft() ? 'New shipment' : `Shipment #${this.props.popupStore.shipmentModel.shipmentId}`}</div>
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
                        {this.renderProducts()}
                    </div>
                    <div className={`TabDocuments ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}`} >
                        {this.renderDocuments()}
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

    renderProducts() {
        const popupStore = this.props.popupStore;
        const productStore = this.props.productStore;
        const shipmentStore = this.props.shipmentStore;

        const buildSkuModel = popupStore.buildSkuModel;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;

        const buildSkuInputStateHelper = this.props.popupStore.buildSkuInputStateHelper;
        const FIELDS_ADD_SKU = PopupShipmentStore.FIELDS_ADD_SKU;

        return (
            <>
                {this.props.popupStore.popupMode === PopupShipmentStore.POPUP_MODE_CREDIT ? (<Expandable
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
                                        placeholder={'Select a product'}
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
                                        InputProps={this.isManufacturePlaceLocal() === true || buildSkuOriginModel.hasShipment() === false ? undefined : {
                                            endAdornment: <span className={'EndAdornment'} onClick={this.onClickMaxQuantity}>max</span>,
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
                    } />) : ''}
                <hr className={'MarginBottomOnly'} />
                <div className={'BlockLabel'} >Product list</div>
                <Table
                    widths={['7%', '33%', '11%', '11%', '11%', '11%', '11%', '5%']}
                    legend={['ID', 'Product name', 'From shipment', 'Quantity', 'Measurement', 'SKU value', 'Total value', S.Strings.EMPTY]}
                    aligns={[TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_LEFT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT, TableDesktop.ALIGN_RIGHT]}
                    rows={this.renderProductRows()}
                    helper={this.props.popupStore.productTableHelper}
                    emptyLabel={'Product list is still empty'} />
            </>
        )
    }

    renderProductRows() {
        const popupStore = this.props.popupStore;
        const productStore = this.props.productStore;
        const result = [];

        for (let i = 0; i < popupStore.skuModels.length; ++i) {
            const skuModel = popupStore.skuModels[i];
            const productModel = productStore.getProduct(skuModel.productId);
            const skuOriginModel = popupStore.getSkuOriginModel(skuModel.skuId);
            if (productModel === null || skuOriginModel === null) {
                continue;
            }

            result.push([
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
            ]);
        }

        return result;
    }

    renderDocuments() {
        const popupStore = this.props.popupStore;
        const shipmentModel = popupStore.shipmentModel;

        return (
            <>
                <div className={`UploadCnt FlexColumn ${S.CSS.getActiveClassName(popupStore.dragging)}`} onDrop={this.onDrop} >
                    <div className={'UploadTitle FlexRow'} >
                        <div className={'SVG IconAttachment'} dangerouslySetInnerHTML={{ __html: SvgAttachment }} />
                        Drop your file here or&nbsp;<span>click here to add</span>
                    </div>
                    <div className={'UploadDesc'} > Upload anything you want. There is no limit. </div>
                    <UploaderComponent
                        ref={this.iNodes.uploader}
                        id={shipmentModel}
                        params={this.makeDocumentUploadParams()} />
                </div>
                <hr />
                <div className={'UploadedDocumentsCnt'} >
                    {popupStore.shipmentDocumentModels.map((shipmentDocumentModel, i: number) => {
                        return (
                            <div key={i} className={'UploadedDocument FlexRow FlexSplit'} >
                                <Select
                                    className={'UploadedDocumentType'}
                                    placeholder={'Select document type'}
                                    value={shipmentDocumentModel.documentType === S.NOT_EXISTS ? S.Strings.EMPTY : shipmentDocumentModel.documentType}
                                    onChange={this.onChangeDocumentType.bind(this, shipmentDocumentModel)}
                                    displayEmpty={true} >
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_CRM_DOCUMENT}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_CRM_DOCUMENT)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BILL_OF_LANDING}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BILL_OF_LANDING)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INVOICE}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INVOICE)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INSURANCE_POLICY}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_INSURANCE_POLICY)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_BANK)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_PUBLIC_AUTH}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_PUBLIC_AUTH)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_RECEIPT}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_RECEIPT)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConstsH.S_DOCUMENT_TYPE_OTHER}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConstsH.S_DOCUMENT_TYPE_OTHER)}</MenuItem>
                                </Select>
                                <div className={'UploadedDocumentName'} > {shipmentDocumentModel.name} </div>
                                <div className={'StartRight UploadedDocumentSize'} > {formatBytes(shipmentDocumentModel.sizeInBytes)} </div>
                                <div className={'UploadDocumentProgressCnt FlexRow'} >
                                    {shipmentDocumentModel.isUploaded() === false && (
                                        <div className={'UploadDocumentProgress'}>
                                            <div className={'UploadDocumentProgressIndicator'} style={{ transform: `scaleX(${shipmentDocumentModel.uploadProgress})` }} />
                                        </div>
                                    )}
                                    {shipmentDocumentModel.isUploaded() === true && (
                                        <>
                                            <div className={'SVG Size IconUploadDone'} ><SvgCheck /></div>
                                            Uploaded
                                        </>
                                    )}
                                </div>
                                { shipmentDocumentModel.isUploaded() === false && (
                                    <div className={'SVG IconUploadAction'} onClick={this.onClickDeleteDocument.bind(this, shipmentDocumentModel)} ><SvgClear /></div>
                                )}
                                { shipmentDocumentModel.isUploaded() === true && (
                                    <>
                                        <a href={shipmentDocumentModel.shipmentDocumentUrl} download={shipmentDocumentModel.name} className={'SVG IconUploadAction'} dangerouslySetInnerHTML={{ __html: SvgDownload }} />
                                        <div className={'SVG IconUploadAction'} dangerouslySetInnerHTML={{ __html: SvgDelete }} onClick={this.onClickDeleteDocument.bind(this, shipmentDocumentModel)} />
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </>
        )
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
        popupSubmitShipmentStatusStore: stores.popupSubmitShipmentStatusStore,
    }
})(observer(ShipmentPopup));
