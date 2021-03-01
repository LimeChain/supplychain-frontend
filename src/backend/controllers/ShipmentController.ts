
import CreditShipmentReq from '../requests/network/requests/CreditShipmentReq';
import CreditShipmentRes from '../requests/network/responses/CreditShipmentRes';
import Context from '../utilities/network/Context';

export default class ShipmentController {

    async creditShipment(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditShipmentReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const shipmentModel = await shipmentService.creditShipment(req.shipmentModel, req.skuModels, req.skuOriginModels, req.shipmentDocumentModels);

        context.res.set(new CreditShipmentRes(shipmentModel, [], [], []));
    }

}
