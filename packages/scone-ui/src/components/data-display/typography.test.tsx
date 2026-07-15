import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, expectTypeOf, it } from "vitest";

import {
    SconeParagraph,
    SconeText,
    SconeTitle,
    SconeTypography,
    type SconeParagraphProps,
    type SconeTextProps,
    type SconeTitleProps,
    type SconeTypographyProps,
} from "./typography";

describe("SconeTypography", () => {
    it("renders semantic elements with tone, size, weight, and className", () => {
        render(
            <SconeTypography
                as="strong"
                size="lg"
                weight="semibold"
                tone="danger"
                className="custom-copy"
            >
                Failed jobs
            </SconeTypography>,
        );

        const text = screen.getByText("Failed jobs");

        expect(text.tagName).toBe("STRONG");
        expect(text).toHaveClass("text-base", "font-semibold", "text-destructive", "custom-copy");
    });

    it("supports single-line and multi-line truncation without changing text", () => {
        const { rerender } = render(<SconeText truncate>Long visible label</SconeText>);

        expect(screen.getByText("Long visible label")).toHaveClass("truncate");

        rerender(<SconeParagraph truncate={2}>Long paragraph content</SconeParagraph>);

        expect(screen.getByText("Long paragraph content")).toHaveStyle({ WebkitLineClamp: "2" });
    });

    it("forwards refs to the rendered element", () => {
        const ref = createRef<HTMLElement>();

        render(<SconeTitle ref={ref}>Section title</SconeTitle>);

        expect(ref.current).toBe(screen.getByRole("heading", { name: "Section title" }));
    });

    it("keeps public props aligned across typography primitives", () => {
        expectTypeOf<SconeTextProps>().toMatchTypeOf<SconeTypographyProps>();
        expectTypeOf<SconeTitleProps>().toMatchTypeOf<SconeTypographyProps>();
        expectTypeOf<SconeParagraphProps>().toMatchTypeOf<SconeTypographyProps>();
    });
});
