# SconeCheckbox

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

勾选输入。

| Prop                         | 类型                                            | 说明         |
| ---------------------------- | ----------------------------------------------- | ------------ |
| `checked` / `defaultChecked` | `boolean \| "indeterminate"`                    | 当前状态。   |
| `onCheckedChange`            | `(checked: boolean \| "indeterminate") => void` | 状态变化。   |
| `disabled`                   | `boolean`                                       | 禁用。       |
| `ariaLabel`                  | `string`                                        | 可访问名称。 |
| `className`                  | `string`                                        | 样式。       |

## Usage

- 单个勾选确认或多选集合中的项使用 Checkbox。
- 即时启停设置使用 Switch。

## Rules

- 文本 label 必须与控件关联。
- 多选组使用 FieldGroup 或 CheckboxGroup recipe，不在 Checkbox 内管理集合。
- shadcn mapping：基于 Radix Checkbox，保留 indeterminate 语义。

测试：

- 支持 checked、unchecked、indeterminate；Space 可切换；错误信息通过 Field 关联。
