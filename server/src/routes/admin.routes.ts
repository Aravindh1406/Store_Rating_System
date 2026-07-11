import { Router } from "express";

import {

    authenticate

} from "../middlewares/auth.middleware";

import {

    authorize

} from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";

const router = Router();

router.get(

    "/dashboard",

    authenticate,

    authorize(UserRole.ADMIN),

    (req, res) => {

        res.json({

            success: true,

            message: "Welcome Admin"

        });

    }

);

export default router;