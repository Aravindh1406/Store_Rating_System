import { Router } from "express";

import StoreOwnerController from "../controllers/storeOwnerController";

import { authenticate } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";

const router = Router();

router.use(

    authenticate,

    authorize(UserRole.STORE_OWNER)

);

router.get(

    "/dashboard",

    StoreOwnerController.dashboard

);

router.get(

    "/users",

    StoreOwnerController.getUsers

);

router.put(

    "/change-password",

    StoreOwnerController.changePassword

);

export default router;