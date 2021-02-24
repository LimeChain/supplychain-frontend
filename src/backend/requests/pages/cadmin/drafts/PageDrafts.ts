import fs from 'fs';

import PageDraftsH from './PageDrafts.h';
import SV from '../../../../utilities/SV';
import ServicesFactory from '../../../../services/common/ServicesFactory';
import Session from '../../../../utilities/Session';
import Payload from '../../../../utilities/helpers/Payload';
import Context from '../../../../utilities/helpers/Context';

const Config = require('../../../../../../config/config');

const TEMPLATE = require(PageDraftsH.TEMPLATE_PATH);

const CSS_PAGE_LOADING = fs.readFileSync(`${Config.Path.Root.Frontend.RESOURCES}/common/css/inline/page-loading.css`);

export default class PageDrafts extends PageDraftsH {

    async onRequest(context: Context): Promise < boolean > {
        context.payload.ctx.type = 'html';
        context.payload.ctx.body = TEMPLATE.stream({
            META: {
                TITLE: 'Hedera Admin | Drafts',
                DESC: '',
                KEYWORDS: SV.KEYWORDS,
                ROBOTS: 'noindex, nofollow',
                PAGE_URL: `${Config.URL.CADMIN}${PageDrafts.URL}`,
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
