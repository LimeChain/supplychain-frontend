import CreditProductReq from '../requests/network/requests/CreditProductReq';
import CreditProductRes from '../requests/network/responses/CreditProductRes';
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

}
