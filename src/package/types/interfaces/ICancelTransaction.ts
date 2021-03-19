import {TransactionReason} from "../enums/TransactionReason";

export interface ICancelTransaction {
    id: number;
    reason: TransactionReason;
}
