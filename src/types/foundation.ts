import type * as React from "react";

export type Key = string | number;

export type Breakpoint = "sm" | "md" | "lg" | "xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type SconeTone = "neutral" | "info" | "success" | "warning" | "danger";

export type SconeSpacingToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type SconeControlSize = "sm" | "md" | "lg";

export type SconeDensity = "compact" | "default" | "comfortable";

export type SconeOrientation = "horizontal" | "vertical";

export type SconeAlign = "start" | "center" | "end";

export type SconeSide = "top" | "right" | "bottom" | "left";

export type SconeStatus = "idle" | "active" | "success" | "error";

export type OverlayCloseReason =
    "escape" | "outside" | "closeButton" | "footerAction" | "programmatic";

export interface SconeOption<Value = string> {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
    description?: React.ReactNode;
}

export interface SconeBaseItem {
    key: Key;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: React.ReactNode;
}
