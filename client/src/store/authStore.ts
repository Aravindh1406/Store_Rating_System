import { API } from "../utils/constants";

import type { User } from "../types/auth";

export const authStore = {

    saveToken(token: string) {

        localStorage.setItem(

            API.TOKEN_KEY,

            token

        );

    },

    getToken() {

        return localStorage.getItem(

            API.TOKEN_KEY

        );

    },

    removeToken() {

        localStorage.removeItem(

            API.TOKEN_KEY

        );

    },

    saveUser(user: User) {

        localStorage.setItem(

            "user",

            JSON.stringify(user)

        );

    },

    getUser(): User | null {

        const user = localStorage.getItem(

            "user"

        );

        return user ? JSON.parse(user) : null;

    },

    removeUser() {

        localStorage.removeItem(

            "user"

        );

    }

};