import React, { RefObject } from 'react';
import Config from '../../../../../../builds/dev-generated/Config';
import NotificationModel from '../../../common/js/models/NotificationModel';

import SvgNotificationNone from '../../../common/svg/notification-none.svg';
import SvgNotificationDot from '../../../common/svg/notification-dot.svg';
import SvgNotification from '../../../common/svg/notification.svg';

import './../../css/components-inc/notifications.css';
import Popover from '../../../common/js/components-inc/Popover';
import S from '../../../common/js/utilities/Main';
import ProjectUtils from '../../../common/js/ProjectUtils';
import NotificationStore from '../../../common/js/stores/NotificationStore';
import { inject, observer } from 'mobx-react';
import GeneralApi from '../../../common/js/api/GeneralApi';
import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import NotificationConstsH from '../../../../../../builds/dev-generated/Notification/NotificationModelHConsts';
import ShipmentDocumentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';

interface Props {
    notifications: NotificationModel[];
    show: number,
    hasNotifications: number,
    notificationStore: NotificationStore;
}

interface State {
    show: boolean;
}

const getNotificationStatus = (status: number, capitalLeter: number): string => {
    let result = '';

    switch (status) {
        case ShipmentConstsH.S_STATUS_IN_TRANSIT:
            result = 'sent';
            break;
        case ShipmentConstsH.S_STATUS_RECEIVED:
            result = 'received';
            break;
        default:
            result = 'no info';
            break;
    }

    return capitalLeter ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

class Notifications extends React.Component<Props, State> {

    generalApi: GeneralApi;

    nodes: {
        root: RefObject<HTMLDivElement>,
    };

    constructor(props) {
        super(props);

        this.nodes = {
            'root': React.createRef(),
        };

        this.state = {
            show: false,
        }

        this.generalApi = new GeneralApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);

    }

    onClickNotification = () => {
        this.setState({
            show: !this.state.show,
        });
    }

    notificationScroll = (event) => {
        if (!this.props.notificationStore.hasMore) {
            return;
        }

        const notiBoxDiv = event.target;

        const lastNotiDiv = notiBoxDiv.querySelector('.NotificationMessage:nth-last-child(2)');

        if (notiBoxDiv.scrollTop + notiBoxDiv.offsetHeight + lastNotiDiv.offsetHeight > lastNotiDiv.offsetTop) {
            this.props.notificationStore.fetchMoreNotifications(false);
        }
    }

    render() {
        return (
            <div className={'Notifications'} ref={this.nodes.root}>
                <div className={'NotificationsIcon'} onClick={this.onClickNotification}>
                    <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgNotificationNone }}></div>
                    <div className={`SVG Dot ActiveVisibilityHidden Transition ${S.CSS.getActiveClassName(this.props.notificationStore.screenNotificationModels.length > 0)}`} dangerouslySetInnerHTML={{ __html: SvgNotificationDot }}></div>
                </div>
                <Popover classes={{ root: 'NotificationsPopover' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={this.onClickNotification}
                    open={this.state.show}
                    anchorEl={this.nodes.root.current}>
                    <div className={'NotificationBox'}>
                        <div className={'NotificationsHeader FlexRow'}>
                            Notifications
                            <div className="ReadAllButton">Mark all as read</div>
                        </div>
                        <div className={'NotificationMessageBox FlexColumn'} onScroll={this.notificationScroll}>
                            {this.props.notificationStore.screenNotificationModels.map((notification) => <div className={' NotificationMessage FlexRow '} key={notification.notificationId}>
                                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgNotification }}></div>
                                <div className={'NotificationMessageText '}>
                                    <p>Shipment # {notification.shipmentId}</p> has been {getNotificationStatus(notification.notificationStatus, S.INT_FALSE)}
                                </div>
                                <div className={'NotificationMessageTime '}>
                                    {new Date(notification.notificationTime).formatCalendarDateAndTime()}
                                </div>
                            </div>)}
                            {this.props.notificationStore.hasMore
                                ? <LoadingIndicator className={'LoadingIndicator'} margin={'0'} /> : ''
                            }
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }

}

export default inject('appStore', 'alertStore', 'notificationStore')(observer(Notifications));
