---
title: SconeDescriptions
sidebar_position: 20
---

# SconeDescriptions

详情字段列表。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeDescriptions` |
| 分类 | 数据展示 |
| 导入 | `import { SconeDescriptions } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeDescriptions } from "scone-ui";
import type { SconeDescriptionsProps } from "scone-ui";
```

## 使用

详情字段列表。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型                                      | 说明                              |
| ----------- | ----------------------------------------- | --------------------------------- |
| `title`     | `ReactNode`                               | 可选区块标题。                    |
| `items`     | `SconeDescriptionItem[]`                  | 展示项。                          |
| `columns`   | `number \| ResponsiveValue&lt;number&gt;`       | 列数，响应式结构引用 Foundation。 |
| `bordered`  | `boolean`                                 | 是否展示边框。                    |
| `density`   | `"compact" \| "default" \| "comfortable"` | 信息密度。                        |
| `className` | `string`                                  | 样式。                            |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
