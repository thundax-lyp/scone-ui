import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { SconeList } from "./list";

interface Item {
    id: string;
    label: string;
}

const data: Item[] = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
];

describe("SconeList", () => {
    it("renders repeated items with stable keys and caller-owned actions", () => {
        render(
            <SconeList
                dataSource={data}
                rowKey="id"
                renderItem={(item) => <button type="button">Open {item.label}</button>}
            />,
        );

        expect(screen.getByRole("button", { name: "Open Alpha" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Open Beta" })).toBeInTheDocument();
    });

    it("uses loading before error and empty states", () => {
        const { rerender } = render(
            <SconeList
                dataSource={[]}
                rowKey="id"
                loading
                renderError="Failed"
                renderEmpty="Nothing"
                renderItem={(item: Item) => item.label}
            />,
        );

        expect(screen.getByRole("status")).toHaveTextContent("Loading");
        expect(screen.queryByText("Failed")).not.toBeInTheDocument();
        expect(screen.queryByText("Nothing")).not.toBeInTheDocument();

        rerender(
            <SconeList
                dataSource={[]}
                rowKey="id"
                renderError="Failed"
                renderEmpty="Nothing"
                renderItem={(item: Item) => item.label}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("Failed");
        expect(screen.queryByText("Nothing")).not.toBeInTheDocument();
    });

    it("renders empty state after loading and error are absent", () => {
        render(
            <SconeList
                dataSource={[]}
                rowKey="id"
                renderEmpty={() => "No rows"}
                renderItem={(item: Item) => item.label}
            />,
        );

        expect(screen.getByText("No rows")).toBeInTheDocument();
    });

    it("applies density, bordered styling, ref, and className", () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <SconeList
                ref={ref}
                className="custom-list"
                bordered
                density="compact"
                dataSource={data}
                rowKey={(item) => item.id}
                renderItem={(item) => item.label}
            />,
        );

        expect(ref.current).toHaveClass("custom-list", "border", "text-xs");
    });
});
