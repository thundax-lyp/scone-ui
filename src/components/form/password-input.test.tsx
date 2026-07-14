import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconePasswordInput } from "./password-input";

describe("SconePasswordInput", () => {
    it("updates password text and toggles visibility", () => {
        const handleChange = vi.fn();

        render(
            <SconePasswordInput
                ariaLabel="Password"
                defaultValue="secret"
                onValueChange={handleChange}
            />,
        );

        const input = screen.getByLabelText("Password");
        fireEvent.change(input, { target: { value: "new-secret" } });
        expect(input).toHaveAttribute("type", "password");

        fireEvent.click(screen.getByRole("button", { name: "Show password" }));
        expect(input).toHaveAttribute("type", "text");

        fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
        expect(input).toHaveAttribute("type", "password");
        expect(handleChange).toHaveBeenCalledWith("new-secret");
    });

    it("does not toggle visibility when disabled", () => {
        render(<SconePasswordInput ariaLabel="Password" defaultValue="secret" disabled />);

        const toggle = screen.getByRole("button", { name: "Show password" });
        fireEvent.click(toggle);

        expect(toggle).toBeDisabled();
        expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    });
});
