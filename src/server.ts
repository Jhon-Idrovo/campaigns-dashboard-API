import express, { Response, Request } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
//base URL. Standard form
app.use("/api/v1/auctions");
//handle wrong paths
app.use("*", (req: Request, res: Response) =>
  res.status(404).json({ error: "Page not found" })
);

export default app;
