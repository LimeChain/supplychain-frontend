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
import ProductConstsH from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelHConsts';
import ProductModelH from '../../../../../backend/modules/ProductModule/Product/Model/ProductModelH';

interface Props extends ContextPageComponentProps {
    popupProductStore: PopupProductStore;
    productStore: ProductStore;
}

interface State {
    searchWord: string;
    sortBy: number;
}

export default class ProductsPageComponent extends ContextPageComponent<Props, State> {
    showNoEntryPage: boolean = false;

    dataReady: number;
    productApi: ProductApi;

    constructor(props: Props) {
        super(props);
        this.dataReady = S.INT_FALSE;
        this.productApi = new ProductApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

        this.state = {
            searchWord: S.Strings.EMPTY,
            sortBy: S.NOT_EXISTS,
        };
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'accountSessionStore', 'productStore', 'popupProductStore', 'notificationStore', 'siteStore')(observer(ProductsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.fetchProducts(1, 0, 10);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageProducts';
    }

    fetchProducts = (filterBy: number, from: number, to: number) => {
        this.productApi.fetchProductsByFilter(filterBy, from, to, (productModels: ProductModel[]) => {
            this.props.productStore.onScreenData(productModels);
            this.dataReady = S.INT_TRUE;
        });
    }

    onChangeSearchWord = (searchWord) => {
        this.setState({
            searchWord,
        });
    }

    onChangeSortBy = (sortBy) => {
        this.setState({
            sortBy,
        });
    }

    addProductPopup = () => {
        // TODO: open new shipment popup
    }

    renderContent() {
        return (
            <div className={'PageContent'} >

                <Sidebar page={PagesCAdmin.PRODUCTS} />

                <PageView pageTitle={'Products'} >
                    {this.showNoEntryPage === true && (
                        <NoEntryPage modelName='product' subText='Add products for your shipments' buttonText='Add Product' buttonFunction={this.addProductPopup} />
                    )}
                    {this.showNoEntryPage === false && (
                        <PageTable
                            className={'WhiteBox PageExtend'}
                            header={(
                                <PageTableHeader
                                    searchPlaceHolder={'Search products'}
                                    selectedSortBy={this.state.sortBy}
                                    options={[
                                        new PageTableHeaderSortByStruct(5, 'Name'),
                                        new PageTableHeaderSortByStruct(10, 'Site'),
                                    ]}
                                    onChangeSearchWord={this.onChangeSearchWord}
                                    onChangeSortBy={this.onChangeSortBy} />
                            )}
                            footer={(
                                <PageTableFooter
                                    totalItems={5}
                                    actions={(
                                        <Actions>
                                            <Button>
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
                                legend={ProductStore.PRODUCT_TABLE_LEGEND}
                                widths={this.getTableWidths()}
                                aligns={this.getTableAligns()}
                                helper={new TableHelper(ProductModelHConsts.P_)}
                                rows={this.renderRows()}

                            >
                            </TableDesktop>
                        </PageTable>
                    )}
                </PageView>

            </div >
            // <>
            //     <Header page={PagesCAdmin.PRODUCTS} />
            //     <div className={' PageContent FlexColumn'}>
            //         <Notifications notifications={this.props.notificationStore.screenNotificationModels} />
            //         <div onClick={this.props.popupProductStore.show}>show popup</div>
            //         <div onClick={this.fetchProducts}>fetch products</div>
            //     </div>
            // </>
        )
    }

    renderRows = () => {
        const result = [];

        this.props.productStore.screenProductModels.forEach((productModel: ProductModel) => {
            result.push([
                Table.cellString(productModel.productId),
                Table.cellString(productModel.productName),
                Table.cellString(productModel.productDescription, 'ProductDescriptionCell'),
                Table.cellString(productModel.getUnitName()),
                Table.cell((<div>...</div>)),
            ])
        })

        return result;
    }

    getTableAligns = () => {
        return [
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_LEFT,
            TableDesktop.ALIGN_CENTER,
            TableDesktop.ALIGN_CENTER,
        ]
    }

    getTableWidths = () => {
        return [];
    }
}
