import NotificationModel from './NotificationModel';
import NotificationModelH from './NotificationModelH';
import NotificationRepoH from '../Repo/NotificationRepoH';
import SV from '../../../utilities/SV';


export default class NotificationModelG extends NotificationModelH {

    constructor() {
        super();
        this.notificationId = SV.NOT_EXISTS;
        this.shipmentId = SV.NOT_EXISTS;
        this.notificationRead = SV.NOT_EXISTS;
        this.notificationTime = SV.NOT_EXISTS;
        this.notificationRead = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: NotificationModel): void {

    }

    static asMap(models: NotificationModel[]): Map < any, NotificationModel > {
        const map = new Map < any, NotificationModel >();

        models.forEach((m) => {
            map.set(m.notificationId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): NotificationRepoH {
        const map = NotificationModelG.getPropsAsMap(props);

        const repo = new NotificationRepoH();

        if (map.has(NotificationModelH.P_NOTIFICATION_ID) === true && this.notificationId !== undefined) {
            repo.notificationId = this.notificationId;
            repo.notificationIdToDb = true;
        }
        if (map.has(NotificationModelH.P_SHIPMENT_ID) === true && this.shipmentId !== undefined) {
            repo.shipmentId = this.shipmentId;
            repo.shipmentIdToDb = true;
        }
        if (map.has(NotificationModelH.P_NOTIFICATION_READ) === true && this.notificationRead !== undefined) {
            repo.notificationRead = this.notificationRead;
            repo.notificationReadToDb = true;
        }
        if (map.has(NotificationModelH.P_NOTIFICATION_TIME) === true && this.notificationTime !== undefined) {
            repo.notificationTime = this.notificationTime;
            repo.notificationTimeToDb = true;
        }
        if (map.has(NotificationModelH.P_NOTIFICATION_READ) === true && this.notificationRead !== undefined) {
            repo.notificationRead = this.notificationRead;
            repo.notificationReadToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: NotificationRepoH): NotificationModel {
        const model = new NotificationModel();

        model.notificationId = parseInt((repo.notificationId ?? model.notificationId) as unknown as string);
        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);
        model.notificationRead = parseInt((repo.notificationRead ?? model.notificationRead) as unknown as string);
        model.notificationTime = parseInt((repo.notificationTime ?? model.notificationTime) as unknown as string);
        model.notificationRead = parseInt((repo.notificationRead ?? model.notificationRead) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            notificationId: this.notificationId,
            shipmentId: this.shipmentId,
            notificationRead: this.notificationRead,
            notificationTime: this.notificationTime,
            notificationRead: this.notificationRead,
        };
    }

    static fromNetwork(json: any): NotificationModel {
        if (json === null) {
            return null;
        }

        const model = new NotificationModel();
        
        model.notificationId = parseInt(json.notificationId ?? model.notificationId);
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.notificationRead = parseInt(json.notificationRead ?? model.notificationRead);
        model.notificationTime = parseInt(json.notificationTime ?? model.notificationTime);
        model.notificationRead = parseInt(json.notificationRead ?? model.notificationRead);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case NotificationModelH.P_NOTIFICATION_ID:
                return NotificationRepoH.C_NOTIFICATION_ID;
            case NotificationModelH.P_SHIPMENT_ID:
                return NotificationRepoH.C_SHIPMENT_ID;
            case NotificationModelH.P_NOTIFICATION_READ:
                return NotificationRepoH.C_NOTIFICATION_READ;
            case NotificationModelH.P_NOTIFICATION_TIME:
                return NotificationRepoH.C_NOTIFICATION_TIME;
            case NotificationModelH.P_NOTIFICATION_READ:
                return NotificationRepoH.C_NOTIFICATION_READ;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? NotificationModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
