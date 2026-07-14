import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeSplitPane } from "./split-pane";

describe("SconeSplitPane", () => {
    it("renders two panels and a horizontal resize handle with ARIA state", () => {
        render(
            <SconeSplitPane defaultSize="320px" data-testid="split-root">
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        expect(root).toHaveAttribute("data-orientation", "horizontal");
        expect(root).toHaveStyle({ gridTemplateColumns: "320px auto minmax(0,1fr)" });
        expect(screen.getByText("Primary")).toBeInTheDocument();
        expect(screen.getByText("Secondary")).toBeInTheDocument();
        expect(handle).toHaveAttribute("aria-orientation", "horizontal");
        expect(handle).toHaveAttribute("aria-valuetext", "320px");
    });

    it("supports vertical orientation and controlled size", () => {
        render(
            <SconeSplitPane orientation="vertical" size="40%" data-testid="split-root">
                <div>Top</div>
                <div>Bottom</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        expect(root).toHaveStyle({ gridTemplateRows: "40% auto minmax(0,1fr)" });
        expect(handle).toHaveAttribute("aria-orientation", "vertical");
    });

    it("updates size with keyboard controls and commits the change", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();
        const handleSizePresetChange = vi.fn();

        render(
            <SconeSplitPane
                defaultSize="320px"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                onSizePresetChange={handleSizePresetChange}
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        fireEvent.keyDown(screen.getByRole("separator"), { key: "ArrowRight" });

        expect(handleSizeChange).toHaveBeenCalledWith("336px");
        expect(handleSizeCommit).toHaveBeenCalledWith("336px");
        expect(handleSizePresetChange).toHaveBeenCalledWith("fill");
        expect(screen.getByRole("separator")).toHaveAttribute("aria-valuetext", "336px");
    });

    it("passes root attributes and preserves component-owned grid style", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SconeSplitPane
                ref={ref}
                id="settings-split"
                role="group"
                aria-label="Settings split"
                data-owner="layout"
                data-testid="split-root"
                className="custom-split"
                defaultSize="320px"
                style={{
                    minHeight: "240px",
                    gridTemplateColumns: "1px 1px 1px",
                }}
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");

        expect(ref.current).toBe(root);
        expect(root).toHaveAttribute("id", "settings-split");
        expect(root).toHaveAttribute("role", "group");
        expect(root).toHaveAttribute("aria-label", "Settings split");
        expect(root).toHaveAttribute("data-owner", "layout");
        expect(root).toHaveAttribute("data-scone-layout", "split-pane");
        expect(root).toHaveClass("custom-split");
        expect(root).toHaveStyle({ minHeight: "240px" });
        expect(root).toHaveStyle({ gridTemplateColumns: "320px auto minmax(0,1fr)" });
    });

    it("updates size with pointer drag and commits on pointer up", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 520,
            top: 0,
            width: 500,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.pointerDown(handle, { clientX: 120 });
        fireEvent.pointerMove(window, { clientX: 220 });
        fireEvent.pointerUp(window, { clientX: 260 });

        expect(handleSizeChange).toHaveBeenCalledWith("240px");
        expect(handleSizeCommit).toHaveBeenCalledWith("240px");
    });

    it("clamps pointer drag to the min size preset", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                minSizePreset="medium"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 520,
            top: 0,
            width: 500,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.pointerDown(handle, { clientX: 120 });
        fireEvent.pointerMove(window, { clientX: 80 });
        fireEvent.pointerUp(window, { clientX: 100 });

        expect(handleSizeChange).toHaveBeenCalledWith("320px");
        expect(handleSizeCommit).toHaveBeenCalledWith("320px");
    });

    it("clamps pointer drag to the max size preset", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                maxSizePreset="medium"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 520,
            top: 0,
            width: 500,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.pointerDown(handle, { clientX: 120 });
        fireEvent.pointerMove(window, { clientX: 520 });
        fireEvent.pointerUp(window, { clientX: 620 });

        expect(handleSizeChange).toHaveBeenCalledWith("320px");
        expect(handleSizeCommit).toHaveBeenCalledWith("320px");
    });

    it("clamps keyboard resize to the min size preset", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                defaultSize="248px"
                minSizePreset="narrow"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        fireEvent.keyDown(screen.getByRole("separator"), { key: "ArrowLeft" });

        expect(handleSizeChange).toHaveBeenCalledWith("240px");
        expect(handleSizeCommit).toHaveBeenCalledWith("240px");
        expect(screen.getByRole("separator")).toHaveAttribute("aria-valuetext", "240px");
    });

    it("clamps keyboard resize to the max size preset", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                defaultSize="632px"
                maxSizePreset="fill"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        fireEvent.keyDown(screen.getByRole("separator"), { key: "ArrowRight" });

        expect(handleSizeChange).toHaveBeenCalledWith("640px");
        expect(handleSizeCommit).toHaveBeenCalledWith("640px");
        expect(screen.getByRole("separator")).toHaveAttribute("aria-valuetext", "640px");
    });

    it("uses the container size for the fill max preset when available", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                defaultSize="632px"
                maxSizePreset="fill"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 920,
            top: 0,
            width: 900,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.keyDown(screen.getByRole("separator"), { key: "ArrowRight" });

        expect(handleSizeChange).toHaveBeenCalledWith("648px");
        expect(handleSizeCommit).toHaveBeenCalledWith("648px");
        expect(screen.getByRole("separator")).toHaveAttribute("aria-valuetext", "648px");
    });

    it("allows pointer drag beyond the fallback fill pixels in wide containers", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();

        render(
            <SconeSplitPane
                maxSizePreset="fill"
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 920,
            top: 0,
            width: 900,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.pointerDown(handle, { clientX: 120 });
        fireEvent.pointerMove(window, { clientX: 820 });
        fireEvent.pointerUp(window, { clientX: 920 });

        expect(handleSizeChange).toHaveBeenCalledWith("800px");
        expect(handleSizeCommit).toHaveBeenCalledWith("900px");
    });

    it("cleans up pointer listeners when unmounted during drag", () => {
        const handleSizeChange = vi.fn();
        const handleSizeCommit = vi.fn();
        const { unmount } = render(
            <SconeSplitPane
                onSizeChange={handleSizeChange}
                onSizeCommit={handleSizeCommit}
                data-testid="split-root"
            >
                <div>Primary</div>
                <div>Secondary</div>
            </SconeSplitPane>,
        );

        const root = screen.getByTestId("split-root");
        const handle = screen.getByRole("separator");

        vi.spyOn(root as HTMLElement, "getBoundingClientRect").mockReturnValue({
            bottom: 200,
            height: 200,
            left: 20,
            right: 520,
            top: 0,
            width: 500,
            x: 20,
            y: 0,
            toJSON: () => undefined,
        });

        fireEvent.pointerDown(handle, { clientX: 120 });
        unmount();
        fireEvent.pointerMove(window, { clientX: 320 });
        fireEvent.pointerUp(window, { clientX: 360 });

        expect(handleSizeChange).not.toHaveBeenCalled();
        expect(handleSizeCommit).not.toHaveBeenCalled();
    });

    it("rejects CSS length overrides without a unit", () => {
        expect(() =>
            render(
                <SconeSplitPane defaultSize="320">
                    <div>Primary</div>
                    <div>Secondary</div>
                </SconeSplitPane>,
            ),
        ).toThrow("defaultSize must be a CSS length with a unit or percentage.");
    });
});
