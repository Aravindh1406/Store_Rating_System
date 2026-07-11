import userRepository from "../repositories/user.repository";

import {

    hashPassword,

    comparePassword

} from "../utils/bcrypt";

import { generateToken } from "../utils/jwt";

import { MESSAGE } from "../constants/messages";

import { UserRole } from "../constants/roles";

class AuthService {

    async register(data: any) {

        const user = await userRepository.findByEmail(

            data.email

        );

        if (user) {

            throw new Error(

                MESSAGE.USER_ALREADY_EXISTS

            );

        }

        data.password = await hashPassword(

            data.password

        );

        data.role = UserRole.USER;

        return userRepository.createUser(data);

    }

    async login(email: string, password: string) {

        const user = await userRepository.findByEmail(

            email

        );

        if (!user) {

            throw new Error(

                MESSAGE.INVALID_CREDENTIALS

            );

        }

        const valid = await comparePassword(

            password,

            user.password

        );

        if (!valid) {

            throw new Error(

                MESSAGE.INVALID_CREDENTIALS

            );

        }

        const token = generateToken({

            id: user.id,

            email: user.email,

            role: user.role

        });

        return {

            token,

            user

        };

    }

    async createDefaultAdmin() {

        const admins = await userRepository.countAdmins();

        if (admins > 0) {

            return;

        }

        const password = await hashPassword(

            "Admin@123"

        );

        await userRepository.createDefaultAdmin({

            name: "System Administrator",

            email: "admin@store.com",

            password,

            address: "System",

            role: UserRole.ADMIN

        });

        console.log(

            MESSAGE.ADMIN_CREATED

        );

    }

}

export default new AuthService();