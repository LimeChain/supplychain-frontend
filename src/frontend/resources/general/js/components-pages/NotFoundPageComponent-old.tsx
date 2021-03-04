/* global TR */

import React from 'react';

import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';

import './../../css/components-pages/page-not-found-component.css';
import LayoutBlock from '../../../common/js/components-inc/LayoutBlock';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import Checkbox from '../../../common/js/components-inc/Checkbox';
import Input from '../../../common/js/components-inc/Input';
import Select from '../../../common/js/components-inc/Select';
import Tooltip from '../../../common/js/components-inc/Tooltip';
import Popover from '../../../common/js/components-inc/Popover';
import DatepickerComponent from '../../../common/js/components-core/Datepicker';
import { MenuItem } from '@material-ui/core';
import PageComponent from '../../../common/js/components-pages/PageComponent';
import { inject, observer } from 'mobx-react';
import GrpcApi from '../../../common/js/api/GrpcApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import ProductsApi from '../../../common/js/api/ProductApi';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';
import ShipmentDocumentApi from '../../../common/js/api/ShipmentDocumentApi';
import ShipmentStore from '../../../common/js/stores/ShipmentStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import OriginStore from '../../../common/js/stores/OriginStore';
import ShipmentDocumentStore from '../../../common/js/stores/ShipmentDocumentStore';
import S from '../../../common/js/utilities/Main';

interface Props extends ContextPageComponentProps {
    shipmentStore: ShipmentStore;
    productStore: ProductStore;
    originStore: OriginStore;
    shipmentDocumentStore: ShipmentDocumentStore;
}

