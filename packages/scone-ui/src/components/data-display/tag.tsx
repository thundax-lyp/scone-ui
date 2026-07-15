import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeTone } from "@/types/foundation";

export interface SconeTagProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: SconeTone;
    closable?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    className?: string;
}

const tagToneClassNames: Record<SconeTone, string> = {
    neutral: "border-border bg-muted text-muted-foreground",
    info: "border-[color-mix(in_srgb,var(--scone-color-info)_28%,transparent)] bg-[color-mix(in_srgb,var(--scone-color-info)_10%,transparent)] text-[var(--scone-color-info)]",
    success:
        "border-[color-mix(in_srgb,var(--scone-color-success)_28%,transparent)] bg-[color-mix(in_srgb,var(--scone-color-success)_10%,transparent)] text-[var(--scone-color-success)]",
    warning:
        "border-[color-mix(in_srgb,var(--scone-color-warning)_28%,transparent)] bg-[color-mix(in_srgb,var(--scone-color-warning)_10%,transparent)] text-[var(--scone-color-warning)]",
    danger: "border-destructive/25 bg-destructive/10 text-destructive",
};

export const SconeTag = React.forwardRef<HTMLSpanElement, SconeTagProps>(
    ({ tone = "neutral", closable = false, onClose, children, className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                "inline-flex min-h-6 max-w-full items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-normal",
                tagToneClassNames[tone],
                className,
            )}
            {...props}
        >
            <span className="min-w-0 truncate">{children}</span>
            {closable ? (
                <button
                    type="button"
                    aria-label="Close tag"
                    className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-current opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                    onClick={onClose}
                >
                    <span aria-hidden="true">x</span>
                </button>
            ) : null}
        </span>
    ),
);
SconeTag.displayName = "SconeTag";
