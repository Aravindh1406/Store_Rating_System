import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

import { createUser } from "../../services/admin.service";

import {
    createUserSchema,
} from "../../schemas/createUser.schema";

import type {
    CreateUserForm
} from "../../schemas/createUser.schema";

interface Props {
    open: boolean;
    onClose: () => void;
}

function CreateUserModal({
    open,
    onClose
}: Props) {

    const queryClient = useQueryClient();

    const {

        register,

        handleSubmit,

        reset,

        formState: {
            errors
        }

    } = useForm<CreateUserForm>({

        resolver: zodResolver(createUserSchema),

        defaultValues: {

            role: "USER"

        }

    });

    useEffect(() => {

        if (open) {

            reset();

        }

    }, [open, reset]);

    const mutation = useMutation({

        mutationFn: createUser,

        onSuccess: (response) => {

            toast.success(

                response.message ||
                "User created successfully"

            );

            queryClient.invalidateQueries({

                queryKey: ["users"]

            });

            reset();

            onClose();

        },

        onError: (error: any) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to create user"

            );

        }

    });

    const onSubmit = (

        data: CreateUserForm

    ) => {

        mutation.mutate(data);

    };

    return (

        <Modal

            open={open}

            title="Create User"

            onClose={onClose}

        >

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="space-y-5"

            >

                <Input

                    label="Name"

                    placeholder="Enter full name"

                    {...register("name")}

                    error={errors.name?.message}

                />

                <Input

                    label="Email"

                    placeholder="Enter email"

                    {...register("email")}

                    error={errors.email?.message}

                />

                <Input

                    label="Address"

                    placeholder="Enter address"

                    {...register("address")}

                    error={errors.address?.message}

                />

                <Input

                    type="password"

                    label="Password"

                    placeholder="Enter password"

                    {...register("password")}

                    error={errors.password?.message}

                />

                <div>

                    <label className="block mb-2 font-medium">

                        Role

                    </label>

                    <select

                        className="w-full border rounded-lg p-3"

                        {...register("role")}

                    >

                        <option value="USER">

                            User

                        </option>

                        <option value="ADMIN">

                            Admin

                        </option>

                        <option value="STORE_OWNER">

                            Store Owner

                        </option>

                    </select>

                </div>

                <div className="flex justify-end gap-3 pt-3">

                    <Button

                        type="button"

                        variant="secondary"

                        onClick={onClose}

                    >

                        Cancel

                    </Button>

                    <Button

                        type="submit"

                        disabled={mutation.isPending}

                    >

                        {

                            mutation.isPending

                                ? "Creating..."

                                : "Create User"

                        }

                    </Button>

                </div>

            </form>

        </Modal>

    );

}

export default CreateUserModal;