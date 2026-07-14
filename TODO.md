# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `02 src/components/data-display/tag.tsx`：实现 Tag 和 Badge primitives
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx`、`src/components/data-display/tag.test.tsx`、`src/components/data-display/badge.test.tsx`
    - 处理动作：实现并测试 `SconeTag` 的 tone/closable/onClose 和 `SconeBadge` 的 count/dot/tone/overflow/ariaLabel。
    - 验收点：关闭按钮可访问且只触发 `onClose`，Badge dot 有可读语义，overflow 展示稳定。
    - 重要度：9/10

- [ ] `03 src/components/data-display/card.tsx`：实现 Card 和 Statistic
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`src/components/data-display/card.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/card.test.tsx`、`src/components/data-display/statistic.test.tsx`
    - 处理动作：基于 shadcn Card 基座实现 `SconeCard`，并实现只展示字段的 `SconeStatistic`。
    - 验收点：Card 覆盖 title/description/actions/content/footer/loading/aria-busy，Statistic 不新增 trend/delta/precision。
    - 重要度：9/10

- [ ] `04 src/components/data-display/descriptions.tsx`：实现 Descriptions 和 List
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`src/components/data-display/descriptions.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/descriptions.test.tsx`、`src/components/data-display/list.test.tsx`
    - 处理动作：实现并测试只读键值详情 `SconeDescriptions` 和重复项展示 `SconeList`。
    - 验收点：Descriptions 覆盖 `SconeDescriptionItem`、responsive columns、density、bordered 和长文本换行，List 状态优先级为 `loading > error > empty`。
    - 重要度：9/10

- [ ] `05 src/components/data-display/table.tsx`：实现基础 Table region
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`src/components/data-display/table.tsx`、`src/components/data-display/table.test.tsx`、`src/components/ui/table.tsx`
    - 处理动作：基于 shadcn Table 基座实现并测试基础 `SconeTable`。
    - 验收点：覆盖 columns、rowKey、dataIndex、render、onRow、onCell、scroll.x、ariaLabel 和 `loading > error > empty`，不引入 DataTable 能力。
    - 重要度：10/10

- [ ] `06 src/components/data-display/timeline.tsx`：实现 Timeline 和公共导出
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`src/components/data-display/timeline.tsx`、`src/components/data-display/index.ts`、`src/index.ts`、`src/components/data-display/timeline.test.tsx`、`src/index.test.ts`
    - 处理动作：实现 `SconeTimeline` 并汇总 Data Display 组件族和库级公共导出。
    - 验收点：Timeline 覆盖 items/pending/reverse/onItemClick，导出测试证明只公开 Data Display 公共组件和公共类型。
    - 重要度：10/10

- [ ] `07 data-display verification`：运行 Data Display 闭环验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`package.json`、`src/components/data-display/*`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：运行 `pnpm test`、`pnpm typecheck`、`pnpm lint`、`pnpm build` 并修复本闭环引入的问题。
    - 验收点：四条命令通过，失败时仅保留有明确原因和后续任务的延期项。
    - 重要度：10/10

- [ ] `08 feat/data-display-closure`：同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：`feat/data-display-closure`、`main`
    - 处理动作：在收口前同步最新 `main` 到当前分支并处理与本闭环相关的冲突。
    - 验收点：当前分支包含最新 `main`，工作区无无关冲突或未解释改动。
    - 重要度：9/10

- [ ] `09 docs/40-readiness/IMPLEMENTATION-COVERAGE.md`：更新实现覆盖证据
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：记录 Data Display 已实现文件、测试文件、验证命令结果和剩余延期项。
    - 验收点：Implementation Coverage 明确区分 Data Display 的已实现、已测试、未覆盖和延期内容。
    - 重要度：9/10

- [ ] `10 docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`：清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`
    - 处理动作：在实现覆盖证据沉淀后删除临时 RUNBOOK。
    - 验收点：RUNBOOK 已删除，长期价值信息已迁移到 readiness 文档。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
