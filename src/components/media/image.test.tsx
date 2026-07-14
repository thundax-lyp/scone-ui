import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeImage } from "./image";

describe("SconeImage", () => {
    it("renders an image with alt text and stable dimensions", () => {
        render(<SconeImage src="/record.png" alt="Record" width={120} height="80px" />);

        expect(screen.getByRole("img", { name: "Record" })).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Record" }).parentElement).toHaveStyle({
            width: "120px",
            height: "80px",
        });
    });

    it("shows fallback when src is missing or image errors", () => {
        const onError = vi.fn();

        render(
            <SconeImage src="/missing.png" alt="Missing" fallback="No image" onError={onError} />,
        );

        fireEvent.error(screen.getByRole("img", { name: "Missing" }));

        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.getByText("No image")).toBeInTheDocument();
    });

    it("opens preview in uncontrolled mode", () => {
        render(<SconeImage src="/record.png" alt="Record" preview />);

        fireEvent.click(screen.getByRole("button", { name: "Preview image" }));

        expect(screen.getByRole("dialog", { name: "Image preview" })).toBeInTheDocument();
    });

    it("reports controlled preview open changes", () => {
        const onPreviewOpenChange = vi.fn();

        render(
            <SconeImage
                src="/record.png"
                alt="Record"
                preview
                previewOpen={false}
                onPreviewOpenChange={onPreviewOpenChange}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Preview image" }));

        expect(onPreviewOpenChange).toHaveBeenCalledWith(true);
    });
});
