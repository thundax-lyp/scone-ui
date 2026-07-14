import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { SconeBadge } from "./badge";

describe("SconeBadge", () => {
    it("renders a count badge with stable overflow text", () => {
        render(<SconeBadge count={128} overflow={99} ariaLabel="Unread messages" />);

        expect(screen.getByText("99+")).toHaveAccessibleName("Unread messages");
    });

    it("renders a dot badge with an accessible label", () => {
        render(<SconeBadge dot tone="success" ariaLabel="Online status" />);

        expect(screen.getByLabelText("Online status")).toHaveClass("size-2.5", "bg-emerald-600");
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

        expect(container).toBeEmptyDOMElement();
    });

    it("forwards refs to the wrapper root", () => {
        const ref = createRef<HTMLSpanElement>();

        render(
            <SconeBadge ref={ref} count="new" className="custom-badge">
                <span>Inbox</span>
            </SconeBadge>,
        );

        expect(ref.current).toHaveClass("relative", "inline-flex");
        expect(screen.getByText("new")).toHaveClass("custom-badge");
    });
});
