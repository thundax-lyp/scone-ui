# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `4 src/patterns/data-table.tsx src/patterns/data-table.test.tsx src/patterns/index.ts src/index.ts src/index.test.ts`：对齐 DataTable.FilterBar 与新增 pattern 导出
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-PATTERN-PAGE-SECTION-FILTER-BAR.md`
    - 范围对象：`src/patterns/data-table.tsx`、`src/patterns/data-table.test.tsx`、`src/patterns/index.ts`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：让 `DataTable.FilterBar` 包装独立 `FilterBar.Root`，并导出 `Page`、`Section`、`FilterBar` 及 props 类型。
    - 验收点：`DataTable.FilterBar` 同时保留 DataTable 槽位标识和 FilterBar pattern 标识，children-only 兼容，根导出测试通过。
    - 重要度：10/10

- [ ] `5 docs/40-readiness/IMPLEMENTATION-COVERAGE.md docs/30-designs/RUNBOOK-PATTERN-PAGE-SECTION-FILTER-BAR.md TODO.md`：更新实现覆盖证据并清理临时任务文档
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/30-designs/RUNBOOK-PATTERN-PAGE-SECTION-FILTER-BAR.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-PATTERN-PAGE-SECTION-FILTER-BAR.md`、`TODO.md`
    - 处理动作：在实现和验证完成后更新 Implementation Coverage，删除 RUNBOOK，并从 TODO 中删除已完成任务。
    - 验收点：Implementation Coverage 记录 Page、Section、FilterBar、DataTable.FilterBar 的源码、测试和验证命令，RUNBOOK 已删除，TODO 仅保留未完成项。
    - 重要度：9/10

## 待审阅任务项

## 待讨论项
