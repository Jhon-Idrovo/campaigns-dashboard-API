import { model, Schema } from "mongoose";
import { IAffiliate } from "../../interfaces/affiliates";

const affiliateSchema = new Schema<IAffiliate>({
  campaigns: [{ type: Schema.Types.ObjectId, ref: "Campaign" }],
  paid: Number,
  reach: Number,
  comments: [String],
});

export default model<IAffiliate>("Affiliate", affiliateSchema);
