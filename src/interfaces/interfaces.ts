interface AuctionsFilterInterface {
  id: String;
  category: String;
  name: String;
  desc: String;
  bidLt: number;
  bidGt: number;
}

export declare interface GetCampaignsOptions {
  filters: AuctionsFilterInterface | null;
  campaignsPerPg: number;
  page: number;
}
