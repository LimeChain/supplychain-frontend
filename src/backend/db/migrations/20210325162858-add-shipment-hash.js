const { default: ShipmentRepoH } = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH')

module.exports = class Migration20210325162858 {

    async up(db) {
        await db.query(`ALTER TABLE ${ShipmentRepoH.TABLE_NAME} ADD COLUMN ${ShipmentRepoH.C_SHIPMENT_HASH} VARCHAR(256) DEFAULT ''`);
    }

    async down(db) {

    }

}
