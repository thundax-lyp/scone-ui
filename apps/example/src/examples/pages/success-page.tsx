import { CheckIcon } from "lucide-react";
import type * as React from "react";

import { SconeButton } from "scone-ui";

export const SuccessPage = (): React.JSX.Element => (
    <section className="scone-result-page" aria-labelledby="success-result-title">
        <div className="scone-result-hero">
            <div className="scone-result-icon" aria-hidden="true">
                <CheckIcon />
            </div>
            <h2 id="success-result-title">提交成功</h2>
            <p>
                提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message
                全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示“单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
            </p>
            <div className="scone-result-actions" aria-label="成功页操作">
                <SconeButton className="scone-result-primary-action">返回列表</SconeButton>
                <SconeButton variant="outline">查看项目</SconeButton>
                <SconeButton variant="outline">打 印</SconeButton>
            </div>
        </div>

        <div className="scone-result-detail" aria-label="项目处理信息">
            <h3>项目名称</h3>
            <dl className="scone-result-meta">
                <div>
                    <dt>项目 ID：</dt>
                    <dd>23421</dd>
                </div>
                <div>
                    <dt>负责人：</dt>
                    <dd>曲丽丽</dd>
                </div>
                <div>
                    <dt>生效时间：</dt>
                    <dd>2016-12-12 ~ 2017-12-12</dd>
                </div>
            </dl>

            <ol className="scone-result-steps" aria-label="项目流程">
                <li data-status="done">
                    <span className="scone-result-step-dot" />
                    <strong>创建项目</strong>
                    <span>曲丽丽</span>
                    <time dateTime="2016-12-12T12:32:00">2016-12-12 12:32</time>
                </li>
                <li data-status="done">
                    <span className="scone-result-step-dot" />
                    <strong>部门初审</strong>
                    <span>
                        周毛毛 <a href="#success-result-title">催一下</a>
                    </span>
                </li>
                <li>
                    <span className="scone-result-step-dot" />
                    <strong>财务复核</strong>
                </li>
                <li>
                    <span className="scone-result-step-dot" />
                    <strong>完成</strong>
                </li>
            </ol>
        </div>
    </section>
);
