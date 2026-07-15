import * as React from "react";

export const SconeAdminLogo = ({
    size = "md",
    showWordmark = false,
}: {
    size?: "sm" | "md" | "lg";
    showWordmark?: boolean;
}): React.JSX.Element => {
    return (
        <span className="scone-admin-logo" data-size={size} aria-label="Scone Admin">
            <svg className="scone-admin-logo-mark" viewBox="0 0 64 64" aria-hidden="true">
                <rect
                    className="scone-admin-logo-plate"
                    x="6"
                    y="6"
                    width="52"
                    height="52"
                    rx="16"
                />
                <path
                    className="scone-admin-logo-scone"
                    d="M18 25.5C18 18.6 24.3 13 32 13s14 5.6 14 12.5H18Z"
                />
                <path className="scone-admin-logo-bacon" d="M18 30.5h28" />
                <path
                    className="scone-admin-logo-sandwich"
                    d="M18 36.5h28c0 7.5-6.3 13.5-14 13.5s-14-6-14-13.5Z"
                />
                <path
                    className="scone-admin-logo-cut"
                    d="M38 22c-3.9-2.6-12-2.3-12 2.8 0 5.9 12 3.7 12 9.8 0 5.2-7.9 5.8-13 2.7"
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
