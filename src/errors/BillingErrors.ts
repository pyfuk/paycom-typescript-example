import {ResponseErrorRPC} from "../interfaces/ResponseErrorRPC";

export class BillingError {
    OrderNotFound(): ResponseErrorRPC {
        return {
            code: -31050,
            message: {
                ru: "Заказ не найден.",
                uz: "Buyurtma topilmadi.",
                en: "Order not found."
            },
            data: "order"
        }
    };

    IncorrectAmount(): ResponseErrorRPC {
        return {
            code: -31001,
            message: {
                ru: "Неверная сумма заказа.",
                uz: "Buyurtma miqdori yaroqsiz.",
                en: "Invalid order amount."
            },
            data: "order"
        }
    };

    InvalidStatus(): ResponseErrorRPC {
        return {
            code: -31050,
            message: {
                ru: "Неверный статус заказа.",
                uz: "Buyurtma holati noto‘g‘ri.",
                en: "Invalid order status."
            },
            data: "order"
        }
    }
}