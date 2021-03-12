import { makeObservable, observable } from 'mobx';

export default class PopupStore {

    @observable visible: boolean = false;

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

}
