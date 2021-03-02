import React from 'react';
import { inject, observer } from 'mobx-react';

import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import ProductFilterConsts from '../../../../../../builds/dev-generated/ProductModule/Product/Utils/ProductFilterConsts';

import ProductApi from '../../../common/js/api/ProductApi';
import ProductModel from '../../../common/js/models/product-module/ProductModel';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import Header from '../components-inc/header';
import Notifications from '../components-inc/Notifications';

import './../../css/components-pages/page-outgoing-component.css';
import Table from '../../../common/js/components-inc/Table';
import TableHelper from '../../../common/js/helpers/TableHelper';

interface Props extends ContextPageComponentProps {
}

export default class OutgoingPageComponent extends ContextPageComponent<Props> {

    productModels: ProductModel[];
    tableHelper: TableHelper;

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'notificationStore', 'shipmentStore', 'siteStore')(observer(OutgoingPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);

        this.productModels = [];
        this.tableHelper = new TableHelper(ProductFilterConsts.S_SORT_BY_ID, [
            [ProductFilterConsts.S_SORT_BY_ID, 0],
            [ProductFilterConsts.S_SORT_BY_NAME, 2],
        ], this.fetchProducts, this, 2);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageOutgoing';
    }

    async loadData() {
        await super.loadData();
        this.fetchProducts();
    }

    fetchProducts = () => {
        // const tableState = this.tableHelper.tableState;
        // new ProductApi().fetchAllProducts(tableState.from, tableState.to(), tableState.sortKey, 'DESC', (productModels: ProductModel[]) => {
        //     this.productModels = productModels;
        //     tableState.total = 11;
        //     this.setState({});
        // });
    }

    renderContent() {
        return (
            <>
                <Header page={PagesCAdmin.OUTGOING} />
                <div className={' PageContent FlexColumn'}>
                    <Notifications notifications={this.props.notificationStore.screenNotificationModels} />

                    <Table
                        widths={['30%', '20%', '50%']}
                        legend={['Id', 'Unit', 'Name']}
                        rows={this.renderRows()}
                        helper={this.tableHelper} />
                </div>
            </>
        )
    }

    renderRows() {
        return this.productModels.map((productModel) => {
            return [
                Table.cellString(productModel.productId),
                Table.cellString(productModel.productUnit.toString()),
                Table.cellString(productModel.productName),
            ]
        });
    }
}
