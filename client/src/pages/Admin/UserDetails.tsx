import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

import { getUsers } from "../../services/admin.service";

function Users() {

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("name");

    const [order, setOrder] = useState("ASC");

    const { data, isLoading } = useQuery({

        queryKey: [

            "users",

            page,

            search,

            sortBy,

            order

        ],

        queryFn: () =>
            getUsers(
                page,
                10,
                search,
                sortBy,
                order
            )

    });

    if (isLoading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">

                    Users

                </h1>

                <input

                    className="border rounded px-3 py-2"

                    placeholder="Search..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            <table className="w-full bg-white shadow rounded">

                <thead>

                    <tr className="bg-gray-100">

                        <th
                            className="p-3 cursor-pointer"
                            onClick={() => {

                                setSortBy("name");

                                setOrder(
                                    order === "ASC"
                                        ? "DESC"
                                        : "ASC"
                                );

                            }}
                        >
                            Name
                        </th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Address</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {data.data.rows.map((user: any) => (

                        <tr key={user.id}>

                            <td className="p-3">

                                {user.name}

                            </td>

                            <td>

                                {user.email}

                            </td>

                            <td>

                                {user.role}

                            </td>

                            <td>

                                {user.address}

                            </td>

                            <td>

                                <Link
                                    to={`/admin/users/${user.id}`}
                                    className="text-blue-600"
                                >

                                    View

                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() =>
                        setPage(page - 1)
                    }
                    disabled={page === 1}
                >

                    Previous

                </button>

                <span>

                    {page}

                </span>

                <button
                    onClick={() =>
                        setPage(page + 1)
                    }
                >

                    Next

                </button>

            </div>

        </div>

    );

}

export default Users;