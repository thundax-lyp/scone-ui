import * as React from "react";

import { cn } from "@/lib/cn";
import type { SconeTone } from "../../types/foundation";

export interface SconeAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    tone?: SconeTone;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

const toneClasses: Record<SconeTone, string> = {
    neutral: "border-border bg-muted/40 text-foreground",
    info: "border-primary/25 bg-primary/5 text-foreground",
    success:
        "border-[color-mix(in_srgb,var(--scone-color-success)_25%,transparent)] bg-[color-mix(in_srgb,var(--scone-color-success)_10%,transparent)] text-foreground",
    warning:
        "border-[color-mix(in_srgb,var(--scone-color-warning)_30%,transparent)] bg-[color-mix(in_srgb,var(--scone-color-warning)_10%,transparent)] text-foreground",
    danger: "border-destructive/30 bg-destructive/10 text-foreground",
};

const toneLabels: Record<SconeTone, string> = {
    neutral: "Notice",
    info: "Information",
    success: "Success",
    warning: "Warning",
    danger: "Error",
};

export const SconeAlert = React.forwardRef<HTMLDivElement, SconeAlertProps>(
    (
        { tone = "neutral", title, description, icon, action, role, className, children, ...props },
        ref,
    ) => {
        const defaultRole = tone === "danger" || tone === "warning" ? "alert" : "status";

        return (
            <div
                ref={ref}
                role={role ?? defaultRole}
                data-scone-alert=""
                data-tone={tone}
                className={cn(
                    "grid w-full grid-cols-[auto_1fr_auto] gap-3 rounded-lg border p-3 text-sm",
                    toneClasses[tone],
                    className,
                )}
                {...props}
            >
                {icon ? (
                    <div className="mt-0.5 text-current" aria-hidden="true">
                        {icon}
                    </div>
                ) : null}
                <div className={cn("min-w-0 space-y-1", !icon && "col-start-1 col-end-3")}>
                    <span className="sr-only">{toneLabels[tone]}</span>
                    {title ? <div className="font-medium text-foreground">{title}</div> : null}
                    {description ? (
                        <div className="text-muted-foreground">{description}</div>
                    ) : null}
                    {children}
                </div>
                {action ? (
                    <div className="flex shrink-0 items-start justify-end" data-slot="alert-action">
                        {action}
                    </div>
                ) : null}
            </div>
        );
    },
);
SconeAlert.displayName = "SconeAlert";
