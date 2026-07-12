import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};

export const getUsers = async (params: {
    page: number;
    limit: number;
    name: string;
    email: string;
    address: string;
    role: string;
    sortBy: string;
    order: string;
}) => {

    const response = await api.get("/admin/users", {
        params
    });

    return response.data;
};

export const getStores = async (params: {
    page: number;
    limit: number;
    name: string;
    email: string;
    address: string;
    sortBy: string;
    order: string;
}) => {

    const response = await api.get("/admin/stores", {
        params
    });

    return response.data;
};

export const createStore = async (data: any) => {
    const response = await api.post("/admin/stores", data);
    return response.data;
};

export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    address: string;
    role: string;
}) => {
    const response = await api.post("/admin/users", data);
    return response.data;
};

export const getStoreOwners = async () => {

    const response = await api.get(

        "/admin/store-owners"

    );

    return response.data;

};