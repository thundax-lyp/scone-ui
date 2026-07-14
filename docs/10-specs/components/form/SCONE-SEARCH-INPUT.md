# SconeSearchInput

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

搜索输入，用于 FilterBar、工具栏或局部列表搜索。

| Prop                     | 类型                      | 说明                   |
| ------------------------ | ------------------------- | ---------------------- |
| `value` / `defaultValue` | `string`                  | 搜索文本。             |
| `onValueChange`          | `(value: string) => void` | 文本变化。             |
| `onSearch`               | `(value: string) => void` | 用户明确触发搜索。     |
| `placeholder`            | `string`                  | 输入对象提示。         |
| `allowClear`             | `boolean`                 | 是否允许清空。         |
| `onClear`                | `() => void`              | 用户点击清空按钮。     |
| `loading`                | `boolean`                 | 搜索提交或结果加载中。 |
| `size`                   | `"sm" \| "md" \| "lg"`    | 控件尺寸。             |
| `ariaLabel`              | `string`                  | 无可见 label 时必填。  |
| `className`              | `string`                  | 样式。                 |

## Usage

- 用于显式搜索提交的输入场景。
- 实时筛选由调用方监听 `onValueChange`，不把防抖写入组件。

## Rules

- `onValueChange` 只表示文本变化；`onSearch` 只在回车、搜索按钮或显式提交时触发。
- 搜索按钮和回车行为必须一致，清空不自动等同搜索，除非调用方在 `onValueChange` 中处理。
- 必须有 label 或 `ariaLabel`。
- 不内置请求防抖、路由同步或筛选状态。
- shadcn mapping：基于 Input + Button/Icon 组合，不新建搜索状态机。
