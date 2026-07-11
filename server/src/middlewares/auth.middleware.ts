import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../types/jwt";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

export const authenticate = (

    req: Request,

    res: Response,

    next: NextFunction

) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            success: false,

            message: "Token Missing"

        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            env.JWT_SECRET
        ) as AuthUser;

req.user = decoded;

next();

    }

    catch {

    return res.status(401).json({

        success: false,

        message: "Invalid Token"

    });

}

};