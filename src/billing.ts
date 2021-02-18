import {Order} from "./models/Order";
import {RequestBodyRPC} from "./interfaces/RequestBodyRPC";
import {BillingError} from "./errors/BillingErrors";
import {OrderStatus} from "./enums/OrderStatus";
import {Transaction} from "./models/Transaction";
import {Orders, Transactions} from "./mocks/Database";
import {CreateTransactionParams} from "./interfaces/CreateTransactionParams";
import {CheckPerformTransactionParams} from "./interfaces/CheckPerformTransactionParams";
import {TransactionState} from "./enums/TransactionState";
import {PerformTransactionParams} from "./interfaces/PerformTransactionParams";
import {TransactionReason} from "./enums/TransactionReason";
import {CancelTransaction} from "./interfaces/CancelTransaction";
import {CheckTransactionParams} from "./interfaces/CheckTransactionParams";
import {GetStatementParams} from "./interfaces/GetStatementParams";


const TimeOutTime = 43200000;

export const Billing = {
    CheckPerformTransaction: (body: RequestBodyRPC<CheckPerformTransactionParams>) => {

        let order = new Order();
        order.find(body.params.account.order_id);

        if (!order.id) {
            return new BillingError().OrderNotFound();
        }

        if (order.amount != body.params.amount) {
            return new BillingError().IncorrectAmount();
        }

        if (order.amount != body.params.amount) {
            return new BillingError().IncorrectAmount();
        }

        if (order.status !== OrderStatus.waiting) {
            return new BillingError().InvalidStatus();
        }

        return {allow: true};
    },
    CreateTransaction: (body: RequestBodyRPC<CreateTransactionParams>) => {

        const transaction = new Transaction();
        transaction.find(body.params.id);


        if (!transaction.id) {
            const result = Billing.CheckPerformTransaction(body);
            if ("code" in result) {
                return result;
            }
            const order = Orders.find(order => order.id == body.params.account.order_id);
            transaction.create(body.params, order);

            return {
                create_time: transaction.create_time,
                transaction: transaction.transaction,
                state: transaction.state
            }
        }

        if (transaction.state !== TransactionState.waiting) {
            return new BillingError().UnableToPerform();
        }

        if (new Date().getTime() > (transaction.time + TimeOutTime)) {
            transaction.cancel(TransactionState.canceled, TransactionReason.transactionTimeOut);
            return new BillingError().UnableToPerform();
        }

        return {
            create_time: transaction.create_time,
            transaction: transaction.transaction,
            state: transaction.state
        }
    },
    PerformTransaction: (body: RequestBodyRPC<PerformTransactionParams>) => {

        const transaction = new Transaction();
        transaction.find(body.params.id);

        if (!transaction.id) {
            return new BillingError().TransactionNotFound();
        }

        if (transaction.state !== TransactionState.waiting) {

            if (transaction.state !== TransactionState.payed) {
                return new BillingError().UnableToPerform();
            }

            return {
                transaction: transaction.transaction,
                perform_time: transaction.perform_time,
                state: transaction.state
            }
        }

        if (new Date().getTime() > (transaction.time + TimeOutTime)) {
            transaction.cancel(TransactionState.canceled, TransactionReason.transactionTimeOut);
            return new BillingError().UnableToPerform();
        }

        transaction.state = TransactionState.payed;
        transaction.perform_time = new Date().getTime();

        return {
            transaction: transaction.transaction,
            perform_time: transaction.perform_time,
            state: transaction.state
        }
    },
    CancelTransaction: (body: RequestBodyRPC<CancelTransaction>) => {
        const transaction = new Transaction();
        transaction.find(body.params.id);

        if (!transaction.id) {
            return new BillingError().TransactionNotFound();
        }

        if (transaction.state === TransactionState.waiting) {
            transaction.cancel(TransactionState.canceled, body.params.reason);
            return {
                transaction: transaction.transaction,
                cancel_time: transaction.cancel_time,
                state: transaction.state
            }
        }

        if (transaction.state !== TransactionState.payed) {
            return {
                transaction: transaction.transaction,
                cancel_time: transaction.cancel_time,
                state: transaction.state
            }
        }

        const order = Orders.find(order => order.id == transaction.order_id);

        if (order.status === OrderStatus.delivered) {
            return new BillingError().CanNotCancelTransaction();
        }

        order.status = OrderStatus.canceled;

        transaction.cancel(TransactionState.canceled_after_paid, body.params.reason);

        return {
            transaction: transaction.transaction,
            cancel_time: transaction.cancel_time,
            state: transaction.state
        }
    },

    CheckTransaction: (body: RequestBodyRPC<CheckTransactionParams>) => {

        const transaction = new Transaction();
        transaction.find(body.params.id);

        if (!transaction.id) {
            return new BillingError().TransactionNotFound();
        }

        return {
            create_time: transaction.create_time,
            perform_time: transaction.perform_time,
            cancel_time: transaction.create_time,
            transaction: transaction.transaction,
            state: transaction.state,
            reason: transaction.reason
        }

    },

    GetStatement: (body: RequestBodyRPC<GetStatementParams>) => {

        const transactions = Transactions.map((transaction: Transaction) => {
                if (transaction.state >= TransactionState.waiting &&
                    transaction.time >= body.params.from &&
                    transaction.time <= body.params.to) {
                    return transaction
                }
            }
        );

        return {
            transactions: transactions
        }
    }
};