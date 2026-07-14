# SconeTag

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

枚举、类型和状态标签。

| Prop        | 类型         | 说明           |
| ----------- | ------------ | -------------- |
| `tone`      | SconeTone    | 语义色。       |
| `closable`  | `boolean`    | 是否可关闭。   |
| `onClose`   | `() => void` | 用户关闭标签。 |
| `children`  | `ReactNode`  | 标签文本。     |
| `className` | `string`     | 样式。         |

## Usage

- 用于状态、类型、枚举值等短文本标签。
- 数字角标、未读点或轻量提示使用 Badge。

## Rules

- 业务枚举到 `tone` 的映射由调用方处理。
- 不只依赖颜色表达状态，必要时补充文本或图标。
- 计数和 dot 状态使用 Badge。
