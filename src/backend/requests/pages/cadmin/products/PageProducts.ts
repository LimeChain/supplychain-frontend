import fs from 'fs';

import PageProductsH from './PageProducts.h';
import SV from '../../../../utilities/SV';
import ServicesFactory from '../../../../services/common/ServicesFactory';
import Session from '../../../../utilities/Session';
import Payload from '../../../../utilities/helpers/Payload';

const Config = require('../../../../../../config/config');

const TEMPLATE = require(PageProductsH.TEMPLATE_PATH);

const CSS_PAGE_LOADING = fs.readFileSync(`${Config.Path.Root.Frontend.RESOURCES}/common/css/inline/page-loading.css`);

export default class PageProducts extends PageProductsH {

    async processRequest(payload: Payload, session: Session, servicesFactory: ServicesFactory) {
        payload.ctx.type = 'html';
        payload.ctx.body = TEMPLATE.stream({
            META: {
                TITLE: 'Hedera Admin | Products',
                DESC: '',
                KEYWORDS: SV.KEYWORDS,
                ROBOTS: 'noindex, nofollow',
                PAGE_URL: `${Config.URL.CADMIN}${PageProducts.URL}`,
            },
            CSS: {
                PAGE_LOADING: CSS_PAGE_LOADING,
            },
            TR: payload.ctx.TR,
            TR_STRING: payload.ctx.TR_STRING,
            Config,
        });

        return true;
    }

}
