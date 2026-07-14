# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `1-use-controllable-state-contract`：1. 锁定 controlled `undefined` 契约
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 范围对象：`src/lib/use-controllable-state.ts`、`src/lib/use-controllable-state.test.tsx`
    - 处理动作：为 `value !== undefined` 受控判定补充契约注释，并新增 `value={undefined}` 走 uncontrolled mode 的测试。
    - 验收点：测试覆盖 `defaultValue` 初始值、setter 本地更新和 `onValueChange` 通知，且不新增受控判定字段。
    - 重要度：9/10

- [ ] `2-form-context-public-contract`：2. 锁定 Form context 公共导出字段
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 范围对象：`src/components/form/form.tsx`、`src/components/form/field.tsx`、`src/components/form/index.ts`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：保留 Form context hooks 和 context value 类型公共导出，并补齐 generated id 字段的公共类型断言。
    - 验收点：`useSconeFormContext`、`useSconeFieldContext` 仍是 runtime public exports，`SconeFieldContextValue.fieldId`、`labelId`、`descriptionId`、`messageId` 均被断言为 `string`。
    - 重要度：9/10

- [ ] `3-input-search-text-control`：3. 收敛 Input 和 SearchInput 文本值 plumbing
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 范围对象：`src/components/form/input.tsx`、`src/components/form/input.test.tsx`、`src/components/form/search-input.tsx`、`src/components/form/search-input.test.tsx`、`src/components/form/text-control.ts`
    - 处理动作：新增 `text-control.ts` 内部 helper，并让 `SconeInput`、`SconeSearchInput` 复用受控值、Field 注入和 change 提交流程。
    - 验收点：`SconeInput` 输入和 `SconeSearchInput` 输入均保持先 `onValueChange` 后原生 `onChange`，且 Search clear、loading、readOnly、disabled 行为保持不变。
    - 重要度：8/10

- [ ] `4-password-textarea-text-control`：4. 收敛 PasswordInput 和 TextArea 文本值 plumbing
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 范围对象：`src/components/form/password-input.tsx`、`src/components/form/password-input.test.tsx`、`src/components/form/textarea.tsx`、`src/components/form/textarea.test.tsx`、`src/components/form/text-control.ts`
    - 处理动作：让 `SconePasswordInput` 和 `SconeTextArea` 复用同一个内部文本控件 helper。
    - 验收点：Password 输入和 TextArea 输入均保持先 `onValueChange` 后原生 `onChange`，visibility toggle、disabled/readOnly toggle 禁用、count 和 autoSize 行为保持不变。
    - 重要度：8/10

- [ ] `5-form-public-api-closure`：5. 同步审查和覆盖度文档并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`
    - 处理动作：在代码和验证完成后同步 readiness 文档，删除已关闭审查章节，更新 Implementation Coverage，并删除临时 RUNBOOK。
    - 验收点：三个 Form 公共 API P2 章节已按完成状态删除或收窄，Implementation Coverage 反映本次契约锁定和测试覆盖，RUNBOOK 文件已清理。
    - 重要度：9/10

## 待审阅任务项

## 待讨论项
