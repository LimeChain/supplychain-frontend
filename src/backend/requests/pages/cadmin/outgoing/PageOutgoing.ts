import fs from 'fs';

import PageOutgoingH from './PageOutgoing.h';
import SV from '../../../../utilities/SV';
import Context from '../../../../utilities/helpers/Context';

const Config = require('../../../../../../config/config');

const TEMPLATE = require(PageOutgoingH.TEMPLATE_PATH);

const CSS_PAGE_LOADING = fs.readFileSync(`${Config.Path.Root.Frontend.RESOURCES}/common/css/inline/page-loading.css`);

export default class PageOutgoing extends PageOutgoingH {

    async onRequest(context: Context): Promise < boolean > {
        context.payload.ctx.type = 'html';
        context.payload.ctx.body = TEMPLATE.stream({
            META: {
                TITLE: 'Hedera Admin | Outgoing',
                DESC: '',
                KEYWORDS: SV.KEYWORDS,
                ROBOTS: 'noindex, nofollow',
                PAGE_URL: `${Config.URL.CADMIN}${PageOutgoing.URL}`,
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
