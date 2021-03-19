import {IResponseErrorRPC} from "../types/interfaces/IResponseErrorRPC";

export const prepareResponse = (id: number, error?: IResponseErrorRPC, result?: any) => {
    if (error) {
        return {
            error,
            id,
        };
    }

    return {
        result,
        id,
    };
};
