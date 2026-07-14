import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
    it("uses defaultValue in uncontrolled mode", () => {
        const onValueChange = vi.fn();
        const { result } = renderHook(() =>
            useControllableState({
                defaultValue: "closed",
                onValueChange,
            }),
        );

        act(() => {
            result.current[1]("open");
        });

        expect(result.current[0]).toBe("open");
        expect(onValueChange).toHaveBeenCalledWith("open");
    });

    it("supports lazy defaultValue without render-phase notifications", () => {
        const createDefault = vi.fn(() => "idle");
        const onValueChange = vi.fn();

        const { result } = renderHook(() =>
            useControllableState({
                defaultValue: createDefault,
                onValueChange,
            }),
        );

        expect(result.current[0]).toBe("idle");
        expect(createDefault).toHaveBeenCalledTimes(1);
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it("reports controlled updates without mutating local state", () => {
        const onValueChange = vi.fn();
        const { result, rerender } = renderHook(
            ({ value }) =>
                useControllableState({
                    value,
                    onValueChange,
                }),
            {
                initialProps: { value: "closed" },
            },
        );

        act(() => {
            result.current[1]("open");
        });

        expect(result.current[0]).toBe("closed");
        expect(onValueChange).toHaveBeenCalledWith("open");

        rerender({ value: "open" });

        expect(result.current[0]).toBe("open");
    });

    it("supports functional updates and skips duplicate notifications", () => {
        const onValueChange = vi.fn();
        const { result } = renderHook(() =>
            useControllableState({
                defaultValue: 1,
                onValueChange,
            }),
        );

        act(() => {
            result.current[1]((previous) => (previous ?? 0) + 1);
        });

        expect(result.current[0]).toBe(2);
        expect(onValueChange).toHaveBeenCalledWith(2);

        act(() => {
            result.current[1](2);
        });

        expect(onValueChange).toHaveBeenCalledTimes(1);
    });
});
