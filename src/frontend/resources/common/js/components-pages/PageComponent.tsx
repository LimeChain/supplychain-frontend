import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';

import S from '../utilities/Main';
import AppStore from '../stores/AppStore';
import AlertStore from '../stores/AlertStore';
import ProductStore from '../stores/ProductStore';
import ShipmentStore from '../stores/ShipmentStore';
import ShipmentDocumentStore from '../stores/ShipmentDocumentStore';
import NotificationStore from '../stores/NotificationStore';
import PopupProductStore from '../stores/PopupProductStore';
import SiteStore from '../stores/SiteStore';
import OriginStore from '../stores/OriginStore';
import AccountSessionStore from '../stores/AccountSessionStore';
import PopupShipmentStore from '../stores/PopupShipmentStore';
import SkuStore from '../stores/SkuStore';

import PageLayoutComponent from './PageLayoutComponent';

configure({
    'enforceActions': 'never',
});

export interface PageComponentProps {
    appStore: AppStore,
    alertStore: AlertStore,
}

export default class PageComponent<Pr extends PageComponentProps, St = {}, SS = any> extends React.Component<Pr, St, SS> {

    static layout(componentNode: React.ReactNode) {
        const appStore = new AppStore();
        const alertStore = new AlertStore();
        const prodcutStore = new ProductStore(appStore, alertStore);
        const shipmentStore = new ShipmentStore(appStore, alertStore);
        const skuStore = new SkuStore();

        ReactDOM.render((
            <Provider
                appStore={appStore}
                originStore={new OriginStore()}
                productStore={prodcutStore}
                shipmentStore={shipmentStore}
                skuStore={skuStore}
                siteStore={new SiteStore()}
                notificationStore={new NotificationStore(appStore, alertStore)}
                shipmentDocumentStore={new ShipmentDocumentStore()}
                popupProductStore={new PopupProductStore()}
                popupShipmentStore={new PopupShipmentStore(prodcutStore, shipmentStore)}
                accountSessionStore={new AccountSessionStore()}
                alertStore={alertStore}>

                { componentNode}

            </Provider>
        ), document.querySelector('.ReactEntryPoint'));
    }

    static getStores() {
        return ['appStore', 'alertStore'];
    }

    constructor(props: Pr) {
        super(props);

        // this.props.appStore.incrementLoading();
        initHover();
        initOnBeforeUnload();
    }

    componentDidMount() {
        this.loadData();
        this.removeInitalPageLoading();
    }

    loadData() {
        // return new Promise((resolve, reject) => {
        //     const ajax = new Ajax();

        //     ajax.open(Ajax.GET, `${Config.URL.RESOURCES}/common/fonts/IBMPlexSans-Regular.woff2`, true);
        //     ajax.onResponse = () => {
        //         this.props.appStore.decrementLoading();
        //         resolve();
        //     };
        //     ajax.send();
        // });
    }

    removeInitalPageLoading() {
        const pageLoadingN = document.getElementById('page_loading');
        pageLoadingN?.parentNode?.removeChild(pageLoadingN);
    }

    getPageLayoutComponentCssClassName() {
        return S.Strings.EMPTY;
    }

    render() {
        return (
            <PageLayoutComponent
                className={`${this.getPageLayoutComponentCssClassName()} Transition`}
                popups={this.renderPopups()} >

                { this.renderContent()}

            </PageLayoutComponent>
        );
    }

    renderContent(): React.ReactNode | null {
        return null;
    }

    renderPopups() {
        return [];
    }

}

function initHover() {
    if (navigator.maxTouchPoints === 0 || navigator.msMaxTouchPoints === 0) {
        return;
    }

    let touch = false;
    let timerId: any = null;
    const timerCallback = () => {
        touch = false;
    };

    document.documentElement.addEventListener('mousemove', (e) => {
        if (touch === false) { S.CSS.removeClass(document.documentElement, 'Touchable'); }
    }, true);

    document.documentElement.addEventListener('touchstart', () => {
        touch = true;
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        S.CSS.addClass(document.documentElement, 'Touchable');
    }, true);

    document.documentElement.addEventListener('touchend', () => {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(timerCallback, 256);
    });
}

function initOnBeforeUnload() {
    let loadedFromCache = false;

    window.onbeforeunload = (e: BeforeUnloadEvent) => {
        const defaultReturnValue = e.returnValue;

        if (S.Browser.instance_name === S.Browser.SAFARI) {
            document.body.style.opacity = '0';
        }

        if (loadedFromCache === true) {
            e.returnValue = defaultReturnValue;
            return;
        }

        if (e.returnValue !== defaultReturnValue) {
            setTimeout(() => {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                if (S.Browser.instance_name === S.Browser.SAFARI) {
                                    document.body.style.opacity = '1';
                                }
                            }, 20);
                        }, 20);
                    }, 20);
                }, 20);
            }, 20);
        }
    };
    window.onpageshow = (e: PageTransitionEvent) => {
        loadedFromCache = e.persisted;
        if (e.persisted) {
            window.location.reload();
        }
    };
}