export default class PageNotFoundComponent extends ContextPageComponent<Props> {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'shipmentStore', 'productStore', 'originStore', 'shipmentDocumentStore')(observer(PageNotFoundComponent));
        PageComponent.layout(<MobXComponent />);
    }

    anchorEl: any;
    checkbox: 0 | 1;
    datepicker: number;
    productsApi: ProductsApi;
    shipmentApi: ShipmentApi;
    shipmentDocumentApi: ShipmentDocumentApi;
    // countryApi: CountryApi;

    constructor(props: Props) {
        super(props);
        this.anchorEl = null;
        this.checkbox = 1;
        this.datepicker = Date.now();
        this.productsApi = new ProductsApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        this.shipmentDocumentApi = new ShipmentDocumentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
        // this.countryApi = new CountryApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageNotFound';
    }

    grpcReq() {
        new GrpcApi().grpcText();
    }

    createProduct = () => {
        const productJson = {
            'name': 'Ovregergen',
            'unit': 1,
            'pricePerUnit': 1342,
            'originCountryId': 1,
            'description': 'Stylish oven',
        }

        const productModel = ProductModel.fromJson(productJson);
        this.productsApi.creditProduct(productModel, () => {
            console.log(productModel);
        });
    }

    editProduct = () => {
        const productJson = {
            'productId': '5',
            'name': 'New Chair',
            'unit': 1,
            'pricePerUnit': 1342,
            'originCountryId': 1,
            'description': 'Stylish chair',
        }

        const productModel = ProductModel.fromJson(productJson);
        this.productsApi.creditProduct(productModel, () => {
            console.log(productModel);
        });
    }

    createShipment = () => {
        const shipmentJson = {
            'name': 'NewTestShipment',
            'originCountryId': '1',
            'destinationCountryId': '3',
            'dateOfShipment': Date.now(),
            'dateOfArrival': Date.now() + 10000,
            'description': 'new test chipment',
        }

        const shipmentModel = ShipmentModel.fromJson(shipmentJson);
        this.shipmentApi.creditShipment(shipmentModel, () => {
            console.log(shipmentModel);
        });
    }

    uploadShipmentDocument = () => {
        const shipmentDocumentJson = {
            'shipmentId': '1',
            'shipmentDocumentUrl': 'localhost/newFolder',
        }

        const shipmentDocumentModel = ShipmentDocumentModel.fromJson(shipmentDocumentJson);
        this.shipmentDocumentApi.uploadDocument(shipmentDocumentModel, () => { });
    }

    // editShipment = () => {
    //     const shipmentJson = {
    //         'shipmentId': '3',
    //         'name': 'EditedShipment',
    //         'originCountryId': '3',
    //         'destinationCountryId': '2',
    //         'dateOfShipment': Date.now() + 100,
    //         'dateOfArrival': Date.now() + 10000,
    //         'description': 'new test edit shipment',
    //     }

    //     const shipmentModel = ShipmentModel.fromJson(shipmentJson);
    //     this.shipmentApi.creditShipment(shipmentModel, () => {
    //         console.log(shipmentModel);
    //     });
    // }

    // fetchShipmentsByFilter = () => {
    //     const nameFilter = 'Chairs';

    //     this.shipmentApi.fetchShipmentByFilter(
    //         nameFilter,
    //         S.NOT_EXISTS,
    //         S.NOT_EXISTS,
    //         S.Strings.EMPTY,
    //         (shipmentModels: ShipmentModel[]) => {
    //             this.props.shipmentStore.onScreenData(shipmentModels);
    //             for (const value of this.props.shipmentStore.shipmentsMap.values()) {
    //                 console.log(value.name);
    //             }

    //             this.countryApi.fetchAllOrigins((originModels) => {
    //                 this.props.originStore.onScreenData(originModels);

    //                 for (const value of this.props.originStore.originsMap.values()) {
    //                     console.log(value.name);
    //                 }

    //             });
    //         },
    //     )
    // }

    renderContent() {
        return (
            <div style={{ 'width': '1000px', 'height': '500px', 'margin': 'auto', 'background': '#fff' }} className={'FlexSingleCenter'} >
                <LayoutBlock>

                    <LayoutBlock
                        direction={LayoutBlock.DIRECTION_ROW} >
                        <Input
                            label = {'Test'} />

                        <Input
                            label = { 'test' } error />
                    </LayoutBlock>

                    <LayoutBlock
                        direction={LayoutBlock.DIRECTION_ROW} >
                        <Select
                            label={'test'} >
                            <MenuItem value={1} >1</MenuItem>
                            <MenuItem value={2} >2</MenuItem>
                        </Select>

                        <Select
                            label={'test'}
                            error >
                            <MenuItem value={1} >1</MenuItem>
                            <MenuItem value={2} >2</MenuItem>
                        </Select>
                    </LayoutBlock>

                    <Tooltip title={'some info'} arrow ><span>Value</span></Tooltip>

                    <Checkbox onChange={() => { this.checkbox ^= 1; this.setState({}); }} value={this.checkbox} label={(<div>'some text'</div>)} />

                    <Actions>
                        <Button type={Button.TYPE_ROUNDED} color={Button.COLOR_SCHEME_1} onClick={this.grpcReq}>GRPC Req</Button>
                        <Button type={Button.TYPE_ROUNDED} color={Button.COLOR_SCHEME_2} onClick={this.createProduct}>Create Product</Button>
                        <Button type={Button.TYPE_TEXT_INLINE} color={Button.COLOR_SCHEME_1} onClick={this.editProduct} >Edit Product</Button>
                        <Button type={Button.TYPE_TEXT_INLINE} color={Button.COLOR_SCHEME_3} onClick={this.createShipment} >Create Shipment</Button>
                        <Button type={Button.TYPE_TEXT_INLINE} color={Button.COLOR_SCHEME_2} onClick={this.editShipment} >Edit Shipment</Button>
                        <Button type={Button.TYPE_TEXT_INLINE} color={Button.COLOR_SCHEME_2} onClick={this.uploadShipmentDocument} >Upload ShipmentDocument</Button>
                        <Button type={Button.TYPE_TEXT_INLINE} color={Button.COLOR_SCHEME_1} onClick={this.fetchShipmentsByFilter} >Fetch Shipment By Name</Button>
                    </Actions>

                    <span onClick={(e) => { this.anchorEl = e.target; this.setState({}); }} >Popover</span>
                    <Popover
                        anchorEl={this.anchorEl}
                        open={this.anchorEl !== null}
                        onClose={() => { this.anchorEl = null; this.setState({}) }} >
                        some content
                    </Popover>

                    <DatepickerComponent
                        className={'DatepickerComponent'}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        selected={new Date()}
                        onChange={(e) => {
                            this.datepicker = e.getTime();
                            this.setState({});
                        }}
                        customInput={<div> {new Date(this.datepicker).formatCalendarDate()} </div>} />

                </LayoutBlock>
            </div>
        )
    }
}
