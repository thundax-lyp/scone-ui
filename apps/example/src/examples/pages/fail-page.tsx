import { ChevronRightIcon, CircleXIcon, XIcon } from "lucide-react";
import type * as React from "react";

import { SconeButton, SconeCard } from "scone-ui";

const failReasons = [
    {
        label: "您的账户已被冻结",
        action: "立即解冻",
    },
    {
        label: "您的账户还不具备申请资格",
        action: "立即升级",
    },
];

export const FailPage = (): React.JSX.Element => (
    <SconeCard className="scone-example-result-card scone-example-fail-result-card">
        <div className="scone-example-fail-result-summary">
            <span className="scone-example-fail-result-icon" aria-hidden="true">
                <XIcon />
            </span>
            <h2>提交失败</h2>
            <p>请核对并修改以下信息后，再重新提交。</p>
            <SconeButton className="scone-example-fail-result-primary">返回修改</SconeButton>
        </div>

        <div className="scone-example-fail-result-errors" aria-label="提交失败原因">
            <h3>您提交的内容有如下错误：</h3>
            <ul>
                {failReasons.map((reason) => (
                    <li key={reason.label}>
                        <CircleXIcon aria-hidden="true" />
                        <span>{reason.label}</span>
                        <a href="#resolve">
                            {reason.action}
                            <ChevronRightIcon aria-hidden="true" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </SconeCard>
);
