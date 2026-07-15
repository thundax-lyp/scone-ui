---
title: SconeDialog
sidebar_position: 20
---

# SconeDialog

短流程对话框。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeDialog` |
| 分类 | 反馈 / 浮层 |
| 导入 | `import { SconeDialog } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeDialog } from "scone-ui";
import type { SconeDialogProps } from "scone-ui";
```

## 使用

短流程对话框。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop             | 类型                                   | 说明               |
| ---------------- | -------------------------------------- | ------------------ |
| `open`           | `boolean`                              | 打开状态。         |
| `defaultOpen`    | `boolean`                              | 默认打开。         |
| `onOpenChange`   | `(open: boolean) => void`              | 打开状态变化。     |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 用户请求关闭。     |
| `title`          | `ReactNode`                            | 标题。             |
| `description`    | `ReactNode`                            | 说明。             |
| `children`       | `ReactNode`                            | 内容。             |
| `footer`         | `ReactNode`                            | 底部区域。         |
| `widthPreset`    | `"sm" \| "md" \| "lg"`                 | 宽度预设。         |
| `ariaLabel`      | `string`                               | 无可见标题时必填。 |
| `className`      | `string`                               | 样式。             |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
