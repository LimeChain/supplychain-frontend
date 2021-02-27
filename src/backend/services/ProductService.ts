import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';

export default class productService extends Service {

    async creditProduct(reqProductModel: ProductModel): Promise<ProductModel> {
        const productRepo = this.repoFactory.getProductRepo();

        let productModel: ProductModel | null = null;
        if (reqProductModel.isNew() === true) {
            productModel = new ProductModel();
        } else {
            productModel = await productRepo.fetchByPrimaryValue(reqProductModel.productId);
            if (productModel === null) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }
        }

        productModel.productName = reqProductModel.productName;
        productModel.productUnit = reqProductModel.productUnit;
        productModel.productDescription = reqProductModel.productDescription;
        productModel.productDeleted = reqProductModel.productDeleted;
        productModel.skus = reqProductModel.skus;

        productModel.productId = (await productRepo.save(productModel)).productId;

        return productModel;
    }

}
