import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeTabs } from "./tabs";

const items = [
    { value: "overview", label: "Overview", content: "Overview panel" },
    { value: "activity", label: "Activity", content: "Activity panel" },
    { value: "audit", label: "Audit", content: "Audit panel", disabled: true },
];

describe("SconeTabs", () => {
    it("renders item helper tabs and associated panels", () => {
        render(<SconeTabs items={items} defaultValue="overview" ariaLabel="Record views" />);

        expect(screen.getByRole("tablist", { name: "Record views" })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
            "aria-selected",
            "true",
        );
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview panel");
    });

    it("changes panels when a tab is clicked", () => {
        const onValueChange = vi.fn();

        render(<SconeTabs items={items} defaultValue="overview" onValueChange={onValueChange} />);

        fireEvent.click(screen.getByRole("tab", { name: "Activity" }));

        expect(onValueChange).toHaveBeenCalledWith("activity");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Activity panel");
    });

    it("moves focus without selection in manual activation", () => {
        const onValueChange = vi.fn();

        render(
            <SconeTabs
                items={items}
                defaultValue="overview"
                activationMode="manual"
                onValueChange={onValueChange}
            />,
        );

        const overview = screen.getByRole("tab", { name: "Overview" });
        overview.focus();
        fireEvent.keyDown(overview, { key: "ArrowRight" });

        expect(screen.getByRole("tab", { name: "Activity" })).toHaveFocus();
        expect(onValueChange).not.toHaveBeenCalled();

        fireEvent.keyDown(screen.getByRole("tab", { name: "Activity" }), { key: "Enter" });

        expect(onValueChange).toHaveBeenCalledWith("activity");
    });

    it("uses vertical keyboard orientation", () => {
        render(<SconeTabs items={items} defaultValue="overview" orientation="vertical" />);

        const overview = screen.getByRole("tab", { name: "Overview" });
        overview.focus();
        fireEvent.keyDown(overview, { key: "ArrowDown" });

        expect(screen.getByRole("tab", { name: "Activity" })).toHaveFocus();
    });

    it("supports compound children without using the items helper", () => {
        render(
            <SconeTabs defaultValue="one">
                <SconeTabs.List aria-label="Compound tabs">
                    <SconeTabs.Trigger value="one">One</SconeTabs.Trigger>
                    <SconeTabs.Trigger value="two">Two</SconeTabs.Trigger>
                </SconeTabs.List>
                <SconeTabs.Content value="one">One panel</SconeTabs.Content>
                <SconeTabs.Content value="two">Two panel</SconeTabs.Content>
            </SconeTabs>,
        );

        fireEvent.click(screen.getByRole("tab", { name: "Two" }));

        expect(screen.getByRole("tabpanel")).toHaveTextContent("Two panel");
    });
});
