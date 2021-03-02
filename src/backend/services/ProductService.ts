import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import ProductModelH from '../modules/ProductModule/Product/Model/ProductModelH';
import ProductRepo from '../modules/ProductModule/Product/Repo/ProductRepo';
import ProductFilter from '../modules/ProductModule/Product/Utils/ProductFilter';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';

export default class productService extends Service {
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

        return productModel;
    }

    async fetchAllProducts(from: number, to: number, sortBy: number, order: string): Promise<{ productModels: Array<ProductModel>, totalSize: number }> {

        let productFilter = new ProductFilter();
        productFilter.sortBy = sortBy;
        productFilter.order = order;

        const productModels = await this.productRepo.fetchByFilter(productFilter);
        if (productModels === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        const totalSize = productModels.length;

        return { productModels: productModels.slice(from, to), totalSize };
    }

    async fetchProductById(productId: number): Promise<ProductModel> {

        let productModel = await this.productRepo.fetchByPrimaryValue(productId);

        if (productModel === null) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        return productModel;

    }

}
