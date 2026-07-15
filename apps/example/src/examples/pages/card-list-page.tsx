import { FileTextIcon, InfoIcon, PlusIcon, RocketIcon } from "lucide-react";
import type * as React from "react";

import { SconeButton, SconeCard } from "scone-ui";

import { cardListItems } from "./page-data";

export const CardListPage = (): React.JSX.Element => (
    <div className="scone-example-card-list-page">
        <div className="scone-example-card-list-header">
            <div className="scone-example-card-list-heading">
                <div className="scone-example-card-list-breadcrumb">列表页 / 卡片列表</div>
                <h2>卡片列表</h2>
                <p>
                    段落示意：Scone UI 组件平台用一致的设计 token、组件组合和治理规则，
                    提供跨越设计与开发的后台体验解决方案。
                </p>
                <div className="scone-example-card-list-links" aria-label="卡片列表快捷入口">
                    <SconeButton variant="link">
                        <RocketIcon className="size-4" />
                        快速开始
                    </SconeButton>
                    <SconeButton variant="link">
                        <InfoIcon className="size-4" />
                        产品简介
                    </SconeButton>
                    <SconeButton variant="link">
                        <FileTextIcon className="size-4" />
                        产品文档
                    </SconeButton>
                </div>
            </div>
            <div className="scone-example-card-list-illustration" aria-hidden="true">
                <span />
                <span />
            </div>
        </div>

        <div className="scone-example-card-grid">
            <button type="button" className="scone-example-card-add">
                <PlusIcon className="size-4" />
                新增产品
            </button>
            {cardListItems.map((item) => (
                <SconeCard key={item.id} className="scone-example-card scone-example-product-card">
                    <div className="scone-example-product-card-body">
                        <div className="scone-example-product-avatar" data-tone={item.avatarTone}>
                            {item.avatarText}
                        </div>
                        <div className="scone-example-product-meta">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                    <div className="scone-example-product-actions">
                        <a href="#operation-one">操作一</a>
                        <a href="#operation-two">操作二</a>
                    </div>
                </SconeCard>
            ))}
        </div>
    </div>
);
