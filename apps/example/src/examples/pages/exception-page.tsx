import { ShieldIcon } from "lucide-react";
import type * as React from "react";

import { SconeButton, SconeCard } from "scone-ui";

export const ExceptionPage = (): React.JSX.Element => (
    <SconeCard className="scone-example-result-card">
        <ShieldIcon className="size-12 text-destructive" />
        <h2 className="text-2xl font-semibold">403 / No permission</h2>
        <p className="max-w-xl text-center text-sm text-muted-foreground">
            异常页展示恢复动作和说明，不引入实际权限模型。
        </p>
        <SconeButton variant="secondary">返回首页 / Back home</SconeButton>
    </SconeCard>
);
