import Database from '../../utilities/database/Database';

export default class ServicesFactory {

    db: Database;

    constructor(db: Database) {
        this.db = db;
    }

}
