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
import ShipmentDocumentModel from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';

export default class CreditShipmentReq {

    shipmentModel: ShipmentModel;
    skuOriginModels: SkuOriginModel[];
    skuModels: SkuModel[];
    shipmentDocumentModels: ShipmentDocumentModel[];

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentModel = ShipmentModel.fromNetwork(json.shipmentJson);
        this.skuOriginModels = [];
        for (let i = 0; i < json.skuOriginJsons.length; ++i) {
            this.skuOriginModels.push(SkuOriginModel.fromNetwork(json.skuOriginJsons[i]));
        }
        this.skuModels = [];
        for (let i = 0; i < json.skuJsons.length; ++i) {
            this.skuModels.push(SkuModel.fromNetwork(json.skuJsons[i]));
        }
        this.shipmentDocumentModels = [];
        for (let i = 0; i < json.shipmentDocumentJsons.length; ++i) {
            this.shipmentDocumentModels.push(ShipmentDocumentModel.fromNetwork(json.shipmentDocumentJsons[i]));
        }
    }

}
