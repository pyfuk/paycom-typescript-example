import {Order} from "./models/Order";
import {ResponseBodyRPC} from "./interfaces/ResponseBodyRPC";
import {BillingError} from "./errors/BillingErrors";
import {OrderStatus} from "./enums/OrderStatus";

export const Billing = {
    CheckPerformTransaction: (body: ResponseBodyRPC) => {

        let order = new Order();
        order.find(body.params.account.order_id);

        if(!order.id){
            return BillingError.OrderNotFound();
        }

        if(order.amount != body.params.amount){
            return BillingError.IncorrectAmount();
        }

        if(order.amount != body.params.amount){
            return BillingError.IncorrectAmount();
        }

        if(order.status  !== OrderStatus.waiting){
            return BillingError.InvalidStatus();
        }

        return {status: "CheckPerformTransaction live"};
    },
};