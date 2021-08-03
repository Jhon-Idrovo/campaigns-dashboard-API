export function parseRequestQuery(query) {
  const { auctionsPerPg = 20, page = 0, id, desc, name, bidGt, bidLt } = query;

  let options: GetAuctionsOptionsInterface;
  id ? (options.filters.id = id) : null;
  desc ? (options.filters.id = desc) : null;
  name ? (options.filters.name = name) : null;
  bidGt ? (options.filters.bidGt = bidGt) : null;
  bidLt ? (options.filters.bidLt = bidLt) : null;

  options.page = page;
  options.auctionsPerPg = auctionsPerPg;

  return options;
}
