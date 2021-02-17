import {CheckPerformTransactionParams} from "./CheckPerformTransactionParams";

export interface ResponseBodyRPC {
    method: string
    id: number
    params: CheckPerformTransactionParams
}