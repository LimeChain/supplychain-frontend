import Database from '../../utilities/Database';

export default class ServicesFactory {

    db: Database;

    constructor(db: Database) {
        this.db = db;
    }

}
