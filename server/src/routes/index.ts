import { Router } from "express";

import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import ratingRoutes from "./rating.routes";
import storeRoutes from "./store.routes";
import storeOwnerRoutes from "./storeOwner.routes";

import { sendResponse } from "../utils/response";

const router = Router();

router.get("/health", (_, res) => {

    sendResponse(

        res,

        200,

        true,

        "Server Running"

    );

});

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use("/user", userRoutes);

router.use("/store", storeRoutes);

router.use("/rating", ratingRoutes);
router.use(

    "/store-owner",

    storeOwnerRoutes

);

export default router;