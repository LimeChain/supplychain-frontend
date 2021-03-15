import SkuModel from '../../../modules/ProductModule/Sku/Model/SkuModel';
import SkuModelG from '../../../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../../../modules/ProductModule/Sku/Model/SkuModelH';
import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';            
            
export default class FetchShipmentsWithProductQuantityLeftByProductIdRes {

    skuJsons: SkuModel[];;
    shipmentJsons: ShipmentModel[];;

    constructor(skuModels: SkuModel[], shipmentModels: ShipmentModel[]) {
        this.skuJsons = [];
        for (let i = 0; i < skuModels.length; ++i) {
            this.skuJsons.push(skuModels[i].toNetwork());
        }
        this.shipmentJsons = [];
        for (let i = 0; i < shipmentModels.length; ++i) {
            this.shipmentJsons.push(shipmentModels[i].toNetwork());
        }
    }

}