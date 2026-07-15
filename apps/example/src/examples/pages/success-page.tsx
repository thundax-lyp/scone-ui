import { CheckCircle2Icon } from "lucide-react";
import type * as React from "react";

import { SconeButton, SconeCard } from "scone-ui";

export const SuccessPage = (): React.JSX.Element => (
    <SconeCard className="scone-example-result-card">
        <CheckCircle2Icon className="size-12 text-emerald-600" />
        <h2 className="text-2xl font-semibold">提交成功 / Submitted successfully</h2>
        <p className="max-w-xl text-center text-sm text-muted-foreground">
            The example result page uses plain reusable feedback primitives and action placement.
        </p>
        <div className="flex flex-wrap justify-center gap-sm">
            <SconeButton>返回列表 / Back to list</SconeButton>
            <SconeButton variant="secondary">查看详情 / View detail</SconeButton>
        </div>
    </SconeCard>
);
