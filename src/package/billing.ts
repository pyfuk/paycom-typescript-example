import {RequestBodyRPC} from "./types/interfaces/RequestBodyRPC";
import {BillingError} from "./errors/BillingErrors";
import {CreateTransactionParams} from "./types/interfaces/CreateTransactionParams";
import {CheckPerformTransactionParams} from "./types/interfaces/CheckPerformTransactionParams";
import {TransactionState} from "./types/enums/TransactionState";
import {PerformTransactionParams} from "./types/interfaces/PerformTransactionParams";
import {TransactionReason} from "./types/enums/TransactionReason";
import {CancelTransaction} from "./types/interfaces/CancelTransaction";
import {CheckTransactionParams} from "./types/interfaces/CheckTransactionParams";
import {GetStatementParams} from "./types/interfaces/GetStatementParams";
import {IAccount} from "./types/interfaces/IAccount";
import {ITransaction} from "./types/interfaces/ITransaction";


const TimeOutTime = 43200000;

export abstract class Billing {

    abstract createAccount(): IAccount;

    async CheckPerformTransaction(body: RequestBodyRPC<CheckPerformTransactionParams>) {

        const account = this.createAccount();
        await account.find(body.params);
        await account.validate(body.params);

        return {allow: true};
    };

    async CreateTransaction(body: RequestBodyRPC<CreateTransactionParams>, transaction: ITransaction) {

        await transaction.find(body.params);

        if (!transaction.id) {
            await this.CheckPerformTransaction(body)
            await transaction.create(body.params);

            return {
                create_time: transaction.getCreateTime(),
                transaction: transaction.getId(),
                state: transaction.state
            }
        }

        if (transaction.state !== TransactionState.waiting) {
            throw new BillingError().UnableToPerform();
        }

        if (this.isExpired(transaction.time)) {
            await transaction.cancel(TransactionState.canceled, TransactionReason.transactionTimeOut);
            throw new BillingError().UnableToPerform();
        }

        return {
            create_time: transaction.getCreateTime(),
            transaction: transaction.getId(),
            state: transaction.state
        }
    };

    async PerformTransaction(body: RequestBodyRPC<PerformTransactionParams>, transaction: ITransaction) {

        await transaction.find(body.params);

        if (!transaction.id) {
            throw new BillingError().TransactionNotFound();
        }

        if (transaction.state !== TransactionState.waiting) {

            if (transaction.state !== TransactionState.payed) {
                throw new BillingError().UnableToPerform();
            }

            return {
                transaction: transaction.getId(),
                perform_time: transaction.getPerformTime(),
                state: transaction.state
            }
        }

        if (this.isExpired(transaction.time)) {
            await transaction.cancel(TransactionState.canceled, TransactionReason.transactionTimeOut);
            throw new BillingError().UnableToPerform();
        }

        transaction.state = TransactionState.payed;
        transaction.setPerformTime(Date.now());

        return {
            transaction: transaction.getId(),
            perform_time: transaction.getPerformTime(),
            state: transaction.state
        }
    }

    async CancelTransaction(body: RequestBodyRPC<CancelTransaction>, transaction: ITransaction) {

        await transaction.find(body.params);

        if (!transaction.id) {
            throw new BillingError().TransactionNotFound();
        }

        if (transaction.state === TransactionState.waiting) {
            await transaction.cancel(TransactionState.canceled, body.params.reason);
            return {
                transaction: transaction.getId(),
                cancel_time: transaction.getCancelTime(),
                state: transaction.state
            }
        }

        if (transaction.state !== TransactionState.payed) {
            return {
                transaction: transaction.getId(),
                cancel_time: transaction.getCancelTime(),
                state: transaction.state
            }
        }

        const account = this.createAccount();

        if (!await account.allowCancelPaidOrder(body.params)) {
            throw new BillingError().CanNotCancelTransaction();
        }

        await account.cancel(body.params);

        await transaction.cancel(TransactionState.canceled_after_payed, body.params.reason);

        return {
            transaction: transaction.getId(),
            cancel_time: transaction.getCancelTime(),
            state: transaction.state
        }
    };

    async CheckTransaction(body: RequestBodyRPC<CheckTransactionParams>, transaction: ITransaction) {

        await transaction.find(body.params);

        if (!transaction.id) {
            throw new BillingError().TransactionNotFound();
        }

        return {
            create_time: transaction.getCreateTime(),
            perform_time: transaction.getPerformTime(),
            cancel_time: transaction.getCancelTime(),
            transaction: transaction.getId(),
            state: transaction.state,
            reason: transaction.reason
        }

    };

    async GetStatement(body: RequestBodyRPC<GetStatementParams>, transaction: ITransaction) {
        return {
            transactions: await transaction.getTransactions(body.params)
        }
    }

    private isExpired(time: number) {
        return Date.now() > (time + TimeOutTime)
    }
}