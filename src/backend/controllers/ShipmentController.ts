import fs from 'fs';
import Config from '../../../config/config';

import ShipmentConstsH from '../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
import CreditShipmentReq from '../requests/network/requests/CreditShipmentReq';
import FetchShipmentByIdReq from '../requests/network/requests/FetchShipmentByIdReq';
import FetchShipmentsByFilterReq from '../requests/network/requests/FetchShipmentsByFilterReq';
import FetchShipmentsWithProductQuantityLeftByProductIdReq from '../requests/network/requests/FetchShipmentsWithProductQuantityLeftByProductIdReq';
import CreditShipmentRes from '../requests/network/responses/CreditShipmentRes';
import FetchShipmentsByFilterRes from '../requests/network/responses/FetchShipmentsByFilterRes';
import FetchShipmentsByIdRes from '../requests/network/responses/FetchShipmentsByIdRes';
import FetchShipmentsWithProductQuantityLeftByProductIdRes from '../requests/network/responses/FetchShipmentsWithProductQuantityLeftByProductIdRes';
import Context from '../utilities/network/Context';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Params from '../utilities/Params';

export default class ShipmentController {

    async creditShipment(context: Context) {
        const session = context.session;

        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const accountId = session.getAccountId();

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditShipmentReq(payload);

        const shipmentService = servicesFactory.getShipmentService();
        const accountService = servicesFactory.getAccountService();

        const siteId = (await accountService.fetchSessionAccounts(accountId)).siteId;

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.creditShipment(siteId, req.shipmentModel, req.skuModels, req.skuOriginModels, req.shipmentDocumentModels);

        context.res.set(new CreditShipmentRes(shipmentModel, [], [], []));
    }

    async fetchShipmentsByFilter(context: Context) {
        const session = context.session;

        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const accountId = session.getAccountId();

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentsByFilterReq(payload);

        const shipmentService = servicesFactory.getShipmentService();
        const accountService = servicesFactory.getAccountService();

        const siteId = (await accountService.fetchSessionAccounts(accountId)).siteId;

        const { shipmentModels, totalSize } = await shipmentService.fetchShipmentsByFilter(
            siteId,
            req.page,
            req.searchBy,
            req.sortBy,
            req.from,
            req.to,
        );

        context.res.set(new FetchShipmentsByFilterRes(shipmentModels, totalSize));

    }

    async fetchShipmentById(context: Context) {
        const session = context.session;

        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const accountId = session.getAccountId();

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentByIdReq(payload);
        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.fetchShipmentById(req.shipmentId);

        context.res.set(new FetchShipmentsByIdRes(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels));

    }

    async fetchShipmentsWhereProductLeftByProductId(context: Context) {
        const session = context.session;

        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

        const accountId = session.getAccountId();
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const accountService = servicesFactory.getAccountService();

        const siteId = (await accountService.fetchSessionAccounts(accountId)).siteId;
        const req = new FetchShipmentsWithProductQuantityLeftByProductIdReq(payload);
        const shipmentService = servicesFactory.getShipmentService();

        const { skuModels, productModels } = await shipmentService.fetchSkusInStock(siteId, '');

        // const { shipmentModels, skuModels } = await shipmentService.fetchShipmentsWhereProductLeftByProductId(req.productId);

        // context.res.set(new FetchShipmentsWithProductQuantityLeftByProductIdRes(skuModels, shipmentModels));

    }

    async downloadShipmentJson(context: Context) {
        const payload = context.payload;
        const shipmentId = payload.params[Params.ID];

        const filepath = `${__dirname}/ShipmentController.js`;
        payload.ctx.set('Content-Description', 'File Transfer');
        payload.ctx.set('Content-Type', 'application/octet-stream');
        payload.ctx.set('Content-Disposition', `attachment; filename="shipment-${shipmentId}.json"`);
        // payload.ctx.set('Content-Disposition: attachment; filename*=UTF-8\'\'' . rawurlencode($filename));
        payload.ctx.set('Content-Transfer-Encoding', 'binary');
        payload.ctx.set('Expires', '0');
        payload.ctx.set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        payload.ctx.set('Pragma', 'public');
        payload.ctx.set('Content-Length', fs.statSync(filepath).size);

        const stream = fs.createReadStream(filepath, {
            'autoClose': true,
        });
        stream.on('end', () => {
            // fs.unlinkSync(filepath);
        });
        context.res = stream;
    }
}
