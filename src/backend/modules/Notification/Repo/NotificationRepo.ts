import { count } from 'console';
import SV from '../../../utilities/SV';
import NotificationModel from '../Model/NotificationModel';
import NotificationModelH from '../Model/NotificationModelH';
import NotificationRepoG from './NotificationRepoG';
import NotificationRepoH from './NotificationRepoH';

export default class NotificationRepo extends NotificationRepoG {

    async readAllNotifications() {
        await this.db.query(`UPDATE ${NotificationRepoH.TABLE_NAME} SET ${NotificationRepoH.C_NOTIFICATION_READ}=${SV.TRUE}`)
    }

}
