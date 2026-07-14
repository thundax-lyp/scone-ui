# ConfirmationFlow Recipe

## Metadata

| Field     | Value                       |
| --------- | --------------------------- |
| Status    | Ready Boundary              |
| Layer     | Recipe                      |
| Authority | [`README.md`](../README.md) |

Recipe 不定义万能组件 API；按本文档组合基础组件、Layout 和 Pattern。

危险动作使用 `SconeConfirm` 或 AlertDialog recipe。

- title 写动作结果，不写泛泛的“确认操作”。
- description 说明影响范围。
- `destructive` 只改变语义和视觉，不替代确认结构。
- 异步确认期间保持焦点稳定，并防止重复提交。
