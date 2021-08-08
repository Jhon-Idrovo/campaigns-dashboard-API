/**
 * logic for handling campaign related requests.
 * At this point the request is alrady verified using the access token and its
 * payload is in the body of the request
 */

import { NextFunction, Request, Response } from "express";
import Affiliate from "../models/Affiliate";
import Campaign from "../models/Campaign";
import Client from "../models/Client";

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { affiliates: affIDs, clients: clientIDs } = req.body.campaign;
    const affPromises = (affIDs as string[]).map((id) =>
      Affiliate.findById(id).exec()
    );
    const cltPromises = (clientIDs as string[]).map((id) =>
      Client.findById(id).exec()
    );
    const affDocs = await Promise.all(affPromises);
    const cltDocs = await Promise.all(cltPromises);
    await Campaign.create({
      ...req.body.campaign,
      affiliates: affDocs.map((doc) => doc?._id),
      clients: cltDocs.map((doc) => doc?._id),
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send();
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const campaigns = await Campaign.find().populate("client affiliates", "name");

  return res.status(200).json({ campaigns });
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const campaign = await Campaign.findById(req.params.campaignID);
  return campaign
    ? res.json({ campaign })
    : res.status(400).json({ error: "Campaign not found" });
}
export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { affiliates: affIDs, clients: clientIDs } = req.body;
  const affPromises = (affIDs as string[]).map((id) =>
    Affiliate.findById(id).exec()
  );
  const cltPromises = (clientIDs as string[]).map((id) =>
    Client.findById(id).exec()
  );
  const affDocs = await Promise.all(affPromises);
  const cltDocs = await Promise.all(cltPromises);

  const newCampaign = await Campaign.findByIdAndUpdate(
    req.params.campaignID,
    {
      ...req.body.campaign,
      affiliates: affDocs.map((doc) => doc?._id),
      clients: cltDocs.map((doc) => doc?._id),
    },
    { new: true }
  ).exec();

  return newCampaign
    ? res.status(201).send()
    : res.status(400).json({ error: "Error updating" });
}
export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const del = await Campaign.findByIdAndDelete(req.params.campaignID).exec();
  return del ? res.send() : res.status(400).json({ error: "Failed to delete" });
}
