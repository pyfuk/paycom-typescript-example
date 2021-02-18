export interface CreateTransactionParams {
    id: number,
    time: number,
    amount: number;
    account: { user_id: number, order_id: number}
}