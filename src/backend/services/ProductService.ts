import fs from 'fs/promises';
import axios from 'axios';
import Config from '../../../config/config';
import IntegrationNodeTransferModel from '../modules/IntegratonNode/IntegrationNodeTransferModel';
import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import ProductRepo from '../modules/ProductModule/Product/Repo/ProductRepo';
import ProductFilter from '../modules/ProductModule/Product/Utils/ProductFilter';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';
import IntegrationNodeApiH from '../requests/api/integration-node/IntegrationNodeApi.h';
import Params from '../utilities/Params';
import SF from '../utilities/SF';

export default class ProductService extends Service {

    productRepo: ProductRepo = this.repoFactory.getProductRepo();

    async creditProduct(reqProductModel: ProductModel): Promise<ProductModel> {
        let productModel: ProductModel | null = null;
        if (reqProductModel.isNew() === true) {
            productModel = new ProductModel();
        } else {
            productModel = await this.productRepo.fetchByPrimaryValue(reqProductModel.productId);
            if (productModel === null) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }
        }

        productModel.productName = reqProductModel.productName;
        productModel.productUnit = reqProductModel.productUnit;
        productModel.productDescription = reqProductModel.productDescription;
        productModel.productDeleted = reqProductModel.productDeleted;
        productModel.productDeletable = reqProductModel.productDeletable;
        productModel.productEditable = reqProductModel.productEditable;

        productModel.productId = (await this.productRepo.save(productModel)).productId;

        try {
            const integrationNodeTransferModel = IntegrationNodeTransferModel.newInstanceProduct();
            integrationNodeTransferModel.obj = {
                productModel,
            };

            const targetWebUrls = SF.getTargetSiteWebUrlButMine();
            for (let i = targetWebUrls.length; i-- > 0;) {
                const axiosTransfer = axios.create({ baseURL: targetWebUrls[i] });
                await axiosTransfer.post('/', {
                    [Params.ACTION]: IntegrationNodeApiH.Actions.CREDIT_PRODUCT,
                    [Params.PAYLOAD]: JSON.stringify(integrationNodeTransferModel.toNetwork()),
                });
            }
        } catch (ex) {
            throw new StateException(Response.S_INTEGRATION_NODE_ERROR);
        }

        return productModel;
    }

    async fetchProductsByFilter(searchBy: string, sortBy: number, from: number, to: number): Promise<{ productModels: ProductModel[], totalSize: number }> {
        const productFilter = new ProductFilter();
        productFilter.searchBy = searchBy;
        productFilter.sortBy = sortBy;

        const productModels = await this.productRepo.fetchByFilter(productFilter);
        const totalSize = productModels.length;

        return { productModels: productModels.slice(from, to), totalSize };
    }

    async fetchProductById(productId: number): Promise<ProductModel> {
        return this.productRepo.fetchByPrimaryValueNotDeleted(productId);
    }

}
