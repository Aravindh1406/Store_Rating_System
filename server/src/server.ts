import "./models";
import app from "./app";

import { connectDB } from "./config/database";
import authService from "./services/auth.service";
import { env } from "./config/env";

const startServer = async () => {
    await connectDB();
    await authService.createDefaultAdmin();

    app.listen(env.PORT, () => {
        console.log(`Server Running on http://localhost:${env.PORT}`);
    });
};

startServer();