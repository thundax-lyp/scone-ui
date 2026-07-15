import * as React from "react";

export const SconeAdminLogo = ({
    size = "md",
    showWordmark = false,
}: {
    size?: "sm" | "md" | "lg";
    showWordmark?: boolean;
}): React.JSX.Element => {
    const gradientId = React.useId().replace(/:/g, "");

    return (
        <span className="scone-admin-logo" data-size={size} aria-label="Scone Admin">
            <svg className="scone-admin-logo-mark" viewBox="0 0 64 64" aria-hidden="true">
                <defs>
                    <linearGradient id={gradientId} x1="8" x2="56" y1="8" y2="56">
                        <stop offset="0" stopColor="currentColor" stopOpacity="0.95" />
                        <stop offset="0.48" stopColor="currentColor" stopOpacity="0.72" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                <path d="M32 4 60 32 32 60 4 32 32 4Z" fill={`url(#${gradientId})`} />
                <path d="M32 15 49 32 32 49 15 32 32 15Z" fill="var(--background)" opacity="0.9" />
                <path
                    d="M40 21H27a8 8 0 0 0 0 16h10a6 6 0 0 1 0 12H22"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="6"
                />
                <path
                    d="M18 32h28"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                    opacity="0.36"
                />
                <circle
                    cx="48"
                    cy="16"
                    r="4"
                    fill="currentColor"
                    stroke="var(--background)"
                    strokeWidth="2"
                />
            </svg>
            {showWordmark ? (
                <span className="scone-admin-logo-wordmark">
                    <span>Scone Admin</span>
                    <span>组件后台 / Component Admin</span>
                </span>
            ) : null}
        </span>
    );
};
