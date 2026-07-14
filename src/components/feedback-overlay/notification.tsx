import * as React from "react";

import { cn } from "../../lib/utils";
import type { SconeTone } from "../../types/foundation";

export type NotificationPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type NotificationCloseReason = "closeButton" | "programmatic";

export interface NotificationOptions {
    id?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    tone?: SconeTone;
    time?: React.ReactNode;
    persistent?: boolean;
    action?: React.ReactNode;
    onAction?: (id: string) => void;
    onClose?: (id: string, reason: NotificationCloseReason) => void;
}

export interface SconeNotificationItem extends NotificationOptions {
    id: string;
}

export interface SconeNotificationProviderProps {
    children: React.ReactNode;
    placement?: NotificationPlacement;
    maxVisible?: number;
    onOpenChange?: (items: SconeNotificationItem[]) => void;
}

export interface NotificationService {
    open: (options: NotificationOptions) => string;
    update: (id: string, options: Partial<NotificationOptions>) => void;
    close: (id: string, reason?: NotificationCloseReason) => void;
    clear: () => void;
}

let notificationCounter = 0;
let notificationItems: SconeNotificationItem[] = [];
const notificationListeners = new Set<() => void>();

function emitNotificationChange(): void {
    for (const listener of notificationListeners) {
        listener();
    }
}

function getNotificationSnapshot(): SconeNotificationItem[] {
    return notificationItems;
}

function subscribeNotifications(listener: () => void): () => void {
    notificationListeners.add(listener);

    return () => {
        notificationListeners.delete(listener);
    };
}

function nextNotificationId(): string {
    notificationCounter += 1;
    return `notification-${notificationCounter}`;
}

// Provider and service are intentionally exported together as the public notification API.
// eslint-disable-next-line react-refresh/only-export-components
export const notification: NotificationService = {
    open: (options) => {
        const id = options.id ?? nextNotificationId();
        const item: SconeNotificationItem = { ...options, id };

        notificationItems = [...notificationItems.filter((current) => current.id !== id), item];
        emitNotificationChange();

        return id;
    },
    update: (id, options) => {
        notificationItems = notificationItems.map((item) =>
            item.id === id ? { ...item, ...options, id } : item,
        );
        emitNotificationChange();
    },
    close: (id, reason = "programmatic") => {
        const item = notificationItems.find((current) => current.id === id);

        if (!item) {
            return;
        }

        item.onClose?.(id, reason);
        notificationItems = notificationItems.filter((current) => current.id !== id);
        emitNotificationChange();
    },
    clear: () => {
        for (const item of notificationItems) {
            item.onClose?.(item.id, "programmatic");
        }

        notificationItems = [];
        emitNotificationChange();
    },
};

const placementClasses: Record<NotificationPlacement, string> = {
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

export function SconeNotificationProvider({
    children,
    placement = "top-right",
    maxVisible = 5,
    onOpenChange,
}: SconeNotificationProviderProps) {
    const items = React.useSyncExternalStore(
        subscribeNotifications,
        getNotificationSnapshot,
        getNotificationSnapshot,
    );
    const visibleItems = items.slice(-maxVisible);

    React.useEffect(() => {
        onOpenChange?.(items);
    }, [items, onOpenChange]);

    return (
        <>
            {children}
            <div
                aria-live="polite"
                className={cn(
                    "fixed z-50 grid w-96 max-w-[calc(100vw-2rem)] gap-2",
                    placementClasses[placement],
                )}
                data-placement={placement}
                data-scone-notification-viewport=""
            >
                {visibleItems.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg",
                            toneClasses[item.tone ?? "neutral"],
                        )}
                        data-persistent={item.persistent ? "true" : undefined}
                        data-scone-notification-item={item.id}
                        role={item.tone === "danger" ? "alert" : "status"}
                    >
                        <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="font-medium">{item.title}</div>
                                    {item.time ? (
                                        <div className="shrink-0 text-xs text-muted-foreground">
                                            {item.time}
                                        </div>
                                    ) : null}
                                </div>
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
                                aria-label="Close notification"
                                className="shrink-0 rounded text-muted-foreground hover:text-foreground"
                                type="button"
                                onClick={() => notification.close(item.id, "closeButton")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
