import express, { Request, Response } from "express";

const router = express.Router();

//every route is appended to the route defined in server.ts
router.route("/").get((req: Request, res: Response) => res.send());

export default router;
