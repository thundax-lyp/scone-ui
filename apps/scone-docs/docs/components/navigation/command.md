---
title: SconeCommand
sidebar_position: 20
---

# SconeCommand

命令搜索和快捷入口。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeCommand` |
| 分类 | 导航 |
| 导入 | `import { SconeCommand } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeCommand } from "scone-ui";
import type { SconeCommandProps } from "scone-ui";
```

## 使用

命令搜索和快捷入口。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                                            | 说明                      |
| ------------------------ | ----------------------------------------------- | ------------------------- |
| `items`                  | `SconeCommandItem[]`                            | 命令项。                  |
| `value` / `defaultValue` | `string`                                        | 搜索值。                  |
| `onValueChange`          | `(value: string) => void`                       | 搜索变化。                |
| `selectedKey`            | `string`                                        | 当前 active/selected 项。 |
| `onSelect`               | `(key: string, item: SconeCommandItem) => void` | 选择命令。                |
| `loading`                | `boolean`                                       | 加载状态。                |
| `renderEmpty`            | `ReactNode \| (() => ReactNode)`                | 空结果。                  |
| `ariaLabel`              | `string`                                        | 可访问名称。              |
| `className`              | `string`                                        | 样式。                    |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
