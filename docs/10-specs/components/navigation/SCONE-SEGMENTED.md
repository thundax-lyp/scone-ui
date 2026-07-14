# SconeSegmented

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

轻量模式切换，用于 2-5 个短选项。

| Prop                     | 类型                      | 说明         |
| ------------------------ | ------------------------- | ------------ |
| `options`                | `SconeOption<string>[]`   | 选项。       |
| `value` / `defaultValue` | `string`                  | 当前值。     |
| `onValueChange`          | `(value: string) => void` | 切换。       |
| `size`                   | `"sm" \| "md"`            | 控件尺寸。   |
| `disabled`               | `boolean`                 | 禁用整组。   |
| `ariaLabel`              | `string`                  | 可访问名称。 |
| `className`              | `string`                  | 样式。       |

## Usage

- 2-5 个短选项的轻量模式切换使用 Segmented。
- 需要内容面板关联时使用 Tabs。

## Rules

- 选项文案必须短，不承载复杂内容。
- 不渲染内容面板；内容切换由调用方处理。
- 方向键切换时 selection 和 focus 必须同步移动，并跳过 disabled option。
- 长文案或需要面板关联时使用 Tabs。

测试：

- 当前项 selected 状态可查询；键盘可切换；disabled 不可切换。
