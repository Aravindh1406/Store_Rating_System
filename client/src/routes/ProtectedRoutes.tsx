import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../hooks/useAuth";

interface Props {

    children: ReactNode;

    role?: string;

}

function ProtectedRoute({

    children,

    role

}: Props) {

    const {

        isAuthenticated,

        user

    } = useAuth();

    if (!isAuthenticated) {

        return <Navigate to="/" replace />;

    }

    if (

        role &&

        user?.role !== role

    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;