import {Order} from "./models/Order";
import {Billing} from "./package/billing";
import {IAccount} from "./package/types/interfaces/IAccount";

export class OrderCreator extends Billing {

    public createAccount(): IAccount {
        return new Order();
    }
}
