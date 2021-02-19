import {ResponseErrorRPC} from "../types/interfaces/ResponseErrorRPC";

export const prepareResponse = (id: number, error?: ResponseErrorRPC, result?: any) => {
    if (error) {
        return {
            error,
            id
        }
    }

    return {
        result,
        id
    }
}