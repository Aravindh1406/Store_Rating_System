import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt";

export const generateToken = (

    payload: object

): string => {

    return jwt.sign(

        payload,

        jwtConfig.secret,

        {

            expiresIn: jwtConfig.expiresIn

        }

    );

};

export const verifyToken = (

    token: string

) => {

    return jwt.verify(

        token,

        jwtConfig.secret

    );

};