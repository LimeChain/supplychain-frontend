export default class NotificationRepoH {

    static TABLE_NAME = 'notifications';
    static C_NOTIFICATION_ID = 'notificationId';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_NOTIFICATION_READ = 'notificationRead';
    static C_NOTIFICATION_TIME = 'notificationTime';
    static C_NOTIFICATION_READ = 'notificationRead';
        
    notificationId: number | null;
    notificationIdToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    notificationRead: number | null;
    notificationReadToDb: boolean;
    notificationTime: number | null;
    notificationTimeToDb: boolean;
    notificationRead: number | null;
    notificationReadToDb: boolean;
    
    constructor() {
        this.notificationId = null;
        this.notificationIdToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
        this.notificationRead = null;
        this.notificationReadToDb = false;
        this.notificationTime = null;
        this.notificationTimeToDb = false;
        this.notificationRead = null;
        this.notificationReadToDb = false;
    }
    
    static instanceByDbRow(row): NotificationRepoH {
        const repo = new NotificationRepoH();
    
        repo.notificationId = row[NotificationRepoH.C_NOTIFICATION_ID] ?? repo.notificationId;
        repo.shipmentId = row[NotificationRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.notificationRead = row[NotificationRepoH.C_NOTIFICATION_READ] ?? repo.notificationRead;
        repo.notificationTime = row[NotificationRepoH.C_NOTIFICATION_TIME] ?? repo.notificationTime;
        repo.notificationRead = row[NotificationRepoH.C_NOTIFICATION_READ] ?? repo.notificationRead;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.notificationId;
    }

    setPrimaryValue(value: number): void {
        this.notificationId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.shipmentIdToDb === true) {
            columns.push(NotificationRepoH.C_SHIPMENT_ID);
            values.push(this.shipmentId === null ? null : this.shipmentId.toString());
        }

        if (this.notificationReadToDb === true) {
            columns.push(NotificationRepoH.C_NOTIFICATION_READ);
            values.push(this.notificationRead === null ? null : this.notificationRead.toString());
        }

        if (this.notificationTimeToDb === true) {
            columns.push(NotificationRepoH.C_NOTIFICATION_TIME);
            values.push(this.notificationTime === null ? null : this.notificationTime.toString());
        }

        if (this.notificationReadToDb === true) {
            columns.push(NotificationRepoH.C_NOTIFICATION_READ);
            values.push(this.notificationRead === null ? null : this.notificationRead.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [NotificationRepoH.C_NOTIFICATION_ID, this.notificationId];
    }

}
