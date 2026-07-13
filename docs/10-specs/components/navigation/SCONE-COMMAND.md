# SconeCommand

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

命令搜索列表，用于命令面板、Combobox 内部列表和局部快速跳转。

| Prop            | 类型                             | 说明         |
| --------------- | -------------------------------- | ------------ |
| `items`         | `SconeCommandItem[]`             | 命令项。     |
| `value` / `defaultValue` | `string`                 | 搜索值。     |
| `onValueChange` | `(value: string) => void`        | 搜索变化。   |
| `selectedKey`   | `string`                         | 当前 active/selected 项。 |
| `onSelect`      | `(key: string, item: SconeCommandItem) => void` | 选择命令。 |
| `loading`       | `boolean`                        | 加载状态。   |
| `renderEmpty`   | `ReactNode \| (() => ReactNode)` | 空结果。     |
| `ariaLabel`     | `string`                         | 可访问名称。 |
| `className`     | `string`                         | 样式。       |

## Usage

- 命令面板、局部快速跳转和 Combobox 内部搜索列表使用 Command。
- 表单值选择必须由 Combobox 增加表单语义。

## Rules

- Command 表达命令、搜索结果或可执行项，不默认写入表单值。
- Combobox 可以复用 Command，但必须增加表单值语义。
- 支持分组、空状态和键盘选择。
- shadcn mapping：基于 Command。

测试：

- 输入过滤、方向键移动、Enter 选择、empty/loading 状态可验证。
