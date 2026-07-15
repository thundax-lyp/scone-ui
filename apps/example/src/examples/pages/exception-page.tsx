import type * as React from "react";
import { useNavigate } from "react-router-dom";

import { SconeButton, SconeCard } from "scone-ui";

export type ExceptionStatus = "403" | "404" | "500";

export type ExceptionPageProps = {
    status?: ExceptionStatus;
};

const exceptionContent: Record<
    ExceptionStatus,
    {
        title: string;
        subtitle: string;
        marker: string;
    }
> = {
    "403": {
        title: "403",
        subtitle: "抱歉，您无权访问该页面。",
        marker: "!",
    },
    "404": {
        title: "404",
        subtitle: "抱歉，您访问的页面不存在。",
        marker: "?",
    },
    "500": {
        title: "500",
        subtitle: "抱歉，服务器出错了。",
        marker: "!",
    },
};

const ExceptionIllustration = ({ marker }: { marker: string }): React.JSX.Element => (
    <svg
        aria-hidden="true"
        className="scone-exception-illustration"
        viewBox="0 0 280 280"
        focusable="false"
    >
        <circle cx="145" cy="136" r="96" fill="#e8f0ff" />
        <circle cx="205" cy="62" r="30" fill="#1677ff" />
        <text x="205" y="74" fill="#ffffff" fontSize="42" fontWeight="600" textAnchor="middle">
            {marker}
        </text>
        <path d="M62 172l28-20 34 24 40-54 54 62" fill="none" stroke="#ffffff" strokeWidth="9" />
        <path d="M75 78h52" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
        <path d="M94 94h26" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
        <rect x="86" y="150" width="46" height="82" rx="23" fill="#5b8ff9" />
        <rect x="126" y="132" width="48" height="100" rx="24" fill="#3b6fd8" />
        <rect x="171" y="112" width="18" height="120" rx="9" fill="#52c41a" />
        <rect x="186" y="147" width="18" height="85" rx="9" fill="#389e0d" />
        <rect x="170" y="205" width="47" height="34" rx="6" fill="#ffd591" />
        <path
            d="M94 111c14-24 42-32 63-18 24 16 19 55-8 65"
            fill="none"
            stroke="#f6b37f"
            strokeWidth="12"
            strokeLinecap="round"
        />
        <circle cx="119" cy="118" r="18" fill="#f6b37f" />
        <path d="M104 111c8-15 27-20 41-9-5 14-20 21-41 9z" fill="#2f54eb" />
        <path
            d="M122 138l29 22-18 66"
            fill="none"
            stroke="#2f54eb"
            strokeWidth="14"
            strokeLinecap="round"
        />
        <path
            d="M119 139l-18 86"
            fill="none"
            stroke="#5b8ff9"
            strokeWidth="14"
            strokeLinecap="round"
        />
        <rect x="138" y="136" width="52" height="38" rx="3" fill="#f6c37a" />
        <path d="M155 154h18" stroke="#d48806" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

export const ExceptionPage = ({ status = "403" }: ExceptionPageProps): React.JSX.Element => {
    const navigate = useNavigate();
    const { title, subtitle, marker } = exceptionContent[status];

    return (
        <SconeCard className="scone-example-result-card scone-exception-card">
            <section className="scone-exception-page" aria-labelledby="exception-result-title">
                <ExceptionIllustration marker={marker} />
                <div className="scone-exception-content">
                    <h2 id="exception-result-title">{title}</h2>
                    <p>{subtitle}</p>
                    <SconeButton
                        className="scone-exception-action"
                        onClick={() => navigate("/welcome")}
                    >
                        返回首页
                    </SconeButton>
                </div>
            </section>
        </SconeCard>
    );
};
