import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

export interface SconeImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt: string;
    fallback?: React.ReactNode;
    preview?: boolean;
    previewOpen?: boolean;
    defaultPreviewOpen?: boolean;
    onPreviewOpenChange?: (open: boolean) => void;
    width?: number | string;
    height?: number | string;
    objectFit?: "cover" | "contain";
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    className?: string;
}

const toCssSize = (value: number | string | undefined): number | string | undefined => {
    return value;
};

export const SconeImage = React.forwardRef<HTMLDivElement, SconeImageProps>(
    (
        {
            src,
            alt,
            fallback,
            preview = false,
            previewOpen,
            defaultPreviewOpen = false,
            onPreviewOpenChange,
            width,
            height,
            objectFit = "cover",
            onLoad,
            onError,
            className,
            ...props
        },
        ref,
    ) => {
        const [failed, setFailed] = React.useState(!src);
        const [open, setOpen] = useControllableState({
            value: previewOpen,
            defaultValue: defaultPreviewOpen,
            onValueChange: onPreviewOpenChange,
        });

        React.useEffect(() => {
            setFailed(!src);
        }, [src]);

        const showFallback = failed || !src;
        const image = !showFallback ? (
            <img
                src={src}
                alt={alt}
                className="size-full"
                style={{ objectFit }}
                onLoad={onLoad}
                onError={(event) => {
                    setFailed(true);
                    onError?.(event);
                }}
            />
        ) : (
            <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
                {fallback}
            </div>
        );

        return (
            <>
                <div
                    ref={ref}
                    data-scone-media="image"
                    className={cn("relative inline-flex overflow-hidden rounded-md", className)}
                    style={{ width: toCssSize(width), height: toCssSize(height) }}
                    {...props}
                >
                    {preview && !showFallback ? (
                        <button
                            type="button"
                            aria-label="Preview image"
                            className="size-full"
                            onClick={() => setOpen(true)}
                        >
                            {image}
                        </button>
                    ) : (
                        image
                    )}
                </div>
                {preview && open && !showFallback ? (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image preview"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6"
                        onClick={() => setOpen(false)}
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-full max-w-full rounded-md object-contain shadow-lg"
                        />
                    </div>
                ) : null}
            </>
        );
    },
);

SconeImage.displayName = "SconeImage";
