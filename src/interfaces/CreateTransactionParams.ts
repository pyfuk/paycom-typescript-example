export interface CreateTransactionParams {
    id: number,
    time: Date,
    amount: number;
    account: { user_id: number, order_id: number}
}