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
    info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300",
    success:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    warning:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
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
