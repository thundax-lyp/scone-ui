import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeScrollArea } from "./scroll-area";

describe("SconeScrollArea", () => {
    it("passes className to the root and viewportClassName to the viewport", () => {
        render(
            <SconeScrollArea className="h-48 root-class" viewportClassName="viewport-class">
                <div>Scrollable content</div>
            </SconeScrollArea>,
        );

        const root = screen
            .getByText("Scrollable content")
            .closest("[data-scone-layout='scroll-area']");
        const viewport = root?.querySelector("[data-scone-scroll-area-viewport]");

        expect(root).toHaveClass("relative", "h-48", "root-class");
        expect(viewport).toHaveClass("viewport-class", "size-full");
    });

    it("binds onScroll to the viewport and passes ref to the root", () => {
        const ref = React.createRef<HTMLDivElement>();
        const handleScroll = vi.fn();

        render(
            <SconeScrollArea ref={ref} onScroll={handleScroll}>
                <div>Scrollable content</div>
            </SconeScrollArea>,
        );

        const root = screen
            .getByText("Scrollable content")
            .closest("[data-scone-layout='scroll-area']");
        const viewport = root?.querySelector("[data-scone-scroll-area-viewport]");

        expect(ref.current).toBe(root);
        fireEvent.scroll(viewport as Element);
        expect(handleScroll).toHaveBeenCalledTimes(1);
    });

    it("keeps scroll behavior local to the component root", () => {
        render(
            <SconeScrollArea className="h-32">
                <div>Local list</div>
            </SconeScrollArea>,
        );

        expect(
            screen.getByText("Local list").closest("[data-scone-layout='scroll-area']"),
        ).toHaveClass("h-32");
        expect(document.body).not.toHaveAttribute("data-scone-layout", "scroll-area");
    });
});
