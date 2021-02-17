import Payload from '../../utilities/helpers/Payload';
import Session from '../../utilities/Session';
import Database from '../../utilities/Database';
import ServicesFactory from '../../services/common/ServicesFactory';

export default class Page {

    async onRequest(payload: Payload, session: Session, db: Database) {
        const servicesFactory = new ServicesFactory(db);
        await this.processRequest(payload, session, servicesFactory);
    }

    async processRequest(payload: Payload, session: Session, servicesFactory: ServicesFactory): Promise < boolean > {
        return false;
    }

}
