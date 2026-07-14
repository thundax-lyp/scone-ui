# SconeFieldGroup

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

多个相关字段的分组结构。

| Prop          | 类型                         | 说明         |
| ------------- | ---------------------------- | ------------ |
| `label`       | `ReactNode`                  | 分组 label。 |
| `description` | `ReactNode`                  | 分组说明。   |
| `orientation` | `"vertical" \| "horizontal"` | 字段排列。   |
| `children`    | `ReactNode`                  | 相关字段。   |
| `className`   | `string`                     | 样式。       |

## Usage

- 地址段、日期范围、权限集合等相关字段使用 FieldGroup。
- 不用于页面分区；页面或表单大分区使用 FormSection。

## Rules

- 用于地址、日期范围、权限集合等相关字段。
- 必须有 group label 或可访问说明。
- 不替代 Section；Section 是页面/表单分区，FieldGroup 是字段语义分组。
