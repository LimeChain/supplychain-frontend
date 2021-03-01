import SV from '../../../../utilities/SV';
import SkuModelG from './SkuModelG';

export default class SkuModel extends SkuModelG {
    isNew(): boolean {
        return this.skuId === SV.NOT_EXISTS;
    }

}
