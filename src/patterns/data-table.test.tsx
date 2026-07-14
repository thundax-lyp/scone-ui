import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTable, type DataTableAction } from "./data-table";

interface Row {
    id: string;
    name: string;
}

const rows: Row[] = [
    { id: "1", name: "Alpha" },
    { id: "2", name: "Beta" },
];

const columns = [{ key: "name", title: "Name", dataIndex: "name" as const }];

describe("DataTable", () => {
    it("renders Root and FilterBar as layout and slot boundaries", () => {
        render(
            <DataTable.Root density="compact">
                <DataTable.FilterBar>
                    <label htmlFor="query">Query</label>
                    <input id="query" />
                </DataTable.FilterBar>
            </DataTable.Root>,
        );

        expect(screen.getByLabelText("Query")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Query").closest("[data-scone-pattern='data-table']"),
        ).toHaveAttribute("data-density", "compact");
        expect(
            screen.getByLabelText("Query").closest("[data-scone-data-table-part='filter-bar']"),
        ).toBeInTheDocument();
    });

    it("reuses SconeToolbar and derives selected count from Root selection", () => {
        const actions: DataTableAction[] = [{ key: "create", label: "Create" }];

        render(
            <DataTable.Root rowSelection={{ selectedRowKeys: ["1", "2"] }}>
                <DataTable.Toolbar title="Users" start="Filtered" end="Columns" actions={actions} />
            </DataTable.Root>,
        );

        expect(
            screen.getByText("Users").closest("[data-scone-layout='toolbar']"),
        ).toBeInTheDocument();
        expect(screen.getByText("Filtered")).toBeInTheDocument();
        expect(screen.getByText("Columns")).toBeInTheDocument();
        expect(screen.getByText("2 selected")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    });

    it("renders action buttons with click and disabled states", () => {
        const enabled = vi.fn();
        const disabled = vi.fn();

        render(
            <DataTable.Root>
                <DataTable.Toolbar
                    actions={[
                        { key: "enabled", label: "Enabled", onClick: enabled },
                        { key: "disabled", label: "Disabled", onClick: disabled, disabled: true },
                    ]}
                />
            </DataTable.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Enabled" }));
        fireEvent.click(screen.getByRole("button", { name: "Disabled" }));

        expect(enabled).toHaveBeenCalledTimes(1);
        expect(disabled).not.toHaveBeenCalled();
        expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    });

    it("hides BulkActions without selection and clears Root selection by default", () => {
        const onChange = vi.fn();
        const action = vi.fn();

        const { rerender } = render(
            <DataTable.Root rowSelection={{ selectedRowKeys: [], onChange }}>
                <DataTable.BulkActions
                    actions={[{ key: "archive", label: "Archive", onClick: action }]}
                />
            </DataTable.Root>,
        );

        expect(screen.queryByRole("button", { name: "Archive" })).not.toBeInTheDocument();

        rerender(
            <DataTable.Root rowSelection={{ selectedRowKeys: ["1"], onChange }}>
                <DataTable.BulkActions
                    actions={[{ key: "archive", label: "Archive", onClick: action }]}
                />
            </DataTable.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Archive" }));
        fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));

        expect(action).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([], []);
    });

    it("uses explicit BulkActions selected keys and clear handler before context", () => {
        const onChange = vi.fn();
        const onClearSelection = vi.fn();

        render(
            <DataTable.Root rowSelection={{ selectedRowKeys: [], onChange }}>
                <DataTable.BulkActions
                    selectedKeys={["a"]}
                    selectedRows={[{ id: "a" }]}
                    onClearSelection={onClearSelection}
                    actions={[{ key: "export", label: "Export" }]}
                />
            </DataTable.Root>,
        );

        expect(screen.getByText("1 selected")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));

        expect(onClearSelection).toHaveBeenCalledTimes(1);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("renders TableRegion states with loading, error, and empty priority", () => {
        const { rerender } = render(
            <DataTable.Root>
                <DataTable.TableRegion
                    columns={columns}
                    dataSource={[]}
                    rowKey="id"
                    loading
                    error="Failed"
                    empty="No rows"
                />
            </DataTable.Root>,
        );

        expect(screen.getByRole("status")).toHaveTextContent("Loading");
        expect(screen.queryByText("Failed")).not.toBeInTheDocument();
        expect(screen.queryByText("No rows")).not.toBeInTheDocument();

        rerender(
            <DataTable.Root>
                <DataTable.TableRegion
                    columns={columns}
                    dataSource={[]}
                    rowKey="id"
                    error="Failed"
                    empty="No rows"
                />
            </DataTable.Root>,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("Failed");
        expect(screen.queryByText("No rows")).not.toBeInTheDocument();

        rerender(
            <DataTable.Root>
                <DataTable.TableRegion
                    columns={columns}
                    dataSource={[]}
                    rowKey="id"
                    empty="No rows"
                />
            </DataTable.Root>,
        );

        expect(screen.getByText("No rows")).toBeInTheDocument();
    });

    it("injects selection checkboxes in data mode and skips disabled rows for select all", () => {
        const onChange = vi.fn();

        render(
            <DataTable.Root
                rowSelection={{
                    selectedRowKeys: ["1"],
                    onChange,
                    getCheckboxProps: (record: Row) => ({
                        disabled: record.id === "2",
                        ariaLabel: `Select ${record.name}`,
                    }),
                }}
            >
                <DataTable.TableRegion
                    ariaLabel="Users table"
                    columns={columns}
                    dataSource={rows}
                    rowKey="id"
                />
            </DataTable.Root>,
        );

        expect(screen.getByRole("table", { name: "Users table" })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBeChecked();
        expect(screen.getByRole("checkbox", { name: "Select Beta" })).toBeDisabled();

        fireEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));

        expect(onChange).toHaveBeenCalledWith([], []);
    });

    it("updates row selection from row checkbox changes", () => {
        const onChange = vi.fn();

        render(
            <DataTable.Root rowSelection={{ selectedRowKeys: [], onChange }}>
                <DataTable.TableRegion columns={columns} dataSource={rows} rowKey="id" />
            </DataTable.Root>,
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));

        expect(onChange).toHaveBeenCalledWith(["1"], [rows[0]]);
    });

    it("keeps children mode as an escape hatch without selection injection", () => {
        render(
            <DataTable.Root rowSelection={{ selectedRowKeys: ["1"] }}>
                <DataTable.TableRegion>
                    <div>Custom table</div>
                </DataTable.TableRegion>
            </DataTable.Root>,
        );

        expect(screen.getByText("Custom table")).toBeInTheDocument();
        expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });

    it("renders DataTable.Pagination from Root context and allows prop overrides", () => {
        const rootChange = vi.fn();
        const propChange = vi.fn();

        const { rerender } = render(
            <DataTable.Root
                pagination={{ page: 1, pageSize: 10, total: 30 }}
                onPaginationChange={rootChange}
            >
                <DataTable.Pagination />
            </DataTable.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(rootChange).toHaveBeenCalledWith({ page: 2, pageSize: 10, total: 30 }, "page");

        rerender(
            <DataTable.Root
                pagination={{ page: 1, pageSize: 10, total: 30 }}
                onPaginationChange={rootChange}
            >
                <DataTable.Pagination
                    state={{ page: 2, pageSize: 10, total: 30 }}
                    onChange={propChange}
                />
            </DataTable.Root>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(propChange).toHaveBeenCalledWith({ page: 3, pageSize: 10, total: 30 }, "page");
    });
});
