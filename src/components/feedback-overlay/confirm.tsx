import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "../../lib/utils";

export interface SconeConfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    onConfirm?: () => void | Promise<void>;
    onError?: (error: unknown) => void;
    onCancel?: () => void;
    cancelText?: React.ReactNode;
    confirmText?: React.ReactNode;
    destructive?: boolean;
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
}

export const SconeConfirm = React.forwardRef<HTMLDivElement, SconeConfirmProps>(
    (
        {
            open,
            defaultOpen,
            onOpenChange,
            title,
            description,
            onConfirm,
            onError,
            onCancel,
            cancelText = "Cancel",
            confirmText = "Confirm",
            destructive = false,
            disabled = false,
            loading = false,
            ariaLabel,
            className,
            ...props
        },
        ref,
    ) => {
        const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
        const [confirming, setConfirming] = React.useState(false);
        const isControlled = open !== undefined;
        const currentOpen = isControlled ? open : uncontrolledOpen;
        const isBusy = loading || confirming;

        const setOpen = React.useCallback(
            (nextOpen: boolean) => {
                if (!isControlled) {
                    setUncontrolledOpen(nextOpen);
                }

                onOpenChange?.(nextOpen);
            },
            [isControlled, onOpenChange],
        );

        const handleCancel = React.useCallback(() => {
            if (isBusy) {
                return;
            }

            onCancel?.();
            setOpen(false);
        }, [isBusy, onCancel, setOpen]);

        const handleConfirm = React.useCallback(async () => {
            if (disabled || isBusy) {
                return;
            }

            try {
                setConfirming(true);
                await onConfirm?.();
                setOpen(false);
            } catch (error) {
                onError?.(error);
            } finally {
                setConfirming(false);
            }
        }, [disabled, isBusy, onConfirm, onError, setOpen]);

        return (
            <AlertDialogPrimitive.Root open={currentOpen} onOpenChange={setOpen}>
                <AlertDialogPrimitive.Portal>
                    <AlertDialogPrimitive.Overlay
                        className="fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0"
                        data-slot="confirm-overlay"
                    />
                    <AlertDialogPrimitive.Content
                        ref={ref}
                        aria-label={ariaLabel}
                        className={cn(
                            "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 outline-none duration-100 sm:max-w-sm data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                            className,
                        )}
                        data-destructive={destructive ? "true" : undefined}
                        data-slot="confirm-content"
                        {...props}
                    >
                        <div className="grid gap-2">
                            <AlertDialogPrimitive.Title className="font-heading text-base font-medium">
                                {title}
                            </AlertDialogPrimitive.Title>
                            {description ? (
                                <AlertDialogPrimitive.Description className="text-sm text-muted-foreground">
                                    {description}
                                </AlertDialogPrimitive.Description>
                            ) : null}
                        </div>
                        <div className="-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end">
                            <AlertDialogPrimitive.Cancel asChild>
                                <button
                                    className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    disabled={isBusy}
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    {cancelText}
                                </button>
                            </AlertDialogPrimitive.Cancel>
                            <AlertDialogPrimitive.Action asChild>
                                <button
                                    className={cn(
                                        "inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                                        destructive
                                            ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                            : "bg-primary text-primary-foreground hover:bg-primary/80",
                                    )}
                                    disabled={disabled || isBusy}
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        void handleConfirm();
                                    }}
                                >
                                    {isBusy ? "Loading" : confirmText}
                                </button>
                            </AlertDialogPrimitive.Action>
                        </div>
                    </AlertDialogPrimitive.Content>
                </AlertDialogPrimitive.Portal>
            </AlertDialogPrimitive.Root>
        );
    },
);
SconeConfirm.displayName = "SconeConfirm";
