import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeAvatar } from "./avatar";

describe("SconeAvatar", () => {
    it("renders an avatar image", () => {
        render(<SconeAvatar src="/avatar.png" alt="Ada Lovelace" />);

        expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
    });

    it("falls back after image error", () => {
        const onError = vi.fn();

        render(
            <SconeAvatar src="/missing.png" alt="Missing avatar" fallback="AL" onError={onError} />,
        );

        fireEvent.error(screen.getByRole("img", { name: "Missing avatar" }));

        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.getByText("AL")).toBeInTheDocument();
    });

    it("resets failed state when src changes", () => {
        const { rerender } = render(
            <SconeAvatar src="/missing.png" alt="Ada Lovelace" fallback="AL" />,
        );

        fireEvent.error(screen.getByRole("img", { name: "Ada Lovelace" }));
        expect(screen.getByText("AL")).toBeInTheDocument();

        rerender(<SconeAvatar src="/avatar.png" alt="Ada Lovelace" fallback="AL" />);

        expect(screen.queryByText("AL")).not.toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveAttribute(
            "src",
            "/avatar.png",
        );
    });

    it("renders icon fallback and size/shape state", () => {
        render(
            <SconeAvatar
                icon={<span data-testid="avatar-icon">Icon</span>}
                size="lg"
                shape="square"
            />,
        );

        const avatar = screen.getByTestId("avatar-icon").parentElement;

        expect(avatar).toHaveAttribute("data-size", "lg");
        expect(avatar).toHaveAttribute("data-shape", "square");
    });
});
