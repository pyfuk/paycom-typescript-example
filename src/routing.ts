import {prepareResponse} from "./utils/prepareResponse";
import {MainError} from "./errors/MainErrors";
import {RequestBodyRPC} from "./interfaces/RequestBodyRPC";
import {CancelTransaction} from "./interfaces/CancelTransaction";
import {Billing} from "./billing";
import {ITransaction} from "./interfaces/ITransaction";


export const routing = async (body: RequestBodyRPC<any>,accountCreator: Billing, transaction: ITransaction) => {

    try {
        let result;
        switch (body.method) {
            case 'CheckPerformTransaction':
                result = await accountCreator.CheckPerformTransaction(body)
                break;

            case 'CreateTransaction':
                result = await accountCreator.CreateTransaction(body, transaction);
                break;

            case 'PerformTransaction':
                result = await accountCreator.PerformTransaction(body, transaction);
                break;

            case 'CancelTransaction':
                result = await accountCreator.CancelTransaction(body, transaction);
                break;

            case 'CheckTransaction':
                result = await accountCreator.CheckTransaction(body, transaction);
                break;

            case 'GetStatement':
                result = await accountCreator.CheckTransaction(body, transaction);
                break;

            default:
                return prepareResponse(body.id, new MainError().MethodNotFound());
        }

        return prepareResponse(body.id, null, result);

    } catch (error) {
        return prepareResponse(body.id, error, null);
    }
}