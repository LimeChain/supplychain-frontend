export default class NotificationModelH {

    static P_NOTIFICATION_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_NOTIFICATION_STATUS = 3;
    static P_NOTIFICATION_TIME = 4;
    static P_NOTIFICATION_READ = 5;
    static PROPERTIES = [NotificationModelH.P_NOTIFICATION_ID,
        NotificationModelH.P_SHIPMENT_ID,
        NotificationModelH.P_NOTIFICATION_STATUS,
        NotificationModelH.P_NOTIFICATION_TIME,
        NotificationModelH.P_NOTIFICATION_READ];

    notificationId: number;
    shipmentId: number;
    notificationStatus: number;
    notificationTime: number;
    notificationRead: number;

}
