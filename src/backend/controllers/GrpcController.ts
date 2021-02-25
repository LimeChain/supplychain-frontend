import { testGrpcClient } from '../grpc/GrpcClient';
import Context from '../utilities/network/Context';

export default class TestController {

    async grpcTest(context: Context) {
        try {
            const result = await testGrpcClient.exec('SayHello', { text: 'Hello world!' })
            console.log('---------------------------');
            console.log('Message: ', result.response);
            console.log('---------------------------');
        } catch (error) {
            console.log('Error: ', error);
        }
    }

}
