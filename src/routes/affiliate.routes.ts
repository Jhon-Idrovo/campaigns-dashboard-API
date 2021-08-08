/**
 * affilated related routes
 */

import { Router } from "express";
import * as AffiliateCtrl from "../controllers/affiliate.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";
const router = Router();
//with authorization
router.use(verifyTokenMiddleware);
router.get("/", AffiliateCtrl.readAllAffiliates);
router.get("/:affiliateID", AffiliateCtrl.readAffiliate);
router.post("/create", AffiliateCtrl.createAffiliate);
router.delete("/delete/:affiliateID", AffiliateCtrl.deteleAffiliate);
router.put("/update/:affiliateID", AffiliateCtrl.updateAffiliate);
export default router;
