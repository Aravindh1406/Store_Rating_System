import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../services/admin.service";

import Loader from "../../components/common/Loader";
import Table, { type Column } from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";

import CreateUserModal from "../../components/admin/CreateUserModal";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    address: string;
}

function Users() {

    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const [filters, setFilters] = useState({
        name: "",
        email: "",
        address: "",
        role: ""
    });

    const [sortBy, setSortBy] = useState<keyof User>("name");

    const [order, setOrder] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading } = useQuery({

        queryKey: [
            "users",
            page,
            filters,
            sortBy,
            order
        ],

        queryFn: () =>
            getUsers({

                page,

                limit: 10,

                ...filters,

                sortBy,

                order

            })

    });

    if (isLoading) {

        return <Loader />;

    }

    const columns: Column<User>[] = [

        {
            key: "name",
            label: "Name",
            sortable: true
        },

        {
            key: "email",
            label: "Email"
        },

        {
            key: "role",
            label: "Role"
        },

        {
            key: "address",
            label: "Address"
        }

    ];

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    Users

                </h1>

                <Button
                    onClick={() => setShowModal(true)}
                >
                    + Create User
                </Button>

            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-8">

                <h2 className="text-xl font-semibold mb-4">

                    Filters

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <input
                        className="border rounded-lg px-3 py-2"
                        placeholder="Name"
                        value={filters.name}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        className="border rounded-lg px-3 py-2"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        className="border rounded-lg px-3 py-2"
                        placeholder="Address"
                        value={filters.address}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                address: e.target.value
                            })
                        }
                    />

                    <select
                        className="border rounded-lg px-3 py-2"
                        value={filters.role}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                role: e.target.value
                            })
                        }
                    >

                        <option value="">

                            All Roles

                        </option>

                        <option value="ADMIN">

                            Admin

                        </option>

                        <option value="USER">

                            User

                        </option>

                        <option value="STORE_OWNER">

                            Store Owner

                        </option>

                    </select>

                </div>

                <div className="flex justify-end mt-5">

                    <Button
                        variant="secondary"
                        onClick={() =>
                            setFilters({
                                name: "",
                                email: "",
                                address: "",
                                role: ""
                            })
                        }
                    >
                        Reset Filters
                    </Button>

                </div>

            </div>

            <Table<User>

                columns={columns}

                data={data.data.rows}

                onSort={(key) => {

                    setSortBy(key);

                    setOrder(

                        order === "ASC"

                            ? "DESC"

                            : "ASC"

                    );

                }}

                renderActions={(user) => (

                    <Link

                        to={`/admin/users/${user.id}`}

                        className="text-blue-600 hover:text-blue-800 hover:underline"

                    >

                        View

                    </Link>

                )}

            />

            <Pagination

                page={page}

                disablePrevious={page === 1}

                onPrevious={() =>

                    setPage(page - 1)

                }

                onNext={() =>

                    setPage(page + 1)

                }

            />

            <CreateUserModal

                open={showModal}

                onClose={() =>

                    setShowModal(false)

                }

            />

        </div>

    );

}

export default Users;