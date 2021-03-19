import {Billing} from "./billing";
import {MainError} from "./errors/MainErrors";
import {IRequestBodyRPC} from "./types/interfaces/IRequestBodyRPC";
import {ITransaction} from "./types/interfaces/ITransaction";
import {prepareResponse} from "./utils/prepareResponse";

export const routing = async (body: IRequestBodyRPC<any>, accountCreator: Billing, transaction: ITransaction) => {

    try {
        let result;
        switch (body.method) {
            case "CheckPerformTransaction":
                result = await accountCreator.CheckPerformTransaction(body);
                break;

            case "CreateTransaction":
                result = await accountCreator.CreateTransaction(body, transaction);
                break;

            case "PerformTransaction":
                result = await accountCreator.PerformTransaction(body, transaction);
                break;

            case "CancelTransaction":
                result = await accountCreator.CancelTransaction(body, transaction);
                break;

            case "CheckTransaction":
                result = await accountCreator.CheckTransaction(body, transaction);
                break;

            case "GetStatement":
                result = await accountCreator.CheckTransaction(body, transaction);
                break;

            default:
                return prepareResponse(body.id, new MainError().MethodNotFound());
        }

        return prepareResponse(body.id, null, result);

    } catch (error) {
        return prepareResponse(body.id, error, null);
    }
};
