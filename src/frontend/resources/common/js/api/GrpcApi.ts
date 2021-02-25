import Api from '../utilities/Api';
import Apis from '../../../../../../builds/dev-generated/Apis';
import Actions from '../../../../../../builds/dev-generated/Actions';
import AbsApi from './AbsApi';

export default class GrpcApi extends AbsApi {

    grpcText() {
        const api = new Api(Apis.GENERAL, this.enableActions, this.disableActions);

        api.req(Actions.GENERAL.GRPCTEST, { 'something': '2' }, (json: any) => {
            console.log(json);
        }, Api.TYPE_JSON);
    }
}
