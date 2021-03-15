export class FetchAllSitesReq {
}

export class FetchNotificationsByFilterReq {
    notificationReadFilter: number
    from: number
    to: number
}

export class ReadAllNotificationsReq {
}

export class ReadNotificationByIdReq {
    notificationJson: NotificationModel
}
