import ProductModelG from './ProductModelG';
import SV from '../../../../utilities/SV';

export default class ProductModel extends ProductModelG {

    static S_UNIT_PACK: number = 1;
    static S_UNIT_KG: number = 2;

    constructor() {
        super();
        this.productEditable = SV.TRUE;
        this.productDeletable = SV.TRUE;
    }

    isNew(): boolean {
        return this.productId === SV.NOT_EXISTS;
    }

    markAsUneditable() {
        this.productEditable = SV.FALSE;
    }

    setNewDeletableStatus(newDeletableStatus: number) {
        this.productDeletable = newDeletableStatus;
    }

    markAsDeletable() {
        this.productDeletable = SV.TRUE;
    }

}
