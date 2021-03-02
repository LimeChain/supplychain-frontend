import Payload from '../../../utilities/network/Payload';

export default class FetchNotificationsByFilterReq {

    notificationReadFilter: number;
    from: number;
    to: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.notificationReadFilter = parseInt(json.notificationReadFilter as unknown as string);
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
    }

}
