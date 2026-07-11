import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../utils/response";
import {
    registerSchema,
    loginSchema,
} from "../validations/auth.validation";

class AuthController {

    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { error } = registerSchema.validate(req.body);

            if (error) {
                return sendResponse(
                    res,
                    400,
                    false,
                    error.details[0].message
                );
            }

            const user = await authService.register(req.body);

            return sendResponse(
                res,
                201,
                true,
                "Registration Successful",
                user
            );

        } catch (err) {

            next(err);

        }

    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { error } = loginSchema.validate(req.body);

            if (error) {

                return sendResponse(
                    res,
                    400,
                    false,
                    error.details[0].message
                );

            }
            const { email, password } = req.body;

            const result = await authService.login(
                email,
                password
            );

            return sendResponse(
                res,
                200,
                true,
                "Login Successful",
                result
            );

        } catch (err) {

            next(err);

        }

    }

}

export default new AuthController();