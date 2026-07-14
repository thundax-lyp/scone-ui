# SconeDropdown

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

动作菜单和更多操作入口。Dropdown 执行动作，不表达表单值。

| Prop                   | 类型                                     | 说明                         |
| ---------------------- | ---------------------------------------- | ---------------------------- |
| `trigger`              | `ReactNode`                              | 触发器。                     |
| `items`                | `SconeActionItem[]`                      | 简单动作项 helper。          |
| `children`             | `ReactNode`                              | DropdownMenu compound 内容。 |
| `open` / `defaultOpen` | `boolean`                                | 打开状态。                   |
| `onOpenChange`         | `(open: boolean) => void`                | 打开状态变化。               |
| `onSelect`             | `(item: SconeActionItem) => void`        | 选择 helper item。           |
| `align`                | `"start" \| "center" \| "end"`           | 对齐。                       |
| `side`                 | `"top" \| "right" \| "bottom" \| "left"` | 出现方向。                   |
| `modal`                | `boolean`                                | 是否 modal 行为。            |
| `className`            | `string`                                 | 样式。                       |

## Usage

- 更多操作、动作菜单和上下文动作使用 Dropdown。
- 表单选值使用 Select/Combobox，不使用 Dropdown。

## Rules

- Dropdown 执行动作；表单选值使用 Select。
- 入口必须有可见文本或 `ariaLabel`。
- 危险操作使用 `destructive`，确认流程由 Confirm recipe 组合。
- `items` 不得阻断 compound parts。
- shadcn mapping：基于 DropdownMenu，保留 roving focus、typeahead 和关闭行为。

测试：

- Enter/Space 打开；方向键移动；Escape 关闭并恢复焦点；destructive item 可识别。
