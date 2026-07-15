---
title: SconeImage
sidebar_position: 20
---

# SconeImage

图片展示、占位和失败状态。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeImage` |
| 分类 | 媒体与其他 |
| 导入 | `import { SconeImage } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeImage } from "scone-ui";
import type { SconeImageProps } from "scone-ui";
```

## 使用

图片展示、占位和失败状态。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                  | 类型                                        | 说明                     |
| --------------------- | ------------------------------------------- | ------------------------ |
| `src`                 | `string`                                    | 图片地址。               |
| `alt`                 | `string`                                    | 图片替代文本。           |
| `fallback`            | `ReactNode`                                 | 加载失败或缺失时的展示。 |
| `preview`             | `boolean`                                   | 是否启用预览。           |
| `previewOpen`         | `boolean`                                   | 受控预览打开状态。       |
| `defaultPreviewOpen`  | `boolean`                                   | 非受控预览初始状态。     |
| `onPreviewOpenChange` | `(open: boolean) => void`                   | 预览打开状态变化。       |
| `width` / `height`    | `number \| string`                          | 稳定图片尺寸。           |
| `objectFit`           | `"cover" \| "contain"`                      | 图片填充方式。           |
| `onLoad`              | `React.ReactEventHandler&lt;HTMLImageElement&gt;` | 图片加载成功事件。       |
| `onError`             | `React.ReactEventHandler&lt;HTMLImageElement&gt;` | 图片加载失败事件。       |
| `className`           | `string`                                    | 样式。                   |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
