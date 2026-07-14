import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeSearchInput } from "./search-input";

describe("SconeSearchInput", () => {
    it("updates search text and clears it with an accessible button", () => {
        const handleChange = vi.fn();

        render(
            <SconeSearchInput
                ariaLabel="Search users"
                defaultValue="ada"
                onValueChange={handleChange}
            />,
        );

        const input = screen.getByLabelText("Search users");
        fireEvent.change(input, { target: { value: "grace" } });
        fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

        expect(input).toHaveValue("");
        expect(handleChange).toHaveBeenNthCalledWith(1, "grace");
        expect(handleChange).toHaveBeenNthCalledWith(2, "");
    });

    it("shows loading and disables clear for readOnly inputs", () => {
        const handleChange = vi.fn();

        render(
            <SconeSearchInput
                ariaLabel="Search users"
                defaultValue="ada"
                readOnly
                loading
                onValueChange={handleChange}
            />,
        );

        expect(screen.getByLabelText("Search loading")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
    });
});
