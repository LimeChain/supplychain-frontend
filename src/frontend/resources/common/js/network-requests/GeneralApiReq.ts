import NotificationModel from '../models/NotificationModel';

export class FetchAllSitesReq {
    constructor() {
    }
}

export class FetchNotificationsByFilterReq {
    notificationReadFilter: number
    from: number
    to: number

    constructor(notificationRead: number, from: number, to: number) {
        this.notificationReadFilter = notificationRead;
        this.from = from;
        this.to = to;
    }
}

export class ReadAllNotificationsReq {

    constructor() {
    }
}

export class ReadNotificationByIdReq {
    notificationId: string

    constructor(notificationId: string) {
        this.notificationId = notificationId;
    }
}
