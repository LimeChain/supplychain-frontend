import Database from '../../utilities/database/Database';
import RepoFactory from '../../utilities/database/RepoFactory';
import AccountService from '../AccountService';
import GeneralService from '../GeneralService';
import IntegrationNodeService from '../IntegrationNodeService';
import NotificationService from '../NotificationService';
import ProductService from '../ProductService';
import productService from '../ProductService';
import ShipmentService from '../ShipmentService';

export default class ServicesFactory {

    db: Database;
    repoFactory: RepoFactory;

    generalService: GeneralService | null;
    accountService: AccountService | null;
    shipmentService: ShipmentService | null;
    productService: ProductService | null;
    notificationService: NotificationService | null;
    integrationNodeService: IntegrationNodeService | null;

    constructor(db: Database) {
        this.db = db;
        this.repoFactory = new RepoFactory(db);

        this.generalService = null;
        this.accountService = null;
        this.shipmentService = null;
    }

    getGeneralService(): GeneralService {
        this.generalService = this.generalService ?? new GeneralService(this);
        return this.generalService;
    }

    getAccountService(): AccountService {
        this.accountService = this.accountService ?? new AccountService(this);
        return this.accountService;
    }

    getShipmentService(): ShipmentService {
        return this.shipmentService ?? new ShipmentService(this);
    }

    getProductService(): ProductService {
        return this.productService ?? new ProductService(this);
    }

    getNotificationService(): NotificationService {
        return this.notificationService ?? new NotificationService(this);
    }

    getIntegrationNodeService(): IntegrationNodeService {
        return this.integrationNodeService ?? new IntegrationNodeService(this);
    }

}
