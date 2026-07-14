import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import type { OverlayCloseReason } from "../../types/foundation";

export interface SconeDialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onRequestClose?: (reason: OverlayCloseReason) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    widthPreset?: "sm" | "md" | "lg";
    ariaLabel?: string;
}

const widthPresetClasses: Record<NonNullable<SconeDialogProps["widthPreset"]>, string> = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-2xl",
};

export const SconeDialog = React.forwardRef<HTMLDivElement, SconeDialogProps>(
    (
        {
            open,
            defaultOpen,
            onOpenChange,
            onRequestClose,
            title,
            description,
            children,
            footer,
            widthPreset = "md",
            ariaLabel,
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

        return (
            <DialogPrimitive.Root
                open={currentOpen}
                defaultOpen={defaultOpen}
                onOpenChange={handleOpenChange}
            >
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay
                        className="fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0"
                        data-slot="dialog-overlay"
                    />
                    <DialogPrimitive.Content
                        ref={ref}
                        aria-label={title ? undefined : ariaLabel}
                        className={cn(
                            "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                            widthPresetClasses[widthPreset],
                            className,
                        )}
                        data-slot="dialog-content"
                        onEscapeKeyDown={() => requestClose("escape")}
                        onPointerDownOutside={() => requestClose("outside")}
                        {...props}
                    >
                        <div className="grid gap-2 pr-8">
                            {title ? (
                                <DialogPrimitive.Title className="font-heading text-base leading-none font-medium">
                                    {title}
                                </DialogPrimitive.Title>
                            ) : null}
                            {description ? (
                                <DialogPrimitive.Description className="text-sm text-muted-foreground">
                                    {description}
                                </DialogPrimitive.Description>
                            ) : null}
                        </div>
                        <div data-slot="dialog-body">{children}</div>
                        {footer ? (
                            <div
                                className="-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end"
                                data-slot="dialog-footer"
                                onClickCapture={handleFooterClickCapture}
                            >
                                {footer}
                            </div>
                        ) : null}
                        <DialogPrimitive.Close asChild>
                            <button
                                aria-label="Close dialog"
                                className="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                                type="button"
                                onClick={() => requestClose("closeButton")}
                            >
                                <XIcon aria-hidden="true" className="size-4" />
                            </button>
                        </DialogPrimitive.Close>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        );
    },
);
SconeDialog.displayName = "SconeDialog";
