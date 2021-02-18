export enum TransactionState {
    created,
    waiting,
    payed,
    canceled_after_paid =-2,
    canceled
}