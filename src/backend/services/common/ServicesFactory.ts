import Database from '../../utilities/database/Database';
import RepoFactory from '../../utilities/database/RepoFactory';
import ProductService from '../ProductService';
import productService from '../ProductService';
import ShipmentService from '../ShipmentService';

export default class ServicesFactory {

    db: Database;
    repoFactory: RepoFactory;

    shipmentService: ShipmentService | null;
    productService: ProductService | null;

    constructor(db: Database) {
        this.db = db;
        this.repoFactory = new RepoFactory(db);

        this.shipmentService = null;
    }

    getShipmentService(): ShipmentService {
        return this.shipmentService ?? new ShipmentService(this);
    }

    getProductService(): ProductService {
        return this.productService ?? new ProductService(this);
    }

}
