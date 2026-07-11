import userRepository from "../repositories/user.repository";
import adminRepository from "../repositories/admin.repository";

import { comparePassword, hashPassword } from "../utils/bcrypt";

class UserService {

    async getStores(query: any, userId: number) {

        const stores = await userRepository.getStores(query);

        const rows = await Promise.all(

            stores.rows.map(async (store: any) => {

                const average = await adminRepository.getAverageRating(

                    store.id

                );

                const submitted = await userRepository.getRating(

                    userId,

                    store.id

                );

                return {

                    ...store.toJSON(),

                    overallRating: Number(

                        average?.averageRating || 0

                    ).toFixed(1),

                    userRating: submitted

                        ? submitted.rating

                        : null

                };

            })

        );

        return {

            count: stores.count,

            rows

        };

    }

    async submitRating(userId: number, data: any) {

        const store = await userRepository.getStoreById(

            data.storeId

        );

        if (!store) {

            throw new Error(

                "Store not found"

            );

        }

        const exists = await userRepository.getRating(

            userId,

            data.storeId

        );

        if (exists) {

            throw new Error(

                "Rating already submitted"

            );

        }

        return userRepository.submitRating({

            userId,

            storeId: data.storeId,

            rating: data.rating

        });

    }

    async updateRating(

        userId: number,

        storeId: number,

        rating: number

    ) {

        const exists = await userRepository.getRating(

            userId,

            storeId

        );

        if (!exists) {

            throw new Error(

                "Rating not found"

            );

        }

        return userRepository.updateRating(

            exists.id!,

            rating

        );

    }

    async changePassword(

        userId: number,

        oldPassword: string,

        newPassword: string

    ) {

        const user = await userRepository.findUserById(

            userId

        );

        if (!user) {

            throw new Error(

                "User not found"

            );

        }

        const match = await comparePassword(

            oldPassword,

            user.password

        );

        if (!match) {

            throw new Error(

                "Old password is incorrect"

            );

        }

        const password = await hashPassword(

            newPassword

        );

        await userRepository.changePassword(

            userId,

            password

        );

        return {

            message: "Password changed successfully"

        };

    }

}

export default new UserService();