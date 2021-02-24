import Session from '../../utilities/Session';
import Context from '../../utilities/helpers/Context';

export default class Api {

    async onRequest(context: Context) {
        await this.processRequest(context);
    }

    async processRequest(context: Context) {
    }

}
