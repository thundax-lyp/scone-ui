# SconeFormSection

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

表单分区 helper，是 Section 在表单语境下的 shorthand，不是新的视觉容器。

| Prop          | 类型        | 说明           |
| ------------- | ----------- | -------------- |
| `title`       | `ReactNode` | 分区标题。     |
| `description` | `ReactNode` | 分区说明。     |
| `actions`     | `ReactNode` | 分区右侧操作。 |
| `children`    | `ReactNode` | 字段内容。     |
| `className`   | `string`    | 样式。         |

## Usage

- 长表单按主题分段时使用 FormSection。
- 不内置保存、展开收起或步骤流程。

## Rules

- 承载 title、description、children。
- 底层 slot 和 DOM 语义与 `Section.Root/Header/Content/Footer` 对齐；实现可以复用 Section。
- 不新增边框、背景、保存逻辑、展开收起或步骤流程。
- 不提供额外业务 API；字段状态仍由 `SconeForm`、`SconeField` 和 adapter 管理。
