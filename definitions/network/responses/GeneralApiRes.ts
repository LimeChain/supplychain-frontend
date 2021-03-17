export class FetchAllSitesRes {

    siteModels: Array<SiteModel>
    countryModels: Array<CountryModel>

}

export class FetchNotificationsByFilterRes {

    notificationModels: Array<NotificationModel>;
    totalSize: number;
    unreadCount: number;

}

export class ReadAllNotificationsRes {

}

export class ReadNotificationByIdRes {

    notificationModel: NotificationModel

}
