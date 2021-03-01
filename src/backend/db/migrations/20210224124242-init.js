const CountryRepoH = require('../../modules/Country/Repo/CountryRepoH').default;
const SiteRepoH = require('../../modules/Site/Repo/SiteRepoH').default;
const NotificationRepoH = require('../../modules/Notification/Repo/NotificationRepoH').default;

const ProductRepoH = require('../../modules/ProductModule/Product/Repo/ProductRepoH').default;
const SkuRepoH = require('../../modules/ProductModule/Sku/Repo/SkuRepoH').default;
const SkuOriginRepoH = require('../../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepoH').default;

const ShipmentRepoH = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH').default;
const ShipmentDocumentRepoH = require('../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepoH').default;

module.exports = class Migration20210224124242 {

    async up(db) {
        await db.query(`CREATE TABLE IF NOT EXISTS ${CountryRepoH.TABLE_NAME}(
            ${CountryRepoH.C_COUNTRY_ID} INT AUTO_INCREMENT,
            ${CountryRepoH.C_COUNTRY_NAME} TEXT,
            ${CountryRepoH.C_COUNTRY_VAT} DOUBLE,
            PRIMARY KEY(${CountryRepoH.C_COUNTRY_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
        await db.query(`INSERT INTO ${CountryRepoH.TABLE_NAME} (${CountryRepoH.C_COUNTRY_NAME}, ${CountryRepoH.C_COUNTRY_VAT})
            (SELECT 'Malta', 0.18
            WHERE NOT EXISTS (SELECT * FROM ${CountryRepoH.TABLE_NAME})) union all
            (SELECT 'Greece', 0.23 
            WHERE NOT EXISTS (SELECT * FROM ${CountryRepoH.TABLE_NAME})) union all
            (SELECT 'Germany', 0.19
            WHERE NOT EXISTS (SELECT * FROM ${CountryRepoH.TABLE_NAME}))`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${SiteRepoH.TABLE_NAME}(
            ${SiteRepoH.C_SITE_ID} INT AUTO_INCREMENT,
            ${SiteRepoH.C_COUNTRY_ID} INT,
            ${SiteRepoH.C_SITE_NAME} TEXT,
            PRIMARY KEY(${SiteRepoH.C_SITE_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
        await db.query(`INSERT INTO ${SiteRepoH.TABLE_NAME} (${SiteRepoH.C_COUNTRY_ID}, ${SiteRepoH.C_SITE_NAME})
        (SELECT 1, 'Valletta'
        WHERE NOT EXISTS (SELECT * FROM ${SiteRepoH.TABLE_NAME})) union all
        (SELECT 2, 'Athens'
        WHERE NOT EXISTS (SELECT * FROM ${SiteRepoH.TABLE_NAME})) union all
        (SELECT 3, 'Berlin'
        WHERE NOT EXISTS (SELECT * FROM ${SiteRepoH.TABLE_NAME}))`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${NotificationRepoH.TABLE_NAME}(
            ${NotificationRepoH.C_NOTIFICATION_ID} INT AUTO_INCREMENT,
            ${NotificationRepoH.C_SHIPMENT_ID} INT,
            ${NotificationRepoH.C_NOTIFICATION_STATUS} INT,
            ${NotificationRepoH.C_NOTIFICATION_TIME} INT,
            ${NotificationRepoH.C_NOTIFICATION_READ} INT,
            PRIMARY KEY(${NotificationRepoH.C_NOTIFICATION_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${ProductRepoH.TABLE_NAME}(
            ${ProductRepoH.C_PRODUCT_ID} INT AUTO_INCREMENT,
            ${ProductRepoH.C_PRODUCT_NAME} TEXT,
            ${ProductRepoH.C_PRODUCT_UNIT} INT,
            ${ProductRepoH.C_PRODUCT_DESCRIPTION} TEXT,
            ${ProductRepoH.C_PRODUCT_DELETED} INT,
            PRIMARY KEY(${ProductRepoH.C_PRODUCT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${SkuRepoH.TABLE_NAME}(
            ${SkuRepoH.C_SKU_ID} INT AUTO_INCREMENT,
            ${SkuRepoH.C_SHIPMENT_ID} INT,
            ${SkuRepoH.C_PRODUCT_ID} INT,
            ${SkuRepoH.C_QUANTITY} DOUBLE,
            ${SkuRepoH.C_PRICE_PER_UNIT} DOUBLE,
            ${SkuRepoH.C_CURRENCY} INT,
            PRIMARY KEY(${SkuRepoH.C_SKU_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${SkuOriginRepoH.TABLE_NAME} (
            ${SkuOriginRepoH.C_SKU_ORIGIN_ID} INT AUTO_INCREMENT,
            ${SkuOriginRepoH.C_SKU_ID} INT,
            ${SkuOriginRepoH.C_SHIPMENT_ID} INT,
            PRIMARY KEY(${SkuOriginRepoH.C_SKU_ORIGIN_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${ShipmentDocumentRepoH.TABLE_NAME}(
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID} INT AUTO_INCREMENT,
            ${ShipmentDocumentRepoH.C_SHIPMENT_ID} INT,
            ${ShipmentDocumentRepoH.C_DOCUMENT_TYPE} INT,
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL} TEXT,
            PRIMARY KEY(${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

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
