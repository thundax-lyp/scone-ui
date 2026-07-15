---
title: SconeUpload
sidebar_position: 20
---

# SconeUpload

文件选择和上传 UI 桥接。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeUpload` |
| 分类 | 数据录入 |
| 导入 | `import { SconeUpload } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeUpload } from "scone-ui";
import type { SconeUploadProps } from "scone-ui";
```

## 使用

文件选择和上传 UI 桥接。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop            | 类型                                                                    | 说明             |
| --------------- | ----------------------------------------------------------------------- | ---------------- |
| `files`         | `File[]`                                                                | 受控文件列表。   |
| `defaultFiles`  | `File[]`                                                                | 默认文件列表。   |
| `onFilesChange` | `(files: File[]) => void`                                               | 文件变化。       |
| `onRemove`      | `(file: File, nextFiles: File[]) => void`                               | 用户移除文件。   |
| `onReject`      | `(file: File, reason: "type" \| "size" \| "count" \| "custom") => void` | 文件被拒绝。     |
| `accept`        | `string`                                                                | 原生文件类型。   |
| `multiple`      | `boolean`                                                               | 是否多选。       |
| `maxFiles`      | `number`                                                                | 文件数量上限。   |
| `maxSize`       | `number`                                                                | 单文件字节上限。 |
| `beforeAdd`     | `(file: File) => boolean \| Promise&lt;boolean&gt;`                           | 加入前校验。     |
| `disabled`      | `boolean`                                                               | 禁用。           |
| `renderItem`    | `(file: File) => ReactNode`                                             | 文件项渲染。     |
| `className`     | `string`                                                                | 样式。           |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
