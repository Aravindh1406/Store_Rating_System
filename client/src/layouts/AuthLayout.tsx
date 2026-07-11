import { Outlet } from "react-router-dom";

function AuthLayout() {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px"
            }}
        >

            <Outlet />

        </div>

    );

}

export default AuthLayout;