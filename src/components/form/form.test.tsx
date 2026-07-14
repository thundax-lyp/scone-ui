import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeField } from "./field";
import { SconeForm } from "./form";

describe("SconeForm and SconeField", () => {
    it("links label, description, message, required, and invalid state to the control", () => {
        render(
            <SconeForm requiredMark>
                <SconeField.Root
                    id="email"
                    name="email"
                    label="Email"
                    description="Use a work email."
                    message="Email is required."
                    required
                    invalid
                >
                    <SconeField.Control>
                        <input />
                    </SconeField.Control>
                </SconeField.Root>
            </SconeForm>,
        );

        const input = screen.getByLabelText("Email *");
        const description = screen.getByText("Use a work email.");
        const message = screen.getByRole("alert");

        expect(input).toHaveAttribute("id", "email");
        expect(input).toHaveAttribute("name", "email");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-required", "true");
        expect(input).toHaveAttribute("aria-describedby", `${description.id} ${message.id}`);
        expect(message).toHaveTextContent("Email is required.");
    });

    it("lets field state override form disabled and readOnly context", () => {
        render(
            <SconeForm disabled readOnly>
                <SconeField.Root id="enabled-name" disabled={false} readOnly={false}>
                    <SconeField.Label>Name</SconeField.Label>
                    <SconeField.Control>
                        <input />
                    </SconeField.Control>
                </SconeField.Root>
                <SconeField.Root id="disabled-name">
                    <SconeField.Label>Disabled name</SconeField.Label>
                    <SconeField.Control>
                        <input />
                    </SconeField.Control>
                </SconeField.Root>
            </SconeForm>,
        );

        expect(screen.getByLabelText("Name")).not.toBeDisabled();
        expect(screen.getByLabelText("Name")).not.toHaveAttribute("readonly");
        expect(screen.getByLabelText("Disabled name")).toBeDisabled();
        expect(screen.getByLabelText("Disabled name")).toHaveAttribute("readonly");
    });

    it("exposes the compound parts with stable refs", () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const labelRef = React.createRef<HTMLLabelElement>();

        render(
            <SconeField.Root ref={rootRef} id="title" className="custom-field">
                <SconeField.Label ref={labelRef}>Title</SconeField.Label>
                <SconeField.Control>
                    <input />
                </SconeField.Control>
            </SconeField.Root>,
        );

        expect(rootRef.current).toHaveClass("custom-field");
        expect(labelRef.current).toBe(screen.getByText("Title"));
        expect(screen.getByLabelText("Title")).toHaveAttribute("id", "title");
    });
});
