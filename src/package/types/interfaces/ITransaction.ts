import {TransactionReason} from "../enums/TransactionReason";
import {TransactionState} from "../enums/TransactionState";

export interface ITransaction {
    id: number;
    time: number;
    state: TransactionState;
    reason: TransactionReason;

    find(params): Promise<this>;

    create(params): Promise<this>;

    cancel(state: TransactionState, reason: TransactionReason): Promise<any>;

    getId(): number;

    getCreateTime(): number;

    getPerformTime(): number;

    getCancelTime(): number;

    setPerformTime(time: number): void;

    getTransactions(params): Promise<ITransaction[]>;
}
