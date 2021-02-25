import ShipmentModel from '../modules/ShipmentModule/Shipment/Model/ShipmentModel';
import Response from '../utilities/network/Response';
import StateException from '../utilities/network/StateException';
import Service from './common/Service';

export default class ShipmentService extends Service {

    async creditShipment(reqShipmentModel: ShipmentModel): Promise < ShipmentModel > {
        const shipmentRepo = this.repoFactory.getShipmentRepo();

        let shipmentModel: ShipmentModel | null = null;
        if (reqShipmentModel.isNew() === true) {
            shipmentModel = new ShipmentModel();
            // if there is some specific fields that must be set just on creation, e.g. -> creation timestamp
        } else {
            shipmentModel = await shipmentRepo.fetchByPrimaryValue(reqShipmentModel.shipmentId);
            if (shipmentModel === null) {
                throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
            }
        }

        shipmentModel.shipmentName = reqShipmentModel.shipmentName;
        shipmentModel.shipmentId = (await shipmentRepo.save(shipmentModel)).shipmentId;

        return shipmentModel;
    }

}
