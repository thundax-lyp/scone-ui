---
title: SconeDrawer
sidebar_position: 20
---

# SconeDrawer

侧边任务容器和长表单编辑。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeDrawer` |
| 分类 | 反馈 / 浮层 |
| 导入 | `import { SconeDrawer } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeDrawer } from "scone-ui";
import type { SconeDrawerProps } from "scone-ui";
```

## 使用

侧边任务容器和长表单编辑。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop             | 类型                                   | 说明                     |
| ---------------- | -------------------------------------- | ------------------------ |
| `open`           | `boolean`                              | 打开状态。               |
| `defaultOpen`    | `boolean`                              | 默认打开。               |
| `onOpenChange`   | `(open: boolean) => void`              | 受控状态变化。           |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 用户请求关闭。           |
| `title`          | `ReactNode`                            | 标题。                   |
| `description`    | `ReactNode`                            | 可选说明。               |
| `side`           | `"right" \| "left" \| "bottom"`        | 出现方向，默认 `right`。 |
| `widthPreset`    | `"sm" \| "md" \| "lg" \| "full"`       | 宽度预设。               |
| `actions`        | `ReactNode`                            | 标题右侧操作。           |
| `footer`         | `ReactNode`                            | 底部区域。               |
| `loading`        | `boolean`                              | 内容加载。               |
| `destroyOnClose` | `boolean`                              | 关闭后销毁。             |
| `ariaLabel`      | `string`                               | 无可见标题时必填。       |
| `className`      | `string`                               | 样式。                   |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
