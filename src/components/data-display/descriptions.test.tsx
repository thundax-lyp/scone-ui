import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { SconeDescriptions, type SconeDescriptionItem } from "./descriptions";

const items: SconeDescriptionItem[] = [
    { key: "name", label: "Name", value: "Scone" },
    {
        key: "notes",
        label: "Notes",
        value: "A long readable description that should wrap naturally in the value cell.",
        span: 2,
    },
];

describe("SconeDescriptions", () => {
    it("renders readable labels and values as a description list", () => {
        render(<SconeDescriptions title="Project" items={items} />);

        expect(screen.getByText("Project")).toBeInTheDocument();
        expect(screen.getByText("Name").tagName).toBe("DT");
        expect(screen.getByText("Scone").tagName).toBe("DD");
    });

    it("supports responsive columns through foundation breakpoints", () => {
        const { container } = render(
            <SconeDescriptions items={items} columns={{ sm: 1, md: 2, lg: 3 }} />,
        );

        const list = container.querySelector("dl");

        expect(list).toHaveStyle({ "--dd-columns-sm": "1" });
        expect(list).toHaveStyle({ "--dd-columns-md": "2" });
        expect(list).toHaveStyle({ "--dd-columns-lg": "3" });
    });

    it("applies density, bordered item styling, span, and long text wrapping", () => {
        render(<SconeDescriptions items={items} density="comfortable" bordered />);

        const notes = screen.getByText(
            "A long readable description that should wrap naturally in the value cell.",
        );
        const item = notes.closest("div");

        expect(item).toHaveClass("border", "p-4");
        expect(item).toHaveStyle({ gridColumn: "span 2 / span 2" });
        expect(notes).toHaveClass("break-words");
    });

    it("uses emptyFallback for nullish values", () => {
        render(
            <SconeDescriptions
                items={[{ key: "owner", label: "Owner", value: null, emptyFallback: "Unassigned" }]}
            />,
        );

        expect(screen.getByText("Unassigned")).toBeInTheDocument();
    });

    it("forwards refs and className to the root", () => {
        const ref = createRef<HTMLDivElement>();

        render(<SconeDescriptions ref={ref} className="custom-descriptions" items={items} />);

        expect(ref.current).toHaveClass("custom-descriptions");
    });
});
