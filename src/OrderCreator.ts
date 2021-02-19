import {Billing} from "./billing";
import {IAccount} from "./interfaces/IAccount";
import {Order} from "./models/Order";

export class OrderCreator extends Billing {

    createAccount(): IAccount {
        return new Order();
    }
}
