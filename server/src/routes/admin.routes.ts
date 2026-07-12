import { Router } from "express";

import adminController from "../controllers/admin.controller";

import { authenticate } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";

const router = Router();

router.use(
    authenticate,
    authorize(UserRole.ADMIN)
);

router.get(
    "/dashboard",
    adminController.dashboard
);

router.post(
    "/users",
    adminController.createUser
);

router.post(
    "/stores",
    adminController.createStore
);

router.get(
    "/users",
    adminController.getUsers
);

router.get(
    "/stores",
    adminController.getStores
);

router.get(
    "/users/:id",
    adminController.getUserDetails
);

router.get(
    "/stores/:id",
    adminController.getStoreDetails
);
router.get(

    "/store-owners",

    adminController.getStoreOwners

);

export default router;