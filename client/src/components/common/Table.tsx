import React from "react";

export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onSort?: (key: keyof T) => void;
    renderActions?: (row: T) => React.ReactNode;
}

function Table<T extends { id: number }>({
    columns,
    data,
    onSort,
    renderActions,
}: TableProps<T>) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        {columns.map((column) => (

                            <th
                                key={String(column.key)}
                                className="p-4 text-left font-semibold cursor-pointer"
                                onClick={() =>
                                    column.sortable &&
                                    onSort?.(column.key)
                                }
                            >
                                {column.label}
                            </th>

                        ))}

                        {renderActions && (

                            <th className="p-4">

                                Action

                            </th>

                        )}

                    </tr>

                </thead>

                <tbody>

                    {data.map((row) => (

                        <tr
                            key={row.id}
                            className="border-t hover:bg-slate-50"
                        >

                            {columns.map((column) => (

                                <td
                                    key={String(column.key)}
                                    className="p-4"
                                >
                                    {String(row[column.key])}
                                </td>

                            ))}

                            {renderActions && (

                                <td className="p-4">

                                    {renderActions(row)}

                                </td>

                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Table;