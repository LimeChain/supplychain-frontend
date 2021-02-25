import Database from '../../utilities/database/Database';
import RepoFactory from '../../utilities/database/RepoFactory';
import ShipmentService from '../ShipmentService';

export default class ServicesFactory {

    db: Database;
    repoFactory: RepoFactory;

    shipmentService: ShipmentService | null;

    constructor(db: Database) {
        this.db = db;
        this.repoFactory = new RepoFactory(db);

        this.shipmentService = null;
    }

    getShipmentService(): ShipmentService {
        return this.shipmentService ?? new ShipmentService(this);
    }

}
