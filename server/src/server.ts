import "./models/associations";
import app from "./app";

import { connectDB } from "./config/database";

import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server Running on http://localhost:${env.PORT}`);
  });
};

startServer();