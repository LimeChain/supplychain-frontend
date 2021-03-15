import SV from '../../../../utilities/SV';
import SkuModelG from './SkuModelG';

export default class SkuModel extends SkuModelG {

    static S_CURRENCY_EUR: number = 1;
    static S_CURRENCY_USD: number = 2;

    isNew(): boolean {
        return this.skuId === SV.NOT_EXISTS;
    }

}
