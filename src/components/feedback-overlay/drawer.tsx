import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OverlayCloseReason } from "@/types/foundation";

export interface SconeDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onRequestClose?: (reason: OverlayCloseReason) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    side?: "right" | "left" | "bottom";
    widthPreset?: "sm" | "md" | "lg" | "full";
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    destroyOnClose?: boolean;
    ariaLabel?: string;
    children?: React.ReactNode;
}

const sideClasses: Record<NonNullable<SconeDrawerProps["side"]>, string> = {
    right: "inset-y-0 right-0 border-l data-open:slide-in-from-right-10 data-closed:slide-out-to-right-10",
    left: "inset-y-0 left-0 border-r data-open:slide-in-from-left-10 data-closed:slide-out-to-left-10",
    bottom: "inset-x-0 bottom-0 max-h-[85vh] border-t data-open:slide-in-from-bottom-10 data-closed:slide-out-to-bottom-10",
};

const widthPresetClasses: Record<NonNullable<SconeDrawerProps["widthPreset"]>, string> = {
    sm: "w-full sm:max-w-sm",
    md: "w-full sm:max-w-md",
    lg: "w-full sm:max-w-2xl",
    full: "w-full sm:max-w-full",
};

export const SconeDrawer = React.forwardRef<HTMLDivElement, SconeDrawerProps>(
    (
        {
            open,
            defaultOpen,
            onOpenChange,
            onRequestClose,
            title,
            description,
            side = "right",
            widthPreset = "md",
            actions,
            footer,
            loading = false,
            destroyOnClose = false,
            ariaLabel,
            children,
            className,
            ...props
        },
        ref,
    ) => {
        const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
        const isControlled = open !== undefined;
        const currentOpen = isControlled ? open : uncontrolledOpen;
        const closeReasonRef = React.useRef<OverlayCloseReason | null>(null);

        const requestClose = React.useCallback(
            (reason: OverlayCloseReason) => {
                closeReasonRef.current = reason;
                onRequestClose?.(reason);
            },
            [onRequestClose],
        );

        const handleOpenChange = React.useCallback(
            (nextOpen: boolean) => {
                if (!nextOpen && !closeReasonRef.current) {
                    requestClose("programmatic");
                }

                if (!isControlled) {
                    setUncontrolledOpen(nextOpen);
                }

                onOpenChange?.(nextOpen);
                closeReasonRef.current = null;
            },
            [isControlled, onOpenChange, requestClose],
        );

        const handleFooterClickCapture = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                const target = event.target;

                if (!(target instanceof HTMLElement)) {
                    return;
                }

                if (target.closest("[data-scone-overlay-close]")) {
                    requestClose("footerAction");
                }
            },
            [requestClose],
        );

        const content = (
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0"
                    data-slot="drawer-overlay"
                />
                <DialogPrimitive.Content
                    ref={ref}
                    aria-label={title ? undefined : ariaLabel}
                    className={cn(
                        "fixed z-50 flex flex-col bg-popover text-sm text-popover-foreground shadow-lg outline-none duration-200 ease-in-out data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0",
                        sideClasses[side],
                        side === "bottom" ? "h-auto w-full" : "h-full",
                        side !== "bottom" && widthPresetClasses[widthPreset],
                        className,
                    )}
                    data-loading={loading ? "true" : undefined}
                    data-side={side}
                    data-slot="drawer-content"
                    onEscapeKeyDown={() => requestClose("escape")}
                    onPointerDownOutside={() => requestClose("outside")}
                    {...props}
                >
                    <div className="flex items-start gap-3 border-b p-4">
                        <div className="min-w-0 flex-1 space-y-1">
                            {title ? (
                                <DialogPrimitive.Title className="font-heading text-base font-medium text-foreground">
                                    {title}
                                </DialogPrimitive.Title>
                            ) : null}
                            {description ? (
                                <DialogPrimitive.Description className="text-sm text-muted-foreground">
                                    {description}
                                </DialogPrimitive.Description>
                            ) : null}
                        </div>
                        {actions ? <div className="shrink-0">{actions}</div> : null}
                        <DialogPrimitive.Close asChild>
                            <Button
                                aria-label="Close drawer"
                                size="icon-sm"
                                type="button"
                                variant="ghost"
                                onClick={() => requestClose("closeButton")}
                            >
                                <XIcon />
                            </Button>
                        </DialogPrimitive.Close>
                    </div>
                    <div
                        aria-busy={loading ? "true" : undefined}
                        className="min-h-0 flex-1 overflow-y-auto p-4"
                        data-slot="drawer-body"
                    >
                        {children}
                    </div>
                    {footer ? (
                        <div
                            className="mt-auto flex shrink-0 justify-end gap-2 border-t bg-muted/50 p-4"
                            data-slot="drawer-footer"
                            onClickCapture={handleFooterClickCapture}
                        >
                            {footer}
                        </div>
                    ) : null}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        );

        return (
            <DialogPrimitive.Root
                open={currentOpen}
                defaultOpen={defaultOpen}
                onOpenChange={handleOpenChange}
            >
                {destroyOnClose && !currentOpen ? null : content}
            </DialogPrimitive.Root>
        );
    },
);
SconeDrawer.displayName = "SconeDrawer";
