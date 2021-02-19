import {TransactionState} from "../package/types/enums/TransactionState";
import {Transactions} from "../mocks/Database";
import {TransactionReason} from "../package/types/enums/TransactionReason";
import {ITransaction} from "../package/types/interfaces/ITransaction";

export class Transaction implements ITransaction {
    id: number;
    time: number;
    state: TransactionState;
    reason: TransactionReason;
    create_time: number;
    perform_time: number;
    cancel_time: number;
    transaction: number;
    order_id: number
    receivers: [];

    async find(params) {
        const transaction = Transactions.find(transaction => transaction.id === params.id);

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

    async create(params) {
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
            this.cancel_time = 0

        Transactions.push(this);

        return this;
    }

    async cancel(state: TransactionState, reason: TransactionReason) {
        this.state = state;
        this.reason = reason;
        this.cancel_time = Date.now();
    }

    async getTransactions(params) {

        return Transactions.map((transaction: Transaction) => {
                if (transaction.state >= TransactionState.waiting &&
                    transaction.time >= params.from &&
                    transaction.time <= params.to) {
                    return transaction
                }
            }
        )
    }

    getCreateTime(): number {
        return this.create_time;
    }

    getPerformTime(): number {
        return this.perform_time;
    }

    setPerformTime(time: number) {
        this.perform_time = time;
    }

    getCancelTime() {
        return this.cancel_time;
    }

    getId(): number {
        return this.transaction;
    }
}