const Config = require('../../../../config/config');
const SF = require('../../utilities/SF').default;

const RepoFactory = require('../../utilities/database/RepoFactory').default;

const AccountRepoH = require('../../modules/Account/Repo/AccountRepoH').default;
const AccountModel = require('../../modules/Account/Model/AccountModel').default;

const CountryRepoH = require('../../modules/Country/Repo/CountryRepoH').default;
const CountryModel = require('../../modules/Country/Model/CountryModel').default;

const SiteRepoH = require('../../modules/Site/Repo/SiteRepoH').default;
const SiteModel = require('../../modules/Site/Model/SiteModel').default;

const NotificationRepoH = require('../../modules/Notification/Repo/NotificationRepoH').default;

const ProductRepoH = require('../../modules/ProductModule/Product/Repo/ProductRepoH').default;
const SkuRepoH = require('../../modules/ProductModule/Sku/Repo/SkuRepoH').default;
const SkuOriginRepoH = require('../../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepoH').default;

const ShipmentRepoH = require('../../modules/ShipmentModule/Shipment/Repo/ShipmentRepoH').default;
const ShipmentDocumentRepoH = require('../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepoH').default;

module.exports = class Migration00000000000000 {

    async up(db) {
        const repoFactory = new RepoFactory(db);

        await this.country(repoFactory);
        await this.site(repoFactory);
        await this.account(repoFactory);
        await this.notification(repoFactory);
        await this.product(repoFactory);
        await this.shipment(repoFactory);
    }

    async down(db) {
        await db.query(`DROP TABLE IF EXISTS ${CountryRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${SiteRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${AccountRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${NotificationRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${ProductRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${SkuRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${SkuOriginRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${ShipmentDocumentRepoH.TABLE_NAME}`);
        await db.query(`DROP TABLE IF EXISTS ${ShipmentRepoH.TABLE_NAME}`);
    }

    async country(repoFactory) {
        const db = repoFactory.db;
        const countryRepo = repoFactory.getCountryRepo();

        await db.query(`CREATE TABLE IF NOT EXISTS ${CountryRepoH.TABLE_NAME}(
            ${CountryRepoH.C_COUNTRY_ID} INT AUTO_INCREMENT,
            ${CountryRepoH.C_COUNTRY_NAME} TEXT,
            ${CountryRepoH.C_COUNTRY_VAT} DOUBLE,
            PRIMARY KEY(${CountryRepoH.C_COUNTRY_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        let countryModel = new CountryModel();
        countryModel.countryId = CountryModel.S_GERMANY;
        countryModel.countryName = 'Germany';
        countryModel.countryVat = 0.2;
        await countryRepo.save(countryModel);

        countryModel = new CountryModel();
        countryModel.countryId = CountryModel.S_NETHERLANDS;
        countryModel.countryName = 'Netherlands';
        countryModel.countryVat = 0.2;
        await countryRepo.save(countryModel);

        countryModel = new CountryModel();
        countryModel.countryId = CountryModel.S_POLAND;
        countryModel.countryName = 'Poland';
        countryModel.countryVat = 0.2;
        await countryRepo.save(countryModel);
    }

    async site(repoFactory) {
        const db = repoFactory.db;
        const siteRepo = repoFactory.getSiteRepo();

        await db.query(`CREATE TABLE IF NOT EXISTS ${SiteRepoH.TABLE_NAME}(
            ${SiteRepoH.C_SITE_ID} INT AUTO_INCREMENT,
            ${SiteRepoH.C_COUNTRY_ID} INT,
            ${SiteRepoH.C_SITE_NAME} TEXT,
            PRIMARY KEY(${SiteRepoH.C_SITE_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        let siteModel = new SiteModel();
        siteModel.siteId = SiteModel.S_BERLIN;
        siteModel.countryId = CountryModel.S_GERMANY;
        siteModel.siteName = 'Berlin';
        await siteRepo.save(siteModel);

        siteModel = new SiteModel();
        siteModel.siteId = SiteModel.S_ROTHERDAM;
        siteModel.countryId = CountryModel.S_NETHERLANDS;
        siteModel.siteName = 'Rotherdam';
        await siteRepo.save(siteModel);

        siteModel = new SiteModel();
        siteModel.siteId = SiteModel.S_WARSAW;
        siteModel.countryId = CountryModel.S_POLAND;
        siteModel.siteName = 'Warsaw';
        await siteRepo.save(siteModel);
    }

    async account(repoFactory) {
        const db = repoFactory.db;
        const accountRepo = repoFactory.getAccountRepo();

        await db.query(`CREATE TABLE IF NOT EXISTS ${AccountRepoH.TABLE_NAME}(
            ${AccountRepoH.C_ACCOUNT_ID} INT AUTO_INCREMENT,
            ${AccountRepoH.C_PASS} TEXT,
            ${AccountRepoH.C_SALT} TEXT,
            ${AccountRepoH.C_COUNTRY_ID} INT,
            ${AccountRepoH.C_SITE_ID} INT,
            ${AccountRepoH.C_EMAIL} TEXT COLLATE utf8mb4_general_ci,
            ${AccountRepoH.C_NAME} TEXT,
            ${AccountRepoH.C_ROLE} TINYINT,
            ${AccountRepoH.C_ACTIVE} TINYINT,
            ${AccountRepoH.C_INVITATION} TINYINT,
            ${AccountRepoH.C_REGISTER_TIMESTAMP} BIGINT,
            ${AccountRepoH.C_LAST_LOGIN_TIMESTAMP} BIGINT,
            PRIMARY KEY(${AccountRepoH.C_ACCOUNT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        let accountModel = new AccountModel();
        accountModel.accountId = CountryModel.S_GERMANY;
        accountModel.siteId = SiteModel.S_BERLIN;
        accountModel.email = 'germany@pwc.com';
        accountModel.name = 'Berlin, Germany';
        accountModel.registerTimestamp = Date.now();
        accountModel.salt = await SF.generateSalt();
        accountModel.pass = await SF.hashPassword('1', accountModel.salt);
        await accountRepo.save(accountModel);

        accountModel = new AccountModel();
        accountModel.accountId = CountryModel.S_NETHERLANDS;
        accountModel.siteId = SiteModel.S_ROTHERDAM;
        accountModel.email = 'netherlands@pwc.com';
        accountModel.name = 'Rotherdam, Netherlands';
        accountModel.registerTimestamp = Date.now();
        accountModel.salt = await SF.generateSalt();
        accountModel.pass = await SF.hashPassword('2', accountModel.salt);
        await accountRepo.save(accountModel);

        accountModel = new AccountModel();
        accountModel.accountId = CountryModel.S_POLAND;
        accountModel.siteId = SiteModel.S_WARSAW;
        accountModel.email = 'poland@pwc.com';
        accountModel.name = 'Warsaw, Poland';
        accountModel.registerTimestamp = Date.now();
        accountModel.salt = await SF.generateSalt();
        accountModel.pass = await SF.hashPassword('3', accountModel.salt);
        await accountRepo.save(accountModel);
    }

    async notification(repoFactory) {
        const db = repoFactory.db;

        await db.query(`CREATE TABLE IF NOT EXISTS ${NotificationRepoH.TABLE_NAME}(
            ${NotificationRepoH.C_NOTIFICATION_ID} INT AUTO_INCREMENT,
            ${NotificationRepoH.C_SHIPMENT_ID} INT,
            ${NotificationRepoH.C_NOTIFICATION_STATUS} TINYINT,
            ${NotificationRepoH.C_NOTIFICATION_TIME} BIGINT,
            ${NotificationRepoH.C_NOTIFICATION_READ} TINYINT,
            PRIMARY KEY(${NotificationRepoH.C_NOTIFICATION_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
    }

    async product(repoFactory) {
        const db = repoFactory.db;

        await db.query(`CREATE TABLE IF NOT EXISTS ${ProductRepoH.TABLE_NAME}(
            ${ProductRepoH.C_PRODUCT_ID} INT UNIQUE,
            ${ProductRepoH.C_PRODUCT_NAME} TEXT COLLATE utf8mb4_general_ci,
            ${ProductRepoH.C_PRODUCT_UNIT} INT,
            ${ProductRepoH.C_PRODUCT_DESCRIPTION} TEXT COLLATE utf8mb4_general_ci,
            ${ProductRepoH.C_PRODUCT_DELETED} TINYINT,
            PRIMARY KEY(${ProductRepoH.C_PRODUCT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${SkuRepoH.TABLE_NAME}(
            ${SkuRepoH.C_SKU_ID} INT UNIQUE,
            ${SkuRepoH.C_SHIPMENT_ID} INT,
            ${SkuRepoH.C_PRODUCT_ID} INT,
            ${SkuRepoH.C_QUANTITY} DOUBLE,
            ${SkuRepoH.C_PRICE_PER_UNIT} DOUBLE,
            ${SkuRepoH.C_CURRENCY} INT,
            PRIMARY KEY(${SkuRepoH.C_SKU_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${SkuOriginRepoH.TABLE_NAME} (
            ${SkuOriginRepoH.C_SKU_ORIGIN_ID} INT UNIQUE,
            ${SkuOriginRepoH.C_SKU_ID} INT,
            ${SkuOriginRepoH.C_SHIPMENT_ID} INT,
            PRIMARY KEY(${SkuOriginRepoH.C_SKU_ORIGIN_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
    }

    async shipment(repoFactory) {
        const db = repoFactory.db;

        await db.query(`CREATE TABLE IF NOT EXISTS ${ShipmentDocumentRepoH.TABLE_NAME}(
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID} INT UNIQUE,
            ${ShipmentDocumentRepoH.C_SHIPMENT_ID} INT,
            ${ShipmentDocumentRepoH.C_DOCUMENT_TYPE} TINYINT,
            ${ShipmentDocumentRepoH.C_MIME_TYPE} VARCHAR(64),
            ${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_URL} TEXT,
            ${ShipmentDocumentRepoH.C_SIZE_IN_BYTES} INT,
            ${ShipmentDocumentRepoH.C_NAME} TEXT,
            PRIMARY KEY(${ShipmentDocumentRepoH.C_SHIPMENT_DOCUMENT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        await db.query(`CREATE TABLE IF NOT EXISTS ${ShipmentRepoH.TABLE_NAME}(
            ${ShipmentRepoH.C_SHIPMENT_ID} INT UNIQUE,
            ${ShipmentRepoH.C_SHIPMENT_CONSIGNMENT_NUMBER} TEXT,
            ${ShipmentRepoH.C_SHIPMENT_NAME} TEXT,
            ${ShipmentRepoH.C_SHIPMENT_STATUS} TINYINT,
            ${ShipmentRepoH.C_SHIPMENT_ORIGIN_SITE_ID} INT,
            ${ShipmentRepoH.C_SHIPMENT_DESTINATION_SITE_ID} INT,
            ${ShipmentRepoH.C_SHIPMENT_DATE_OF_SHIPMENT} BIGINT,
            ${ShipmentRepoH.C_SHIPMENT_DATE_OF_ARRIVAL} BIGINT,
            ${'shipmentDltAnchored'} INT,
            ${ShipmentRepoH.C_SHIPMENT_DLT_PROOF} TEXT,
            ${ShipmentRepoH.C_SHIPMENT_DELETED} TINYINT,
            PRIMARY KEY(${ShipmentRepoH.C_SHIPMENT_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);
    }

}
