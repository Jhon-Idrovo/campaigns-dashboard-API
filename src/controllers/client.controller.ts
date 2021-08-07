/**
 * logic for handling client related requests
 * at this point the request is alrady verified using the access token and its
 * payload is in the body of the request
 */

import { NextFunction, Request, Response } from "express";
import Client from "../models/Client";
/**
 * Given the client data on the body.client object, creates and
 * saves it to the database.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function createClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newClient = await new Client({ ...req.body.client }).save();
    return res.status(201).json({ newClient });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
/**
 * Sends back the client corresponding to the clientID passed in the
 * request's params.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function requestClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientID = req.params.clientID;

  const client = await Client.findById(clientID);
  return client
    ? res.json({ client })
    : res.status(400).json({ error: "Client not found" });
}
/**
 * Sends back a list of all clients {clients:[]}
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function requestAllClients(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clients = await Client.find();
  return res.json({ clients });
}
/**
 * Extracts the clientID from the request's params and updates
 * its corresponding document with the info from req.body.client
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function updateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientID = req.params.clientID;
  const updatedClient = await Client.findByIdAndUpdate(
    clientID,
    {
      ...req.body.client,
    },
    { new: true }
  );
  return updatedClient
    ? res.status(200).json({ client: updatedClient })
    : res.status(400).json({ error: "Client not found" });
}
/**
 * Extract the clientID from request's params and deletes
 * its corresponding client document.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function deleteClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientID = req.params.clientID;
  const deletedDoc = await Client.findByIdAndDelete(clientID);

  return deletedDoc
    ? res.status(204).send()
    : res.status(400).json({ error: "Client not found" });
}
