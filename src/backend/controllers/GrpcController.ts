import Payload from '../utilities/helpers/Payload';
import Response from '../requests/network-response/Response';
import Session from '../utilities/Session';
import ServicesFactory from '../services/common/ServicesFactory';
import {testGrpcClient} from '../grpc/GrpcClient';

export default class TestController {
    async grpcTest(payload: Payload, res: Response, session: Session, servicesFactory: ServicesFactory) {  
        try{
            let result = await testGrpcClient.exec('SayHello', {text: 'Hello world!'})
            console.log('---------------------------');
            console.log('Message: ',result.response);
            console.log('---------------------------');
        }
        catch(error){
            console.log('Error: ', error);
        }
    }
}
