import adminRepository from "../repositories/admin.repository";

import { hashPassword } from "../utils/bcrypt";

import { UserRole } from "../constants/roles";

class AdminService {

    async dashboard() {

        return adminRepository.dashboard();

    }

    async createUser(data: any) {

        const exists = await adminRepository.findUserByEmail(

            data.email

        );

        if (exists) {

            throw new Error(

                "Email already exists"

            );

        }

        data.password = await hashPassword(

            data.password

        );

        return adminRepository.createUser(data);

    }

    async createStore(data: any) {

        const email = await adminRepository.findStoreByEmail(

            data.email

        );

        if (email) {

            throw new Error(

                "Store email already exists"

            );

        }

        const owner = await adminRepository.getStoreOwner(

            data.ownerId

        );

        if (!owner) {

            throw new Error(

                "Store owner not found"

            );

        }

        if (

            owner.role !== UserRole.STORE_OWNER

        ) {

            throw new Error(

                "Selected user is not Store Owner"

            );

        }

        return adminRepository.createStore(

            data

        );

    }

    async getUsers(query: any) {

        return adminRepository.getUsers(

            query

        );

    }

    async getStores(query: any) {

        const stores = await adminRepository.getStores(query);

        const rows = await Promise.all(

            stores.rows.map(async (store: any) => {

                const average = await adminRepository.getAverageRating(

                    store.id

                );

                return {

                    ...store.toJSON(),

                    rating:

                        Number(

                            average?.averageRating || 0

                        ).toFixed(1)

                };

            })

        );

        return {

            count: stores.count,

            rows

        };

    }

    async getUserDetails(id: number) {

        const user = await adminRepository.getUserById(id);

        if (!user) {

            throw new Error(

                "User not found"

            );

        }

        const response = user.toJSON();

        if (response.stores) {

            response.stores = await Promise.all(

                response.stores.map(async (store: any) => {

                    const average = await adminRepository.getAverageRating(

                        store.id

                    );

                    return {

                        ...store,

                        averageRating:

                            Number(

                                average?.averageRating || 0

                            ).toFixed(1)

                    };

                })

            );

        }

        return response;

    }

    async getStoreDetails(id: number) {

        const store = await adminRepository.getStoreById(id);

        if (!store) {

            throw new Error(

                "Store not found"

            );

        }

        return store;

    }

}

export default new AdminService();