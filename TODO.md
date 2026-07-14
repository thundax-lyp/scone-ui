# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `4. src/components/form/input.tsx`：评估 text input value plumbing 是否需要同步
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-INTERACTION-HARDENING.md`
    - 范围对象：`src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx`
    - 处理动作：检查 text input、search input、password input、textarea 是否因本轮 value、Field 或 ARIA 语义变化需要同步修正。
    - 验收点：若无直接修复收益则不改代码；若必须修改，现有 `value`、`defaultValue`、`onValueChange`、`onChange` 语义和对应测试保持一致。
    - 重要度：6/10

- [ ] `5. docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`：收口审核报告和 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-INTERACTION-HARDENING.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/30-designs/RUNBOOK-FORM-INTERACTION-HARDENING.md`
    - 处理动作：在实现和验证完成后删除已完全处理的 Systematic Code Review finding，并清理临时 RUNBOOK。
    - 验收点：NumberInput、Combobox、DatePicker 已处理章节从审核报告删除；未处理的 text input finding 保留；RUNBOOK 被删除且无残留引用。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
