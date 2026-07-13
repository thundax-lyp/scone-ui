# MasterDetail

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

MasterDetail 使用 SplitPane 或响应式 Page 组合。

- 左侧 master 承载列表、树或搜索结果。
- 右侧 detail 承载详情、编辑或预览。
- 窄屏时优先切换为列表 -> 详情的单列导航，不强行保持双栏。
