import ShipmentModel from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import ShipmentModelG from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelG';
import ShipmentModelH from '../../../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
import SkuModel from '../../../modules/ProductModule/Sku/Model/SkuModel';
import SkuModelG from '../../../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../../../modules/ProductModule/Sku/Model/SkuModelH';
import SkuOriginModel from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModel';
import SkuOriginModelG from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModelG';
import SkuOriginModelH from '../../../modules/ProductModule/SkuOrigin/Model/SkuOriginModelH';
import ShipmentDocumentModel from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel';
import ShipmentDocumentModelG from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelG';
import ShipmentDocumentModelH from '../../../modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModelH';            
            
export default class FetchShipmentsByIdRes {

    shipmentJson: ShipmentModel;
    skuJsons: SkuModel[];;
    skuOriginJsons: SkuOriginModel[];;
    shipmentDocumentJsons: ShipmentDocumentModel[];;

    constructor(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) {
        this.shipmentJson = shipmentModel.toNetwork();
        this.skuJsons = [];
        for (let i = 0; i < skuModels.length; ++i) {
            this.skuJsons.push(skuModels[i].toNetwork());
        }
        this.skuOriginJsons = [];
        for (let i = 0; i < skuOriginModels.length; ++i) {
            this.skuOriginJsons.push(skuOriginModels[i].toNetwork());
        }
        this.shipmentDocumentJsons = [];
        for (let i = 0; i < shipmentDocumentModels.length; ++i) {
            this.shipmentDocumentJsons.push(shipmentDocumentModels[i].toNetwork());
        }
    }

}