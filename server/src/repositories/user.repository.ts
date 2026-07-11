import { UserRole } from "../constants/roles";
import { Op } from "sequelize";
import Store from "../models/Store";
import Rating from "../models/Rating";
import User from "../models/User";

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

    async getStores(query: any) {

        const {

            page = 1,
            limit = 10,
            search = "",
            sortBy = "name",
            order = "ASC"

        } = query;

        const offset = (Number(page) - 1) * Number(limit);

        return Store.findAndCountAll({

            where: {

                [Op.or]: [

                    {

                        name: {

                            [Op.like]: `%${search}%`

                        }

                    },

                    {

                        address: {

                            [Op.like]: `%${search}%`

                        }

                    }

                ]

            },

            limit: Number(limit),

            offset,

            order: [

                [

                    sortBy,

                    order

                ]

            ]

        });

    }

    async getStoreById(id: number) {

        return Store.findByPk(id);

    }

    async getRating(userId: number, storeId: number) {

        return Rating.findOne({

            where: {

                userId,

                storeId

            }

        });

    }

    async submitRating(data: any) {

        return Rating.create(data);

    }

    async updateRating(id: number, rating: number) {

        await Rating.update(

            {

                rating

            },

            {

                where: {

                    id

                }

            }

        );

        return Rating.findByPk(id);

    }

    async findUserById(id: number) {

        return User.findByPk(id);

    }

    async changePassword(id: number, password: string) {

        await User.update(

            {

                password

            },

            {

                where: {

                    id

                }

            }

        );

        return true;

    }

}

export default new UserRepository();