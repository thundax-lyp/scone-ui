# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。
- 本任务按数字编号顺序执行；第 6、7 项为最终收口步骤。

## 当前任务项

- [ ] `4. src/patterns/data-table.tsx`：实现 TableRegion 和 DataTable.Pagination
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-TABLE-PAGINATION-PATTERN.md`
    - 范围对象：`src/patterns/data-table.tsx`、`src/patterns/data-table.test.tsx`、`src/components/navigation/pagination.tsx`
    - 处理动作：实现 `DataTable.TableRegion` 状态容器、selection column 注入、children escape hatch 和 `DataTable.Pagination`。
    - 验收点：`loading > error > empty`、表头 checkbox、行 checkbox、disabled row、全选、children 模式、props/context pagination 透传均有测试覆盖。
    - 重要度：10/10

- [ ] `5. src/index.ts`：完成公共导出和集成测试
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-TABLE-PAGINATION-PATTERN.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`、`src/components/navigation/index.ts`、`src/patterns/index.ts`
    - 处理动作：收束公共入口导出并补充入口集成测试。
    - 验收点：公共入口能消费 `SconePagination`、`DataTable`、分页类型、selection 类型和相关 props 类型，且 `src/index.test.ts` 不重复组件交互测试。
    - 重要度：9/10

- [ ] `6. main`：同步 main 分支代码并执行验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-TABLE-PAGINATION-PATTERN.md`
    - 范围对象：`main`、`feat/data-table-pagination-pattern`、当前工作树
    - 处理动作：实现完成后把 `main` 最新代码同步到当前分支并运行最小相关验证。
    - 验收点：当前分支包含 `main` 最新代码，`pnpm test -- src/types/foundation.test.ts`、`pnpm test -- src/components/navigation/pagination.test.tsx src/patterns/data-table.test.tsx`、`pnpm test -- src/index.test.ts`、`pnpm typecheck`、`pnpm lint` 结果已记录。
    - 重要度：9/10

- [ ] `7. docs/40-readiness/IMPLEMENTATION-COVERAGE.md`：更新覆盖度并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-TABLE-PAGINATION-PATTERN.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-DATA-TABLE-PAGINATION-PATTERN.md`、`TODO.md`
    - 处理动作：更新 Implementation Coverage，迁移长期有效结论，并清理临时 RUNBOOK 和已完成 TODO。
    - 验收点：`IMPLEMENTATION-COVERAGE.md` 反映 `SconePagination` 与 `DataTable` 覆盖状态，RUNBOOK 已删除，`TODO.md` 不保留已完成任务。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
