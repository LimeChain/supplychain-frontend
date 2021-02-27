import ProductModelG from './ProductModelG';
import SV from '../../../../utilities/SV';

export default class ProductModel extends ProductModelG {

    isNew(): boolean {
        return this.productId === SV.NOT_EXISTS;
    }

}
