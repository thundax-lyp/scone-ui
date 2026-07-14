import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeFieldGroup } from "./field-group";

describe("SconeFieldGroup", () => {
    it("renders a semantic group with title, description, and columns", () => {
        render(
            <SconeFieldGroup title="Profile" description="Visible account fields" columns={2}>
                <input aria-label="First name" />
                <input aria-label="Last name" />
            </SconeFieldGroup>,
        );

        const group = screen.getByRole("group", { name: "Profile" });

        expect(group).toHaveAttribute("data-columns", "2");
        expect(screen.getByText("Visible account fields")).toBeInTheDocument();
        expect(screen.getByLabelText("First name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    });

    it("passes ref and className to the fieldset", () => {
        const ref = React.createRef<HTMLFieldSetElement>();

        render(
            <SconeFieldGroup ref={ref} title="Profile" className="custom-group">
                <input aria-label="Name" />
            </SconeFieldGroup>,
        );

        expect(ref.current).toHaveClass("custom-group");
    });
});
