import fs from 'fs';

import PageProductsH from './PageProducts.h';
import SV from '../../../../utilities/SV';
import Context from '../../../../utilities/network/Context';

const Config = require('../../../../../../config/config');

const TEMPLATE = require(PageProductsH.TEMPLATE_PATH);

const CSS_PAGE_LOADING = fs.readFileSync(`${Config.Path.Root.Frontend.RESOURCES}/common/css/inline/page-loading.css`);

export default class PageProducts extends PageProductsH {

    async onRequest(context: Context): Promise < boolean > {
        context.payload.ctx.type = 'html';
        context.payload.ctx.body = TEMPLATE.stream({
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
            TR: context.payload.ctx.TR,
            TR_STRING: context.payload.ctx.TR_STRING,
            Config,
        });

        return true;
    }

}
