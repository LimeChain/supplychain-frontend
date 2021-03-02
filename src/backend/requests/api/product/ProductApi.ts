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
            case ProductApiH.Actions.FETCH_ALL_PRODUCTS:
                await this.productController.fetchAllProducts(context);
                break;
            case ProductApiH.Actions.FETCH_PRODUCT_BY_ID:
                await this.productController.fetchProductById(context);
                break;
            default:
                break;
        }
    }
}
