import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../../services/admin.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";

function Dashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Total Users"
                    value={data.data.users}
                />

                <Card
                    title="Total Stores"
                    value={data.data.stores}
                />

                <Card
                    title="Total Ratings"
                    value={data.data.ratings}
                />
            </div>
        </div>
    );
}

export default Dashboard;