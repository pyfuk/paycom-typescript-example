import {ErrorCodes} from "../types/enums/ErrorCodes";
import {IResponseErrorRPC} from "../types/interfaces/IResponseErrorRPC";

export class BillingError {
    public OrderNotFound(): IResponseErrorRPC {
        return {
            code: ErrorCodes.OrderNotFound,
            message: {
                ru: "Заказ не найден.",
                uz: "Buyurtma topilmadi.",
                en: "Order not found.",
            },
            data: "order",
        };
    }

    public IncorrectAmount(): IResponseErrorRPC {
        return {
            code: ErrorCodes.IncorrectAmount,
            message: {
                ru: "Неверная сумма заказа.",
                uz: "Buyurtma miqdori yaroqsiz.",
                en: "Invalid order amount.",
            },
            data: "order",
        };
    }

    public InvalidStatus(): IResponseErrorRPC {
        return {
            code: ErrorCodes.InvalidStatus,
            message: {
                ru: "Неверный статус заказа.",
                uz: "Buyurtma holati noto‘g‘ri.",
                en: "Invalid order status.",
            },
            data: "order",
        };
    }

    public UnableToPerform(): IResponseErrorRPC {
        return {
            code: ErrorCodes.UnableToPerform,
            message: {
                ru: "Невозможно выполнить операцию.",
                uz: "Amalni amalga oshirib bo'lmadi.",
                en: "Unable to perform operation.",
            },
            data: "transaction",
        };
    }

    public TransactionNotFound(): IResponseErrorRPC {
        return {
            code: ErrorCodes.TransactionNotFound,
            message: {
                ru: "Транзакция не найдена.",
                uz: "Tranzaksiya topilmadi.",
                en: "Transaction not found.",
            },
            data: "transaction",
        };
    }

    public CanNotCancelTransaction(): IResponseErrorRPC {
        return {
            code: ErrorCodes.TransactionNotFound,
            message: {
                ru: "Невозможно отменить транзакцию.",
                uz: "Tranzaksiya bekor qilinmadi.",
                en: "Unable to cancel transaction",
            },
            data: "transaction",
        };
    }
}
