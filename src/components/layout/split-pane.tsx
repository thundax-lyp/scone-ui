import * as React from "react";

import { cn } from "../../lib/utils";

export type SconeSplitPaneSizePreset = "narrow" | "medium" | "wide" | "fill";

export interface SconeSplitPaneProps {
    orientation?: "horizontal" | "vertical";
    defaultSizePreset?: Exclude<SconeSplitPaneSizePreset, "fill">;
    sizePreset?: SconeSplitPaneSizePreset;
    onSizePresetChange?: (preset: SconeSplitPaneSizePreset) => void;
    minSizePreset?: SconeSplitPaneSizePreset;
    maxSizePreset?: SconeSplitPaneSizePreset;
    defaultSize?: string;
    size?: string;
    onSizeChange?: (size: string) => void;
    onSizeCommit?: (size: string) => void;
    children?: React.ReactNode;
    className?: string;
}

const presetSize: Record<SconeSplitPaneSizePreset, string> = {
    narrow: "16rem",
    medium: "24rem",
    wide: "32rem",
    fill: "minmax(0,1fr)",
};

const presetPixels: Record<SconeSplitPaneSizePreset, number> = {
    narrow: 240,
    medium: 320,
    wide: 480,
    fill: 640,
};

const cssLengthPattern =
    /^(?:-?\d*\.?\d+(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex)|calc\(.+\)|var\(--[\w-]+\))$/;

function assertCssLength(value: string | undefined, propName: string): void {
    if (value != null && !cssLengthPattern.test(value)) {
        throw new Error(`${propName} must be a CSS length with a unit or percentage.`);
    }
}

function resolveInitialSize({
    defaultSize,
    defaultSizePreset,
}: Pick<SconeSplitPaneProps, "defaultSize" | "defaultSizePreset">): string {
    return defaultSize ?? presetSize[defaultSizePreset ?? "medium"];
}

function resolveSize({
    size,
    sizePreset,
    internalSize,
}: {
    size?: string;
    sizePreset?: SconeSplitPaneSizePreset;
    internalSize: string;
}): string {
    return size ?? (sizePreset ? presetSize[sizePreset] : internalSize);
}

function nextKeyboardSize(
    currentSize: string,
    fallbackPreset: SconeSplitPaneSizePreset,
    delta: number,
): string {
    const pxMatch = /^(-?\d*\.?\d+)px$/.exec(currentSize);
    const currentPixels = pxMatch ? Number(pxMatch[1]) : presetPixels[fallbackPreset];

    return `${Math.max(0, Math.round(currentPixels + delta))}px`;
}

export const SconeSplitPane = React.forwardRef<HTMLDivElement, SconeSplitPaneProps>(
    (
        {
            orientation = "horizontal",
            defaultSizePreset = "medium",
            sizePreset,
            onSizePresetChange,
            minSizePreset = "narrow",
            maxSizePreset = "fill",
            defaultSize,
            size,
            onSizeChange,
            onSizeCommit,
            children,
            className,
        },
        ref,
    ) => {
        assertCssLength(defaultSize, "defaultSize");
        assertCssLength(size, "size");

        const rootRef = React.useRef<HTMLDivElement | null>(null);
        const [internalSize, setInternalSize] = React.useState(() =>
            resolveInitialSize({ defaultSize, defaultSizePreset }),
        );
        const resolvedSize = resolveSize({ size, sizePreset, internalSize });
        const resolvedPreset = sizePreset ?? defaultSizePreset;
        const childItems = React.Children.toArray(children);
        const isHorizontal = orientation === "horizontal";

        React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

        const updateSize = React.useCallback(
            (nextSize: string, commit: boolean) => {
                if (size == null && sizePreset == null) {
                    setInternalSize(nextSize);
                }
                onSizeChange?.(nextSize);
                if (commit) {
                    onSizeCommit?.(nextSize);
                }
            },
            [onSizeChange, onSizeCommit, size, sizePreset],
        );

        const handlePointerDown = React.useCallback(
            (event: React.PointerEvent<HTMLButtonElement>) => {
                event.preventDefault();
                const root = rootRef.current;
                if (!root) {
                    return;
                }

                const updateFromPointer = (pointerEvent: PointerEvent, commit: boolean) => {
                    const rect = root.getBoundingClientRect();
                    const nextValue = isHorizontal
                        ? pointerEvent.clientX - rect.left
                        : pointerEvent.clientY - rect.top;
                    const nextSize = `${Math.max(0, Math.round(nextValue))}px`;

                    updateSize(nextSize, commit);
                };

                const handlePointerMove = (pointerEvent: PointerEvent) => {
                    updateFromPointer(pointerEvent, false);
                };

                const handlePointerUp = (pointerEvent: PointerEvent) => {
                    updateFromPointer(pointerEvent, true);
                    window.removeEventListener("pointermove", handlePointerMove);
                    window.removeEventListener("pointerup", handlePointerUp);
                };

                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", handlePointerUp);
            },
            [isHorizontal, updateSize],
        );

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                const keyDelta: Record<string, number> = isHorizontal
                    ? { ArrowLeft: -16, ArrowRight: 16 }
                    : { ArrowDown: 16, ArrowUp: -16 };
                const delta = keyDelta[event.key];

                if (delta == null) {
                    return;
                }

                event.preventDefault();
                const nextSize = nextKeyboardSize(resolvedSize, resolvedPreset, delta);
                updateSize(nextSize, true);
                onSizePresetChange?.("fill");
            },
            [isHorizontal, onSizePresetChange, resolvedPreset, resolvedSize, updateSize],
        );

        return (
            <div
                ref={rootRef}
                data-scone-layout="split-pane"
                data-orientation={orientation}
                data-size-preset={sizePreset ?? undefined}
                data-min-size-preset={minSizePreset}
                data-max-size-preset={maxSizePreset}
                className={cn("grid min-h-0 min-w-0", className)}
                style={
                    isHorizontal
                        ? { gridTemplateColumns: `${resolvedSize} auto minmax(0,1fr)` }
                        : { gridTemplateRows: `${resolvedSize} auto minmax(0,1fr)` }
                }
            >
                <div
                    data-scone-split-pane-panel="primary"
                    className="min-h-0 min-w-0 overflow-hidden"
                >
                    {childItems[0]}
                </div>
                <button
                    type="button"
                    role="separator"
                    aria-orientation={orientation}
                    aria-valuetext={resolvedSize}
                    data-scone-split-pane-handle=""
                    className={cn(
                        "touch-none bg-border outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize",
                    )}
                    onPointerDown={handlePointerDown}
                    onKeyDown={handleKeyDown}
                />
                <div
                    data-scone-split-pane-panel="secondary"
                    className="min-h-0 min-w-0 overflow-hidden"
                >
                    {childItems[1]}
                </div>
            </div>
        );
    },
);

SconeSplitPane.displayName = "SconeSplitPane";
