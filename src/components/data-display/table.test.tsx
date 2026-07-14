import { fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeTable, type SconeTableColumn } from "./table";

interface Row {
    id: string;
    name: string;
    status: string;
    nested?: {
        owner: string;
    };
}

const rows: Row[] = [
    { id: "1", name: "Alpha", status: "ready", nested: { owner: "Ada" } },
    { id: "2", name: "Beta", status: "blocked", nested: { owner: "Lin" } },
];

const columns: SconeTableColumn<Row>[] = [
    { key: "name", title: "Name", dataIndex: "name", width: 160, sortable: true },
    {
        key: "owner",
        title: "Owner",
        dataIndex: ["nested", "owner"],
        render: (value) => <strong>{String(value)}</strong>,
    },
];

describe("SconeTable", () => {
    it("renders a named table with columns, rowKey, dataIndex, and cell render", () => {
        render(
            <SconeTable
                ariaLabel="Project table"
                columns={columns}
                dataSource={rows}
                rowKey="id"
            />,
        );

        const table = screen.getByRole("table", { name: "Project table" });

        expect(within(table).getByRole("columnheader", { name: "Name ↕" })).toBeInTheDocument();
        expect(within(table).getByText("Alpha")).toBeInTheDocument();
        expect(within(table).getByText("Ada").tagName).toBe("STRONG");
    });

    it("uses loading before error and empty states", () => {
        const { rerender } = render(
            <SconeTable
                ariaLabel="State table"
                columns={columns}
                dataSource={[]}
                rowKey="id"
                loading
                renderError="Failed"
                renderEmpty="Nothing"
            />,
        );

        expect(screen.getByRole("status")).toHaveTextContent("Loading");
        expect(screen.queryByText("Failed")).not.toBeInTheDocument();
        expect(screen.queryByText("Nothing")).not.toBeInTheDocument();

        rerender(
            <SconeTable
                ariaLabel="State table"
                columns={columns}
                dataSource={[]}
                rowKey="id"
                renderError="Failed"
                renderEmpty="Nothing"
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("Failed");
        expect(screen.queryByText("Nothing")).not.toBeInTheDocument();
    });

    it("renders empty state after loading and error are absent", () => {
        render(
            <SconeTable
                ariaLabel="Empty table"
                columns={columns}
                dataSource={[]}
                rowKey="id"
                renderEmpty={() => "No rows"}
            />,
        );

        expect(screen.getByText("No rows")).toBeInTheDocument();
    });

    it("passes row and cell DOM attributes without owning business behavior", () => {
        const onRowClick = vi.fn();
        const onCellClick = vi.fn();

        render(
            <SconeTable
                ariaLabel="Interactive table"
                columns={columns}
                dataSource={rows}
                rowKey={(record) => record.id}
                onRow={(record) => ({
                    "aria-selected": record.id === "1",
                    onClick: onRowClick,
                })}
                onCell={() => ({
                    "aria-label": "Open cell",
                    onClick: onCellClick,
                })}
            />,
        );

        const firstCell = screen.getAllByLabelText("Open cell")[0];

        fireEvent.click(firstCell);
        fireEvent.click(firstCell.closest("tr") as HTMLTableRowElement);

        expect(onCellClick).toHaveBeenCalled();
        expect(onRowClick).toHaveBeenCalled();
        expect(firstCell.closest("tr")).toHaveAttribute("aria-selected", "true");
    });

    it("applies horizontal scroll, density, ref, and className", () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <SconeTable
                ref={ref}
                className="custom-table"
                ariaLabel="Wide table"
                columns={columns}
                dataSource={rows}
                rowKey="id"
                scroll={{ x: 960 }}
                density="compact"
            />,
        );

        expect(ref.current).toHaveClass("custom-table", "overflow-x-auto");
        expect(screen.getByRole("table", { name: "Wide table" })).toHaveStyle({
            minWidth: "960px",
        });
        expect(screen.getByRole("table", { name: "Wide table" })).toHaveClass("[&_td]:py-1.5");
    });
});
