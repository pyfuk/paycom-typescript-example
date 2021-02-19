import { BillingError } from "../errors/BillingErrors";
import { IAccount } from "../interfaces/IAccount";
import { Orders } from "../mocks/Database";
import {OrderStatus} from "../enums/OrderStatus";

export class Order implements IAccount {

    id: number;
    user_id: number;
    status: number;
    amount: number;

    async find(params): Promise<this> {
        const order = Orders.find(order => order.id === params.account.order_id);

        if (!order) {
            return null;
        }

        this.id = order.id;
        this.amount = order.amount;
        this.status = order.status;
        this.user_id = order.user_id;


        return this;
    }

    async validate(params): Promise<any> {
        if (!this.id) {
            throw new BillingError().OrderNotFound();
        }

        if (this.amount != params.amount) {
            throw new BillingError().IncorrectAmount();
        }

        if (this.status !== OrderStatus.waiting) {
            throw new BillingError().InvalidStatus();
        }
    }

    async allowCancelPaidOrder(params): Promise<boolean> {
        return true;
    }

    async cancel(params): Promise<any> {
        this.status = OrderStatus.canceled;
    }

}