import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getStores } from "../../services/admin.service";

import Loader from "../../components/common/Loader";
import Table, { type Column } from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";

import CreateStoreModal from "../../components/admin/CreateStoreModal";

interface Store {
    id: number;
    name: string;
    email: string;
    address: string;
    rating: string;
}

function Stores() {

    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const [filters, setFilters] = useState({

        name: "",

        email: "",

        address: ""

    });

    const [sortBy, setSortBy] = useState<keyof Store>("name");

    const [order, setOrder] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading } = useQuery({

        queryKey: [

            "stores",

            page,

            filters,

            sortBy,

            order

        ],

        queryFn: () =>

            getStores({

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

    const columns: Column<Store>[] = [

        {
            key: "name",
            label: "Store Name",
            sortable: true
        },

        {
            key: "email",
            label: "Email"
        },

        {
            key: "address",
            label: "Address"
        },

        {
            key: "rating",
            label: "Rating"
        }

    ];

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    Stores

                </h1>

                <Button
                    onClick={() => setShowModal(true)}
                >
                    + Create Store
                </Button>

            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-8">

                <h2 className="text-xl font-semibold mb-4">

                    Filters

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        className="border rounded-lg px-3 py-2"
                        placeholder="Store Name"
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

                </div>

                <div className="flex justify-end mt-5">

                    <Button
                        variant="secondary"
                        onClick={() =>
                            setFilters({

                                name: "",

                                email: "",

                                address: ""

                            })
                        }
                    >
                        Reset Filters
                    </Button>

                </div>

            </div>

            <Table<Store>

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

            <CreateStoreModal

                open={showModal}

                onClose={() =>

                    setShowModal(false)

                }

            />

        </div>

    );

}

export default Stores;