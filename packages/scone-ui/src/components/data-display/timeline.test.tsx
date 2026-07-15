import { fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeTimeline, type SconeTimelineItem } from "./timeline";

const items: SconeTimelineItem[] = [
    {
        key: "created",
        title: "Created",
        description: "Record created",
        time: "09:00",
        tone: "info",
    },
    {
        key: "reviewed",
        title: "Reviewed",
        description: "Record reviewed",
        time: "10:00",
        tone: "success",
    },
];

describe("SconeTimeline", () => {
    it("renders event title, description, time, icon, and tone marker", () => {
        render(<SconeTimeline items={[{ ...items[0], icon: "1" }]} aria-label="History" />);

        expect(screen.getByText("Created")).toBeInTheDocument();
        expect(screen.getByText("Record created")).toBeInTheDocument();
        expect(screen.getByText("09:00")).toBeInTheDocument();
        expect(screen.getByText("1")).toHaveClass("border-sky-600");
    });

    it("renders pending at the end by default and at the front when reversed", () => {
        const { rerender } = render(<SconeTimeline items={items} pending="Still running" />);

        const normalItems = screen.getAllByRole("listitem");
        expect(
            within(normalItems[normalItems.length - 1]).getByText("Still running"),
        ).toBeInTheDocument();

        rerender(<SconeTimeline items={items} pending="Still running" reverse />);

        const reversedItems = screen.getAllByRole("listitem");
        expect(within(reversedItems[0]).getByText("Still running")).toBeInTheDocument();
        expect(within(reversedItems[1]).getByText("Reviewed")).toBeInTheDocument();
    });

    it("calls onItemClick with the clicked item without mutating the input order", () => {
        const onItemClick = vi.fn();

        render(<SconeTimeline items={items} reverse onItemClick={onItemClick} />);

        fireEvent.click(screen.getByRole("button", { name: /Reviewed/ }));

        expect(onItemClick).toHaveBeenCalledWith(items[1]);
        expect(items[0].key).toBe("created");
    });

    it("forwards refs and className to the root", () => {
        const ref = createRef<HTMLDivElement>();

        render(<SconeTimeline ref={ref} className="custom-timeline" items={items} />);

        expect(ref.current).toHaveClass("custom-timeline");
    });
});
