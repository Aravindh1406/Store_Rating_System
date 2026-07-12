import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

import {
    createStore,
    getStoreOwners,
} from "../../services/admin.service";

import {
    createStoreSchema,
    type CreateStoreForm,
} from "../../schemas/createStore.schema";

interface Props {
    open: boolean;
    onClose: () => void;
}

interface StoreOwner {
    id: number;
    name: string;
}

function CreateStoreModal({
    open,
    onClose,
}: Props) {

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            ownerId: 0
        }
    });

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const { data: owners, isLoading: loadingOwners } = useQuery({
        queryKey: ["storeOwners"],
        queryFn: getStoreOwners,
        enabled: open,
    });

    const mutation = useMutation({
        mutationFn: createStore,

        onSuccess: (response: any) => {

            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });

            reset();

            onClose();
        },

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ??
                "Unable to create store"
            );
        },
    });

    const onSubmit: SubmitHandler<CreateStoreForm> = (data) => {
        mutation.mutate(data);
    };

    return (
        <Modal
            open={open}
            title="Create Store"
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <Input
                    label="Store Name"
                    placeholder="Enter Store Name"
                    {...register("name")}
                    error={errors.name?.message}
                />

                <Input
                    label="Email"
                    placeholder="Enter Email"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Input
                    label="Address"
                    placeholder="Enter Address"
                    {...register("address")}
                    error={errors.address?.message}
                />

                <div>
                    <label className="block mb-2 font-medium">
                        Store Owner
                    </label>

                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        {...register("ownerId")}
                    >
                        <option value={0}>
                            Select Owner
                        </option>

                        {!loadingOwners &&
                            owners?.data?.map(
                                (owner: StoreOwner) => (
                                    <option
                                        key={owner.id}
                                        value={owner.id}
                                    >
                                        {owner.name}
                                    </option>
                                )
                            )}
                    </select>

                    {errors.ownerId && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.ownerId.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">

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
                        {mutation.isPending
                            ? "Creating..."
                            : "Create Store"}
                    </Button>

                </div>
            </form>
        </Modal>
    );
}

export default CreateStoreModal;