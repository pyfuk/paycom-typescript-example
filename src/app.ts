import {json} from "body-parser";
import express from "express";
import {Request, Response} from "express";
import {MainError} from "./errors/MainErrors";
import {prepareResponse} from "./utils/prepareResponse";
import {routing} from "./routing";
import {OrderCreator} from "./OrderCreator";
import {Transaction} from "./models/Transaction";

const app = express();

app.use((req, res, next) => {
    json()(req, res, (err: any) => {
        if (err?.type === 'entity.parse.failed') {
            return res.send(prepareResponse(req.body.id, new MainError().ParseError(), null));
        }
        next();
    });
});

app.all('/', async (req: Request, res: Response) => {

    if (req.method !== 'POST') {
        return res.send(prepareResponse(req.body.id, new MainError().TransportError(), null))
    }

    return res.send(await routing(req.body, new OrderCreator(), new Transaction()));
});

app.listen(9999, () => console.log("Server started on port 9999"));