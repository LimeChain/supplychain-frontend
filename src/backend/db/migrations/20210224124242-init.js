const CountryRepoH = require('../../modules/Country/Repo/CountryRepoH').default;
const ShipmentRepoH = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH').default;
const ShipmentDocumentRepoH = require('../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepoH').default;

module.exports = class Migration20210224124242 {

    async up(db) {
        await db.query(`DROP TABLE IF EXISTS ${CountryRepoH.TABLE_NAME}`);
        await db.query(`CREATE TABLE IF NOT EXISTS ${CountryRepoH.TABLE_NAME}(
            ${CountryRepoH.C_COUNTRY_ID} INT AUTO_INCREMENT,
            ${CountryRepoH.C_COUNTRY_NAME} TEXT,
            ${CountryRepoH.C_COUNTRY_VAT} INT,
            PRIMARY KEY(${CountryRepoH.C_COUNTRY_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`DROP TABLE IF EXISTS ${ShipmentDocumentRepoH.TABLE_NAME}`);
        await db.query(`CREATE TABLE IF NOT EXISTS ${ShipmentDocumentRepoH.TABLE_NAME}(
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID} INT AUTO_INCREMENT,
            ${ShipmentDocumentRepoH.C_SHIPMENT_ID} INT,
            ${ShipmentDocumentRepoH.C_DOCUMENT_ID} INT,
            ${ShipmentDocumentRepoH.C_DOCUMENT_TYPE} INT,
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL} TEXT,
            PRIMARY KEY(${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`DROP TABLE IF EXISTS ${ShipmentRepoH.TABLE_NAME}`);
        await db.query(`CREATE TABLE IF NOT EXISTS ${ShipmentRepoH.TABLE_NAME}(
            ${ShipmentRepoH.C_SHIPMENT_ID} INT AUTO_INCREMENT,
            ${ShipmentRepoH.C_SHIPMENT_NAME} TEXT,
            ${ShipmentRepoH.C_SHIPMENT_STATUS} INT,
            ${ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID} INT,
            ${ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID} INT,
            ${ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT} INT,
            ${ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL} INT,
            ${ShipmentRepoH.C_SHIPMENT_DLT_ANCHORED} INT,
            ${ShipmentRepoH.C_SHIPMENT_DLT_PROOF} TEXT,
            ${ShipmentRepoH.C_SHIPMENT_DELETED} INT,
            PRIMARY KEY(${ShipmentRepoH.C_SHIPMENT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
    }

    async down(db) {

    }

}
