# SconeImage

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

图片展示组件，用于对象图片、缩略图和可选预览。

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
| `onLoad`              | `React.ReactEventHandler<HTMLImageElement>` | 图片加载成功事件。       |
| `onError`             | `React.ReactEventHandler<HTMLImageElement>` | 图片加载失败事件。       |
| `className`           | `string`                                    | 样式。                   |

## Usage

- 对象图片、缩略图和只读图片预览使用 Image。
- 头像或对象标识使用 Avatar。

## Rules

- `alt` 必须传入；装饰性图片由调用方显式传空字符串。
- 预览能力默认可关闭，不绑定业务鉴权、下载或图片处理服务。
- 加载失败必须可展示 fallback，不能只留下破图图标。
- `width` 和 `height` 应稳定布局，避免图片加载后造成布局跳动。
