---
title: SconeSlider
sidebar_position: 20
---

# SconeSlider

粗略范围或数值调节。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSlider` |
| 分类 | 数据录入 |
| 导入 | `import { SconeSlider } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSlider } from "scone-ui";
import type { SconeSliderProps } from "scone-ui";
```

## 使用

粗略范围或数值调节。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                        | 说明                     |
| ------------------------ | --------------------------- | ------------------------ |
| `value` / `defaultValue` | `number[]`                  | 当前值。                 |
| `onValueChange`          | `(value: number[]) => void` | 拖动变化。               |
| `onValueCommit`          | `(value: number[]) => void` | 拖动结束或键盘调整完成。 |
| `min` / `max`            | `number`                    | 范围。                   |
| `step`                   | `number`                    | 步进。                   |
| `disabled`               | `boolean`                   | 禁用。                   |
| `ariaLabel`              | `string`                    | 可访问名称。             |
| `className`              | `string`                    | 样式。                   |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
