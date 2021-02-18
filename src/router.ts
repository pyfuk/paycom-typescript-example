import {Billing} from "./billing";
import { Router } from "./interfaces/Router";

export const router: Router[] = [

    {method: "CheckPerformTransaction", handler: Billing.CheckPerformTransaction},
    {method: "CreateTransaction", handler: Billing.CreateTransaction},
    {method: "PerformTransaction", handler: Billing.PerformTransaction},


]