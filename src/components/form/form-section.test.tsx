import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeFormSection } from "./form-section";

describe("SconeFormSection", () => {
    it("renders title, description, local actions, and content", () => {
        render(
            <SconeFormSection
                title="Profile"
                description="Manage visible profile fields"
                actions={<button>Edit</button>}
            >
                <input aria-label="Name" />
            </SconeFormSection>,
        );

        expect(screen.getByRole("heading", { name: "Profile" })).toBeInTheDocument();
        expect(screen.getByText("Manage visible profile fields")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    it("passes ref and className to the section", () => {
        const ref = React.createRef<HTMLElement>();

        render(
            <SconeFormSection ref={ref} title="Profile" className="custom-section">
                Content
            </SconeFormSection>,
        );

        expect(ref.current).toHaveClass("custom-section");
    });
});
