import type * as React from "react";

import {
    SconeAvatar,
    SconeButton,
    SconeCard,
    SconeList,
    SconeProgress,
    SconeSearchInput,
    SconeSegmented,
} from "scone-ui";

import { standardListItems } from "./page-data";

export const StandardListPage = (): React.JSX.Element => (
    <div className="scone-example-standard-list-page">
        <div className="scone-example-standard-header">
            <div className="scone-example-standard-breadcrumb">列表页 / 标准列表</div>
            <h2>标准列表</h2>
        </div>

        <div className="scone-example-standard-summary">
            {[
                { label: "我的待办", value: "8个任务" },
                { label: "本周任务平均处理时间", value: "32分钟" },
                { label: "本周完成任务数", value: "24个任务" },
            ].map((item) => (
                <div key={item.label} className="scone-example-standard-summary-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                </div>
            ))}
        </div>

        <SconeCard className="scone-example-card scone-example-standard-card">
            <div className="scone-example-standard-toolbar">
                <h3>基本列表</h3>
                <div className="scone-example-standard-controls">
                    <SconeSegmented
                        ariaLabel="标准列表状态"
                        defaultValue="all"
                        options={[
                            { value: "all", label: "全部" },
                            { value: "running", label: "进行中" },
                            { value: "waiting", label: "等待中" },
                        ]}
                    />
                    <SconeSearchInput ariaLabel="标准列表搜索" placeholder="请输入" />
                </div>
            </div>
            <SconeList
                className="scone-example-standard-list"
                dataSource={standardListItems}
                rowKey="id"
                renderItem={(item) => (
                    <div className="scone-example-standard-item">
                        <SconeAvatar
                            className="scone-example-standard-avatar"
                            data-tone={item.avatarTone}
                            shape="square"
                            fallback={item.avatarText}
                        />
                        <div className="scone-example-standard-meta">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                        <dl className="scone-example-standard-owner">
                            <dt>Owner</dt>
                            <dd>{item.owner}</dd>
                        </dl>
                        <dl className="scone-example-standard-date">
                            <dt>开始时间</dt>
                            <dd>{item.startAt}</dd>
                        </dl>
                        <div className="scone-example-standard-progress">
                            {item.progress === undefined ? (
                                <span className="scone-example-standard-progress-error" />
                            ) : (
                                <SconeProgress value={item.progress} showLabel />
                            )}
                        </div>
                        <div className="scone-example-standard-actions">
                            <SconeButton variant="link">编辑</SconeButton>
                            <SconeButton variant="link">更多</SconeButton>
                        </div>
                    </div>
                )}
            />
            <nav className="scone-example-standard-pagination" aria-label="标准列表分页">
                {[1, 2, 3, 4, 5].map((page) => (
                    <button key={page} type="button" aria-current={page === 1 ? "page" : undefined}>
                        {page}
                    </button>
                ))}
                <span>•••</span>
                <button type="button">10</button>
                <span>5 条/页</span>
                <span>跳至</span>
                <input aria-label="跳至页" />
                <span>页</span>
            </nav>
        </SconeCard>
    </div>
);
