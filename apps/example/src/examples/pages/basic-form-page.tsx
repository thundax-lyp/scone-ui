import type * as React from "react";

import {
    SconeButton,
    SconeCard,
    SconeField,
    SconeForm,
    SconeInput,
    SconeNumberInput,
    SconeSegmented,
    SconeTextArea,
} from "scone-ui";

export const BasicFormPage = (): React.JSX.Element => (
    <div className="scone-example-basic-form-page">
        <div className="scone-example-basic-form-header">
            <div className="scone-example-basic-form-breadcrumb">表单页 / 基础表单</div>
            <h2>基础表单</h2>
            <p>表单页用于向维护者收集或验证组件信息，基础表单常见于数据项较少的表单场景。</p>
        </div>
        <SconeCard className="scone-example-card scone-example-basic-form-card">
            <SconeForm
                className="scone-example-basic-form"
                requiredMark={false}
                onSubmit={(event) => event.preventDefault()}
            >
                <SconeField.Root className="scone-example-basic-field" name="title" label="标题">
                    <SconeInput defaultValue="" placeholder="给目标起个名字" />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="period"
                    label="起止日期"
                >
                    <div className="scone-example-date-range" aria-label="起止日期">
                        <span>开始日期</span>
                        <span aria-hidden="true">→</span>
                        <span>结束日期</span>
                    </div>
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="description"
                    label="目标描述"
                >
                    <SconeTextArea
                        className="scone-example-basic-textarea"
                        defaultValue=""
                        placeholder="请输入你的阶段性工作目标"
                    />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="metric"
                    label="衡量标准"
                >
                    <SconeTextArea
                        className="scone-example-basic-textarea"
                        defaultValue=""
                        placeholder="请输入衡量标准"
                    />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="component"
                    label="组件（选填）"
                >
                    <SconeInput defaultValue="" placeholder="请描述要覆盖的组件、交互或文档" />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="reviewers"
                    label="邀评人（选填）"
                >
                    <SconeInput defaultValue="" placeholder="请直接填写评审人" />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="weight"
                    label="权重（选填）"
                >
                    <SconeNumberInput placeholder="请输入" min={0} max={100} />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-basic-field"
                    name="visibility"
                    label="目标公开"
                >
                    <SconeSegmented
                        ariaLabel="目标公开"
                        defaultValue="public"
                        options={[
                            { value: "public", label: "公开" },
                            { value: "partial", label: "部分公开" },
                            { value: "private", label: "不公开" },
                        ]}
                    />
                </SconeField.Root>
                <div className="scone-example-basic-actions">
                    <SconeButton className="scone-example-basic-reset" variant="secondary">
                        重 置
                    </SconeButton>
                    <SconeButton className="scone-example-basic-submit">提 交</SconeButton>
                </div>
            </SconeForm>
        </SconeCard>
    </div>
);
