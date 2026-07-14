import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { SconeStack } from "./stack";

describe("SconeStack", () => {
    it("renders a vertical stack with token gap and default stretch alignment", () => {
        render(
            <SconeStack>
                <span>First</span>
                <span>Second</span>
            </SconeStack>,
        );

        const stack = screen.getByText("First").parentElement;

        expect(stack).toHaveAttribute("data-scone-layout", "stack");
        expect(stack).toHaveAttribute("data-gap", "md");
        expect(stack).toHaveAttribute("data-align", "stretch");
        expect(stack).toHaveClass(
            "flex",
            "flex-col",
            "gap-[var(--scone-spacing-md)]",
            "items-stretch",
        );
    });

    it("passes className, style, and ref to the root container", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeStack
                ref={ref}
                gap="lg"
                align="center"
                className="custom-stack"
                style={{ width: 240 }}
            >
                <span>Content</span>
            </SconeStack>,
        );

        expect(ref.current).toBe(screen.getByText("Content").parentElement);
        expect(ref.current).toHaveClass(
            "custom-stack",
            "gap-[var(--scone-spacing-lg)]",
            "items-center",
        );
        expect(ref.current).toHaveStyle({ width: "240px" });
    });
});
