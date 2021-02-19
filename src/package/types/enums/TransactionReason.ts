export enum TransactionReason {
    recipientNotFound = 1,
    debitTransaction,
    transactionFailed,
    transactionTimeOut,
    refund,
    unknownError = 10

}