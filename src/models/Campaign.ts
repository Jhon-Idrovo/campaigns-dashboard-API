import { model, Schema } from "mongoose";
import { ICampaign } from "../../interfaces/campaigns";

const campaignSchema = new Schema<ICampaign>({
  pages: Number,
  impressions: Number,
  leads: Number,
  affiliates: [{ type: Schema.Types.ObjectId, ref: "Affiliate" }],
  clients: [{ type: Schema.Types.ObjectId, ref: "Affiliate" }],
  price: Number,
  spend: Number,
  dateInit: String,
  dateEnd: String,
});

export default model<ICampaign>("Campaign", campaignSchema);
