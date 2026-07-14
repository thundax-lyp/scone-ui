import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SconeUpload } from "./upload";

function file(name: string, type: string, size = 1): File {
    return new File(["x".repeat(size)], name, { type });
}

describe("SconeUpload", () => {
    it("accepts local files and reports value changes", async () => {
        const handleChange = vi.fn();
        render(<SconeUpload ariaLabel="Upload files" multiple onValueChange={handleChange} />);

        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("a.txt", "text/plain"), file("b.txt", "text/plain")] },
        });

        await waitFor(() => expect(handleChange).toHaveBeenCalledWith(expect.any(Array)));
        expect(handleChange.mock.calls[0][0]).toHaveLength(2);
        expect(screen.getByText("a.txt")).toBeInTheDocument();
    });

    it("rejects files by accept, maxSize, maxFiles, and beforeAdd", async () => {
        const handleReject = vi.fn();
        const beforeAdd = vi.fn(() => false);
        const { rerender } = render(
            <SconeUpload ariaLabel="Upload files" accept=".txt" onReject={handleReject} />,
        );

        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("a.png", "image/png")] },
        });
        await waitFor(() =>
            expect(handleReject).toHaveBeenCalledWith(
                expect.objectContaining({ reason: "accept" }),
            ),
        );

        rerender(<SconeUpload ariaLabel="Upload files" maxSize={1} onReject={handleReject} />);
        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("large.txt", "text/plain", 2)] },
        });
        await waitFor(() =>
            expect(handleReject).toHaveBeenCalledWith(
                expect.objectContaining({ reason: "maxSize" }),
            ),
        );

        rerender(<SconeUpload ariaLabel="Upload files" maxFiles={0} onReject={handleReject} />);
        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("a.txt", "text/plain")] },
        });
        await waitFor(() =>
            expect(handleReject).toHaveBeenCalledWith(
                expect.objectContaining({ reason: "maxFiles" }),
            ),
        );

        rerender(
            <SconeUpload ariaLabel="Upload files" beforeAdd={beforeAdd} onReject={handleReject} />,
        );
        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("a.txt", "text/plain")] },
        });
        await waitFor(() =>
            expect(handleReject).toHaveBeenCalledWith(
                expect.objectContaining({ reason: "beforeAdd" }),
            ),
        );
    });

    it("does not change files while disabled", () => {
        const handleChange = vi.fn();
        render(<SconeUpload ariaLabel="Upload files" disabled onValueChange={handleChange} />);

        fireEvent.change(screen.getByLabelText("Upload files"), {
            target: { files: [file("a.txt", "text/plain")] },
        });

        expect(handleChange).not.toHaveBeenCalled();
    });
});
