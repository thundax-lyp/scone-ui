# SconeSelect

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

单选选择器，用于从有限选项中选择一个表单值。

| Prop                     | 类型                      | 说明                                     |
| ------------------------ | ------------------------- | ---------------------------------------- |
| `value` / `defaultValue` | `string`                  | 受控或非受控值。                         |
| `options`                | `SconeOption<string>[]`   | 简化选项 API。                           |
| `onValueChange`          | `(value: string) => void` | 值变化。                                 |
| `placeholder`            | `string`                  | 占位。                                   |
| `allowClear`             | `boolean`                 | 清空。                                   |
| `onClear`                | `() => void`              | 用户点击清空。                           |
| `open` / `defaultOpen`   | `boolean`                 | 下拉打开状态。                           |
| `onOpenChange`           | `(open: boolean) => void` | 下拉打开变化。                           |
| `disabled`               | `boolean`                 | 禁用。                                   |
| `readOnly`               | `boolean`                 | 只读，仅允许查看当前值，不打开选项列表。 |
| `size`                   | `"sm" \| "md" \| "lg"`    | 控件尺寸。                               |
| `ariaLabel`              | `string`                  | 无可见 label 时必填。                    |
| `className`              | `string`                  | 样式。                                   |

## Usage

- 有限、稳定、数量较少的单选值使用 Select。
- 需要搜索、远程加载或大量选项时使用 Combobox。

## Rules

- Select 默认只支持单选 Radix Select 模型。
- 不支持 `searchable`；搜索选择使用 `SconeCombobox`。
- 不支持 `mode="multiple"` 或 tags；多值选择归入 MultiSelect/TagPicker recipe，必须先定义 listbox ARIA 模型。
- `readOnly` 与 `disabled` 不同：可聚焦、可复制当前显示值，但不打开列表或改变值。
- `options` 结构引用 Foundation `SconeOption<string>`；复杂 item 使用 compound parts。
- 操作菜单使用 Dropdown，不使用 Select。
- shadcn mapping：基于 Radix Select 包装，保留 Trigger/Content/Item 等 compound parts；`options` 只是简化层。
