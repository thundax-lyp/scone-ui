import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

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
        expect(stack).toHaveClass("flex", "flex-col", "gap-md", "items-stretch");
    });

    it("passes root attributes, className, style, event handlers, and ref to the root container", () => {
        const ref = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();

        render(
            <SconeStack
                ref={ref}
                id="content-stack"
                role="group"
                aria-label="Content stack"
                data-testid="stack-root"
                data-scone-layout="caller"
                onClick={onClick}
                gap="lg"
                align="center"
                className="custom-stack"
                style={{ width: 240 }}
            >
                <span>Content</span>
            </SconeStack>,
        );

        const stack = screen.getByTestId("stack-root");

        stack.click();

        expect(ref.current).toBe(stack);
        expect(ref.current).toHaveClass("custom-stack", "gap-lg", "items-center");
        expect(ref.current).toHaveAttribute("id", "content-stack");
        expect(ref.current).toHaveAttribute("role", "group");
        expect(ref.current).toHaveAttribute("aria-label", "Content stack");
        expect(ref.current).toHaveAttribute("data-scone-layout", "stack");
        expect(ref.current).toHaveStyle({ width: "240px" });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
