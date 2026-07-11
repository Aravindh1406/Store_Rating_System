import { Router } from "express";

import {

    authenticate

} from "../middlewares/auth.middleware";

const router = Router();

router.get(

    "/",

    authenticate,

    (req, res) => {

        res.json({

            success: true,

            message: "Ratings Route"

        });

    }

);

export default router;