import { NextFunction, Request, Response } from "express";
import AuctionsDAO from "../data-access-object/AuctionsDAO";
import { parseRequestQuery } from "../util/parsers";

export default class AuctionsController {
  static async getAuctions(req: Request, res: Response, next: NextFunction) {
    const options = parseRequestQuery(req.query);
    const { auctionsList, totalAuctions } = await AuctionsDAO.getAuctions(
      options
    );
    let response = {
      auctionsList,
      page: req.query.page,
      totalAuctions,
    };

    res.send(response);
  }
}
