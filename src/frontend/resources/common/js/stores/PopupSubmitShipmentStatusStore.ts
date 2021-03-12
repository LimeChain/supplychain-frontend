import { observable } from 'mobx';
import PopupStore from './PopupStore';

export default class PopupSubmitShipmentStatusStore extends PopupStore {

    static ACTION_NAME_SUBMITTED = 1;
    static ACTION_NAME_RECEIVED = 2;

    @observable action: number = PopupSubmitShipmentStatusStore.ACTION_NAME_SUBMITTED;

    signalShow(action: number) {
        this.action = action;
        this.show();
    }

    getStatusNameString() {
        switch (this.action) {
            case PopupSubmitShipmentStatusStore.ACTION_NAME_RECEIVED:
                return 'received';
            case PopupSubmitShipmentStatusStore.ACTION_NAME_SUBMITTED:
                return 'submitted';
            default:
                return 'n/a';
        }
    }

}
