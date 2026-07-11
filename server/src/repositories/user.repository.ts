import User from "../models/User";
import { UserRole } from "../constants/roles";

class UserRepository {

    async findByEmail(email: string) {

        return User.findOne({

            where: {

                email

            }

        });

    }

    async createUser(data: any) {

        return User.create(data);

    }

    async countAdmins() {

        return User.count({

            where: {

                role: UserRole.ADMIN

            }

        });

    }

    async createDefaultAdmin(data: any) {

        return User.create(data);

    }

}

export default new UserRepository();