import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeButton } from "./button";

describe("SconeButton", () => {
    it("fires click events in the normal state", () => {
        const handleClick = vi.fn();

        render(<SconeButton onClick={handleClick}>Save</SconeButton>);
        fireEvent.click(screen.getByRole("button", { name: "Save" }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents repeat clicks while loading", () => {
        const handleClick = vi.fn();

        render(
            <SconeButton loading onClick={handleClick}>
                Save
            </SconeButton>,
        );

        const button = screen.getByRole("button", { name: "Save" });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-busy", "true");
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("passes ariaLabel to icon-only buttons", () => {
        render(<SconeButton ariaLabel="Refresh">↻</SconeButton>);

        expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
    });

    it("passes ref and className through asChild", () => {
        const ref = React.createRef<HTMLButtonElement>();

        render(
            <SconeButton ref={ref} asChild className="custom-button">
                <a href="/settings">Settings</a>
            </SconeButton>,
        );

        expect(ref.current).toBe(screen.getByRole("link", { name: "Settings" }));
        expect(ref.current).toHaveClass("custom-button");
    });
});
