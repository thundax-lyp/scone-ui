---
title: SconeSplitPane
sidebar_position: 20
---

# SconeSplitPane

分隔面板区域。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeSplitPane` |
| 分类 | 布局 |
| 导入 | `import { SconeSplitPane } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeSplitPane } from "scone-ui";
import type { SconeSplitPaneProps } from "scone-ui";
```

## 使用

分隔面板区域。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                              | 类型                                       | 说明                                    |
| --------------------------------- | ------------------------------------------ | --------------------------------------- |
| `orientation`                     | `"horizontal" \| "vertical"`               | 分割方向。                              |
| `defaultSizePreset`               | `"narrow" \| "medium" \| "wide"`           | 默认主面板尺寸预设。                    |
| `sizePreset`                      | `"narrow" \| "medium" \| "wide" \| "fill"` | 受控主面板尺寸预设。                    |
| `onSizePresetChange`              | `(preset: string) => void`                 | 预设尺寸变化。                          |
| `minSizePreset` / `maxSizePreset` | `"narrow" \| "medium" \| "wide" \| "fill"` | 尺寸约束预设。                          |
| `defaultSize`                     | `string`                                   | 可选 CSS 长度覆盖，必须带单位或百分比。 |
| `size`                            | `string`                                   | 受控 CSS 长度覆盖，必须带单位或百分比。 |
| `onSizeChange`                    | `(size: string) => void`                   | 拖拽过程尺寸变化。                      |
| `onSizeCommit`                    | `(size: string) => void`                   | 拖拽结束提交尺寸。                      |
| `children`                        | `ReactNode`                                | 面板。                                  |
| `className`                       | `string`                                   | 样式。                                  |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
