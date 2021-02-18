import {TransactionState} from "../enums/TransactionState";
import {Transactions} from "../mocks/Database";
import {CreateTransactionParams} from "../interfaces/CreateTransactionParams";
import {TransactionReason} from "../enums/TransactionReason";


export class Transaction {
    id: number;
    time: number;
    create_time: number;
    perform_time: number;
    cancel_time: number;
    transaction: number;
    order_id: number;
    state: TransactionState;
    reason: TransactionReason;
    receivers: [];


    //ORDER Исправить!!!!!!!!!                   тут

    create(params: CreateTransactionParams, order: { id: number }) {
        const transactionId = Transactions.length;

        this.id = params.id,
            this.time = params.time,
            this.create_time = new Date().getTime(),
            this.perform_time = new Date(0).getTime(),
            this.cancel_time = new Date(0).getTime(),
            this.transaction = transactionId,
            this.order_id = order.id,
            this.state = TransactionState.waiting,
            this.reason = null,
            this.receivers = []


        Transactions.push(this);

        return this;
    }

    find(id: number) {
        const transaction = Transactions.find(transaction => transaction.id === id);

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

    cancel(state: TransactionState, reason: TransactionReason){
        this.state = state;
        this.reason = reason;
        this.cancel_time = new Date().getTime();
    }

}