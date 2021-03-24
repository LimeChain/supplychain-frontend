import CountryRepo from '../../modules/Country/Repo/CountryRepo';
import NotificationRepo from '../../modules/Notification/Repo/NotificationRepo';
import ProductRepo from '../../modules/ProductModule/Product/Repo/ProductRepo';
import SkuRepo from '../../modules/ProductModule/Sku/Repo/SkuRepo';
import SkuOriginRepo from '../../modules/ProductModule/SkuOrigin/Repo/SkuOriginRepo';
import ShipmentRepo from '../../modules/ShipmentModule/Shipment/Repo/ShipmentRepo';
import ShipmentDocumentRepo from '../../modules/ShipmentModule/ShipmentDocument/Repo/ShipmentDocumentRepo';
import SiteRepo from '../../modules/Site/Repo/SiteRepo';
import AccountRepo from '../../modules/Account/Repo/AccountRepo';
import Database from './Database';
import AutoIncrementerRepo from '../../modules/AutoIncrementer/Repo/AutoIncrementerRepo';

export default class RepoFactory {

    db: Database;
    countryRepo: CountryRepo | null = null;
    notificationRepo: NotificationRepo | null = null;
    productRepo: ProductRepo | null = null;
    skuRepo: SkuRepo | null = null;
    skuOriginRepo: SkuOriginRepo | null = null;
    shipmentRepo: ShipmentRepo | null = null;
    shipmentDocumentRepo: ShipmentDocumentRepo | null = null;
    siteRepo: SiteRepo | null = null;
    accountRepo: AccountRepo | null = null;
    autoIncremeterRepo: AutoIncrementerRepo | null = null;

    constructor(db: Database) {
        this.db = db;
    }

    getCountryRepo(): CountryRepo {
        this.countryRepo = this.countryRepo ?? new CountryRepo(this);
        return this.countryRepo;
    }

    getNotificationRepo(): NotificationRepo {
        this.notificationRepo = this.notificationRepo ?? new NotificationRepo(this);
        return this.notificationRepo;
    }

    getProductRepo(): ProductRepo {
        this.productRepo = this.productRepo ?? new ProductRepo(this);
        return this.productRepo;
    }

    getSkuRepo(): SkuRepo {
        this.skuRepo = this.skuRepo ?? new SkuRepo(this);
        return this.skuRepo;
    }

    getSkuOriginRepo(): SkuOriginRepo {
        this.skuOriginRepo = this.skuOriginRepo ?? new SkuOriginRepo(this);
        return this.skuOriginRepo;
    }

    getShipmentRepo(): ShipmentRepo {
        this.shipmentRepo = this.shipmentRepo ?? new ShipmentRepo(this);
        return this.shipmentRepo;
    }

    getShipmentDocumentRepo(): ShipmentDocumentRepo {
        this.shipmentDocumentRepo = this.shipmentDocumentRepo ?? new ShipmentDocumentRepo(this);
        return this.shipmentDocumentRepo;
    }

    getSiteRepo(): SiteRepo {
        this.siteRepo = this.siteRepo ?? new SiteRepo(this);
        return this.siteRepo;
    }

    getAccountRepo(): AccountRepo {
        this.accountRepo = this.accountRepo ?? new AccountRepo(this);
        return this.accountRepo;
    }

    getAutoIncrementerRepo(): AutoIncrementerRepo {
        this.autoIncremeterRepo = this.autoIncremeterRepo ?? new AutoIncrementerRepo(this);
        return this.autoIncremeterRepo;
    }

}
