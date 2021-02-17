import {TransactionState} from "../enums/TransactionState";
import {Orders, Transactions} from "../mocks/Database";
import {CreateTransactionParams} from "../interfaces/CreateTransactionParams";
import {Order} from "./Order";


export class Transaction {
    id: number;
    time: Date;
    create_time: Date;
    perform_time: Date;
    cancel_time: Date;
    transaction: number;
    order_id: number;
    state: TransactionState;
    reason: string;
    receivers: [];


    //ORDER Исправить!!!!!!!!!                   тут

    create(params: CreateTransactionParams, order: { id: number }) {
        const transactionId = Transactions.length;

        this.id = params.id,
            this.time = params.time,
            this.create_time = new Date(),
            this.perform_time = new Date(0),
            this.cancel_time = new Date(0),
            this.transaction = transactionId,
            this.order_id = order.id,
            this.state = TransactionState.created,
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
}