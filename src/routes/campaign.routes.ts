/**
 * campaign related routes
 */

import { Router } from "express";
import * as CampaignCtrl from "../controllers/campaign.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
const router = Router();
//with authorization
router.use(verifyTokenMiddleware);
router.get("/", CampaignCtrl.readAll);
router.get("/:campaignID", CampaignCtrl.readOne);
router.post("/create", CampaignCtrl.createOne);
router.delete("/delete/:campaignID", CampaignCtrl.deleteOne);
router.put("/update/:campaignID", CampaignCtrl.updateOne);
export default router;
