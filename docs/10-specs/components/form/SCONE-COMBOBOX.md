# SconeCombobox

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

搜索选择组合，用于选项较多、需要输入过滤或远程搜索的单值选择。

| Prop                     | 类型                             | 说明                    |
| ------------------------ | -------------------------------- | ----------------------- |
| `options`                | `SconeOption<string>[]`          | 本地选项。              |
| `value` / `defaultValue` | `string`                         | 当前值。                |
| `onValueChange`          | `(value: string) => void`        | 值变化。                |
| `searchValue`            | `string`                         | 受控搜索文本。          |
| `defaultSearchValue`     | `string`                         | 默认搜索文本。          |
| `onSearchChange`         | `(value: string) => void`        | 搜索文本变化。          |
| `open` / `defaultOpen`   | `boolean`                        | 浮层打开状态。          |
| `onOpenChange`           | `(open: boolean) => void`        | 浮层打开变化。          |
| `onClear`                | `() => void`                     | 清空当前值。            |
| `loading`                | `boolean`                        | 选项加载中。            |
| `renderEmpty`            | `ReactNode \| (() => ReactNode)` | 无匹配结果。            |
| `placeholder`            | `string`                         | 占位文本。              |
| `disabled` / `readOnly`  | `boolean`                        | 禁用或只读。            |
| `invalid`                | `boolean`                        | 与 Field 错误状态联动。 |
| `ariaLabel`              | `string`                         | 无可见 label 时必填。   |
| `children`               | `ReactNode`                      | 可选 compound 内容。    |
| `className`              | `string`                         | 样式。                  |

## Usage

- 大量选项、需要输入过滤或远程搜索的单值选择使用 Combobox。
- 少量稳定选项使用 Select；命令执行使用 Command。

## Rules

- Combobox 改变表单值；Command 执行动作或搜索命令。
- 默认只定义单值选择；多选进入 MultiSelect/TagPicker recipe。
- 远程搜索只暴露事件，不内置 debounce、缓存、请求取消或接口协议。
- 空结果使用 Empty 语义，不把空结果伪装成 disabled option。
- shadcn mapping：Popover + Command + Input 组合，保留键盘选择和焦点返回。

测试：

- 可通过 label 查询，方向键可移动 active option，Enter 提交值，Escape 关闭浮层。
- `loading`、empty、disabled、invalid 均有可测试 DOM 状态。
