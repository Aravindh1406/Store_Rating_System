export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    address: string;
    password: string;
}

export interface User {

    id: number;

    name: string;

    email: string;

    role: "ADMIN" | "USER" | "STORE_OWNER";

}

export interface LoginResponse {

    success: boolean;

    message: string;

    data: {

        token: string;

        user: User;

    };

}

export interface AuthContextType {

    user: User | null;

    token: string | null;

    login: (response: LoginResponse["data"]) => void;

    logout: () => void;

    isAuthenticated: boolean;

}