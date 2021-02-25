import Payload from '../../../utilities/network/Payload';
import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
import SkuOriginModel from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModel';
import SkuOriginModelG from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModelG';
import SkuOriginModelH from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModelH';
import SkuModel from '../../../modules/ProductModule/Sku/Model/SkuModel';
import SkuModelG from '../../../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../../../modules/ProductModule/Sku/Model/SkuModelH';
            
export default class CreditShipmentReq {
    
    shipmentModel: ShipmentModel;
    skuOriginModels: SkuOriginModel[];
    skuModels: SkuModel[];

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentModel = ShipmentModel.fromNetwork(json.shipmentModel);
        this.skuOriginModels = [];
        for (let i = 0; i < json.skuOriginModels.length; ++i) {
            this.skuOriginModels.push(SkuOriginModel.fromNetwork(json.skuOriginModels[i]));
        }
        this.skuModels = [];
        for (let i = 0; i < json.skuModels.length; ++i) {
            this.skuModels.push(SkuModel.fromNetwork(json.skuModels[i]));
        }
    }

}