---
title: Recipe 组合示例
sidebar_position: 10
---

# Recipe 组合示例

Recipe 是可复制的组合示例，不是新的公共组件 API。

## 可用 Recipe

| Recipe | 主要组合 | 说明 |
| --- | --- | --- |
| DrawerForm | `SconeDrawer` + 表单组件 | 侧边长表单编辑。 |
| ConfirmationFlow | `SconeConfirm` + 反馈组件 | 危险动作确认和结果反馈。 |
| Popover | Dropdown/Dialog 等底层能力组合 | 轻量浮层内容边界。 |
| Logo | 媒体和排版组合 | 产品侧 Logo 组合建议，不形成 `SconeLogo`。 |
| Result | `SconeEmpty` / `SconeAlert` / 操作按钮 | 成功、失败或完成状态页片段。 |
| Dashboard Metric | `SconeStatistic` + `SconeCard` / `Section` | 指标卡片和仪表盘摘要。 |
| Grid | Layout primitives | 响应式栅格组合。 |

## 命名规则

- 不要发明不存在的公共 API，例如 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid`。
- Recipe 示例可以被复制到调用方应用，也可以在产品侧封装成业务组件。
- 如果一个 Recipe 反复出现且业务中性，应先更新 specs，再决定是否升级为 Pattern 或 Component。

## 边界

Recipe 不拥有独立 props 合同，不改变底层组件的事件、状态和可访问性规则。精确类型以 `"scone-ui"` 的公共导出和 `dist/index.d.ts` 为准。
