---
title: SconeConfirm
sidebar_position: 20
---

# SconeConfirm

危险或重要动作确认。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeConfirm` |
| 分类 | 反馈 / 浮层 |
| 导入 | `import { SconeConfirm } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeConfirm } from "scone-ui";
import type { SconeConfirmProps } from "scone-ui";
```

## 使用

危险或重要动作确认。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop           | 类型                          | 说明               |
| -------------- | ----------------------------- | ------------------ |
| `open`         | `boolean`                     | 可选受控打开状态。 |
| `defaultOpen`  | `boolean`                     | 默认打开。         |
| `onOpenChange` | `(open: boolean) => void`     | 状态变化。         |
| `title`        | `ReactNode`                   | 确认标题。         |
| `description`  | `ReactNode`                   | 影响说明。         |
| `onConfirm`    | `() => void \| Promise&lt;void&gt;` | 确认回调。         |
| `onError`      | `(error: unknown) => void`    | 确认失败回调。     |
| `onCancel`     | `() => void`                  | 取消回调。         |
| `cancelText`   | `string`                      | 取消文案。         |
| `confirmText`  | `string`                      | 确认文案。         |
| `destructive`  | `boolean`                     | 危险语义。         |
| `disabled`     | `boolean`                     | 禁用确认。         |
| `loading`      | `boolean`                     | 外部受控提交中。   |
| `ariaLabel`    | `string`                      | 无可见标题时必填。 |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
