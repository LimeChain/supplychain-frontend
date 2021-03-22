const { default: ProductModelH } = require("../../modules/ProductModule/Product/Model/ProductModelH")
const { default: ProductRepoH } = require("../../modules/ProductModule/Product/Repo/ProductRepoH")

module.exports = class Migration20210322074135 {

    async up(db) {
        await db.query(`ALTER TABLE ${ProductRepoH.TABLE_NAME} ADD COLUMN ${ProductRepoH.C_PRODUCT_EDITABLE} TINYINT, ADD COLUMN ${ProductRepoH.C_PRODUCT_DELETABLE} TINYINT;`)
    }

    async down(db) {

    }

}
