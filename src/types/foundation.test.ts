import { describe, expectTypeOf, it } from "vitest";

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
} from "./foundation";

describe("foundation types", () => {
    it("keeps shared vocabulary unions stable", () => {
        expectTypeOf<Key>().toEqualTypeOf<string | number>();
        expectTypeOf<Breakpoint>().toEqualTypeOf<"sm" | "md" | "lg" | "xl">();
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
    });

    it("keeps ResponsiveValue object-only for breakpoints", () => {
        const responsive: ResponsiveValue<string> = {
            sm: "compact",
            md: "default",
        };

        // @ts-expect-error ResponsiveValue intentionally does not accept array syntax.
        const arrayResponsive: ResponsiveValue<string> = ["compact", "default"];

        expectTypeOf(responsive).toEqualTypeOf<Partial<Record<Breakpoint, string>>>();
        void arrayResponsive;
    });

    it("keeps option and base item fields stable", () => {
        expectTypeOf<SconeOption>().toEqualTypeOf<{
            value: string;
            label: React.ReactNode;
            disabled?: boolean;
            description?: React.ReactNode;
        }>();
        expectTypeOf<SconeOption<number>["value"]>().toEqualTypeOf<number>();
        expectTypeOf<SconeBaseItem>().toEqualTypeOf<{
            key: Key;
            label: React.ReactNode;
            disabled?: boolean;
            icon?: React.ReactNode;
            description?: React.ReactNode;
        }>();
    });
});
