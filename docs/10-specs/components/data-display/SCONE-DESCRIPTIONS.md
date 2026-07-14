# SconeDescriptions

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

键值详情展示组件，用于对象属性、只读详情和设置摘要。

| Prop        | 类型                                      | 说明                              |
| ----------- | ----------------------------------------- | --------------------------------- |
| `title`     | `ReactNode`                               | 可选区块标题。                    |
| `items`     | `SconeDescriptionItem[]`                  | 展示项。                          |
| `columns`   | `number \| ResponsiveValue<number>`       | 列数，响应式结构引用 Foundation。 |
| `bordered`  | `boolean`                                 | 是否展示边框。                    |
| `density`   | `"compact" \| "default" \| "comfortable"` | 信息密度。                        |
| `className` | `string`                                  | 样式。                            |

## Usage

- 对象详情、设置摘要和只读属性列表使用 Descriptions。
- 需要编辑时使用 Form/Field，不用 Descriptions 伪装输入控件。

## Rules

- `label` 必须是用户可读文本，不直接展示后端字段名。
- 长文本必须允许换行；短值可以行内展示。
- 只读详情不要用 disabled input 伪装，除非需要保持表单布局。
