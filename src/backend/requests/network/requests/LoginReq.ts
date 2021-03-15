import Payload from '../../../utilities/network/Payload';

            
export default class LoginReq {
    
    login: string;
    pass: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.login = json.login.toString();
        this.pass = json.pass.toString();
    }

}