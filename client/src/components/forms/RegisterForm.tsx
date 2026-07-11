import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {

    registerSchema,


} from "../../schemas/register.schema";

import type {


    RegisterFormData

} from "../../schemas/register.schema";

import {

    register as registerUser

} from "../../services/auth.service";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function RegisterForm() {

    const navigate = useNavigate();

    const {

        register,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm<RegisterFormData>({

        resolver: zodResolver(registerSchema)

    });

    const onSubmit = async (

        data: RegisterFormData

    ) => {

        try {

            const response = await registerUser(data);

            toast.success(response.message);

            navigate("/");

        }

        catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );

        }

    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <input

                placeholder="Name"

                {...register("name")}

            />

            <p>{errors.name?.message}</p>

            <input

                placeholder="Email"

                {...register("email")}

            />

            <p>{errors.email?.message}</p>

            <input

                placeholder="Address"

                {...register("address")}

            />

            <p>{errors.address?.message}</p>

            <input

                type="password"

                placeholder="Password"

                {...register("password")}

            />

            <p>{errors.password?.message}</p>

            <button type="submit">

                Register

            </button>

        </form>

    );

}

export default RegisterForm;