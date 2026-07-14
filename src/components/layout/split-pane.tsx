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

interface SconeSplitPaneSizeBounds {
    minPixels: number;
    maxPixels: number;
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
    bounds: SconeSplitPaneSizeBounds,
): string {
    const pxMatch = /^(-?\d*\.?\d+)px$/.exec(currentSize);
    const currentPixels = pxMatch ? Number(pxMatch[1]) : presetPixels[fallbackPreset];

    return formatPixelSize(clampSizePixels(currentPixels + delta, bounds));
}

function resolveSizeBounds(
    minSizePreset: SconeSplitPaneSizePreset,
    maxSizePreset: SconeSplitPaneSizePreset,
): SconeSplitPaneSizeBounds {
    const minPixels = presetPixels[minSizePreset];
    const maxPixels = presetPixels[maxSizePreset];

    return {
        minPixels: Math.min(minPixels, maxPixels),
        maxPixels: Math.max(minPixels, maxPixels),
    };
}

function clampSizePixels(value: number, bounds: SconeSplitPaneSizeBounds): number {
    return Math.min(bounds.maxPixels, Math.max(bounds.minPixels, Math.round(value)));
}

function formatPixelSize(value: number): string {
    return `${value}px`;
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
        const activeDragCleanupRef = React.useRef<(() => void) | null>(null);
        const [internalSize, setInternalSize] = React.useState(() =>
            resolveInitialSize({ defaultSize, defaultSizePreset }),
        );
        const resolvedSize = resolveSize({ size, sizePreset, internalSize });
        const resolvedPreset = sizePreset ?? defaultSizePreset;
        const sizeBounds = React.useMemo(
            () => resolveSizeBounds(minSizePreset, maxSizePreset),
            [maxSizePreset, minSizePreset],
        );
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

        const cleanupActiveDrag = React.useCallback(() => {
            activeDragCleanupRef.current?.();
            activeDragCleanupRef.current = null;
        }, []);

        React.useEffect(() => cleanupActiveDrag, [cleanupActiveDrag]);

        const handlePointerDown = React.useCallback(
            (event: React.PointerEvent<HTMLButtonElement>) => {
                event.preventDefault();
                const root = rootRef.current;
                if (!root) {
                    return;
                }

                cleanupActiveDrag();

                const updateFromPointer = (pointerEvent: PointerEvent, commit: boolean) => {
                    const rect = root.getBoundingClientRect();
                    const nextValue = isHorizontal
                        ? pointerEvent.clientX - rect.left
                        : pointerEvent.clientY - rect.top;
                    const nextSize = formatPixelSize(clampSizePixels(nextValue, sizeBounds));

                    updateSize(nextSize, commit);
                };

                const handlePointerMove = (pointerEvent: PointerEvent) => {
                    updateFromPointer(pointerEvent, false);
                };

                const handlePointerUp = (pointerEvent: PointerEvent) => {
                    updateFromPointer(pointerEvent, true);
                    cleanupActiveDrag();
                };

                activeDragCleanupRef.current = () => {
                    window.removeEventListener("pointermove", handlePointerMove);
                    window.removeEventListener("pointerup", handlePointerUp);
                };
                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", handlePointerUp);
            },
            [cleanupActiveDrag, isHorizontal, sizeBounds, updateSize],
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
                const nextSize = nextKeyboardSize(resolvedSize, resolvedPreset, delta, sizeBounds);
                updateSize(nextSize, true);
                onSizePresetChange?.("fill");
            },
            [
                isHorizontal,
                onSizePresetChange,
                resolvedPreset,
                resolvedSize,
                sizeBounds,
                updateSize,
            ],
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
