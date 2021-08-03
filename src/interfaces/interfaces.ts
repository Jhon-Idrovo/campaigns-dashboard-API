interface AuctionsFilterInterface {
  id: String;
  category: String;
  name: String;
  desc: String;
  bidLt: number;
  bidGt: number;
}

interface GetAuctionsOptionsInterface {
  filters: AuctionsFilterInterface | null;
  auctionsPerPg: number;
  page: number;
}
