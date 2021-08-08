/**
 * logic for handling affiliate related requests
 * at this point the request is alrady verified using the access token and its
 * payload is in the body of the request
 */

import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import Affiliate from "../models/Affiliate";
import Campaign from "../models/Campaign";

export async function createAffiliate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const campaignIDs: string[] = req.body.affiliate.campaigns;
    const campaignsPromises = campaignIDs.map((id) =>
      Campaign.findById(id).exec()
    );
    const campaignDocs = await Promise.all(campaignsPromises);
    const campaigns = campaignDocs.map((doc) => doc?._id as ObjectId);
    const savedAffiliate = await Affiliate.create({
      ...req.body.affiliate,
      campaigns,
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
}
export async function readAffiliate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const affID = req.params.affiliateID;
  const affiliate = await Affiliate.findById(affID);
  return affiliate
    ? res.json({ affiliate })
    : res.status(400).json({ error: "Affiliate not found" });
}
export async function readAllAffiliates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const affiliates = await Affiliate.find();
  return res.json({ affiliates });
}
export async function updateAffiliate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const campaignIDs: string[] = req.body.affiliate.campaigns;
  const promises = campaignIDs.map((id) => Campaign.findById(id).exec());
  const campaignDocs = await Promise.all(promises);
  const campaigns = campaignDocs.map((doc) => doc?._id);
  const updated = await Affiliate.findByIdAndUpdate(
    req.params.affiliateID,
    { ...req.body.affiliate, campaigns },
    { new: true }
  );
  return updated
    ? res.send()
    : res.status(400).json({ error: "Affiliate not found" });
}
export async function deteleAffiliate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const deleted = await Affiliate.findByIdAndDelete(req.params.affiliateID);
  return deleted
    ? res.send()
    : res.status(400).json({ error: "Affiliate not found" });
}
