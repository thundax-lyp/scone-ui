# SconeAvatar

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

头像或对象标识图。

| Prop        | 类型                                        | 说明                     |
| ----------- | ------------------------------------------- | ------------------------ |
| `src`       | `string`                                    | 图片地址。               |
| `alt`       | `string`                                    | 图片替代文本。           |
| `fallback`  | `ReactNode`                                 | 图片缺失或失败时的展示。 |
| `icon`      | `ReactNode`                                 | 无图片时的图标 fallback。 |
| `size`      | `"sm" \| "md" \| "lg"`                      | 尺寸。                   |
| `shape`     | `"circle" \| "square"`                      | 形状。                   |
| `onLoad`    | `React.ReactEventHandler<HTMLImageElement>` | 图片加载成功事件。       |
| `onError`   | `React.ReactEventHandler<HTMLImageElement>` | 图片加载失败事件。       |
| `className` | `string`                                    | 样式。                   |

## Usage

- 用户、组织、资源对象或系统对象标识使用 Avatar。
- 品牌标识不使用 Avatar，按 Logo Recipe 组合。

## Rules

- `fallback` 应短且稳定，避免宽度变化影响布局。
- 图片失败时必须显示 fallback 或 icon。
- Avatar 不内置用户在线状态、业务角色、权限标识或跳转行为。
