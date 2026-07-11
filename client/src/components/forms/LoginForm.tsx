import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type {
    LoginFormData
} from "../../schemas/login.schema";
import  {
    loginSchema,
} from "../../schemas/login.schema";

import { login } from "../../services/auth.service";

import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function LoginForm() {

    const navigate = useNavigate();

    const { login: loginUser } = useAuth();

    const {

        register,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm<LoginFormData>({

        resolver: zodResolver(loginSchema)

    });

    const onSubmit = async (

        data: LoginFormData

    ) => {

        try {

            const response = await login(data);

            loginUser(response.data);

            toast.success(response.message);

            if (response.data.user.role === "ADMIN") {

                navigate("/admin");

            }

            else if (

                response.data.user.role === "STORE_OWNER"

            ) {

                navigate("/store-owner");

            }

            else {

                navigate("/user");

            }

        }

        catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        }

    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <input

                placeholder="Email"

                {...register("email")}

            />

            <p>{errors.email?.message}</p>

            <input

                type="password"

                placeholder="Password"

                {...register("password")}

            />

            <p>{errors.password?.message}</p>

            <button type="submit">

                Login

            </button>

        </form>

    );

}

export default LoginForm;