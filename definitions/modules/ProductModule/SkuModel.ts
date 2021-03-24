export default class SkuModel {

    skuId: number;
    shipmentId: number;
    productId: number;
    quantity: number;
    pricePerUnit: number;
    currency: number;

    primaryValueInInsert: boolean = true

}
