import Context from '../utilities/helpers/Context';

export default class GeneralController {

    async login(context: Context) {
        context.res.obj = 2;
    }

}
