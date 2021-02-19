export interface IAccount {
    find(params): Promise<this>;
    validate(params): Promise<any>;
    allowCancelPaidOrder(params) : Promise<boolean>;
    cancel(params): Promise<any>;
}