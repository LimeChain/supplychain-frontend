import grpc, { GrpcObject } from 'grpc';
import {loadSync} from '@grpc/proto-loader';
import fs from 'fs';
class GprcClient {
    client: GrpcObject;

    constructor(protoName: string){
        let protoPath = __dirname + '/protos/' + protoName + '.proto';
        let grpcAddr = 'grpc_server:8006';
        this.client = this.initializeClient(protoPath, grpcAddr);
    }

    private initializeClient = (protoPath, grpcAddr) => {
        let packageDefinition = loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true
        });
    
        let proto = grpc.loadPackageDefinition(packageDefinition);
    

        const credentials = grpc.credentials.createSsl(
            fs.readFileSync(__dirname + '/certs/ca.crt'), 
            fs.readFileSync(__dirname + '/certs/client.key'), 
            fs.readFileSync(__dirname + '/certs/client.crt')
        );

        let client = new proto.ProtoService(grpcAddr, credentials);
    
        return client;
    }
    
    exec(funcName, ...params) {
        return new Promise((resolve, reject) => {
            params.push(function(err, response) {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(response);
              });

            this.client[funcName](...params);
        });
    }
    

}

export const testGrpcClient = new GprcClient('Test');