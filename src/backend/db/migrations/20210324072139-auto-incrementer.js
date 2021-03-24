const Config = require('../../../../config/config');

const RepoFactory = require('../../utilities/database/RepoFactory').default;

const AutoIncrementerModel = require('../../modules/AutoIncrementer/Model/AutoIncrementerModel').default;
const AutoIncrementerRepoH = require('../../modules/AutoIncrementer/Repo/AutoIncrementerRepoH').default;

const autoIncrementInit = (Config.Server.SITE_ID - 1) * 700000000 + 1;

module.exports = class Migration20210324072139 {

    async up(db) {
        const repoFactory = new RepoFactory(db);
        const autoIncrementerRepo = repoFactory.getAutoIncrementerRepo();

        await db.query(`CREATE TABLE IF NOT EXISTS ${AutoIncrementerRepoH.TABLE_NAME}(
            ${AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID} INT AUTO_INCREMENT,
            ${AutoIncrementerRepoH.C_NEXT_PRODUCT_ID} INT,
            ${AutoIncrementerRepoH.C_NEXT_SKU_ID} INT,
            ${AutoIncrementerRepoH.C_NEXT_SKU_ORIGIN_ID} INT,
            ${AutoIncrementerRepoH.C_NEXT_SHIPMENT_ID} INT,
            ${AutoIncrementerRepoH.C_NEXT_SHIPMENT_DOCUMENT_ID} INT,
            PRIMARY KEY(${AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID})
        ) DEFAULT CHARACTER SET utf8mb4, DEFAULT COLLATE utf8mb4_bin, ENGINE = InnoDB`);

        const autoIncrementerModel = new AutoIncrementerModel();
        autoIncrementerModel.autoIncrementerId = AutoIncrementerModel.ID;
        autoIncrementerModel.nextProductId = autoIncrementInit;
        autoIncrementerModel.nextSkuId = autoIncrementInit;
        autoIncrementerModel.nextSkuOriginId = autoIncrementInit;
        autoIncrementerModel.nextShipmentDocumentId = autoIncrementInit;
        autoIncrementerModel.nextShipmentId = autoIncrementInit;
        await autoIncrementerRepo.save(autoIncrementerModel);

    }

    async down(db) {
        await db.query(`DROP TABLE IF EXISTS ${AutoIncrementerRepoH.TABLE_NAME}`);
    }

}
