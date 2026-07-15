import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeTone } from "../../types/foundation";

export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type ToastCloseReason = "timeout" | "closeButton" | "programmatic";

export interface ToastOptions {
    id?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    tone?: SconeTone;
    duration?: number;
    action?: React.ReactNode;
    onAction?: (id: string) => void;
    onDismiss?: (id: string, reason: ToastCloseReason) => void;
}

export interface SconeToastItem extends ToastOptions {
    id: string;
}

export interface SconeToastProviderProps {
    children: React.ReactNode;
    position?: ToastPosition;
    duration?: number;
    maxVisible?: number;
    onOpenChange?: (items: SconeToastItem[]) => void;
}

export interface ToastService {
    show: (options: ToastOptions) => string;
    success: (options: ToastOptions) => string;
    error: (options: ToastOptions) => string;
    update: (id: string, options: Partial<ToastOptions>) => void;
    dismiss: (id: string, reason?: ToastCloseReason) => void;
    clear: () => void;
}

let toastCounter = 0;
let toastItems: SconeToastItem[] = [];
const toastListeners = new Set<() => void>();

const emitToastChange = (): void => {
    for (const listener of toastListeners) {
        listener();
    }
};

const getToastSnapshot = (): SconeToastItem[] => {
    return toastItems;
};

const subscribeToasts = (listener: () => void): (() => void) => {
    toastListeners.add(listener);

    return () => {
        toastListeners.delete(listener);
    };
};

const nextToastId = (): string => {
    toastCounter += 1;
    return `toast-${toastCounter}`;
};

const showToast = (options: ToastOptions): string => {
    const id = options.id ?? nextToastId();
    const item: SconeToastItem = { ...options, id };

    toastItems = [...toastItems.filter((current) => current.id !== id), item];
    emitToastChange();

    return id;
};

// Provider and service are intentionally exported together as the public toast API.
// eslint-disable-next-line react-refresh/only-export-components
export const toast: ToastService = {
    show: showToast,
    success: (options) => showToast({ tone: "success", ...options }),
    error: (options) => showToast({ tone: "danger", ...options }),
    update: (id, options) => {
        toastItems = toastItems.map((item) =>
            item.id === id ? { ...item, ...options, id } : item,
        );
        emitToastChange();
    },
    dismiss: (id, reason = "programmatic") => {
        const item = toastItems.find((current) => current.id === id);

        if (!item) {
            return;
        }

        item.onDismiss?.(id, reason);
        toastItems = toastItems.filter((current) => current.id !== id);
        emitToastChange();
    },
    clear: () => {
        for (const item of toastItems) {
            item.onDismiss?.(item.id, "programmatic");
        }

        toastItems = [];
        emitToastChange();
    },
};

const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "right-4 bottom-4",
};

const toneClasses: Record<SconeTone, string> = {
    neutral: "border-border",
    info: "border-primary/30",
    success: "border-emerald-500/30",
    warning: "border-amber-500/30",
    danger: "border-destructive/30",
};

export const SconeToastProvider = ({
    children,
    position = "top-right",
    duration = 5000,
    maxVisible = 3,
    onOpenChange,
}: SconeToastProviderProps): React.JSX.Element => {
    const items = React.useSyncExternalStore(subscribeToasts, getToastSnapshot, getToastSnapshot);
    const visibleItems = React.useMemo(() => items.slice(-maxVisible), [items, maxVisible]);

    React.useEffect(() => {
        onOpenChange?.(items);
    }, [items, onOpenChange]);

    React.useEffect(() => {
        const timers = visibleItems
            .filter((item) => item.duration !== Number.POSITIVE_INFINITY)
            .map((item) =>
                window.setTimeout(
                    () => toast.dismiss(item.id, "timeout"),
                    item.duration ?? duration,
                ),
            );

        return () => {
            for (const timer of timers) {
                window.clearTimeout(timer);
            }
        };
    }, [duration, visibleItems]);

    return (
        <>
            {children}
            <div
                aria-live="polite"
                className={cn(
                    "fixed z-50 grid w-80 max-w-[calc(100vw-2rem)] gap-2",
                    positionClasses[position],
                )}
                data-position={position}
                data-scone-toast-viewport=""
            >
                {visibleItems.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg",
                            toneClasses[item.tone ?? "neutral"],
                        )}
                        data-scone-toast-item={item.id}
                        role={item.tone === "danger" ? "alert" : "status"}
                    >
                        <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                                {item.title ? (
                                    <div className="font-medium">{item.title}</div>
                                ) : null}
                                {item.description ? (
                                    <div className="text-muted-foreground">{item.description}</div>
                                ) : null}
                                {item.action ? (
                                    <button
                                        className="text-primary underline-offset-4 hover:underline"
                                        type="button"
                                        onClick={() => item.onAction?.(item.id)}
                                    >
                                        {item.action}
                                    </button>
                                ) : null}
                            </div>
                            <button
                                aria-label="Dismiss toast"
                                className="shrink-0 rounded text-muted-foreground hover:text-foreground"
                                type="button"
                                onClick={() => toast.dismiss(item.id, "closeButton")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
