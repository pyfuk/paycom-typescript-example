import {Order} from "./models/Order";
import {RequestBodyRPC} from "./interfaces/RequestBodyRPC";
import {BillingError} from "./errors/BillingErrors";
import {OrderStatus} from "./enums/OrderStatus";
import {Transaction} from "./models/Transaction";
import {Orders} from "./mocks/Database";
import {CreateTransactionParams} from "./interfaces/CreateTransactionParams";
import {CheckPerformTransactionParams} from "./interfaces/CheckPerformTransactionParams";

export const Billing = {
    CheckPerformTransaction: (body: RequestBodyRPC<CheckPerformTransactionParams>) => {

        let order = new Order();
        order.find(body.params.account.order_id);

        if (!order.id) {
            return new BillingError().OrderNotFound();
        }

        if (order.amount != body.params.amount) {
            return new BillingError().IncorrectAmount();
        }

        if (order.amount != body.params.amount) {
            return new BillingError().IncorrectAmount();
        }

        if (order.status !== OrderStatus.waiting) {
            return new BillingError().InvalidStatus();
        }

        return {allow: true};
    },
    CreateTransaction: (body: RequestBodyRPC<CreateTransactionParams>) => {

        const transaction = new Transaction();
        transaction.find(body.params.id);

        if (!transaction.id) {
            const result = Billing.CheckPerformTransaction(body);
            if ("code" in result) {
                return result;
            }
            const order = Orders.find(order => order.id == body.params.account.order_id);
            transaction.create(body.params, order);

            console.log(transaction)
        }

    }
};