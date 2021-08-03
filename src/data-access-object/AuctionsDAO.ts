import { Collection, Cursor, Db, MongoClient, QuerySelector } from "mongodb";

//reference to the database
let db: Db;
let auctions: Collection;

export default class AuctionsDAO {
  /**
   *Connects to the database
   * @param client
   * @returns
   */
  static async connectDB(client: MongoClient) {
    if (db && auctions) {
      return;
    }
    try {
      db = client.db(process.env.DB_NAME);
      auctions = db.collection("auctions");
    } catch (err) {
      console.log("Unable to conect to database", err);
    }
  }

  /**
   *
   * @param options
   * @returns
   */
  static async getAuctions(
    options: GetAuctionsOptionsInterface = {
      filters: null,
      page: 0,
      auctionsPerPg: 20,
    }
  ) {
    const { filters, page, auctionsPerPg } = options;

    let query;
    if (filters) {
      if ("id" in filters) {
        query = { _id: { $search: filters["name"] } };
      }
      if ("bidLt" in filters) {
        query = { bid: { $lt: filters.bidLt } };
      }
    }
    let cursor: Cursor;
    try {
      //if the query is undefined we retieve all the auctions
      cursor = auctions.find(query);
    } catch (err) {
      console.log("An error happened while fetching the auctions", err);
      return { auctionsList: [], totalAuctions: 0 };
    }
    //if there are no errors
    //limit the results
    const displayCursor = cursor
      .limit(auctionsPerPg)
      //get the specific page
      .skip(auctionsPerPg * page);
    try {
      const auctionsList = await displayCursor.toArray();
      const totalAuctions = await auctions.countDocuments();
      return { auctionsList, totalAuctions };
    } catch (err) {
      console.log(
        "An error happened while converting the cursor to array or counting the documents",
        err
      );
    }
    return { auctionsList: [], totalAuctions: 0 };
  }
}
