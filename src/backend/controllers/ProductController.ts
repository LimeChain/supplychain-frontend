
import CreditProductReq from '../requests/network/requests/CreditProductReq';
import FetchAllProductsReq from '../requests/network/requests/FetchAllProductsReq';
import FetchProductByIdReq from '../requests/network/requests/FetchProductByIdReq';
import CreditProductRes from '../requests/network/responses/CreditProductRes';
import FetchAllProductsRes from '../requests/network/responses/FetchAllProductsRes';
import FetchProductByIdRes from '../requests/network/responses/FetchProductByIdRes';
import Context from '../utilities/network/Context';

export default class ProductController {

    async creditProduct(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditProductReq(payload);

        const productService = servicesFactory.getProductService();
        const productModel = await productService.creditProduct(req.productModel);

        context.res.set(new CreditProductRes(productModel));

    }

    async fetchAllProducts(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchAllProductsReq(payload);

        const productService = servicesFactory.getProductService();
        const { productModels, totalSize } = await productService.fetchAllProducts(req.from, req.to, req.sortBy);

        context.res.set(new FetchAllProductsRes(productModels, totalSize));

    }

    async fetchProductById(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchProductByIdReq(payload);

        const productService = servicesFactory.getProductService();
        const productModel = await productService.fetchProductById(req.productId);

        context.res.set(new FetchProductByIdRes(productModel));

    }
}
