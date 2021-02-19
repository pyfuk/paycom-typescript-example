export enum TransactionState {
    waiting = 1,
    payed,
    canceled_after_payed = -2,
    canceled
}