import React, { RefObject } from 'react';
import Config from '../../../../../../builds/dev-generated/Config';
import NotificationModel from '../../../common/js/models/NotificationModel';
import NotificationStatusModelH from "../../../../../backend/modules/product-group-module/shipment-module/NotificationStatusModel.h";

import SvgNotificationNone from '../../../common/svg/notification-none.svg';
import SvgNotificationDot from '../../../common/svg/notification-dot.svg';


import './../../css/components-inc/notifications.css';
import Popover from '../../../common/js/components-inc/Popover';
import S from '../../../common/js/utilities/Main';
import ProjectUtils from '../../../common/js/ProjectUtils';

interface Props {
    notifications: NotificationModel[];
    show: number,
    hasNotifications: number,
}

interface State {
    show: boolean;
}

let getNotificationStatus = (status: number, capitalLeter: number): string => {
    let result = '';
    
    switch(status){
        case NotificationStatusModelH.S_NOTIFICATION_SENT:
            result = 'sent';
            break;
        case NotificationStatusModelH.S_NOTIFICATION_RECEIVED:
            result = 'received';
            break;
    }

    return capitalLeter ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

export default class Notifications extends React.Component < Props, State > {

    nodes: {
        root: RefObject < HTMLDivElement >,
    };

    constructor(props) {
        super(props);

        this.nodes = {
            'root': React.createRef(),
        };

        this.state = {
            show: false,
        }
    }

    onClickNotification = () => {   
        this.setState({
            show: !this.state.show,
        });
    }

    render() {
        return (
            <div className = {` Notifications `} ref = { this.nodes.root } >
                <div className = {` NotificationsIcon`} onClick = {this.onClickNotification}>
                    <div className = { `SVG Icon` } dangerouslySetInnerHTML = {{ __html: SvgNotificationNone }}></div>
                    <div className = { `SVG Dot ActiveVisibilityHidden Transition ${S.CSS.getActiveClassName(this.props.notifications.length > 0)}` } dangerouslySetInnerHTML = {{ __html: SvgNotificationDot }}></div>
                </div> 
                <Popover classes={{ root: 'NotificationsPopover'}} 
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                    transformOrigin={{vertical: 'top',horizontal: 'right',}}
                    onClose = {this.onClickNotification} 
                    open = {this.state.show} 
                    anchorEl = { this.nodes.root.current }>
                    <div className = {` NotificationBox `}>
                        <div className = {` NotificationsHeader `}>
                            Notifications
                            <div className = {` NotificationsHeaderMenu `}>
                                ...
                            </div>
                        </div>
                        <div>
                        {this.props.notifications.map(notification => 
                            <div className = {` NotificationMessage FlexRow `} key = {notification.notificationId}>
                                <div className = {` NotificationLogo ImgCoverNode`} style = {ProjectUtils.makeBgImgStyle(`${Config.URL.Resources.Common.IMG}/logo.png`)}/>
                                <div className = {` NotificationMessageInfo FlexColumnt `}>
                                    <div className = {` NotificationMessageHeader`}>
                                        Goods {getNotificationStatus(notification.notificationStatus, S.INT_TRUE)}
                                    </div>
                                    <div className = {` NotificationMessageText `}>
                                        Shipment # {notification.shipmentId} has been {getNotificationStatus(notification.notificationStatus, S.INT_FALSE)}
                                    </div>
                                </div>
                                <div className = {` NotificationMessageTime `}>
                                    {new Date(notification.notificationTime).formatCalendarDateAndTime()}
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }

}
