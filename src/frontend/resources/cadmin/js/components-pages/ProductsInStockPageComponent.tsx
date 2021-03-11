import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';
import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import Notifications from '../components-inc/Notifications';
import ProductPopup from '../components-popups/ProductPopup';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import S from '../../../common/js/utilities/Main';
import ProductFilter from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';
import SkuFilter from '../../../../../../builds/dev-generated/ProductModule/Sku/Utils/SkuFilterConsts';
import PageView from '../components-inc/PageView';
import './../../css/components-pages/page-products-component.css';
import NoEntryPage from '../components-inc/NoEntryPage';
import PageTableFooter from '../components-inc/PageTableFooter';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuStore from '../../../common/js/stores/SkuStore';
import TableHelper from '../../../common/js/helpers/TableHelper';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import Table from '../../../common/js/components-inc/Table';
import ProductRowMenu from '../components-inc/ProductRowMenu';
import { formatPrice } from '../../../common/js/helpers/NumeralHelper';
import SkuConstsH from '../../../../../../builds/dev-generated/ProductModule/Sku/SkuModelHConsts';

interface Props extends ContextPageComponentProps {
    popupProductStore: PopupProductStore;
    productStore: ProductStore;
    skuStore: SkuStore;
}

interface State {
}

export default class ProductsInStockPageComponent extends ContextPageComponent<Props, State> {
    showNoEntryPage: boolean = false;
    dataReady: number;
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;

        this.state = {
            searchWord: S.Strings.EMPTY,
            sortBy: S.NOT_EXISTS,
        };

        this.tableHelper = new TableHelper(
            S.NOT_EXISTS,
            [
                [SkuFilter.S_SORT_BY_NAME, 1],
            ],
            this.fetchProductsInStock,
        )
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'productStore', 'accountSessionStore', 'popupProductStore', 'notificationStore', 'siteStore', 'skuStore')(observer(ProductsInStockPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.fetchProductsInStock();
    }

    getPageLayoutComponentCssClassName() {
        return 'PageProductsInStock';
    }

    fetchProductsInStock = () => {
        const tableState = this.tableHelper.tableState;

        this.shipmentApi.fetchProductsInStock(
            this.searchWord,
            this.tableHelper.tableState.sortKey,
            this.tableHelper.tableState.from,
            this.tableHelper.tableState.to(),
            (skuModels: SkuModel[], productModels: ProductModel[], totalSkuSize) => {
                if (skuModels.length === 0 && tableState.from > 0) {
                    tableState.pageBack();
                    this.fetchProductsInStock();
                    return;
                }

                this.props.skuStore.onScreenData(skuModels);
                this.props.productStore.onScreenData(productModels);
                this.tableHelper.tableState.total = totalSkuSize;
                this.dataReady = S.INT_TRUE;
            },
        )
    }

    onChangeSearchWord = (searchWord) => {
        this.searchWord = searchWord;
        this.fetchProductsInStock();
    }

    onChangeSortBy = (sortBy) => {
        this.tableHelper.tableState.sortKey = sortBy;
        this.fetchProductsInStock();
    }

    onClickAddProduct = () => {
        this.props.popupProductStore.signalShow(new ProductModel(), () => {
            const tableState = this.tableHelper.tableState;
            tableState.pageZero();
            this.fetchProductsInStock();
        });
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.PRODUCTS_IN_STOCK} />

                <PageView pageTitle={'Products in Stock'} >
                    {this.props.productStore.screenProductModels === null && (
                        'Loading'
                    )}
                    {this.props.productStore.screenProductModels !== null && (
                        <>
                            <PageTable
                                className={'WhiteBox PageExtend'}
                                header={(
                                    <PageTableHeader
                                        searchPlaceHolder={'Search products'}
                                        selectedSortBy={this.tableHelper.tableState.sortKey}
                                        options={[
                                            new PageTableHeaderSortByStruct(SkuFilter.S_SORT_BY_NAME, 'Name'),
                                        ]}
                                        onChangeSearchWord={this.onChangeSearchWord}
                                        onChangeSortBy={this.onChangeSortBy} />
                                )}
                                footer={(
                                    <PageTableFooter
                                        totalItems={this.tableHelper.tableState.total}
                                        totalPrice={this.props.skuStore.getTotalPrice()}
                                        actions={(
                                            <Actions>
                                                {/* <Button onClick={this.onClickAddProduct}>
                                                    <div className={'FlexRow'}>
                                                        <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                                Add product
                                                    </div>
                                                </Button> */}
                                            </Actions>
                                        )} />
                                )} >
                                <TableDesktop
                                    className={'ProductsTable'}
                                    legend={this.getTableLegend()}
                                    widths={this.getTableWidths()}
                                    aligns={this.getTableAligns()}
                                    helper={this.tableHelper}
                                    rows={this.renderRows()}
                                    showPaging={true} >
                                </TableDesktop>
                            </PageTable>
                        </>
                    )}
                </PageView>
            </div>
        )
    }

    renderRows = () => {
        const result = [];

        this.props.skuStore.screenSkuModels.forEach((skuModel: SkuModel) => {

            const productModel = this.props.productStore.screenProductModels.find((p) => p.productId === skuModel.productId);
            const totalPrice = skuModel.quantity * skuModel.pricePerUnit;

            result.push([
                Table.cellString(`#${skuModel.skuId}`),
                Table.cellString(productModel.productName),
                Table.cellString(`#${skuModel.shipmentId}`),
                Table.cellString(`${skuModel.quantity}`),
                Table.cellString(ProductModel.getUnitName(productModel.productUnit)),
                Table.cellString(`${formatPrice(totalPrice)}`),
            ])
        })

        return result;
    }

    getTableLegend() {
        return ['ID', 'Product Name', 'From Shipment', 'Quantity', 'Measurement', 'Total Value'];
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return ['5%', '35%', '15%', '15%', '15%', '15%'];
    }
}
