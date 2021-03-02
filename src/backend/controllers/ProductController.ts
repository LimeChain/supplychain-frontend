import CreditProductReq from '../requests/network/requests/CreditProductReq';
import FetchProductByIdReq from '../requests/network/requests/FetchProductByIdReq';
import FetchProductsByFilterReq from '../requests/network/requests/FetchProductsByFilterReq';
import CreditProductRes from '../requests/network/responses/CreditProductRes';
import FetchProductByIdRes from '../requests/network/responses/FetchProductByIdRes';
import FetchProductsByFilterRes from '../requests/network/responses/FetchProductsByFilterRes';
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

    async fetchProductsByFilter(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchProductsByFilterReq(payload);

        const productService = servicesFactory.getProductService();
        const { productModels, totalSize } = await productService.fetchProductsByFilter(req.sortBy, req.from, req.to);

        context.res.set(new FetchProductsByFilterRes(productModels, totalSize));

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
