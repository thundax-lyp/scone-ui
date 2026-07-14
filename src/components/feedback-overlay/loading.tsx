import * as React from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "../../lib/utils";
import type { SconeControlSize } from "../../types/foundation";

export interface SconeLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    type?: "spinner" | "skeleton";
    size?: SconeControlSize;
    children?: React.ReactNode;
}

const spinnerSizeClasses: Record<SconeControlSize, string> = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
};

export const SconeLoading = React.forwardRef<HTMLDivElement, SconeLoadingProps>(
    ({ loading = true, type = "spinner", size = "md", children, className, ...props }, ref) => {
        if (!loading) {
            return (
                <div ref={ref} data-scone-loading="" className={className} {...props}>
                    {children}
                </div>
            );
        }

        return (
            <div
                ref={ref}
                data-scone-loading=""
                data-loading-type={type}
                aria-busy="true"
                className={cn("relative min-h-16 w-full rounded-lg", className)}
                {...props}
            >
                {children ? <div className="opacity-40">{children}</div> : null}
                <div
                    className={cn(
                        "flex min-h-16 w-full items-center justify-center",
                        children && "absolute inset-0 bg-background/60",
                    )}
                >
                    {type === "skeleton" ? (
                        <div
                            aria-label="Loading"
                            className="grid w-full gap-2 p-3"
                            role="status"
                            data-slot="loading-skeleton"
                        >
                            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                            <div className="h-3 w-full animate-pulse rounded bg-muted" />
                            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                        </div>
                    ) : (
                        <div
                            aria-label="Loading"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                            role="status"
                        >
                            <Loader2Icon
                                aria-hidden="true"
                                className={cn("animate-spin", spinnerSizeClasses[size])}
                            />
                            <span>Loading</span>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
SconeLoading.displayName = "SconeLoading";
