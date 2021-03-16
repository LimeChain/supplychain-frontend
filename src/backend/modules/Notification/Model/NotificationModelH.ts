
            
export default class NotificationModelH {



    static P_NOTIFICATION_ID = 1;
    static P_SHIPMENT_ID = 2;
    static P_NOTIFICATION_READ = 3;
    static P_NOTIFICATION_TIME = 4;
    static P_NOTIFICATION_STATUS = 5;
    static PROPERTIES = [NotificationModelH.P_NOTIFICATION_ID,
        NotificationModelH.P_SHIPMENT_ID,
        NotificationModelH.P_NOTIFICATION_READ,
        NotificationModelH.P_NOTIFICATION_TIME,
        NotificationModelH.P_NOTIFICATION_STATUS];

    notificationId: number;
    shipmentId: number;
    notificationRead: number;
    notificationTime: number;
    notificationStatus: number;

}
