# SconeUpload

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

文件选择和上传基础入口。

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
| `beforeAdd`     | `(file: File) => boolean \| Promise<boolean>`                           | 加入前校验。     |
| `disabled`      | `boolean`                                                               | 禁用。           |
| `renderItem`    | `(file: File) => ReactNode`                                             | 文件项渲染。     |
| `className`     | `string`                                                                | 样式。           |

## Usage

- 文件选择、文件列表和上传入口使用 Upload。
- 上传协议、鉴权、存储和安全扫描由产品侧处理。

## Rules

- Upload 只负责文件选择和列表，不绑定上传协议、鉴权、存储或安全扫描。
- 上传进度与 `SconeProgress` 组合；错误信息通过 Alert 或 FieldMessage 表达。
- 基座使用原生 file input；按钮、拖拽区和列表是 anatomy。

测试：

- accept、multiple、maxFiles、maxSize、beforeAdd 可验证；disabled 不触发文件选择。
