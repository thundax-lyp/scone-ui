import * as React from "react";
import { UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SconeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    icon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    shape?: "circle" | "square";
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    className?: string;
}

const sizeClassNames = {
    sm: "size-6 text-xs",
    md: "size-8 text-sm",
    lg: "size-10 text-base",
};

export const SconeAvatar = React.forwardRef<HTMLDivElement, SconeAvatarProps>(
    (
        {
            src,
            alt,
            fallback,
            icon,
            size = "md",
            shape = "circle",
            onLoad,
            onError,
            className,
            ...props
        },
        ref,
    ) => {
        const [failed, setFailed] = React.useState(!src);
        const showImage = src && !failed;

        return (
            <div
                ref={ref}
                data-scone-media="avatar"
                data-size={size}
                data-shape={shape}
                className={cn(
                    "inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted font-medium text-muted-foreground ring-1 ring-border",
                    sizeClassNames[size],
                    shape === "circle" ? "rounded-full" : "rounded-md",
                    className,
                )}
                {...props}
            >
                {showImage ? (
                    <img
                        src={src}
                        alt={alt ?? ""}
                        className="size-full object-cover"
                        onLoad={onLoad}
                        onError={(event) => {
                            setFailed(true);
                            onError?.(event);
                        }}
                    />
                ) : (
                    (fallback ?? icon ?? <UserIcon aria-hidden="true" className="size-1/2" />)
                )}
            </div>
        );
    },
);

SconeAvatar.displayName = "SconeAvatar";
