# SconeDatePicker

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

日期时间输入。

| Prop                     | 类型                            | 说明               |
| ------------------------ | ------------------------------- | ------------------ |
| `value` / `defaultValue` | `Date \| null`                  | 当前值。           |
| `onValueChange`          | `(value: Date \| null) => void` | 值变化。           |
| `open` / `defaultOpen`   | `boolean`                       | 日历浮层打开状态。 |
| `onOpenChange`           | `(open: boolean) => void`       | 日历浮层打开变化。 |
| `onClear`                | `() => void`                    | 清空当前日期。     |
| `mode`                   | `"date" \| "date-time"`         | 输入模式。         |
| `min` / `max`            | `Date`                          | 可选范围。         |
| `disabledDate`           | `(date: Date) => boolean`       | 禁用日期。         |
| `placeholder`            | `string`                        | 占位文本。         |
| `disabled` / `readOnly`  | `boolean`                       | 禁用或只读。       |
| `invalid`                | `boolean`                       | 错误状态。         |
| `ariaLabel`              | `string`                        | 可访问名称。       |
| `className`              | `string`                        | 样式。             |

## Usage

- 单个日期或日期时间输入使用 DatePicker。
- 日期范围使用 DateRange recipe，不塞入基础 DatePicker。

## Rules

- 值类型固定为 `Date | null`；序列化、时区和后端格式由调用方处理。
- `date-time` 是显式模式；范围选择归入 DateRange recipe。
- Calendar 基座必须支持键盘导航和可访问日期网格。

测试：

- 可键盘打开、选择、关闭；disabledDate 不可选；Field 错误关联可验证。
