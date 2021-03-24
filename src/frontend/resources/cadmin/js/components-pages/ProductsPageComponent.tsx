import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Sidebar from '../components-inc/Sidebar';

import './../../css/components-pages/page-products-component.css';

import SvgAdd from '@material-ui/icons/Add';
import './../../css/components-pages/page-incomming-component.css';
import PageTable from '../components-inc/PageTable';
import PageTableHeader, { PageTableHeaderSortByStruct } from '../components-inc/PageTableHeader';
import PopupProductStore from '../../../common/js/stores/PopupProductStore';
import ProductStore from '../../../common/js/stores/ProductStore';
import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';
import S from '../../../common/js/utilities/Main';
import PageView from '../components-inc/PageView';

import PageTableFooter from '../components-inc/PageTableFooter';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';
import NoEntryPage from '../components-inc/NoEntryPage';
import TableDesktop from '../../../common/js/components-inc/TableDesktop';
import Table from '../../../common/js/components-inc/Table';
import TableHelper from '../../../common/js/helpers/TableHelper';
import ProductFilter from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';
import ProductRowMenu from '../components-inc/ProductRowMenu';

interface Props extends ContextPageComponentProps {
    popupProductStore: PopupProductStore;
    productStore: ProductStore;
}

interface State {
}

export default class ProductsPageComponent extends ContextPageComponent<Props, State> {

    dataReady: number;
    productApi: ProductApi;
    tableHelper: TableHelper;
    searchWord: string = S.Strings.EMPTY;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;
        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

        this.tableHelper = new TableHelper(
            S.NOT_EXISTS,
            [
                [ProductFilter.S_SORT_BY_NAME, 1],
                [ProductFilter.S_SORT_BY_DESCRIPTION, 2],
            ],
            this.fetchProducts,
        )

    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'productStore', 'popupProductStore', 'notificationStore', 'siteStore')(observer(ProductsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.fetchProducts();
    }

    getPageLayoutComponentCssClassName() {
        return 'PageProducts';
    }

    fetchProducts = () => {
        const tableState = this.tableHelper.tableState;
        this.productApi.fetchProductsByFilter(this.searchWord, tableState.sortKey, tableState.from, tableState.to(), (productModels: ProductModel[], totalSize: number) => {
            if (productModels.length === 0 && tableState.from > 0) {
                tableState.pageBack();
                this.fetchProducts();
                return;
            }

            this.props.productStore.onScreenData(productModels);
            this.tableHelper.tableState.total = totalSize;
            this.dataReady = S.INT_TRUE;
        });
    }

    onChangeSearchWord = (searchWord) => {
        this.searchWord = searchWord;
        this.fetchProducts();
    }

    onChangeSortBy = (sortBy) => {
        this.tableHelper.tableState.sortKey = sortBy;
        this.fetchProducts();
    }

    onClickAddProduct = () => {
        this.props.popupProductStore.signalShow(new ProductModel(), () => {
            const tableState = this.tableHelper.tableState;
            tableState.pageZero();
            this.fetchProducts();
        });
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.PRODUCTS} />

                <PageView pageTitle={'Products'} >
                    {this.props.productStore.screenProductModels === null && (
                        'Loading'
                    )}
                    {this.props.productStore.screenProductModels !== null && (
                        <>
                            {this.tableHelper.tableState.total === 0 && this.searchWord === S.Strings.EMPTY && (
                                <NoEntryPage modelName='product' subText='Add products for your shipments' buttonText='Add Product' buttonFunction={this.onClickAddProduct} />
                            )}
                            {(this.tableHelper.tableState.total > 0 || this.searchWord !== S.Strings.EMPTY) && (
                                <PageTable
                                    className={'WhiteBox PageExtend'}
                                    header={(
                                        <PageTableHeader
                                            searchPlaceHolder={'Search products'}
                                            selectedSortBy={this.tableHelper.tableState.sortKey}
                                            options={[
                                                new PageTableHeaderSortByStruct(ProductFilter.S_SORT_BY_NAME, 'Name'),
                                                new PageTableHeaderSortByStruct(ProductFilter.S_SORT_BY_DESCRIPTION, 'Description'),
                                            ]}
                                            onChangeSearchWord={this.onChangeSearchWord}
                                            onChangeSortBy={this.onChangeSortBy} />
                                    )}
                                    footer={(
                                        <PageTableFooter
                                            totalItems={this.tableHelper.tableState.total}
                                            actions={(
                                                <Actions>
                                                    <Button onClick={this.onClickAddProduct}>
                                                        <div className={'FlexRow'}>
                                                            <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>
                                                Add product
                                                        </div>
                                                    </Button>
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
                            )}
                        </>
                    )}
                </PageView>

            </div>
        )
    }

    renderRows = () => {
        const result = [];

        this.props.productStore.screenProductModels.forEach((productModel: ProductModel) => {
            result.push([
                Table.cellString(productModel.productId),
                Table.cellString(productModel.productName),
                Table.cellString(productModel.productDescription, 'ProductDescriptionCell'),
                Table.cellString(ProductModel.getUnitName(productModel.productUnit)),
                // Table.cell(
                //     <ProductRowMenu
                //         productModel={productModel}
                //         onFinishDelete={this.fetchProducts} />,
                // ),
            ])
        })

        return result;
    }

    getTableLegend() {
        return ['ID', 'Product Name', 'Description', 'Measurement'];
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            // TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return ['5%', '33%', '43%', '19%'];
    }
}
