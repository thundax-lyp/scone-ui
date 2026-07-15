import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeTree } from "./tree";

const treeData = [
    {
        key: "root",
        title: "Root",
        children: [
            { key: "child-a", title: "Child A" },
            { key: "child-b", title: "Child B", disabled: true },
            { key: "child-c", title: "Child C", disableCheckbox: true },
        ],
    },
    { key: "logs", title: "Logs" },
];

describe("SconeTree", () => {
    it("renders ARIA tree semantics and visible expanded nodes", () => {
        render(<SconeTree treeData={treeData} defaultExpandedKeys={["root"]} />);

        expect(screen.getByRole("tree", { name: "Tree" })).toBeInTheDocument();
        expect(screen.getByRole("treeitem", { name: /Root/ })).toHaveAttribute(
            "aria-expanded",
            "true",
        );
        expect(screen.getByRole("treeitem", { name: "Child A" })).toHaveAttribute(
            "aria-level",
            "2",
        );
    });

    it("selects nodes in single and multiple modes", () => {
        const onSelect = vi.fn();

        render(<SconeTree treeData={treeData} multiple onSelect={onSelect} />);

        fireEvent.click(screen.getByRole("treeitem", { name: "Logs" }));

        expect(onSelect).toHaveBeenCalledWith(["logs"], {
            node: treeData[1],
            selected: true,
        });
        expect(screen.getByRole("treeitem", { name: "Logs" })).toHaveAttribute(
            "aria-selected",
            "true",
        );
    });

    it("checks nodes and respects disabled checkbox state", () => {
        const onCheck = vi.fn();

        render(
            <SconeTree
                treeData={treeData}
                checkable
                defaultExpandedKeys={["root"]}
                onCheck={onCheck}
            />,
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Check Child A" }));
        fireEvent.click(screen.getByRole("checkbox", { name: "Check Child C" }));

        expect(onCheck).toHaveBeenCalledWith(["child-a"], {
            node: treeData[0].children?.[0],
            checked: true,
        });
        expect(screen.getByRole("checkbox", { name: "Check Child C" })).toBeDisabled();
    });

    it("expands and collapses nodes from the control", () => {
        const onExpand = vi.fn();

        render(<SconeTree treeData={treeData} onExpand={onExpand} />);

        fireEvent.click(screen.getByRole("button", { name: "Expand node" }));

        expect(onExpand).toHaveBeenCalledWith(["root"], {
            node: treeData[0],
            expanded: true,
        });
        expect(screen.getByRole("treeitem", { name: "Child A" })).toBeInTheDocument();
    });

    it("moves focus with keyboard controls", () => {
        render(<SconeTree treeData={treeData} defaultExpandedKeys={["root"]} />);

        const root = screen.getByRole("treeitem", { name: /Root/ });
        root.focus();
        fireEvent.keyDown(screen.getByRole("tree"), { key: "ArrowDown" });

        expect(screen.getByRole("treeitem", { name: "Child A" })).toHaveFocus();

        fireEvent.keyDown(screen.getByRole("tree"), { key: "End" });

        expect(screen.getByRole("treeitem", { name: "Logs" })).toHaveFocus();
    });

    it("does not select disabled nodes", () => {
        const onSelect = vi.fn();

        render(
            <SconeTree treeData={treeData} defaultExpandedKeys={["root"]} onSelect={onSelect} />,
        );

        fireEvent.click(screen.getByRole("treeitem", { name: "Child B" }));

        expect(onSelect).not.toHaveBeenCalled();
    });
});
