import { Op, fn, col } from "sequelize";
import User, { UserRole } from "../models/User";
import Store from "../models/Store";
import Rating from "../models/Rating";


type AverageRating = {

    averageRating: number | null;

};


class AdminRepository {

    async dashboard() {

        const users = await User.count();

        const stores = await Store.count();

        const ratings = await Rating.count();

        return {

            users,

            stores,

            ratings

        };

    }

    async createUser(data: any) {

        return User.create(data);

    }

    async createStore(data: any) {

        return Store.create(data);

    }

    async findUserByEmail(email: string) {

        return User.findOne({

            where: {

                email

            }

        });

    }

    async findStoreByEmail(email: string) {

        return Store.findOne({

            where: {

                email

            }

        });

    }

    async getStoreOwner(ownerId: number) {

        return User.findByPk(ownerId);

    }

    async getUsers(query: any) {

        const {

            page = 1,

            limit = 10,

            name = "",

            email = "",

            address = "",

            role = "",

            sortBy = "name",

            order = "ASC"

        } = query;

        const offset = (Number(page) - 1) * Number(limit);

        return User.findAndCountAll({

            where: {

                ...(name && {

                    name: {

                        [Op.like]: `%${name}%`

                    }

                }),

                ...(email && {

                    email: {

                        [Op.like]: `%${email}%`

                    }

                }),

                ...(address && {

                    address: {

                        [Op.like]: `%${address}%`

                    }

                }),

                ...(role && {

                    role

                })

            },

            limit: Number(limit),

            offset,

            order: [

                [

                    sortBy,

                    order

                ]

            ],

            attributes: {

                exclude: [

                    "password"

                ]

            }

        });

    }


    async getStores(query: any) {

        const {

            page = 1,

            limit = 10,

            name = "",

            email = "",

            address = "",

            sortBy = "name",

            order = "ASC"

        } = query;

        const offset = (Number(page) - 1) * Number(limit);

        return Store.findAndCountAll({

            where: {

                ...(name && {

                    name: {

                        [Op.like]: `%${name}%`

                    }

                }),

                ...(email && {

                    email: {

                        [Op.like]: `%${email}%`

                    }

                }),

                ...(address && {

                    address: {

                        [Op.like]: `%${address}%`

                    }

                })

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

    async getUserById(id: number) {

        return User.findByPk(id, {

            attributes: {

                exclude: [

                    "password"

                ]

            },

            include: [

                {

                    model: Store,

                    as: "stores",

                    // include: [

                    //     {

                    //         model: Rating,

                    //         as: "ratings",

                    //         attributes: []

                    //     }

                    // ],

                    // attributes: {

                    //     include: [

                    //         [

                    //             fn(

                    //                 "AVG",

                    //                 col("stores->ratings.rating")

                    //             ),

                    //             "averageRating"

                    //         ]

                    //     ]

                    //         }
                    // include: [

                    //     {

                    //         model: Store,

                    //         as: "stores"

                    //     }

                    // ]

                }

            ]

        });

    }
    async getStoreById(id: number) {

        return Store.findByPk(id, {

            include: [

                {

                    model: User,

                    as: "owner",

                    attributes: [

                        "id",

                        "name",

                        "email"

                    ]

                },

                {

                    model: Rating,
                    as: "ratings",

                    attributes: [

                        "id",

                        "rating",

                        "userId"

                    ]

                }

            ]

        });

    }

    async getAverageRating(storeId: number): Promise<AverageRating | null> {

        return Rating.findOne({

            attributes: [

                [

                    fn("AVG", col("rating")),

                    "averageRating"

                ]

            ],

            where: {

                storeId

            },

            raw: true

        }) as Promise<AverageRating | null>;

    }

    async getStoreOwners() {

        return User.findAll({

            where: {

                role: UserRole.STORE_OWNER

            },

            attributes: [

                "id",

                "name"

            ]

        });

    }
}

export default new AdminRepository();