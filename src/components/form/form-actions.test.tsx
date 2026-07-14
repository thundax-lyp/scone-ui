import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeFormActions } from "./form-actions";

describe("SconeFormActions", () => {
    it("renders aligned sticky actions with wrapping layout", () => {
        render(
            <SconeFormActions align="start" sticky>
                <button>Cancel</button>
                <button>Save</button>
            </SconeFormActions>,
        );

        const actions = screen.getByRole("button", { name: "Cancel" }).parentElement;

        expect(actions).toHaveAttribute("data-align", "start");
        expect(actions).toHaveAttribute("data-sticky", "true");
        expect(actions).toHaveClass("flex", "flex-wrap", "justify-start", "sticky");
    });

    it("passes ref and className to the actions container", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeFormActions ref={ref} className="custom-actions">
                <button>Save</button>
            </SconeFormActions>,
        );

        expect(ref.current).toHaveClass("custom-actions");
    });
});
