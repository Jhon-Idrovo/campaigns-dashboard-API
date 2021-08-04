import app from "./app";
import { config } from "dotenv";
import DashboardDAO from "./data-access-object/dashboardDAO";

//load envrioment variables
config();

//connect to DB
import { MongoClient, MongoError } from "mongodb";

const port = process.env.PORT || 8000;
MongoClient.connect(process.env.DB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err: MongoError) => {
    console.log("Unable to connect to the database", err);
    process.exit(1);
  })
  .then(async (client: MongoClient) => {
    await DashboardDAO.connectDB(client);
    app.listen(port, () =>
      console.log(`API available on http://localhost:${port}`)
    );
  });
//import { MongoClient, MongoError } from "mongodb";

// const client: MongoClient = new MongoClient(process.env.DB_URI as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect(async (err: MongoError) => {
//   if (err) {
//     console.log("Unable to start the server", err);
//     process.exit(1);
//   }
//   //start the server
//   await DashboardDAO.connectDB(client);
//   const port = process.env.PORT || 3333;
//   app.listen(port, () =>
//     console.log(`API available on http://localhost:${port}`)
//   );
// });
