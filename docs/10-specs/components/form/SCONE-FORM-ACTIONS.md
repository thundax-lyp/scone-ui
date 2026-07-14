# SconeFormActions

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

表单操作区 Pattern。

| Prop        | 类型                            | 说明             |
| ----------- | ------------------------------- | ---------------- |
| `primary`   | `ReactNode`                     | 主操作。         |
| `secondary` | `ReactNode`                     | 次要操作。       |
| `extra`     | `ReactNode`                     | 额外说明或操作。 |
| `sticky`    | `boolean`                       | 是否固定在底部。 |
| `align`     | `"start" \| "end" \| "between"` | 对齐方式。       |
| `className` | `string`                        | 样式。           |

## Usage

- 编辑页、创建页和 DrawerForm 的提交区使用 FormActions。
- 具体按钮文案、导航、保存请求由调用方提供。

## Rules

- 放提交、取消和次要操作。
- 页面表单可 sticky；Drawer 表单放入 Drawer `footer`。
- 不内置保存文案或导航行为。
