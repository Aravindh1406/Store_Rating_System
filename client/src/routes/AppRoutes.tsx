import {

    Routes,

    Route,

    // Navigate

} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import AdminDashboard from "../pages/Admin/Dashboard";
import UserDashboard from "../pages/User/Dashboard";
import StoreDashboard from "../pages/StoreOwner/Dashboard";

import NotFound from "../pages/Error/NotFound";

import ProtectedRoute from "./ProtectedRoutes";

import AuthLayout from "../layouts/AuthLayout";
import UserDetails from "../pages/Admin/UserDetails";
import Users from "../pages/Admin/User";
import Stores from "../pages/Admin/Stores";

function AppRoutes() {

    return (

        <Routes>

            <Route element={<AuthLayout />}>

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/register"

                    element={<Register />}

                />

            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />

                <Route
                    path="users"
                    element={<Users />}
                />

                <Route
                    path="users/:id"
                    element={<UserDetails />}
                />

                <Route

                    path="stores"

                    element={<Stores />}

                />
            </Route>

            <Route

                path="/user"

                element={

                    <ProtectedRoute role="USER">

                        <UserDashboard />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/store-owner"

                element={

                    <ProtectedRoute role="STORE_OWNER">

                        <StoreDashboard />

                    </ProtectedRoute>

                }

            />

            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}

export default AppRoutes;