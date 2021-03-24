import fs from 'fs';
import CreditShipmentReq from '../requests/network/requests/CreditShipmentReq';
import FetchProductsInStockReq from '../requests/network/requests/FetchProductsInStockReq';
import FetchShipmentByIdReq from '../requests/network/requests/FetchShipmentByIdReq';
import FetchShipmentsByFilterReq from '../requests/network/requests/FetchShipmentsByFilterReq';
import FetchShipmentsWithProductQuantityLeftByProductIdReq from '../requests/network/requests/FetchShipmentsWithProductQuantityLeftByProductIdReq';
import FetchTotalValueInStockReq from '../requests/network/requests/FetchTotalValueInStockReq';
import CreditShipmentRes from '../requests/network/responses/CreditShipmentRes';
import FetchProductsInStockRes from '../requests/network/responses/FetchProductsInStockRes';
import FetchShipmentsByFilterRes from '../requests/network/responses/FetchShipmentsByFilterRes';
import FetchShipmentsByIdRes from '../requests/network/responses/FetchShipmentsByIdRes';
import FetchShipmentsWithProductQuantityLeftByProductIdRes from '../requests/network/responses/FetchShipmentsWithProductQuantityLeftByProductIdRes';
import FetchTotalValueInStockRes from '../requests/network/responses/FetchTotalValueInStockRes';
import Context from '../utilities/network/Context';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Params from '../utilities/Params';
import SV from '../utilities/SV';
import UploadShipmentDocumentReq from '../requests/network/requests/UploadShipmentDocumentReq';
import UploadShipmentDocumentRes from '../requests/network/responses/UploadShipmentDocumentRes';
import ShipmentService from '../services/ShipmentService';
import IntegrationNodeTransferModel from '../modules/IntegratonNode/IntegrationNodeTransferModel';

export default class ShipmentController {

    async creditShipment(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const session = context.session;
        const siteId = session.getSiteId();

        const req = new CreditShipmentReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        servicesFactory.db.beginTransaction();
        await servicesFactory.repoFactory.aquireAutoIncrementer();

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.creditShipment(siteId, req.shipmentModel, req.skuModels, req.skuOriginModels, req.shipmentDocumentModels);

        await servicesFactory.repoFactory.saveAutoIncrementer();
        servicesFactory.db.commitTransaction();

        context.res.set(new CreditShipmentRes(shipmentModel, skuOriginModels, skuModels, shipmentDocumentModels));
    }

    async fetchShipmentsByFilter(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const session = context.session;
        const siteId = session.getSiteId();

        const req = new FetchShipmentsByFilterReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModels, totalSize } = await shipmentService.fetchShipmentsByFilter(siteId, req.page, req.searchBy, req.sortBy, req.from, req.to);

        context.res.set(new FetchShipmentsByFilterRes(shipmentModels, totalSize));
    }

    async fetchShipmentById(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentByIdReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.fetchShipmentById(req.shipmentId);

        context.res.set(new FetchShipmentsByIdRes(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels));
    }

    async fetchShipmentsWhereProductLeftByProductId(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const session = context.session;
        const siteId = session.getSiteId();

        const req = new FetchShipmentsWithProductQuantityLeftByProductIdReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModels, skuModels } = await shipmentService.fetchShipmentsWhereProductLeftByProductId(req.productId, siteId);

        context.res.set(new FetchShipmentsWithProductQuantityLeftByProductIdRes(skuModels, shipmentModels));
    }

    async fetchProductsInStock(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const session = context.session;
        const siteId = session.getSiteId();

        const req = new FetchProductsInStockReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { skuModels, productModels, totalSkuSize } = await shipmentService.fetchProductsInStock(siteId, req.searchBy, req.sortBy, req.from, req.to);

        context.res.set(new FetchProductsInStockRes(skuModels, productModels, totalSkuSize));
    }

    async fetchTotalValueInStock(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const session = context.session;
        const siteId = session.getSiteId();

        const req = new FetchTotalValueInStockReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { skuModels } = await shipmentService.fetchProductsInStock(siteId, SV.Strings.EMPTY, req.sortBy, req.from, req.to);

        let totalValue = 0;
        skuModels.forEach((s) => { totalValue += s.quantity * s.pricePerUnit });

        context.res.set(new FetchTotalValueInStockRes(totalValue));
    }

    async downloadShipmentJson(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const shipmentService = servicesFactory.getShipmentService();
        const shipmentId = payload.params[Params.ID];

        const content = await shipmentService.downloadShipmentJson(shipmentId);

        // const filepath = `${__dirname}/ShipmentController.js`;
        payload.ctx.set('Content-Description', 'File Transfer');
        payload.ctx.set('Content-Type', 'application/octet-stream');
        payload.ctx.set('Content-Disposition', `attachment; filename="shipment-${shipmentId}.json"`);
        // payload.ctx.set('Content-Disposition: attachment; filename*=UTF-8\'\'' . rawurlencode($filename));
        payload.ctx.set('Content-Transfer-Encoding', 'binary');
        payload.ctx.set('Expires', '0');
        payload.ctx.set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        payload.ctx.set('Pragma', 'public');
        // payload.ctx.set('Content-Length', (await fsPromises.stat(filepath)).size);
        payload.ctx.set('Content-Length', content.length);

        // const stream = fs.createReadStream(filepath, {
        //     'autoClose': true,
        // });
        // stream.on('end', () => {
        //     // fs.unlinkSync(filepath);
        // });
        // context.res = stream;
        context.res = content;
    }

    async downloadShipmentDocumentFile(context: Context) {
        const payload = context.payload;
        const servicesFactory = context.servicesFactory;

        const shipmentDocumentId = parseInt(payload.params[Params.ID]);

        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModel, shipmentDocumentModel } = await shipmentService.downloadShipmentDocumentFile(shipmentDocumentId);

        payload.ctx.set('Content-Description', 'File Transfer');
        payload.ctx.set('Content-Type', 'application/octet-stream');
        payload.ctx.set('Content-Disposition', `attachment; filename="${shipmentDocumentModel.name}"`);
        payload.ctx.set('Content-Transfer-Encoding', 'binary');
        payload.ctx.set('Expires', '0');
        payload.ctx.set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        payload.ctx.set('Pragma', 'public');
        payload.ctx.set('Content-Length', shipmentDocumentModel.sizeInBytes);

        const stream = fs.createReadStream(shipmentModel.getShipmentDocumentStoragePath(shipmentDocumentModel.shipmentDocumentId), {
            'autoClose': true,
        });
        context.res = stream;
    }

    async uploadShipmentDocument(context: Context) {
        ShipmentController.validateAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new UploadShipmentDocumentReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        servicesFactory.db.beginTransaction();
        await servicesFactory.repoFactory.aquireAutoIncrementer();

        const shipmentDocumentModel = await shipmentService.uploadShipmentDocument(req.shipmentDocumentModel);

        await servicesFactory.repoFactory.saveAutoIncrementer();
        servicesFactory.db.commitTransaction();

        context.res.set(new UploadShipmentDocumentRes(shipmentDocumentModel));
    }

    static validateAdmin(context) {
        const session = context.session;
        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

    }

}
