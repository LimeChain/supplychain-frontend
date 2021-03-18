import CreditProductReq from '../requests/network/requests/CreditProductReq';
import FetchProductByIdReq from '../requests/network/requests/FetchProductByIdReq';
import FetchProductsByFilterReq from '../requests/network/requests/FetchProductsByFilterReq';
import CreditProductRes from '../requests/network/responses/CreditProductRes';
import FetchProductByIdRes from '../requests/network/responses/FetchProductByIdRes';
import FetchProductsByFilterRes from '../requests/network/responses/FetchProductsByFilterRes';
import Context from '../utilities/network/Context';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import axios from 'axios'

export default class ProductController {

    async creditProduct(context: Context) {
        const session = context.session;
        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditProductReq(payload);

        const productService = servicesFactory.getProductService();

        servicesFactory.db.beginTransaction();
        const productModel = await productService.creditProduct(req.productModel);
        servicesFactory.db.commitTransaction();

        context.res.set(new CreditProductRes(productModel));
    }

    async fetchProductsByFilter(context: Context) {
        // const instance = axios.create({ baseURL: 'http://hedera-integration-node:8181' })

        // instance.get('/widgets')
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => { })

        const session = context.session;
        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchProductsByFilterReq(payload);

        const productService = servicesFactory.getProductService();
        const { productModels, totalSize } = await productService.fetchProductsByFilter(req.searchBy, req.sortBy, req.from, req.to);

        context.res.set(new FetchProductsByFilterRes(productModels, totalSize));

    }

    async fetchProductById(context: Context) {
        const session = context.session;
        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchProductByIdReq(payload);

        const productService = servicesFactory.getProductService();
        const productModel = await productService.fetchProductById(req.productId);

        const res = new FetchProductByIdRes(productModel);
        context.res.set(res);

    }
}
