import CreditShipmentReq2 from '../requests/network/requests/CreditShipmentReq2';
import CreditShipmentRes from '../requests/network/responses/CreditShipmentRes';
import Context from '../utilities/network/Context';

export default class ShipmentController {

    async example(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new CreditShipmentReq2(payload);

        const shipmentService = servicesFactory.getShipmentService();
        const shipmentModel = await shipmentService.creditShipment(req.shipmentModel);

        context.res.set(new CreditShipmentRes(shipmentModel, [], []));
    }

}
