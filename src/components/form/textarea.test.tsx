import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { SconeField } from "./field";
import { SconeTextArea } from "./textarea";

describe("SconeTextArea", () => {
    it("keeps multiline text and updates the character count", () => {
        const handleChange = vi.fn();

        render(
            <SconeTextArea
                ariaLabel="Notes"
                defaultValue="Line one"
                showCount
                maxLength={20}
                onValueChange={handleChange}
            />,
        );

        const textarea = screen.getByLabelText("Notes");
        fireEvent.change(textarea, { target: { value: "Line one\nLine two" } });

        expect(textarea).toHaveValue("Line one\nLine two");
        expect(screen.getByText("17/20")).toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledWith("Line one\nLine two");
    });

    it("uses Field invalid state and keeps the textarea ref", () => {
        const ref = React.createRef<HTMLTextAreaElement>();

        render(
            <SconeField.Root id="summary" label="Summary" invalid>
                <SconeTextArea ref={ref} />
            </SconeField.Root>,
        );

        const textarea = screen.getByLabelText("Summary");

        expect(ref.current).toBe(textarea);
        expect(textarea).toHaveAttribute("aria-invalid", "true");
    });
});
