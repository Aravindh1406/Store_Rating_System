import { Op, fn, col } from "sequelize";
import User from "../models/User";
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

            search = "",

            sortBy = "name",

            order = "ASC"

        } = query;

        const offset = (page - 1) * limit;

        const where = {

            [Op.or]: [

                {

                    name: {

                        [Op.like]: `%${search}%`

                    }

                },

                {

                    email: {

                        [Op.like]: `%${search}%`

                    }

                },

                {

                    address: {

                        [Op.like]: `%${search}%`

                    }

                },

                {

                    role: {

                        [Op.like]: `%${search}%`

                    }

                }

            ]

        };

        return User.findAndCountAll({

            where,

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

            search = "",

            sortBy = "name",

            order = "ASC"

        } = query;

        const offset = (page - 1) * limit;

        return Store.findAndCountAll({

            subQuery: false,

            where: {

                [Op.or]: [

                    {

                        name: {

                            [Op.like]: `%${search}%`

                        }

                    },

                    {

                        email: {

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

            //                 col(

            //                     "ratings.rating"

            //                 )

            //             ),

            //             "rating"

            //         ]

            //     ]

            // },

            // group: [

            //     "Store.id"

            // ],

            // limit: Number(limit),

            // offset,

            // order: [

            //     [

            //         sortBy,

            //         order

            //     ]

            // ]

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
}

export default new AdminRepository();