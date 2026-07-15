---
title: SconeConfirm
sidebar_position: 20
---

# SconeConfirm

危险或重要动作确认。

## 定位

- 站点分类：反馈 / 浮层
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeConfirm } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

危险或重要动作确认。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

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

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
