import ShipmentController from '../../../controllers/ShipmentController';
import Context from '../../../utilities/network/Context';
import ShipmentApiH from './ShipmentApi.h';

export default class ShipmentApi extends ShipmentApiH {

    shipmentController: ShipmentController;

    constructor() {
        super();
        this.shipmentController = new ShipmentController();
    }

    async processRequest(context: Context) {
        switch (context.payload.action) {
            case ShipmentApiH.Actions.CREDIT:
                await this.shipmentController.creditShipment(context);
                break;
            case ShipmentApiH.Actions.FETCH_SHIPMENTS_BY_FILTER:
                await this.shipmentController.fetchShipmentsByFilter(context);
                break;
            case ShipmentApiH.Actions.FETCH_SHIPMENT_BY_ID:
                await this.shipmentController.fetchShipmentById(context);
                break;
            case ShipmentApiH.Actions.FETCH_SHIPMENT_WHERE_PRODUCT_LEFT_BY_PRODUCT_ID:
                await this.shipmentController.fetchShipmentsWhereProductLeftByProductId(context);
                break;
            case ShipmentApiH.Actions.FETCH_PRODUCTS_IN_STOCK:
                await this.shipmentController.fetchProductsInStock(context);
                break;
            case ShipmentApiH.Actions.DOWNLOAD_SHIPMENT_JSON:
                await this.shipmentController.downloadShipmentJson(context);
                break;
            case ShipmentApiH.Actions.FETCH_TOTAL_VALUE_IN_STOCK:
                await this.shipmentController.fetchTotalValueInStock(context);
                break;
            default:
                break;
        }
    }
}
