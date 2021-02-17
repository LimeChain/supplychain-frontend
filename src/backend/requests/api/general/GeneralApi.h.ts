import GrpcApi from '../../../../frontend/resources/common/js/api/GrpcApi';
import Api from '../Api';

const Config = require('../../../../../config/config');

export default class GeneralApiH extends Api {

    static URL: string;
    static Actions: any;

}

GeneralApiH.URL = `${Config.URL.API}/accounts`;
GeneralApiH.Actions = {
    LOGIN: 'a',
    GRPCTEST: 't',
};

