import repository from "../repositories/storeOwner.repository";

import {

    comparePassword,

    hashPassword

} from "../utils/bcrypt";

class StoreOwnerService {

    async dashboard(ownerId: number) {

        const store = await repository.getStore(

            ownerId

        );

        if (!store) {

            throw new Error(

                "Store not found"

            );

        }

        const average = await repository.getAverageRating(

            store.id

        );

        const users = await repository.getUsers(

            store.id

        );

        return {

            store,

            averageRating: Number(

                average?.averageRating || 0

            ).toFixed(1),

            totalRatings: users.length

        };

    }

    async users(ownerId: number) {

        const store = await repository.getStore(

            ownerId

        );

        if (!store) {

            throw new Error(

                "Store not found"

            );

        }

        return repository.getUsers(

            store.id

        );

    }

    async changePassword(

        ownerId: number,

        oldPassword: string,

        newPassword: string

    ) {

        const owner = await repository.findOwner(

            ownerId

        );

        if (!owner) {

            throw new Error(

                "Owner not found"

            );

        }

        const match = await comparePassword(

            oldPassword,

            owner.password

        );

        if (!match) {

            throw new Error(

                "Old password is incorrect"

            );

        }

        const password = await hashPassword(

            newPassword

        );

        await repository.changePassword(

            ownerId,

            password

        );

        return {

            message:

                "Password changed successfully"

        };

    }

}

export default new StoreOwnerService();