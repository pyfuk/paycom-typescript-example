import {ResponseErrorRPC} from "../types/interfaces/ResponseErrorRPC";
import {ErrorCodes} from "../types/enums/ErrorCodes";

export class BillingError {
    OrderNotFound(): ResponseErrorRPC {
        return {
            code: ErrorCodes.OrderNotFound,
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
            code: ErrorCodes.IncorrectAmount,
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
            code: ErrorCodes.InvalidStatus,
            message: {
                ru: "Неверный статус заказа.",
                uz: "Buyurtma holati noto‘g‘ri.",
                en: "Invalid order status."
            },
            data: "order"
        }
    };

    UnableToPerform(): ResponseErrorRPC {
        return {
            code: ErrorCodes.UnableToPerform,
            message: {
                ru: "Невозможно выполнить операцию.",
                uz: "Amalni amalga oshirib bo'lmadi.",
                en: "Unable to perform operation."
            },
            data: "transaction"
        }
    };

    TransactionNotFound(): ResponseErrorRPC {
        return {
            code: ErrorCodes.TransactionNotFound,
            message: {
                ru: "Транзакция не найдена.",
                uz: "Tranzaksiya topilmadi.",
                en: "Transaction not found."
            },
            data: "transaction"
        }
    }

    CanNotCancelTransaction(): ResponseErrorRPC {
        return {
            code: ErrorCodes.TransactionNotFound,
            message: {
                ru: "Невозможно отменить транзакцию.",
                uz: "Tranzaksiya bekor qilinmadi.",
                en: "Unable to cancel transaction"
            },
            data: "transaction"
        }
    }
}