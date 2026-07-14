import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTable, type DataTableAction } from "./data-table";

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
});
