import {ErrorCodes} from "../types/enums/ErrorCodes";
import {IResponseErrorRPC} from "../types/interfaces/IResponseErrorRPC";

export class MainError {
    public TransportError(): IResponseErrorRPC {
        return {
            code : ErrorCodes.TransportError,
            message : {
                ru: "Метод запроса не POST.",
                uz: "So'rov usuli POST emas.",
                en: "The request method is not POST.",
            },
            data : null,
        };
    }

    public AccessDenied(): IResponseErrorRPC {
        return {
            code : ErrorCodes.AccessDenied,
            message : {
                ru: "Недостаточно привилегий для выполнения метода.",
                uz: "Usulni bajarish uchun etarli imtiyozlar mavjud emas.",
                en: "Insufficient privileges to execute the method.",
            },
            data : null,
        };
    }

    public ParseError(): IResponseErrorRPC {
        return {
            code : ErrorCodes.ParseError,
            message : {
                ru: "Ошибка парсинга JSON.",
                uz: "JSONni tahlil qilishda xato.",
                en: "JSON parsing error.",
            },
            data : null,
        };
    }

    public MethodNotFound(): IResponseErrorRPC {
        return {
            code : ErrorCodes.MethodNotFound,
            message : {
                ru: "Запрашиваемый метод не найден.",
                uz: "So'ralgan usul topilmadi.",
                en: "The requested method was not found.",
            },
            data : null,
        };
    }
}
