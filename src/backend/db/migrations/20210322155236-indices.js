const { default: ProductRepoH } = require('../../modules/ProductModule/Product/Repo/ProductRepoH')
const { default: SkuRepoH } = require('../../modules/ProductModule/Sku/Repo/SkuRepoH')
const { default: SkuOriginRepoH } = require('../../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepoH')
const { default: ShipmentRepoH } = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH')
const { default: ShipmentDocumentRepoH } = require('../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepoH')

module.exports = class Migration20210322155236 {

    async up(db) {
        await db.query(`CREATE INDEX index01 ON ${SkuRepoH.TABLE_NAME}(${SkuRepoH.C_SHIPMENT_ID})`);
        await db.query(`CREATE INDEX index01 ON ${SkuOriginRepoH.TABLE_NAME}(${SkuRepoH.C_SKU_ID})`);
        await db.query(`CREATE INDEX index01 ON ${ShipmentDocumentRepoH.TABLE_NAME}(${SkuRepoH.C_SHIPMENT_ID})`);
        await db.query(`CREATE INDEX index01 ON ${ShipmentRepoH.TABLE_NAME}(${ShipmentRepoH.C_SHIPMENT_DELETED})`);
        await db.query(`CREATE INDEX index01 ON ${ProductRepoH.TABLE_NAME}(${ProductRepoH.C_PRODUCT_DELETED})`);
    }

    async down(db) {
    }

}
