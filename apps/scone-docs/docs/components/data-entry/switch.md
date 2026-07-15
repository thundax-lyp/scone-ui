---
title: SconeSwitch
sidebar_position: 20
---

# SconeSwitch

开关状态。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSwitch` |
| 分类 | 数据录入 |
| 导入 | `import { SconeSwitch } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSwitch } from "scone-ui";
import type { SconeSwitchProps } from "scone-ui";
```

## 使用

开关状态。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                         | 类型                         | 说明                  |
| ---------------------------- | ---------------------------- | --------------------- |
| `checked` / `defaultChecked` | `boolean`                    | 当前开关状态。        |
| `onCheckedChange`            | `(checked: boolean) => void` | 状态变化。            |
| `disabled`                   | `boolean`                    | 禁用。                |
| `ariaLabel`                  | `string`                     | 无可见 label 时必填。 |
| `className`                  | `string`                     | 样式。                |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
