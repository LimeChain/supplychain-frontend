import SV from '../../../../utilities/SV';
import SkuOriginModelG from './SkuOriginModelG';

export default class SkuOriginModel extends SkuOriginModelG {
    isNew(): boolean {
        return this.skuOriginId === SV.NOT_EXISTS;
    }
}
