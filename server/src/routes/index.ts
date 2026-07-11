import { Router } from "express";
import { sendResponse } from "../utils/response";

const router = Router();

router.get("/health", (_, res) => {

    sendResponse(
        res,
        200,
        true,
        "Server is running"
    );

});

export default router;