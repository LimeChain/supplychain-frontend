const ShipmentDocumentRepoH = require('../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepoH').default;

module.exports = class Migration20210325101032 {

    async up(db) {
        await db.query(`ALTER TABLE ${ShipmentDocumentRepoH.TABLE_NAME} MODIFY ${ShipmentDocumentRepoH.C_MIME_TYPE} VARCHAR(256)`)
    }

    async down(db) {

    }

}
