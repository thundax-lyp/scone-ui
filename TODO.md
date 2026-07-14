# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。
- 本任务按数字编号顺序执行；第 06、07 项为最终收口步骤。

## 当前任务项

- [ ] `03 Section`：实现 Section 结构分区边界
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-ADMIN-SHELL-PATTERNS.md`
    - 范围对象：`src/patterns/section.tsx`、`src/patterns/section.test.tsx`、`src/patterns/index.ts`
    - 处理动作：实现 `Section.Root/Header/Content/Footer`、`density` 和分区级 actions slot。
    - 验收点：Section 测试覆盖语义 `section`、Header actions、Content、Footer、`density` 和非 Card 视觉边界。
    - 重要度：8/10

- [ ] `04 FilterBar`：实现 FilterBar 交互边界
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-ADMIN-SHELL-PATTERNS.md`
    - 范围对象：`src/patterns/filter-bar.tsx`、`src/patterns/filter-bar.test.tsx`、`src/patterns/index.ts`
    - 处理动作：实现 `FilterBar.Root/Search/Fields/Actions/Summary`、`FilterBarFilters`、`FilterBarState` 和 search/filters/expanded 事件边界。
    - 验收点：FilterBar 测试覆盖搜索输入、筛选控件 slot、展开/收起、应用、重置、摘要和窄屏换行语义。
    - 重要度：9/10

- [ ] `05 Public exports`：完成公共导出和 DataTable 回归确认
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-ADMIN-SHELL-PATTERNS.md`
    - 范围对象：`src/patterns/index.ts`、`src/index.ts`、`src/patterns/data-table.tsx`、`src/patterns/data-table.test.tsx`
    - 处理动作：从 patterns 入口和包公共入口导出新增 Pattern 与公开类型，并确认不修改 DataTable 内部。
    - 验收点：新增导出不覆盖既有 `DataTable` 导出，`src/patterns/data-table.test.tsx` 继续通过。
    - 重要度：9/10

- [ ] `06 Implementation Coverage`：更新 Admin Pattern 实现覆盖证据
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-ADMIN-SHELL-PATTERNS.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`src/patterns/app-shell.test.tsx`、`src/patterns/page.test.tsx`、`src/patterns/section.test.tsx`、`src/patterns/filter-bar.test.tsx`
    - 处理动作：在 Implementation Coverage 中记录 Admin Shell Patterns 的实现状态、源码文件、测试文件和验证命令。
    - 验收点：Implementation Coverage 明确 `AppShell`、`Page`、`Section`、`FilterBar` 已实现并测试，且记录通过的验证命令。
    - 重要度：8/10

- [ ] `07 Closure`：清理临时 RUNBOOK 并收窄 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-ADMIN-SHELL-PATTERNS.md`、`TODO.md`
    - 处理动作：在闭环完成后删除临时 RUNBOOK，并从 TODO.md 删除已完成任务项。
    - 验收点：RUNBOOK 文件已删除，TODO.md 不保留已完成任务清单或残留临时任务。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
