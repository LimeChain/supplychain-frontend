import ProductController from '../../../controllers/ProductController';
import Context from '../../../utilities/network/Context';
import ProductApiH from './ProductApi.h';

export default class ProductApi extends ProductApiH {

    productController: ProductController;

    constructor() {
        super();
        this.productController = new ProductController();
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case ProductApiH.Actions.CREDIT_PRODUCT:
                await this.productController.creditProduct(context);
                break;
            case ProductApiH.Actions.FETCH_PRODUCTS_BY_FILTER:
                await this.productController.fetchProductsByFilter(context);
                break;
            case ProductApiH.Actions.FETCH_PRODUCT_BY_ID:
                await this.productController.fetchProductById(context);
                break;
            default:
                break;
        }
    }
}
