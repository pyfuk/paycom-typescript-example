import {json} from "body-parser";
import express from "express";
import {Request, Response} from "express";
import {ResponseErrorRPC} from "./interfaces/ResponseErrorRPC";
import {MainError} from "./errors/MainErrors";
import {router} from "./router";


const app = express();

app.use(json());


app.all('/', (req: Request, res: Response) => {

    if (req.method !== 'POST') {
        res.send(prepareResponse(req.body.id, MainError.TransportError(), null))
    }

    const method = router.find(r => r.method === req.body.method)

    if(!method){
        res.send(prepareResponse(req.body.id, MainError.MethodNotFound(), null))
    }

    const result = method.handler(req);

    res.send(prepareResponse(req.body.id, null, result));

});


app.use(function (err, req, res, next) {
    if (err.type === 'entity.parse.failed') {
        res.send(prepareResponse(req.body.id, MainError.ParseError(), null));
    }
});


app.listen(8888, () => console.log("Server started on port 8888"));


const prepareResponse = (id: number, error?: ResponseErrorRPC, result?: any) => {
    if (error) {
        return {
            error: error,
            id: id
        }
    }
    if (result) {
        return {
            result: result,
            id: id
        }
    }
}