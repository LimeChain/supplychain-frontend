import Context from '../utilities/network/Context';
import INCreditProductReq from '../requests/network/requests/INCreditProductReq';
import INDltShipmentReq from '../requests/network/requests/INDltShipmentReq';
import INCreditShipmentReq from '../requests/network/requests/INCreditShipmentReq';

export default class IntegrationNodeController {

    async creditShipment(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new INCreditShipmentReq(payload);

        const integrationNodeService = servicesFactory.getIntegrationNodeService();

        servicesFactory.db.beginTransaction();
        await integrationNodeService.creditShipment(req.shipmentModel, req.skuModels, req.skuOriginModels, req.shipmentDocumentModels);
        servicesFactory.db.commitTransaction();
    }

    async creditProduct(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new INCreditProductReq(payload);

        const integrationNodeService = servicesFactory.getIntegrationNodeService();

        servicesFactory.db.beginTransaction();
        await integrationNodeService.creditProduct(req.productModel);
        servicesFactory.db.commitTransaction();
    }

    async dltShipment(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new INDltShipmentReq(payload);

        const integrationNodeService = servicesFactory.getIntegrationNodeService();

        servicesFactory.db.beginTransaction();
        await integrationNodeService.dlt(req.shipmentId, req.dlt);
        servicesFactory.db.commitTransaction();
    }

}
