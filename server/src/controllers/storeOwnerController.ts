import { Request, Response, NextFunction } from "express";

import storeOwnerService from "../services/storeOwner.service";

import { sendResponse } from "../utils/response";

class StoreOwnerController {

    async dashboard(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const ownerId = req.user!.id;

            const data = await storeOwnerService.dashboard(ownerId);

            return sendResponse(
                res,
                200,
                true,
                "Dashboard fetched successfully",
                data
            );

        } catch (error) {

            next(error);

        }
    }

    async getUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ownerId = req.user!.id;

            const users = await storeOwnerService.users(ownerId);

            return sendResponse(
                res,
                200,
                true,
                "Users fetched successfully",
                users
            );

        } catch (error) {

            next(error);

        }

    }

    async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const ownerId = req.user!.id;

            const result = await storeOwnerService.changePassword(

                ownerId,

                req.body.oldPassword,

                req.body.newPassword

            );

            return sendResponse(

                res,

                200,

                true,

                result.message

            );

        } catch (error) {

            next(error);

        }

    }

}

export default new StoreOwnerController();