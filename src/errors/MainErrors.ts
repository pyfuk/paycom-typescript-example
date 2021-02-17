import {ResponseErrorRPC} from "../interfaces/ResponseErrorRPC";

export  const MainError = {
    TransportError: () : ResponseErrorRPC => {
        return {
            code : -32300,
            message : {
                ru: "Метод запроса не POST.",
                uz: "So'rov usuli POST emas.",
                en: "The request method is not POST."
            },
            data : null
        }
    },

    AccessDenied: () => {
        return {
            code : -32504,
            message : {
                ru: "Недостаточно привилегий для выполнения метода.",
                uz: "Usulni bajarish uchun etarli imtiyozlar mavjud emas.",
                en: "Insufficient privileges to execute the method."
            },
            data : null
        }
    },

    ParseError: () => {
        return {
            code : -32700,
            message : {
                ru: "Ошибка парсинга JSON.",
                uz: "JSONni tahlil qilishda xato.",
                en: "JSON parsing error."
            },
            data : null
        }
    },

    MethodNotFound: () => {
        return {
            code : -32601,
            message : {
                ru: "Запрашиваемый метод не найден.",
                uz: "So'ralgan usul topilmadi.",
                en: "The requested method was not found."
            },
            data : null
        }
    }
}