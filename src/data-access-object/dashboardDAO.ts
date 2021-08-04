import { Collection, Cursor, Db, MongoClient, QuerySelector } from "mongodb";
import { GetCampaignsOptions } from "../interfaces/interfaces";
//reference to the database
let db: Db;
let dashboard: Collection;
let campaigns: Collection;
let clients: Collection;
let affiliates: Collection;
let expenses: Collection;

export default class DashboardDAO {
  /**
   *Connects to the database
   * @param client
   * @returns
   */
  static async connectDB(client: MongoClient) {
    if (db && expenses && clients && campaigns && affiliates) {
      return;
    }
    try {
      db = client.db(process.env.DB_NAME);
      dashboard = db.collection("dashboard");
      expenses = db.collection("expenses");
      campaigns = db.collection("campaigns");
      clients = db.collection("clients");
      affiliates = db.collection("affiliates");
    } catch (err) {
      console.log("Unable to conect to database", err);
    }
  }

  /**
   *
   * @param options
   * @returns
   */
  static async getCampaigns(
    options: GetCampaignsOptions = {
      filters: null,
      page: 0,
      campaignsPerPg: 20,
    }
  ) {
    const { filters, page, campaignsPerPg } = options;

    return {};
  }
}
