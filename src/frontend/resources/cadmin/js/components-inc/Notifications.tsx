import React, { RefObject } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';

import NotificationModel from '../../../common/js/models/NotificationModel';
import AppStore from '../../../common/js/stores/AppStore';
import AlertStore from '../../../common/js/stores/AlertStore';
import NotificationStore from '../../../common/js/stores/NotificationStore';
import GeneralApi from '../../../common/js/api/GeneralApi';

import LoadingIndicator from '../../../common/js/components-core/LoadingIndicator';
import Popover from '../../../common/js/components-inc/Popover';

import SvgNotificationNone from '../../../common/svg/notification-none.svg';
import SvgNotificationDot from '../../../common/svg/notification-dot.svg';
import SvgNotification from '../../../common/svg/notification.svg';
import './../../css/components-inc/notifications.css';

import S from '../../../common/js/utilities/Main';
import PopupShipmentStore from '../../../common/js/stores/PopupShipmentStore';
import ShipmentApi from '../../../common/js/api/ShipmentApi';
import ShipmentModel from '../../../common/js/models/shipment-module/ShipmentModel';
import SkuModel from '../../../common/js/models/product-module/SkuModel';
import SkuOriginModel from '../../../common/js/models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../../../common/js/models/shipment-module/ShipmentDocumentModel';

interface Props {
    notifications: NotificationModel[];
    show: number,
    hasNotifications: number,
    notificationStore: NotificationStore,
    popupShipmentStore: PopupShipmentStore,
    appStore: AppStore,
    alertStore: AlertStore,
}

interface State {
    show: boolean;
}

const getNotificationStatus = (status: number, capitalLeter: number): string => {
    let result = '';

    switch (status) {
        case ShipmentConsts.S_STATUS_IN_TRANSIT:
            result = 'sent';
            break;
        case ShipmentConsts.S_STATUS_RECEIVED:
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
    shipmentApi: ShipmentApi;
    notificationFetches: NodeJS.Timeout;

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
        this.shipmentApi = new ShipmentApi(this.props.appStore.enableActions, this.props.appStore.disableActions, this.props.alertStore.show);
    }

    componentDidMount() {
        this.props.notificationStore.fetchMoreNotifications(true);

        this.notificationFetches = setInterval(() => {
            this.props.notificationStore.fetchMoreNotifications(true);
        }, 15 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.notificationFetches);
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

    onclickMarkAllNotificationsRead = () => {
        this.props.notificationStore.readAllNotifications();
    }

    onClickNotificationMessage(notificationModel: NotificationModel) {
        this.shipmentApi.fetchShipmentById(notificationModel.shipmentId, (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => {
            this.props.popupShipmentStore.signalShow(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels, (savedShipmentModel: ShipmentModel) => {
            });
        });

        if (notificationModel.isRead() === true) {
            return;
        }

        this.props.notificationStore.readNotification(notificationModel);

    }

    render() {
        return (
            <div className={'Notifications'} ref={this.nodes.root}>
                <div className={'NotificationsIcon'} onClick={this.onClickNotification}>
                    <div className={'SVG'} dangerouslySetInnerHTML={{ __html: SvgNotificationNone }}></div>
                    <div className={`SVG Dot ActiveVisibilityHidden Transition ${S.CSS.getActiveClassName(this.props.notificationStore.unreadCount > 0)}`} dangerouslySetInnerHTML={{ __html: SvgNotificationDot }}></div>
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
                            {this.props.notificationStore.unreadCount > 0 && (
                                <div className="ReadAllButton" onClick={this.onclickMarkAllNotificationsRead}>Mark all as read</div>
                            )}
                        </div>
                        <div className={'NotificationMessageBox FlexColumn'} onScroll={this.notificationScroll}>
                            {this.props.notificationStore.screenNotificationModels.length > 0 && (
                                <>
                                    {this.props.notificationStore.screenNotificationModels.map((notification) => {
                                        return (
                                            <div
                                                onClick={this.onClickNotificationMessage.bind(this, notification)}
                                                className={`NotificationMessage FlexRow FlexSplit ${S.CSS.getClassName(notification.isRead() === false, 'Unread')}`}
                                                key={notification.notificationId}>
                                                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgNotification }}></div>
                                                <div className={'NotificationMessageText '}>
                                                    <span>Shipment # {notification.shipmentId}</span> has been {getNotificationStatus(notification.notificationStatus, S.INT_FALSE)}
                                                </div>
                                                <div className={'NotificationMessageTime StartRight'}>
                                                    {moment(notification.notificationTime).fromNow(true)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                            {this.props.notificationStore.screenNotificationModels.length === 0 && (
                                <div className={'NotificationMessage NoNotificationMessage FlexRow '}>
                                    There are no notifications
                                </div>
                            )}
                            {this.props.notificationStore.hasMore === true && (
                                <LoadingIndicator className={'LoadingIndicator'} margin={'0'} />
                            )}
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }

}

export default inject('appStore', 'alertStore', 'notificationStore', 'popupShipmentStore')(observer(Notifications));
