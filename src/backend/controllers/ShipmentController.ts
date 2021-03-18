import fsPromises from 'fs/promises';
import fs from 'fs';
import Config from '../../../config/config';
import ProductModel from '../modules/ProductModule/Product/Model/ProductModel';
import SkuModel from '../modules/ProductModule/Sku/Model/SkuModel';
import SkuFilter from '../modules/ProductModule/Sku/Utils/SkuFilter';

import ShipmentConstsH from '../modules/ShipmentModule/Shipment/Model/ShipmentModelH';
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

export default class ShipmentController {

    async creditShipment(context: Context) {
        this.checkIfAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditShipmentReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const siteId = await this.getCurrentSiteId(context);

        servicesFactory.db.beginTransaction();

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.creditShipment(siteId, req.shipmentModel, req.skuModels, req.skuOriginModels, req.shipmentDocumentModels);

        servicesFactory.db.commitTransaction();

        context.res.set(new CreditShipmentRes(shipmentModel, skuOriginModels, skuModels, shipmentDocumentModels));
    }

    async fetchShipmentsByFilter(context: Context) {
        this.checkIfAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const shipmentService = servicesFactory.getShipmentService();

        const req = new FetchShipmentsByFilterReq(payload);

        const siteId = await this.getCurrentSiteId(context);

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
        this.checkIfAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentByIdReq(payload);
        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels } = await shipmentService.fetchShipmentById(req.shipmentId);

        context.res.set(new FetchShipmentsByIdRes(shipmentModel, skuModels, skuOriginModels, shipmentDocumentModels));

    }

    async fetchShipmentsWhereProductLeftByProductId(context: Context) {
        this.checkIfAdmin(context);

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const siteId = await this.getCurrentSiteId(context);
        const req = new FetchShipmentsWithProductQuantityLeftByProductIdReq(payload);
        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModels, skuModels } = await shipmentService.fetchShipmentsWhereProductLeftByProductId(req.productId, siteId);

        context.res.set(new FetchShipmentsWithProductQuantityLeftByProductIdRes(skuModels, shipmentModels));

    }

    async fetchProductsInStock(context: Context) {
        this.checkIfAdmin(context);
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const shipmentService = servicesFactory.getShipmentService();

        const siteId = await this.getCurrentSiteId(context);
        const req = new FetchProductsInStockReq(payload);

        const { skuModels, productModels, totalSkuSize } = await shipmentService.fetchProductsInStock(siteId, req.searchBy, req.sortBy, req.from, req.to);
        context.res.set(new FetchProductsInStockRes(skuModels, productModels, totalSkuSize));
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
        payload.ctx.set('Content-Length', (await fsPromises.stat(filepath)).size);

        const stream = fs.createReadStream(filepath, {
            'autoClose': true,
        });
        stream.on('end', () => {
            // fs.unlinkSync(filepath);
        });
        context.res = stream;
    }

    async uploadShipmentDocument(context: Context) {
        this.checkIfAdmin(context);
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const shipmentService = servicesFactory.getShipmentService();

        const req = new UploadShipmentDocumentReq(payload);

        const shipmentDocumentModel = await shipmentService.uploadShipmentDocument(req.shipmentDocumentModel);

        context.res.set(new UploadShipmentDocumentRes(shipmentDocumentModel));
    }

    async downloadShipmentDocumentFile(context: Context) {
        const payload = context.payload;
        console.log(payload);

        console.log(parseInt(payload.params[Params.ID]));

        const shipmentDocumentId = parseInt(payload.params[Params.ID]);

        const servicesFactory = context.servicesFactory;
        const shipmentService = servicesFactory.getShipmentService();

        const shipmentDocumentModel = await shipmentService.fetchShipmentDocumentById(shipmentDocumentId);
        const { shipmentModel } = await shipmentService.fetchShipmentById(shipmentDocumentModel.shipmentId);

        payload.ctx.set('Content-Description', 'File Transfer');
        payload.ctx.set('Content-Type', 'application/octet-stream');
        payload.ctx.set('Content-Disposition', `attachment; filename="${shipmentDocumentModel.name}"`);
        // payload.ctx.set('Content-Disposition: attachment; filename*=UTF-8\'\'' . rawurlencode($filename));
        payload.ctx.set('Content-Transfer-Encoding', 'binary');
        payload.ctx.set('Expires', '0');
        payload.ctx.set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        payload.ctx.set('Pragma', 'public');
        payload.ctx.set('Content-Length', shipmentDocumentModel.sizeInBytes);

        const stream = fs.createReadStream(shipmentModel.getShipmentDocumentStoragePath(shipmentDocumentModel.shipmentDocumentId), {
            'autoClose': true,
        });
        stream.on('end', () => {
            // fs.unlinkSync(filepath);
        });

        context.res = stream;
    }

    async fetchTotalValueInStock(context: Context) {
        this.checkIfAdmin(context);
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;
        const shipmentService = servicesFactory.getShipmentService();

        const siteId = await this.getCurrentSiteId(context);
        const req = new FetchTotalValueInStockReq(payload);

        const { skuModels } = await shipmentService.fetchProductsInStock(siteId, SV.Strings.EMPTY, req.sortBy, req.from, req.to);

        let totalValue = 0;

        skuModels.forEach((s) => { totalValue += s.quantity * s.pricePerUnit });

        context.res.set(new FetchTotalValueInStockRes(totalValue));
    }

    checkIfAdmin(context) {
        const session = context.session;

        if (session.isAdmin() === false) {
            throw new StateException(Response.S_STATUS_ACCESS_DENIED);
        }

    }

    async getCurrentSiteId(context): Promise<number> {
        const accountId = context.session.getAccountId();
        const accountService = context.servicesFactory.getAccountService();
        const siteId = (await accountService.fetchSessionAccounts(accountId)).siteId;

        return siteId;
    }
}
