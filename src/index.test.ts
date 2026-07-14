import { describe, expect, expectTypeOf, it } from "vitest";

import {
    ariaBoolean,
    ariaValue,
    cn,
    composeRefs,
    hasAriaValue,
    mergeAriaDescribedBy,
    mergeIds,
    notification,
    SconeAlert,
    SconeCompact,
    SconeConfirm,
    SconeDialog,
    SconeDrawer,
    SconeEmpty,
    SconeInline,
    SconeLoading,
    SconeNotificationProvider,
    SconeProgress,
    SconeScrollArea,
    SconeSeparator,
    SconeSplitPane,
    SconeStack,
    SconeToastProvider,
    SconeToolbar,
    toast,
    useControllableState,
} from "./index";
import type {
    Breakpoint,
    Key,
    NotificationCloseReason,
    NotificationOptions,
    NotificationPlacement,
    NotificationService,
    OverlayCloseReason,
    ResponsiveValue,
    SconeAlertProps,
    SconeAlign,
    SconeBaseItem,
    SconeConfirmProps,
    SconeControlSize,
    SconeDensity,
    SconeDialogProps,
    SconeDrawerProps,
    SconeEmptyProps,
    SconeInlineProps,
    SconeLoadingProps,
    SconeNotificationItem,
    SconeNotificationProviderProps,
    SconeOption,
    SconeOrientation,
    SconeProgressProps,
    SconeSide,
    SconeSplitPaneProps,
    SconeSplitPaneSizePreset,
    SconeStackProps,
    SconeSpacingToken,
    SconeStatus,
    SconeTone,
    SconeToastItem,
    SconeToastProviderProps,
    ToastCloseReason,
    ToastOptions,
    ToastPosition,
    ToastService,
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

    it("exports layout component APIs", () => {
        expect(typeof SconeStack).toBe("object");
        expect(typeof SconeInline).toBe("object");
        expect(typeof SconeCompact).toBe("object");
        expect(typeof SconeToolbar).toBe("object");
        expect(typeof SconeSeparator).toBe("object");
        expect(typeof SconeScrollArea).toBe("object");
        expect(typeof SconeSplitPane).toBe("object");

        expectTypeOf<SconeStackProps["gap"]>().toEqualTypeOf<SconeSpacingToken | undefined>();
        expectTypeOf<SconeInlineProps["wrap"]>().toEqualTypeOf<boolean | undefined>();
        expectTypeOf<SconeSplitPaneSizePreset>().toEqualTypeOf<
            "narrow" | "medium" | "wide" | "fill"
        >();
        expectTypeOf<SconeSplitPaneProps["onSizeCommit"]>().toEqualTypeOf<
            ((size: string) => void) | undefined
        >();
    });

    it("exports feedback and overlay component APIs", () => {
        expect(typeof SconeAlert).toBe("object");
        expect(typeof SconeEmpty).toBe("object");
        expect(typeof SconeLoading).toBe("object");
        expect(typeof SconeProgress).toBe("object");
        expect(typeof SconeDrawer).toBe("object");
        expect(typeof SconeDialog).toBe("object");
        expect(typeof SconeConfirm).toBe("object");
        expect(typeof SconeToastProvider).toBe("function");
        expect(typeof SconeNotificationProvider).toBe("function");
        expect(typeof toast.show).toBe("function");
        expect(typeof notification.open).toBe("function");

        expectTypeOf<SconeAlertProps["tone"]>().toEqualTypeOf<SconeTone | undefined>();
        expectTypeOf<SconeEmptyProps["action"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<SconeLoadingProps["size"]>().toEqualTypeOf<SconeControlSize | undefined>();
        expectTypeOf<SconeProgressProps["status"]>().toEqualTypeOf<SconeStatus | undefined>();
        expectTypeOf<SconeDrawerProps["onRequestClose"]>().toEqualTypeOf<
            ((reason: OverlayCloseReason) => void) | undefined
        >();
        expectTypeOf<SconeDialogProps["onRequestClose"]>().toEqualTypeOf<
            ((reason: OverlayCloseReason) => void) | undefined
        >();
        expectTypeOf<SconeConfirmProps["onConfirm"]>().toEqualTypeOf<
            (() => void | Promise<void>) | undefined
        >();
        expectTypeOf<ToastPosition>().toEqualTypeOf<
            "top-left" | "top-right" | "bottom-left" | "bottom-right"
        >();
        expectTypeOf<ToastCloseReason>().toEqualTypeOf<
            "timeout" | "closeButton" | "programmatic"
        >();
        expectTypeOf<ToastOptions["tone"]>().toEqualTypeOf<SconeTone | undefined>();
        expectTypeOf<SconeToastItem["id"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeToastProviderProps["maxVisible"]>().toEqualTypeOf<number | undefined>();
        expectTypeOf<ToastService["show"]>().toEqualTypeOf<(options: ToastOptions) => string>();
        expectTypeOf<NotificationPlacement>().toEqualTypeOf<
            "top-left" | "top-right" | "bottom-left" | "bottom-right"
        >();
        expectTypeOf<NotificationCloseReason>().toEqualTypeOf<"closeButton" | "programmatic">();
        expectTypeOf<NotificationOptions["title"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<SconeNotificationItem["id"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeNotificationProviderProps["maxVisible"]>().toEqualTypeOf<
            number | undefined
        >();
        expectTypeOf<NotificationService["open"]>().toEqualTypeOf<
            (options: NotificationOptions) => string
        >();
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

        expect(Object.keys(publicExports).sort()).toEqual(
            [
                "SconeAlert",
                "SconeCompact",
                "SconeConfirm",
                "SconeDialog",
                "SconeDrawer",
                "SconeEmpty",
                "SconeInline",
                "SconeLoading",
                "SconeNotificationProvider",
                "SconeProgress",
                "SconeScrollArea",
                "SconeSeparator",
                "SconeSplitPane",
                "SconeStack",
                "SconeToastProvider",
                "SconeToolbar",
                "ariaBoolean",
                "ariaValue",
                "cn",
                "composeRefs",
                "hasAriaValue",
                "mergeAriaDescribedBy",
                "mergeIds",
                "notification",
                "toast",
                "useControllableState",
            ].sort(),
        );
    });
});
