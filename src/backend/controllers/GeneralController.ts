import Payload from '../utilities/helpers/Payload';
import Response from '../requests/network-response/Response';
import Session from '../utilities/Session';
import ServicesFactory from '../services/common/ServicesFactory';
import Context from '../utilities/helpers/Context';

export default class GeneralController {

    async login(context: Context) {
        context.res.obj = 2;
    }

}
