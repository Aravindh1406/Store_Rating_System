import { Router } from "express";

import {

    authenticate

} from "../middlewares/auth.middleware";

import {

    authorize

} from "../middlewares/role.middleware";

import {

    getStores,

    submitRating,

    updateRating,

    changePassword

} from "../controllers/user.contoller";

import {

    validate

} from "../middlewares/validation.middleware";

import {

    submitRatingSchema,

    updateRatingSchema,

    changePasswordSchema

} from "../validations/user.validation";

import {

    UserRole

} from "../constants/roles";

const router = Router();

router.use(

    authenticate,

    authorize(UserRole.USER)

);

router.get(

    "/stores",

    getStores

);

router.post(

    "/rating",

    validate(submitRatingSchema),

    submitRating

);

router.put(

    "/rating/:storeId",

    validate(updateRatingSchema),

    updateRating

);

router.put(

    "/change-password",

    validate(changePasswordSchema),

    changePassword

);

export default router;