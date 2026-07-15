import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeBadge } from "./badge";

describe("SconeBadge", () => {
    it("renders a count badge with stable overflow text", () => {
        render(<SconeBadge count={128} overflow={99} ariaLabel="Unread messages" />);

        expect(screen.getByText("99+")).toHaveAccessibleName("Unread messages");
    });

    it("renders a dot badge with an accessible label", () => {
        render(<SconeBadge dot tone="success" ariaLabel="Online status" />);

        expect(screen.getByLabelText("Online status")).toHaveClass(
            "size-2.5",
            "bg-[var(--scone-color-success)]",
        );
    });

    it("wraps marked children without changing their readable text", () => {
        render(
            <SconeBadge count={3} ariaLabel="Pending reviews">
                <button type="button">Reviews</button>
            </SconeBadge>,
        );

        expect(screen.getByRole("button", { name: "Reviews" })).toBeInTheDocument();
        expect(screen.getByText("3")).toHaveAccessibleName("Pending reviews");
    });

    it("hides empty count by a fixed rule", () => {
        const { container } = render(<SconeBadge count={0} ariaLabel="No notifications" />);

        expect(container.firstElementChild).toBeEmptyDOMElement();
    });

    it("forwards children-mode root attributes, event handlers, className, style, and ref", () => {
        const ref = createRef<HTMLSpanElement>();
        const onClick = vi.fn();

        render(
            <SconeBadge
                ref={ref}
                count="new"
                ariaLabel="New inbox items"
                id="inbox-badge"
                role="status"
                data-testid="badge-root"
                onClick={onClick}
                className="custom-badge"
                style={{ marginTop: "4px" }}
            >
                <span>Inbox</span>
            </SconeBadge>,
        );

        const root = screen.getByTestId("badge-root");
        const indicator = screen.getByText("new");

        root.click();

        expect(root).toBe(ref.current);
        expect(root).toHaveClass("relative", "inline-flex", "custom-badge");
        expect(root).toHaveAttribute("id", "inbox-badge");
        expect(root).toHaveAttribute("role", "status");
        expect(root).toHaveStyle({ marginTop: "4px" });
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(indicator).not.toHaveClass("custom-badge");
        expect(indicator).toHaveAccessibleName("New inbox items");
    });

    it("forwards no-children root attributes while keeping indicator state", () => {
        const ref = createRef<HTMLSpanElement>();

        render(
            <SconeBadge
                ref={ref}
                count={128}
                overflow={99}
                tone="warning"
                ariaLabel="Unread messages"
                id="unread-badge"
                role="status"
                data-testid="badge-root"
                className="custom-badge"
                style={{ marginTop: "4px" }}
            />,
        );

        const root = screen.getByTestId("badge-root");
        const indicator = screen.getByText("99+");

        expect(root).toBe(ref.current);
        expect(root).toHaveClass("inline-flex", "custom-badge");
        expect(root).toHaveAttribute("id", "unread-badge");
        expect(root).toHaveAttribute("role", "status");
        expect(root).toHaveStyle({ marginTop: "4px" });
        expect(indicator).not.toHaveClass("custom-badge");
        expect(indicator).toHaveClass("bg-[var(--scone-color-warning)]", "min-w-5");
        expect(indicator).toHaveAccessibleName("Unread messages");
    });
});
