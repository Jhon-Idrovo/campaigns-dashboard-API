import { model, Schema } from "mongoose";
import { IClient } from "../../interfaces/clients";

const clientSchema = new Schema<IClient>({
  name: String,
  type: { type: String },
  comments: [String],
});

export default model<IClient>("Client", clientSchema);
