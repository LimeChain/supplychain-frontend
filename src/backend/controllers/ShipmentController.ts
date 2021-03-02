
import CreditShipmentReq from '../requests/network/requests/CreditShipmentReq';
import FetchShipmentByIdReq from '../requests/network/requests/FetchShipmentByIdReq';
import FetchShipmentsByFilterReq from '../requests/network/requests/FetchShipmentsByFilterReq';
import CreditShipmentRes from '../requests/network/responses/CreditShipmentRes';
import FetchShipmentsByFilterRes from '../requests/network/responses/FetchShipmentsByFilterRes';
import FetchShipmentsByIdRes from '../requests/network/responses/FetchShipmentsByIdRes';
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

    async fetchShipmentsByFilter(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentsByFilterReq(payload);

        const shipmentService = servicesFactory.getShipmentService();

        const { shipmentModels, totalSize } = await shipmentService.fetchShipmentsByFilter(
            req.filterId,
            req.filterName,
            req.filterStatus,
            req.filterOriginSiteId,
            req.filterDestinationSiteId,
            req.filterDateOfShipment,
            req.filterDateOfArrival,
            req.sortBy,
            req.from,
            req.to
        );

        context.res.set(new FetchShipmentsByFilterRes(shipmentModels, totalSize));

    }

    async fetchShipmentById(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchShipmentByIdReq(payload);
        const shipmentService = servicesFactory.getShipmentService();

        const shipmentModel = await shipmentService.fetchShipmentById(req.shipmentId);

        context.res.set(new FetchShipmentsByIdRes(shipmentModel));

    }
}
