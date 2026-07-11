import { NextFunction, Request, Response } from "express";

import adminService from "../services/admin.service";

import { sendResponse } from "../utils/response";

class AdminController {

    async dashboard(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const data = await adminService.dashboard();

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

    async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const user = await adminService.createUser(req.body);

            return sendResponse(
                res,
                201,
                true,
                "User created successfully",
                user
            );

        } catch (error) {

            next(error);

        }

    }

    async createStore(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const store = await adminService.createStore(req.body);

            return sendResponse(
                res,
                201,
                true,
                "Store created successfully",
                store
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

            const users = await adminService.getUsers(req.query);

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

    async getStores(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const stores = await adminService.getStores(req.query);

            return sendResponse(
                res,
                200,
                true,
                "Stores fetched successfully",
                stores
            );

        } catch (error) {

            next(error);

        }

    }

    async getUserDetails(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const user = await adminService.getUserDetails(
                Number(req.params.id)
            );

            return sendResponse(
                res,
                200,
                true,
                "User fetched successfully",
                user
            );

        } catch (error) {

            next(error);

        }

    }

    async getStoreDetails(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const store = await adminService.getStoreDetails(
                Number(req.params.id)
            );

            return sendResponse(
                res,
                200,
                true,
                "Store fetched successfully",
                store
            );

        } catch (error) {

            next(error);

        }

    }

}

export default new AdminController();