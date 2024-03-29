import React, { MouseEventHandler, RefObject } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import { MenuItem } from '@material-ui/core';

import ShipmentDocumentConsts from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelConsts';
import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';

import { formatBytes, formatPrice } from '../../../common/js/helpers/NumeralHelper';
import S from '../../../common/js/utilities/Main';

import AlertStore from '../../../common/js/stores/AlertStore';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import SiteStore from '../../../common/js/stores/SiteStore';
import AccountSessionStore from '../../../common/js/stores/AccountSessionStore';
import AppStore from '../../../common/js/stores/AppStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import PopupSubmitShipmentStatusStore from '../../../common/js/stores/PopupSubmitShipmentStatusStore';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import SiteModel from '../../../common/js/models/SiteModel';
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
import SvgIncomming from '../../../common/svg/incomming.svg';
import SvgAttachment from '../../../common/svg/attachment.svg';
import SvgDelete from '../../../common/svg/delete.svg';
import SvgSave from '../../../common/svg/save.svg';
import SvgDownload from '../../../common/svg/download.svg';
import SvgFile from '../../../common/svg/file.svg';
import SvgCopy from '../../../common/svg/copy.svg';
import '../../css/components-popups/shipment-popup.css';
import CAdminContext from '../CAdminContext';
import { UploadShipmentDocumentRes } from '../../../common/js/network-responses/ShipmentDocumentApiRes';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import NotificationStore from '../../../common/js/stores/NotificationStore';
import ProjectUtils from '../../../common/js/ProjectUtils';

interface Props extends PopupWindowProps {
    alertStore: AlertStore;
    appStore: AppStore;
    siteStore: SiteStore;
    notificationStore: NotificationStore;
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

    getTotalPrice() {
        return this.props.popupStore.skuModels.reduce((acc, skuModel) => {
            return acc + skuModel.getTotalPrice();
        }, 0);
    }

    onClickCopyHash = () => {
        ProjectUtils.copyText(this.props.popupStore.shipmentModel.shipmentHash);
    }

    onClickNoTransactionLink = () => {
        this.props.alertStore.show('Transaction is being processed. Please try again in a moment. Thanks!', () => {
            this.props.popupStore.hide();
        });
    }

    onClickTabProducts = () => {
        this.props.popupStore.setTabProducts();
    }

    onClickTabDocuments = async () => {
        await this.creditShipmentIfNew();
        this.props.popupStore.setTabDocuments();
    }

    onClickChangeManufacturedPlace(value) {
        this.props.popupStore.buildSkuOriginModel.setLocallyProcuded();

        this.setState({
            manufacturedPlace: value,
        });
    }

