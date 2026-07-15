import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeTag } from "./tag";

describe("SconeTag", () => {
    it("renders short text with a neutral tone by default", () => {
        render(<SconeTag>Draft</SconeTag>);

        const tag = screen.getByText("Draft").parentElement;

        expect(tag).toHaveClass("border-border", "bg-muted", "text-muted-foreground");
    });

    it("maps semantic tone without embedding business vocabulary", () => {
        render(<SconeTag tone="success">Ready</SconeTag>);

        expect(screen.getByText("Ready").parentElement).toHaveClass("text-emerald-700");
    });

    it("calls onClose from an accessible close button", () => {
        const onClose = vi.fn();

        render(
            <SconeTag closable onClose={onClose}>
                Archived
            </SconeTag>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Close tag" }));

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Archived")).toBeInTheDocument();
    });

    it("forwards refs and className to the tag root", () => {
        const ref = createRef<HTMLSpanElement>();

        render(
            <SconeTag ref={ref} className="custom-tag">
                Flag
            </SconeTag>,
        );

        expect(ref.current).toHaveClass("custom-tag");
    });
});
