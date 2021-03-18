import axios from 'axios';
import Config from '../../../config/config';
import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import ProductRepo from '../modules/ProductModule/Product/Repo/ProductRepo';
import ProductFilter from '../modules/ProductModule/Product/Utils/ProductFilter';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';

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

        productModel.productId = (await this.productRepo.save(productModel)).productId;

        try {
            const instance = axios.create({ baseURL: Config.Server.HEDERA_INTEGRATION_NODE_URL })
            const axiosResponse = await instance.post(Config.Server.HEDERA_INTERGRATION_NODE_CREDIT_PRODUCT_SUFFIX, productModel.toNetwork());
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
