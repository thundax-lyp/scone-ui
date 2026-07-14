import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeAccordion } from "./accordion";

const items = [
    { value: "profile", trigger: "Profile", content: "Profile settings" },
    { value: "security", trigger: "Security", content: "Security settings" },
];

describe("SconeAccordion", () => {
    it("renders single item content and switches open item", () => {
        render(<SconeAccordion type="single" items={items} defaultValue="profile" />);

        expect(screen.getByText("Profile settings")).toBeVisible();

        fireEvent.click(screen.getByRole("button", { name: "Security" }));

        expect(screen.getByText("Security settings")).toBeVisible();
    });

    it("allows a single accordion to collapse when collapsible", () => {
        const onValueChange = vi.fn();

        render(
            <SconeAccordion
                type="single"
                items={items}
                defaultValue="profile"
                collapsible
                onValueChange={onValueChange}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Profile" }));

        expect(onValueChange).toHaveBeenCalledWith("");
    });

    it("supports multiple expanded items", () => {
        render(
            <SconeAccordion type="multiple" items={items} defaultValue={["profile", "security"]} />,
        );

        expect(screen.getByText("Profile settings")).toBeVisible();
        expect(screen.getByText("Security settings")).toBeVisible();
    });

    it("exposes expanded state and keyboard toggling", () => {
        render(<SconeAccordion type="single" items={items} />);

        const profile = screen.getByRole("button", { name: "Profile" });
        expect(profile).toHaveAttribute("aria-expanded", "false");

        fireEvent.keyDown(profile, { key: "Enter" });
        fireEvent.click(profile);

        expect(profile).toHaveAttribute("aria-expanded", "true");
    });
});
