import { Orders } from "../mocks/Database";
import { BillingError } from "../package/errors/BillingErrors";
import {OrderStatus} from "../package/types/enums/OrderStatus";
import { IAccount } from "../package/types/interfaces/IAccount";

export class Order implements IAccount {

    public id: number;
    public user_id: number;
    public status: number;
    public amount: number;

    public async find(params): Promise<this> {
        const order = Orders.find((ord) => ord.id === params.account.order_id);

        if (!order) {
            return null;
        }

        this.id = order.id;
        this.amount = order.amount;
        this.status = order.status;
        this.user_id = order.user_id;

        return this;
    }

    public async validate(params): Promise<any> {
        if (!this.id) {
            throw new BillingError().OrderNotFound();
        }

        if (this.amount !== params.amount) {
            throw new BillingError().IncorrectAmount();
        }

        if (this.status !== OrderStatus.waiting) {
            throw new BillingError().InvalidStatus();
        }
    }

    public async allowCancelPaidOrder(params): Promise<boolean> {
        return true;
    }

    public async cancel(params): Promise<any> {
        this.status = OrderStatus.canceled;
    }

}
