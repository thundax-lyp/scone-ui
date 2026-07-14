import { describe, expect, expectTypeOf, it } from "vitest";

import { cn, composeRefs, useControllableState } from "./index";
import type {
    Breakpoint,
    Key,
    OverlayCloseReason,
    ResponsiveValue,
    SconeAlign,
    SconeBaseItem,
    SconeControlSize,
    SconeDensity,
    SconeOption,
    SconeOrientation,
    SconeSide,
    SconeSpacingToken,
    SconeStatus,
    SconeTone,
} from "./index";

describe("public index exports", () => {
    it("exports foundation types from the public entry", () => {
        expectTypeOf<Key>().toEqualTypeOf<string | number>();
        expectTypeOf<Breakpoint>().toEqualTypeOf<"sm" | "md" | "lg" | "xl">();
        expectTypeOf<ResponsiveValue<string>>().toEqualTypeOf<
            string | Partial<Record<Breakpoint, string>>
        >();
        expectTypeOf<SconeTone>().toEqualTypeOf<
            "neutral" | "info" | "success" | "warning" | "danger"
        >();
        expectTypeOf<SconeSpacingToken>().toEqualTypeOf<
            "none" | "xs" | "sm" | "md" | "lg" | "xl"
        >();
        expectTypeOf<SconeControlSize>().toEqualTypeOf<"sm" | "md" | "lg">();
        expectTypeOf<SconeDensity>().toEqualTypeOf<"compact" | "default" | "comfortable">();
        expectTypeOf<SconeOrientation>().toEqualTypeOf<"horizontal" | "vertical">();
        expectTypeOf<SconeAlign>().toEqualTypeOf<"start" | "center" | "end">();
        expectTypeOf<SconeSide>().toEqualTypeOf<"top" | "right" | "bottom" | "left">();
        expectTypeOf<SconeStatus>().toEqualTypeOf<"idle" | "active" | "success" | "error">();
        expectTypeOf<OverlayCloseReason>().toEqualTypeOf<
            "escape" | "outside" | "closeButton" | "footerAction" | "programmatic"
        >();
        expectTypeOf<SconeOption["value"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeBaseItem["key"]>().toEqualTypeOf<Key>();
    });

    it("exports public utilities from the public entry", async () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(typeof composeRefs).toBe("function");
        expect(typeof useControllableState).toBe("function");

        const publicExports = await import("./index");

        expect(Object.keys(publicExports).sort()).toEqual([
            "cn",
            "composeRefs",
            "useControllableState",
        ]);
    });
});
