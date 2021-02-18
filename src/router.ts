import {Billing} from "./billing";
import { Router } from "./interfaces/Router";

export const router: Router[] = [

    {method: "CheckPerformTransaction", handler: Billing.CheckPerformTransaction},
    {method: "CreateTransaction", handler: Billing.CreateTransaction},
    {method: "PerformTransaction", handler: Billing.PerformTransaction},
    {method: "CancelTransaction", handler: Billing.CancelTransaction},
    {method: "CheckTransaction", handler: Billing.CheckTransaction},
    {method: "GetStatement", handler: Billing.GetStatement},
]