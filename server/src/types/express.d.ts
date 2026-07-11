import { AuthUser } from "./jwt";

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser;
    }
}