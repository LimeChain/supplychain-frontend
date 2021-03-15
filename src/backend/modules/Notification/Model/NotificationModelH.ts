
            
export default class NotificationModelH {



    static P_NOTIFICATION_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_NOTIFICATION_TIME = 3;
    static P_NOTIFICATION_READ = 4;
    static PROPERTIES = [NotificationModelH.P_NOTIFICATION_ID,
        NotificationModelH.P_SHIPMENT_ID,
        NotificationModelH.P_NOTIFICATION_TIME,
        NotificationModelH.P_NOTIFICATION_READ];

    notificationId: number;
    shipmentId: number;
    notificationTime: number;
    notificationRead: number;

}
