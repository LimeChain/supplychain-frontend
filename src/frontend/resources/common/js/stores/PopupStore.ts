import { makeObservable, observable } from 'mobx';

export default class PopupStore {

    static ACTION_NAME_SUBMITTED = 1;
    static ACTION_NAME_RECEIVED = 2;

    @observable visible: boolean = false;
    action: number = PopupStore.ACTION_NAME_SUBMITTED;

    constructor() {
        makeObservable(this);
        this.hide = this.hide.bind(this);
    }

    hide() {
        this.visible = false;
    }

    show = () => {
        this.visible = true;
    }

    getStatusNameString() {
        switch (this.action) {
            case PopupStore.ACTION_NAME_RECEIVED:
                return 'received';
            case PopupStore.ACTION_NAME_SUBMITTED:
                return 'submitted';
            default:
                return 'n/a';
        }
    }

}
