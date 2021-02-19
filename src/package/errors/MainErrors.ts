import {ResponseErrorRPC} from "../types/interfaces/ResponseErrorRPC";
import {ErrorCodes} from "../types/enums/ErrorCodes";

export class MainError {
    TransportError() : ResponseErrorRPC {
        return {
            code : ErrorCodes.TransportError,
            message : {
                ru: "Метод запроса не POST.",
                uz: "So'rov usuli POST emas.",
                en: "The request method is not POST."
            },
            data : null
        }
    };

    AccessDenied(): ResponseErrorRPC {
        return {
            code : ErrorCodes.AccessDenied,
            message : {
                ru: "Недостаточно привилегий для выполнения метода.",
                uz: "Usulni bajarish uchun etarli imtiyozlar mavjud emas.",
                en: "Insufficient privileges to execute the method."
            },
            data : null
        }
    };

    ParseError() : ResponseErrorRPC {
        return {
            code : ErrorCodes.ParseError,
            message : {
                ru: "Ошибка парсинга JSON.",
                uz: "JSONni tahlil qilishda xato.",
                en: "JSON parsing error."
            },
            data : null
        }
    };

    MethodNotFound(): ResponseErrorRPC {
        return {
            code : ErrorCodes.MethodNotFound,
            message : {
                ru: "Запрашиваемый метод не найден.",
                uz: "So'ralgan usul topilmadi.",
                en: "The requested method was not found."
            },
            data : null
        }
    }
}