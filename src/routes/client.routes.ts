/**
 * routes for client related actions
 */

import { Router } from "express";
import * as ClientCtrl from "../controllers/client.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
const router = Router();
//with authorization
router.use(verifyTokenMiddleware);
router.get("/", ClientCtrl.requestAllClients);
router.get("/:clientID", ClientCtrl.requestClient);
router.post("/create", ClientCtrl.createClient);
router.delete("/delete/:clientID", ClientCtrl.deleteClient);
router.put("/update/:clientID", ClientCtrl.updateClient);
export default router;
