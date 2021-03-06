import {Transactions} from "../mocks/Database";
import {TransactionReason} from "../package/types/enums/TransactionReason";
import {TransactionState} from "../package/types/enums/TransactionState";
import {ITransaction} from "../package/types/interfaces/ITransaction";

export class Transaction implements ITransaction {
    public id: number;
    public time: number;
    public state: TransactionState;
    public reason: TransactionReason;
    public create_time: number;
    public perform_time: number;
    public cancel_time: number;
    public transaction: number;
    public order_id: number;
    public receivers: [];

    public async find(params) {
        const transaction = Transactions.find((trans) => trans.id === params.id);

        if (!transaction) {
            return null;
        }
        this.id = transaction.id;
        this.time = transaction.time;
        this.create_time = transaction.create_time;
        this.perform_time = transaction.perform_time;
        this.cancel_time = transaction.cancel_time;
        this.transaction = transaction.transaction;
        this.order_id = transaction.order_id;
        this.state = transaction.state;
        this.reason = transaction.reason;
        this.receivers = transaction.receivers;

        return this;
    }

    public async create(params) {
        const transactionId = Transactions.length;

        this.transaction = transactionId,
            this.order_id = params.account.order_id,
            this.state = TransactionState.waiting,
            this.reason = null,
            this.receivers = [],
            this.id = params.id,
            this.time = params.time,
            this.create_time = Date.now(),
            this.perform_time = 0,
            this.cancel_time = 0;

        Transactions.push(this);

        return this;
    }

    public async cancel(state: TransactionState, reason: TransactionReason) {
        this.state = state;
        this.reason = reason;
        this.cancel_time = Date.now();
    }

    public async getTransactions(params) {

        return Transactions.map((transaction: Transaction) => {
                if (transaction.state >= TransactionState.waiting &&
                    transaction.time >= params.from &&
                    transaction.time <= params.to) {
                    return transaction;
                }
            },
        );
    }

    public getCreateTime(): number {
        return this.create_time;
    }

    public getPerformTime(): number {
        return this.perform_time;
    }

    public setPerformTime(time: number) {
        this.perform_time = time;
    }

    public getCancelTime() {
        return this.cancel_time;
    }

    public getId(): number {
        return this.transaction;
    }
}
