import { describe, expect, expectTypeOf, it } from "vitest";

import {
    ariaBoolean,
    ariaValue,
    cn,
    composeRefs,
    hasAriaValue,
    mergeAriaDescribedBy,
    mergeIds,
    SconeBadge,
    SconeCard,
    SconeDescriptions,
    SconeList,
    SconeParagraph,
    SconeStatistic,
    SconeTable,
    SconeTag,
    SconeText,
    SconeTimeline,
    SconeTitle,
    SconeTypography,
    useControllableState,
} from "./index";
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
    SconeTableColumn,
    SconeTimelineItem,
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
        expectTypeOf<SconeTableColumn<{ id: string }>["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<SconeTimelineItem["key"]>().toEqualTypeOf<Key>();
    });

    it("exports public utilities from the public entry", async () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(typeof composeRefs).toBe("function");
        expect(typeof useControllableState).toBe("function");
        expect(mergeIds("label", "description")).toBe("label description");
        expect(mergeAriaDescribedBy("description", "error")).toBe("description error");
        expect(ariaBoolean(false)).toBeUndefined();
        expect(hasAriaValue(0)).toBe(true);
        expect(ariaValue("polite")).toBe("polite");

        const publicExports = await import("./index");

        expect(Object.keys(publicExports).sort()).toEqual([
            "SconeBadge",
            "SconeCard",
            "SconeDescriptions",
            "SconeList",
            "SconeParagraph",
            "SconeStatistic",
            "SconeTable",
            "SconeTag",
            "SconeText",
            "SconeTimeline",
            "SconeTitle",
            "SconeTypography",
            "ariaBoolean",
            "ariaValue",
            "cn",
            "composeRefs",
            "hasAriaValue",
            "mergeAriaDescribedBy",
            "mergeIds",
            "useControllableState",
        ]);
    });

    it("exports data display components from the public entry", () => {
        expect(typeof SconeTypography).toBe("object");
        expect(typeof SconeText).toBe("object");
        expect(typeof SconeTitle).toBe("object");
        expect(typeof SconeParagraph).toBe("object");
        expect(typeof SconeCard).toBe("object");
        expect(typeof SconeTable).toBe("object");
        expect(typeof SconeDescriptions).toBe("object");
        expect(typeof SconeList).toBe("object");
        expect(typeof SconeTag).toBe("object");
        expect(typeof SconeBadge).toBe("object");
        expect(typeof SconeStatistic).toBe("object");
        expect(typeof SconeTimeline).toBe("object");
    });
});
