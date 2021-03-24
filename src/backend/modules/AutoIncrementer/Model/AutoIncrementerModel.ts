import Database from '../../../utilities/database/Database';
import Response from '../../../utilities/network/Response';
import StateException from '../../../utilities/network/StateException';
import AutoIncrementerRepoH from '../Repo/AutoIncrementerRepoH';
import AutoIncrementerModelG from './AutoIncrementerModelG';

export default class AutoIncrementerModel extends AutoIncrementerModelG {

    static ID: number = 1;

    initialiased: boolean = false;

    async aquire(db: Database) {
        const sqlResult = await db.query(`SELECT * FROM ${AutoIncrementerRepoH.TABLE_NAME} WHERE ${AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID} = ${AutoIncrementerModel.ID} FOR UPDATE`);
        if (sqlResult.length !== 1) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }

        this.autoIncrementerId = sqlResult[0][AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID];
        this.nextProductId = sqlResult[0][AutoIncrementerRepoH.C_NEXT_PRODUCT_ID];
        this.nextSkuId = sqlResult[0][AutoIncrementerRepoH.C_NEXT_SKU_ID];
        this.nextSkuOriginId = sqlResult[0][AutoIncrementerRepoH.C_NEXT_SKU_ORIGIN_ID];
        this.nextShipmentDocumentId = sqlResult[0][AutoIncrementerRepoH.C_NEXT_SHIPMENT_DOCUMENT_ID];
        this.nextShipmentId = sqlResult[0][AutoIncrementerRepoH.C_NEXT_SHIPMENT_ID];
        this.initialiased = true;
    }

    getAndIncrementProductId(): number {
        if (this.initialiased === false) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }
        return this.nextProductId++;
    }

    getAndIncremenetSkuId(): number {
        if (this.initialiased === false) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }
        return this.nextSkuId++;
    }

    getAndIncremenetSkuOriginId(): number {
        if (this.initialiased === false) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }
        return this.nextSkuOriginId++;
    }

    getAndIncremenetShipmentId(): number {
        if (this.initialiased === false) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }
        return this.nextShipmentId++;
    }

    getAndIncremenetShipmentDocumentId(): number {
        if (this.initialiased === false) {
            throw new StateException(Response.S_STATUS_RUNTIME_ERROR);
        }
        return this.nextShipmentDocumentId++;
    }

}
