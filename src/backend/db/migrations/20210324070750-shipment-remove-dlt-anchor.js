const { default: ShipmentRepoH } = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH')

module.exports = class Migration20210324070750 {

    async up(db) {
        await db.query(`ALTER TABLE ${ShipmentRepoH.TABLE_NAME} DROP COLUMN shipmentDltAnchored`);
    }

    async down(db) {

    }

}