    onBlurPricePerSku = () => {
        const popupStore = this.props.popupStore;
        const buildSkuModel = popupStore.buildSkuModel;
        popupStore.pricePerUnitDisplay = buildSkuModel.pricePerUnit === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.pricePerUnit.toString();
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

        const buildSkuOriginModel = popupStore.buildSkuOriginModel;
        if (buildSkuOriginModel.isLocallyProduced() === false) {
            const shipmentStore = this.props.shipmentStore;
            const maxQuantity = shipmentStore.getSourceMaxAvailableQuantity(buildSkuOriginModel.shipmentId);
            if (popupStore.buildSkuModel.quantity > maxQuantity) {
                this.props.alertStore.show(`Max quantity is ${maxQuantity}`);
                return;
            }
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
        if (popupStore.skuModels.length === 0) {
            this.props.alertStore.show('You must add at least one product');
            return;
        }

        const alertStore = this.props.alertStore;
        alertStore.msg = 'Are you sure you want to submit shipment?';
        alertStore.subMsg = 'This action cannot be reversed';
        alertStore.positiveLabel = 'Submit';
        alertStore.negativeLabel = 'Cancel';
        alertStore.positiveListener = () => {
            const run = async () => {
                const clonedShipmentModel = popupStore.shipmentModel.clone();
                clonedShipmentModel.submitShipment();
                await this.creditShipment(clonedShipmentModel);
                Object.assign(popupStore.shipmentModel, clonedShipmentModel);
                this.props.popupSubmitShipmentStatusStore.signalShow(PopupSubmitShipmentStatusStore.ACTION_NAME_SUBMITTED);
                setTimeout(() => {
                    this.props.popupSubmitShipmentStatusStore.hide();
                    popupStore.hide();
                    this.props.notificationStore.fetchMoreNotifications(true);
                }, 2000);
            }
            run();
        }
        alertStore.visible = true;
    }

    onClickReceiveShipment = () => {
        const popupStore = this.props.popupStore;

        const alertStore = this.props.alertStore;
        alertStore.msg = 'Are you sure you want to receive shipment?';
        alertStore.subMsg = 'This action cannot be reversed';
        alertStore.positiveLabel = 'Receive';
        alertStore.negativeLabel = 'Cancel';

        alertStore.positiveListener = () => {
            const run = async () => {
                const clonedShipmentModel = popupStore.shipmentModel.clone();
                clonedShipmentModel.receiveShipment();
                await this.creditShipment(clonedShipmentModel);
                Object.assign(popupStore.shipmentModel, clonedShipmentModel);
                this.props.popupSubmitShipmentStatusStore.signalShow(PopupSubmitShipmentStatusStore.ACTION_NAME_RECEIVED);
                setTimeout(() => {
                    this.props.popupSubmitShipmentStatusStore.hide();
                    popupStore.hide();
                    this.props.notificationStore.fetchMoreNotifications(true);
                }, 2000);
            }
            run();
        }
        alertStore.visible = true;
    }

    onClickSaveAsDraft = async () => {
        await this.creditShipment();
        this.props.popupStore.hide();
    }

    onClickDeleteDocument(shipmentDocumentModel: ShipmentDocumentModel) {
        this.props.popupStore.deleteDocument(shipmentDocumentModel);
    }

    onChangeDocumentType(shipmentDocumentModel: ShipmentDocumentModel, value: number) {
        shipmentDocumentModel.documentType = value;
    }

    async onClickShowOriginShipment(shipmentId: string) {
        await this.creditShipmentIfNew();

        this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
            this.props.popupStore.addToShipmentRoute(false, shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels);
        });
    }

    onClickShipmentRouteLink(shipmentRouteIndex: number) {
        this.props.popupStore.moveToShipmentLinkRoute(shipmentRouteIndex, (shipmentId: string) => {
            this.shipmentApi.fetchShipmentById(shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
                const resetRoute = shipmentRouteIndex === 0;

                this.props.popupStore.addToShipmentRoute(resetRoute, shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels);
            });
        });
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

    async creditShipmentIfNew() {
        const popupStore = this.props.popupStore;
        const shipmentModel = popupStore.shipmentModel;
        if (shipmentModel.isNew() === true) {
            await this.creditShipment();
        }
    }

    creditShipment(shipmentModel: ShipmentModel | null = null): Promise < void > {
        return new Promise < void >((resolve, reject) => {
            const popupStore = this.props.popupStore;
            const onFinish = popupStore.onFinish;
            // const shipmentModel = popupStore.shipmentModel;
            if (shipmentModel === null) {
                shipmentModel = popupStore.shipmentModel;
            }
            this.shipmentApi.creditShipment(shipmentModel, popupStore.skuModels, popupStore.skuOriginModels, popupStore.shipmentDocumentModels, () => {
                onFinish(shipmentModel);
                resolve();
            })
        });
    }

    makeDocumentUploadParams() {
        const popupStore = this.props.popupStore;
        let shipmentDocumentModels: ShipmentDocumentModel[] = [];

        return {
            'maxSize': 1 << 30, // 1GB
            'controller': CAdminContext.urlShipmentDocumentUploadData(popupStore.shipmentModel.shipmentId),
            'progressWindow': false,
            'onExceedLimit': () => {
                this.props.alertStore.show('Max files size is 1GB');
            },
            onBeforeStart: (totalFiles: number) => {
                shipmentDocumentModels = popupStore.onStartUploading(totalFiles);
            },
            onProgress: (loaded: number, total: number, files: any[], i: number) => {
                shipmentDocumentModels[i].uploadProgress = loaded / total;
                shipmentDocumentModels[i].name = files[i].name;
                shipmentDocumentModels[i].sizeInBytes = files[i].size;
                shipmentDocumentModels[i].mimeType = files[i].type;
                console.log(shipmentDocumentModels[i].mimeType);
            },
            onUpload: (base64File, response, files: any[], i: number) => {
                const res = new UploadShipmentDocumentRes(JSON.parse(response).obj);
                const shipmentDocumentModel = res.shipmentDocumentModel;

                shipmentDocumentModels[i].shipmentId = shipmentDocumentModel.shipmentId;
                shipmentDocumentModels[i].shipmentDocumentId = shipmentDocumentModel.shipmentDocumentId;
                shipmentDocumentModels[i].uploadProgress = 1;
                shipmentDocumentModels[i].shipmentDocumentUrl = shipmentDocumentModel.shipmentDocumentUrl;
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
            popupStore.pricePerUnitDisplay,
            buildSkuModel.quantity === S.NOT_EXISTS ? S.Strings.EMPTY : buildSkuModel.quantity.toString(),
        ]);

        shipmentInputStateHelper.updateValues([
            shipmentModel.shipmentConsignmentNumber,
            shipmentModel.shipmentDestinationSiteId === S.Strings.NOT_EXISTS ? S.Strings.EMPTY : shipmentModel.shipmentDestinationSiteId,
        ]);

        return (
            <div className={'PopupWindowContent LargeContent'} >
                <div className={'PopupHeader'} >
                    <div className={'PopupTitleCnt'}>
                        <div className={'PopupTitle'}>{this.props.popupStore.shipmentModel.isNew() === true ? 'New shipment' : `Shipment #${this.props.popupStore.shipmentModel.shipmentId}`}</div>
                        {shipmentModel.isDraft() === false && (
                            <>
                                {shipmentModel.hasHash() === true && (
                                    <div className = { 'FlexSplit FlexRow' } >
                                        <div className = { 'SubData TranssactionHash Dots' } >{shipmentModel.shipmentHash}</div>
                                        <div className = { 'SubData SVG IconCopy' } dangerouslySetInnerHTML = {{ __html: SvgCopy }} onClick = { this.onClickCopyHash } />
                                    </div>
                                )}
                                <div className={'FlexSplit'} >
                                    <div className={'SubData TimeStamp'}>Shipped <strong>{moment(this.props.popupStore.shipmentModel.shipmentDateOfShipment).format('DD.MM.YYYY')}</strong></div>
                                    <div className={'SubData Status StartRight'}>{shipmentModel.getStatusString()}</div>
                                </div>
                            </>
                        )}
                    </div>
                    <LayoutBlock className={'FlexSplit'} direction={LayoutBlock.DIRECTION_ROW} >
                        <div className={'WidthLimiter'}>
                            <Input
                                placeholder={'Enter consigment ID'}
                                readOnly={this.props.popupStore.shipmentModel.isDraft() === false}
                                value={shipmentInputStateHelper.values.get(FIELDS_SHIPMENT[0])}
                                error={shipmentInputStateHelper.errors.get(FIELDS_SHIPMENT[0])}
                                onChange={shipmentInputStateHelper.onChanges.get(FIELDS_SHIPMENT[0])} />
                        </div>
                        {this.renderFromSite()}
                        {this.renderToSite()}
                        {this.props.popupStore.shipmentModel.isDraft() === false && (
                            <Actions className={'ActionsTransaction StartRight'} height={Actions.HEIGHT_32} >
                                { shipmentModel.hasTransactionLink() === true && (
                                    <Button href={shipmentModel.getTransactionLink()} target={'_blank'} color={Button.COLOR_SCHEME_2}>Transaction hash</Button>
                                )}
                                { shipmentModel.hasTransactionLink() === false && (
                                    <Button target={'_blank'} color={Button.COLOR_SCHEME_2} onClick={this.onClickNoTransactionLink}>Transaction hash</Button>
                                )}
                                <Button href={CAdminContext.urlShipmentDownloadData(shipmentModel.shipmentId)} download={`shipment-${shipmentModel.shipmentId}.json`} color={Button.COLOR_SCHEME_2} >Raw Data</Button>
                            </Actions>
                        )}
                    </LayoutBlock>
                </div>
                <hr />
                <div className={'TabsHeader FlexRow'} >
                    <div className={`Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}`} onClick={this.onClickTabProducts} >Products</div>
                    <div className={`Tab ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}`} onClick={this.onClickTabDocuments} >Documents</div>
                </div>
                <div className={'TabsContent'} >
                    <div className={`TabProducts ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabProducts())}`} >
                        {this.props.popupStore.isActiveTabProducts() === true && this.renderProducts()}
                    </div>
                    <div className={`TabDocuments ActiveDisplayHidden Transition ${S.CSS.getActiveClassName(this.props.popupStore.isActiveTabDocuments())}`} >
                        {this.props.popupStore.isActiveTabDocuments() === true && this.renderDocuments()}
                    </div>
                </div>
                <hr />
                <div className={'PopupFooter FlexSplit'} >
                    <div className={'FooterLeft FlexRow'} >
                        <div className={'ItemCnt'} >
                            Items: <span>{popupStore.skuModels.length}</span>
                        </div>
                        <div className={'ItemCnt'} >
                            Total Value: <span>{formatPrice(this.getTotalPrice())}</span>
                        </div>
                        <div className={'ShipmentRoute FlexRow'}>
                            {this.props.popupStore.shipmentLinksRoute.map((shipmentId, i) => <>
                                {i === 0 ? '' : <div key={`1${i}`} >&lt;</div>}
                                <a key={i} onClick={this.onClickShipmentRouteLink.bind(this, i)}>#{shipmentId}</a>
                            </>)}
                        </div>
                    </div>
                    <div className={'FooterRight StartRight'} >
                        <Actions>
                            {this.props.popupStore.shipmentModel.isDraft() === true && (
                                <>
                                    <Button type={Button.TYPE_OUTLINE} onClick={this.onClickSaveAsDraft} >
                                        <div className={'FlexRow'}>
                                            <div className={'SVG Size ButtonSvg'} dangerouslySetInnerHTML={{ __html: SvgSave }} />
                                            Save as draft
                                        </div>
                                    </Button>
                                    <Button onClick={this.onClickSubmitShipment}>Submit shipment</Button>
                                </>
                            )}
                            {this.props.popupStore.shipmentModel.isInTransit() === true && this.props.accountSessionStore.accountModel.siteId === this.props.popupStore.shipmentModel.shipmentDestinationSiteId && (
                                <Button onClick={this.onClickReceiveShipment}>Mark as received</Button>
                            )}
                        </Actions>
                    </div>
                </div>
            </div >
        )
    }

    renderFromSite() {
        const siteStore = this.props.siteStore;

        const originSiteModel = siteStore.getSiteModel(this.props.popupStore.shipmentModel.shipmentOriginSiteId);
        if (originSiteModel === null) {
            return null;
        }

        const originCountryModel = siteStore.getCountryModel(originSiteModel.countryId);
        if (originCountryModel === null) {
            return null;
        }

        return (
            <Select
                className={'WidthLimiter'}
                label={'From'}
                value={originSiteModel.siteId}
                readOnly={true} >
                <MenuItem value={originSiteModel.siteId} >{originSiteModel.siteName}, {originCountryModel.countryName}</MenuItem>
            </Select>
        )
    }

    renderToSite() {
        const shipmentInputStateHelper = this.props.popupStore.shipmentInputStateHelper;
        const FIELDS_SHIPMENT = PopupShipmentStore.FIELDS_SHIPMENT;

        const siteStore = this.props.siteStore;
        const popupStore = this.props.popupStore;
        const shipmentModel = popupStore.shipmentModel;
        const accountModel = this.props.accountSessionStore.accountModel;
        const ownSiteModel = siteStore.getSiteModel(accountModel.siteId);
        const ownCountryModel = siteStore.getCountryModel(accountModel.countryId);

        const destinationSiteModel = siteStore.getSiteModel(this.props.popupStore.shipmentModel.shipmentDestinationSiteId);

        let destinationCountryModel = null;
        if (destinationSiteModel !== null) {
            destinationCountryModel = siteStore.getCountryModel(destinationSiteModel.countryId);
        }

        if (ownSiteModel === null || ownCountryModel === null) {
            return null;
        }

        const isEditable = shipmentModel.isDraft();
        return (
            <Select
                className={'WidthLimiter'}
                label={'To'}
                readOnly={isEditable === false}
                value={shipmentInputStateHelper.values.get(FIELDS_SHIPMENT[1])}
                error={shipmentInputStateHelper.errors.get(FIELDS_SHIPMENT[1])}
                onChange={shipmentInputStateHelper.onChanges.get(FIELDS_SHIPMENT[1])} >
                {isEditable === false && (
                    <MenuItem key={destinationSiteModel.siteId} value={destinationCountryModel.countryId} >{destinationSiteModel.siteName}, {destinationCountryModel.countryName}</MenuItem>
                )}
                {isEditable === true && (
                    siteStore.screenSiteModels.map((siteModel: SiteModel, i: number) => {
                        if (ownSiteModel.siteId === siteModel.siteId) {
                            return null;
                        }

                        const countryModel = siteStore.getCountryModel(siteModel.countryId);
                        return (
                            <MenuItem key={i} value={countryModel.countryId} >{siteModel.siteName}, {countryModel.countryName}</MenuItem>
                        )
                    })
                )}
            </Select>
        )
    }

    renderProducts() {
        const popupStore = this.props.popupStore;
        const productStore = this.props.productStore;
        const shipmentStore = this.props.shipmentStore;

        const shipmentModel = popupStore.shipmentModel;
        const buildSkuModel = popupStore.buildSkuModel;
        const buildSkuOriginModel = popupStore.buildSkuOriginModel;

        const buildSkuInputStateHelper = this.props.popupStore.buildSkuInputStateHelper;
        const FIELDS_ADD_SKU = PopupShipmentStore.FIELDS_ADD_SKU;

        return (
            <>
                {shipmentModel.isDraft() === true && (
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
                                            inputType={InputType.REAL}
                                            value={buildSkuInputStateHelper.values.get(FIELDS_ADD_SKU[2])}
                                            error={buildSkuInputStateHelper.errors.get(FIELDS_ADD_SKU[2])}
                                            onChange={buildSkuInputStateHelper.onChanges.get(FIELDS_ADD_SKU[2])}
                                            onBlur={this.onBlurPricePerSku} />
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
                        } />
                )}
                <hr className={'MarginBottomOnly'} />
                <div className={'BlockLabel'} >Product list</div>
                <Table
                    widths={['7%', '30%', '14%', '11%', '11%', '11%', '11%', '5%']}
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
        const shipmentModel = popupStore.shipmentModel;
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
                Table.cell(skuOriginModel.isLocallyProduced() === true ? 'locally manufactured' : <a onClick={this.onClickShowOriginShipment.bind(this, skuOriginModel.shipmentId)}>#{skuOriginModel.shipmentId}</a>),
                Table.cellString(skuModel.quantity.toString()),
                Table.cellString(ProductModel.getUnitName(productModel.productUnit)),
                Table.cellString(skuModel.pricePerUnit.toString()),
                Table.cellString(formatPrice(skuModel.getTotalPrice())),
                Table.cell(
                    shipmentModel.isDraft() === false ? '' : <div className={'SVG IconDelete'} dangerouslySetInnerHTML={{ __html: SvgDelete }} onClick={this.onClickDeleteSku.bind(this, i)} />,
                ),
            ]);
        }

        return result;
    }

    renderDocuments() {
        const shipmentModel = this.props.popupStore.shipmentModel;
        const renderCredit = shipmentModel.isDraft() === true || (shipmentModel.isInTransit() === true && this.props.accountSessionStore.accountModel.siteId === this.props.popupStore.shipmentModel.shipmentDestinationSiteId);
        return (
            <>
                {renderCredit === true && this.renderDocumentsCredit()}
                {renderCredit === false && this.renderDocumentsAudit()}
            </>
        )
    }

    renderDocumentsCredit() {
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
                        const editable = shipmentDocumentModel.isFromShipment(shipmentModel.shipmentId) === true && (shipmentModel.isDraft() === true || i >= popupStore.initialShipmentDocumentLength);
                        return (
                            <div key={i} className={'UploadedDocument FlexRow FlexSplit'} >
                                <Select
                                    className={'UploadedDocumentType'}
                                    placeholder={'Select document type'}
                                    readOnly={editable === false}
                                    value={shipmentDocumentModel.documentType === S.NOT_EXISTS ? S.Strings.EMPTY : shipmentDocumentModel.documentType}
                                    onChange={this.onChangeDocumentType.bind(this, shipmentDocumentModel)}
                                    error={shipmentDocumentModel.documentType === S.NOT_EXISTS}
                                    displayEmpty={true} >
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_CRM_DOCUMENT}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_CRM_DOCUMENT)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_BILL_OF_LANDING}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_BILL_OF_LANDING)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_INVOICE}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_INVOICE)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_INSURANCE_POLICY}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_INSURANCE_POLICY)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_BANK}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_BANK)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_PUBLIC_AUTH}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_PUBLIC_AUTH)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_RECEIPT}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_RECEIPT)}</MenuItem>
                                    <MenuItem value={ShipmentDocumentConsts.S_DOCUMENT_TYPE_OTHER}>{ShipmentDocumentModel.getTypeAsString(ShipmentDocumentConsts.S_DOCUMENT_TYPE_OTHER)}</MenuItem>
                                </Select>
                                <div className={'SVG IconUploadedDocument'} dangerouslySetInnerHTML={{ __html: SvgFile }} />
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
                                        { editable === true && (
                                            <div className={'SVG IconUploadAction'} dangerouslySetInnerHTML={{ __html: SvgDelete }} onClick={this.onClickDeleteDocument.bind(this, shipmentDocumentModel)} />
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }

    renderDocumentsAudit() {
        const popupStore = this.props.popupStore;

        return (
            <div className={'DocumentsAudit'} >
                { popupStore.shipmentDocumentModels.map((docModel: ShipmentDocumentModel, i) => {
                    return (
                        <div key={i} className="DocumentLine FlexRow FlexSplit">
                            <div className="DocumentType">{ShipmentDocumentModel.getTypeAsString(docModel.documentType)}</div>
                            <div className={'SVG IconDocumentType'} dangerouslySetInnerHTML={{ __html: SvgFile }} />
                            <div className="DocumentName">{docModel.name}</div>
                            <div className="DocumentSize StartRight">{formatBytes(docModel.sizeInBytes)}</div>
                            <Actions>
                                <Button
                                    href={docModel.shipmentDocumentUrl}
                                    download={docModel.name}>
                                    <div className={'FlexRow'} >
                                        <div className={'SVG ButtonSvg'} dangerouslySetInnerHTML={{ __html: SvgIncomming }} />
                                        Download
                                    </div>
                                </Button>
                            </Actions>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default inject((stores) => {
    return {
        alertStore: stores.alertStore,
        notificationStore: stores.notificationStore,
        appStore: stores.appStore,
        siteStore: stores.siteStore,
        accountSessionStore: stores.accountSessionStore,
        popupStore: stores.popupShipmentStore,
        productStore: stores.productStore,
        shipmentStore: stores.shipmentStore,
        popupSubmitShipmentStatusStore: stores.popupSubmitShipmentStatusStore,
    }
})(observer(ShipmentPopup));
