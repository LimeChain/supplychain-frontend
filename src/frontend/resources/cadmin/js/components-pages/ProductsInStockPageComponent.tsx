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
import PageView from '../components-inc/PageView';
import './../../css/components-pages/page-products-component.css';
import NoEntryPage from '../components-inc/NoEntryPage';
import PageTableFooter from '../components-inc/PageTableFooter';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';

interface Props extends ContextPageComponentProps {
    popupProductStore: PopupProductStore;
    productStore: ProductStore;
}

interface State {
    searchWord: string;
    sortBy: number;
}

export default class ProductsInStockPageComponent extends ContextPageComponent<Props, State> {
    showNoEntryPage: boolean = true;

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
        const MobXComponent = inject('appStore', 'alertStore', 'productStore', 'accountSessionStore', 'popupProductStore', 'notificationStore', 'siteStore')(observer(ProductsInStockPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    async loadData() {
        await super.loadData();

        this.productApi.fetchProductsByFilter(1, 3, 1, (productModels: ProductModel[]) => {
            this.props.productStore.onScreenData(productModels);
            this.dataReady = S.INT_TRUE;
        });
    }

    getPageLayoutComponentCssClassName() {
        return 'PageProductsInStock';
    }

    renderPopups() {
        return super.renderPopups().concat([
            <ProductPopup key={1} />,
        ])
    }

    fetchProducts = () => {
        this.productApi.fetchProductsByFilter(1, 7, -1, (productModels, totalSize) => {
            console.log(productModels);
            console.log(totalSize);
        });

        this.productApi.fetchProductById('7', (productModel) => {
            console.log(productModel);
        })
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

                <Sidebar page={PagesCAdmin.PRODUCTS_IN_STOCK} />

                <PageView pageTitle={'ProductsinStock'} >
                    {this.showNoEntryPage === true && (
                        <NoEntryPage modelName='product' subText='' buttonText='' buttonFunction={null} />
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
                            {'some large content'.repeat(10)}
                        </PageTable>
                    )}
                </PageView>

            </div>
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
}
