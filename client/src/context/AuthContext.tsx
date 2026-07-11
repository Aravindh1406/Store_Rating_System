import {

    createContext,

    useState,

    useEffect,

    type ReactNode

} from "react";

import type {

    AuthContextType,

    LoginResponse,

    User

} from "../types/auth";

import { authStore } from "../store/authStore";

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {

    children: ReactNode;

}

export const AuthProvider = ({

    children

}: Props) => {

    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        setUser(

            authStore.getUser()

        );

        setToken(

            authStore.getToken()

        );

    }, []);

    const login = (

        data: LoginResponse["data"]

    ) => {

        authStore.saveToken(

            data.token

        );

        authStore.saveUser(

            data.user

        );

        setToken(

            data.token

        );

        setUser(

            data.user

        );

    };

    const logout = () => {

        authStore.removeToken();

        authStore.removeUser();

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                login,

                logout,

                isAuthenticated: !!token

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export default AuthContext;