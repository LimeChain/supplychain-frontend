import Actions from '../../../../../builds/dev-generated/Actions';
import Apis from '../../../../../builds/dev-generated/Apis';
import Params from '../../../../../builds/dev-generated/Params';

export default class CAdminContext {

    static urlShipmentDownloadData(shipmentId: string) {
        return `${Apis.SHIPMENT}?${Params.ACTION}=${Actions.SHIPMENT.DOWNLOAD_SHIPMENT_JSON}&${Params.ID}=${encodeURIComponent(shipmentId)}`;
    }

    static urlShipmentDocumentUploadData(shipmentId: string) {
        return `${Apis.SHIPMENT}?${Params.ACTION}=${Actions.SHIPMENT.UPLOAD_SHIPMENT_DOCUMENT_FILE}&${Params.ID}=${encodeURIComponent(shipmentId)}`;
    }
}
