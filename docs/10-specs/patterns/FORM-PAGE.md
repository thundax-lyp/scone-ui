# FormPage

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

## Anatomy

- `PageHeader`：页面标题和返回入口。
- `SconeForm`：表单语义容器。
- `FormSection`：字段分区。
- `FormActions`：提交、取消和次要动作。

## Rules

- 编辑页和创建页使用页面滚动，长表单不放 Dialog。
- `FormActions` 可 sticky，但必须避免遮挡最后一个字段。
- 表单状态库通过 adapter 或调用方连接，不写入基础 Form。
