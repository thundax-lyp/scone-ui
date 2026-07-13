# SettingsPage

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

设置页由多个 Section 或 Card 组成。

- 单项即时设置可用 Field + Switch/Select。
- 多字段设置使用 FormSection + FormActions。
- 危险区使用 Alert 或 Confirm recipe，不依赖红色 Card 标题表达风险。
