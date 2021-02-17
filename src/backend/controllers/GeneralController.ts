import Payload from '../utilities/helpers/Payload';
import Response from '../requests/network-response/Response';
import Session from '../utilities/Session';
import ServicesFactory from '../services/common/ServicesFactory';

export default class GeneralController {
    async login(payload: Payload, res: Response, session: Session, servicesFactory: ServicesFactory) {
        res.obj = 2;
    }
}
