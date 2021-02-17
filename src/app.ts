import {json} from "body-parser";
import express from "express";
import {Request, Response} from "express";
import {MainError} from "./errors/MainErrors";
import {router} from "./router";
import {prepareResponse} from "./utils/prepareResponse";


const app = express();


app.use((req, res, next) => {
    json()(req, res, (err: any) => {
        if (err?.type === 'entity.parse.failed') {
           return res.send(prepareResponse(req.body.id, new MainError().ParseError(), null));
        }
        next();
    });
});


app.all('/', (req: Request, res: Response) => {

    if (req.method !== 'POST') {
        return res.send(prepareResponse(req.body.id, new MainError().TransportError(), null))
    }

    const method = router.find(r => r.method === req.body.method)

    if (!method) {
        return res.send(prepareResponse(req.body.id, new MainError().MethodNotFound(), null))
    }

    const result = method.handler(req.body);
    res.send(prepareResponse(req.body.id, null, result));
});

app.listen(8880, () => console.log("Server started on port 8880"));