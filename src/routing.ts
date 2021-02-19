import {OrderCreator} from "./OrderCreator";
import {Transaction} from "./models/Transaction";
import {prepareResponse} from "./utils/prepareResponse";
import {MainError} from "./errors/MainErrors";
import {RequestBodyRPC} from "./interfaces/RequestBodyRPC";
import {CancelTransaction} from "./interfaces/CancelTransaction";


export const routing = async (body: RequestBodyRPC<any>) => {

    try {
        let result;
        switch (body.method) {
            case 'CheckPerformTransaction':
                result = await new OrderCreator().CheckPerformTransaction(body);
                break;

            case 'CreateTransaction':
                result = await new OrderCreator().CreateTransaction(body, new Transaction());
                break;

            case 'PerformTransaction':
                result = await new OrderCreator().PerformTransaction(body, new Transaction());
                break;

            case 'CancelTransaction':
                result = await new OrderCreator().CancelTransaction(body, new Transaction());
                break;

            case 'CheckTransaction':
                result = await new OrderCreator().CheckTransaction(body, new Transaction());
                break;

            case 'GetStatement':
                result = await new OrderCreator().CheckTransaction(body, new Transaction());
                break;

            default:
                return prepareResponse(body.id, new MainError().MethodNotFound());
        }

        return prepareResponse(body.id, null, result);

    } catch (error) {
        return prepareResponse(body.id, error, null);
    }
}