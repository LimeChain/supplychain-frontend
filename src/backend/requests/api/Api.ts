import Session from '../../utilities/Session';
import Database from '../../utilities/Database';
import Response from '../network-response/Response';
import Payload from '../../utilities/helpers/Payload';
import ServicesFactory from '../../services/common/ServicesFactory';

export default class Api {

    async onRequest(payload: Payload, res: Response, session: Session, db: Database) {
        const servicesFactory = new ServicesFactory(db);
        await this.processRequest(payload, res, session, servicesFactory);
    }

    async processRequest(payload: Payload, res: Response, session: Session, servicesFactory: ServicesFactory) {
    }

}
