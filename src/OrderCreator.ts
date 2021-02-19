import {Billing} from "./package/billing";
import {IAccount} from "./package/types/interfaces/IAccount";
import {Order} from "./models/Order";

export class OrderCreator extends Billing{

    createAccount(): IAccount {
        return new Order();
    }
}
