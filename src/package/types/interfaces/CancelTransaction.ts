import {TransactionReason} from "../enums/TransactionReason";

export interface CancelTransaction {
    id: number,
    reason: TransactionReason
}