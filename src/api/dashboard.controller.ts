import { NextFunction, Request, Response } from "express";
import DashboardDAO from "../data-access-object/dashboardDAO";
import { parseRequestQuery } from "../util/parsers";

export default class AuctionsController {
  static async getAuctions(req: Request, res: Response, next: NextFunction) {
    const options = parseRequestQuery(req.query);
    const { auctionsList, totalAuctions } = await DashboardDAO.getCampaigns(
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
