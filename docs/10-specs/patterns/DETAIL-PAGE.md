# DetailPage

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

详情页使用 Page + Section + Descriptions/List/Card 组合。

- 键值详情优先用 `SconeDescriptions`。
- 只读字段不要伪装成 disabled input，除非需要保持表单布局。
- 状态标签用 Tag；计数用 Badge；重要异常用 Alert。
