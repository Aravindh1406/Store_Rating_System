import User from "../models/User";
import Store from "../models/Store";
import Rating from "../models/Rating";

import { fn, col } from "sequelize";

type AverageRating = {
    averageRating: number | null;
};
class StoreOwnerRepository {

    async getStore(ownerId: number) {

        return Store.findOne({

            where: {

                ownerId

            }

        });

    }


    async getAverageRating(
        storeId: number
    ): Promise<AverageRating | null> {

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

    async getUsers(storeId: number) {

        return Rating.findAll({

            where: {

                storeId

            },

            include: [

                {

                    model: User,
                    as:"user",
                    attributes: [

                        "id",

                        "name",

                        "email",

                        "address"

                    ]

                }

            ]

        });

    }

    async changePassword(

        userId: number,

        password: string

    ) {

        return User.update(

            {

                password

            },

            {

                where: {

                    id: userId

                }

            }

        );

    }

    async findOwner(id: number) {

        return User.findByPk(id);

    }

}

export default new StoreOwnerRepository();