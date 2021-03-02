import Payload from '../../../utilities/network/Payload';

export default class FetchShipmentsByFilterReq {

    filterId: number;
    filterName: string;
    filterStatus: number;
    filterOriginSiteId: number;
    filterDestinationSiteId: number;
    filterDateOfShipment: number;
    filterDateOfArrival: number;
    sortBy: number;
    from: number;
    to: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.filterId = parseInt(json.filterId as unknown as string);
        this.filterName = json.filterName.toString();
        this.filterStatus = parseInt(json.filterStatus as unknown as string);
        this.filterOriginSiteId = parseInt(json.filterOriginSiteId as unknown as string);
        this.filterDestinationSiteId = parseInt(json.filterDestinationSiteId as unknown as string);
        this.filterDateOfShipment = parseInt(json.filterDateOfShipment as unknown as string);
        this.filterDateOfArrival = parseInt(json.filterDateOfArrival as unknown as string);
        this.sortBy = parseInt(json.sortBy as unknown as string);
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
    }

}
