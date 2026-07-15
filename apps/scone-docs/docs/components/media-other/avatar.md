---
title: SconeAvatar
sidebar_position: 20
---

# SconeAvatar

头像和文字 fallback。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeAvatar` |
| 分类 | 媒体与其他 |
| 导入 | `import { SconeAvatar } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeAvatar } from "scone-ui";
import type { SconeAvatarProps } from "scone-ui";
```

## 使用

头像和文字 fallback。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop        | 类型                                        | 说明                      |
| ----------- | ------------------------------------------- | ------------------------- |
| `src`       | `string`                                    | 图片地址。                |
| `alt`       | `string`                                    | 图片替代文本。            |
| `fallback`  | `ReactNode`                                 | 图片缺失或失败时的展示。  |
| `icon`      | `ReactNode`                                 | 无图片时的图标 fallback。 |
| `size`      | `"sm" \| "md" \| "lg"`                      | 尺寸。                    |
| `shape`     | `"circle" \| "square"`                      | 形状。                    |
| `onLoad`    | `React.ReactEventHandler&lt;HTMLImageElement&gt;` | 图片加载成功事件。        |
| `onError`   | `React.ReactEventHandler&lt;HTMLImageElement&gt;` | 图片加载失败事件。        |
| `className` | `string`                                    | 样式。                    |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
