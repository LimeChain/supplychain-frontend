import Api from '../Api';

const Config = require('../../../../../config/config');

export default class AccountApiH extends Api {

    static URL: string;
    static Actions: any;

}

AccountApiH.URL = `${Config.URL.API}/accounts`;
AccountApiH.Actions = {
    FETCH_SESSION_ACCOUNTS: 'a',
    LOGIN: 'b',
    LOGOUT: 'c',
};
