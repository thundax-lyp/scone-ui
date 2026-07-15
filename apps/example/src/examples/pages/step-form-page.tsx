import type * as React from "react";

import {
    SconeButton,
    SconeCard,
    SconeField,
    SconeForm,
    SconeInput,
    SconeNumberInput,
    SconeSelect,
} from "scone-ui";

export const StepFormPage = (): React.JSX.Element => (
    <div className="scone-example-basic-form-page">
        <div className="scone-example-basic-form-header">
            <div className="scone-example-basic-form-breadcrumb">表单页 / 分步表单</div>
            <h2>分步表单</h2>
            <p>将一个冗长或维护者不熟悉的表单任务分成多个步骤，指导用户完成。</p>
        </div>
        <SconeCard className="scone-example-card scone-example-step-form-card">
            <ol className="scone-example-step-list" aria-label="分步表单进度">
                {[
                    { key: "transfer", title: "填写转账信息", state: "current" },
                    { key: "confirm", title: "确认转账信息", state: "pending" },
                    { key: "done", title: "完成", state: "pending" },
                ].map((item, index) => (
                    <li key={item.key} className="scone-example-step-item" data-state={item.state}>
                        <span className="scone-example-step-index">{index + 1}</span>
                        <span className="scone-example-step-title">{item.title}</span>
                    </li>
                ))}
            </ol>
            <SconeForm
                className="scone-example-step-form"
                requiredMark={false}
                onSubmit={(event) => event.preventDefault()}
            >
                <SconeField.Root
                    className="scone-example-step-field"
                    name="payer"
                    label="付款账户"
                    required
                >
                    <SconeSelect
                        className="scone-example-step-control"
                        defaultValue="scone-admin"
                        options={[
                            { value: "scone-admin", label: "scone-admin@example.com" },
                            { value: "scone", label: "scone-ui@example.com" },
                        ]}
                    />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-step-field"
                    name="receiver"
                    label="收款账户"
                    required
                >
                    <div className="scone-example-receiver-row">
                        <SconeSelect
                            className="scone-example-pay-type"
                            defaultValue="scone-pay"
                            ariaLabel="收款方式"
                            options={[
                                { value: "scone-pay", label: "Scone Pay" },
                                { value: "bank", label: "银行卡" },
                            ]}
                        />
                        <SconeInput
                            className="scone-example-step-control"
                            defaultValue="test@example.com"
                            ariaLabel="收款账户"
                        />
                    </div>
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-step-field"
                    name="receiverName"
                    label="收款人姓名"
                    required
                >
                    <SconeInput className="scone-example-step-control" defaultValue="Alex" />
                </SconeField.Root>
                <SconeField.Root
                    className="scone-example-step-field"
                    name="amount"
                    label="转账金额"
                    required
                >
                    <div className="scone-example-amount-input">
                        <span aria-hidden="true">￥</span>
                        <SconeNumberInput
                            className="scone-example-step-control"
                            defaultValue={500}
                            min={0}
                        />
                    </div>
                </SconeField.Root>
                <div className="scone-example-step-actions">
                    <SconeButton className="scone-example-step-submit">下一步</SconeButton>
                </div>
            </SconeForm>
        </SconeCard>
    </div>
);
