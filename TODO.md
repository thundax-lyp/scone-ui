# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `7 src/components/feedback-overlay/confirm.tsx`：实现 Confirm 确认组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`
    - 范围对象：`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/confirm.test.tsx`
    - 处理动作：实现 `SconeConfirm` 和 `SconeConfirmProps`，覆盖 title、description、onConfirm、onCancel、cancelText、confirmText、destructive、disabled、loading。
    - 验收点：Confirm 测试验证默认焦点、危险说明、取消操作、异步确认 loading 和防重复提交。
    - 重要度：10/10

- [ ] `8 src/components/feedback-overlay/toast.tsx`：实现 Toast Provider 和 service
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`
    - 范围对象：`src/components/feedback-overlay/toast.tsx`、`src/components/feedback-overlay/toast.test.tsx`
    - 处理动作：实现 `SconeToastProvider`、`toast` 和 Toast 类型，覆盖 show、success、error、update、dismiss、clear、position、duration、maxVisible。
    - 验收点：Toast 测试验证稳定 id、定向 update、action 点击、closeButton、timeout、programmatic 和队列展示。
    - 重要度：10/10

- [ ] `9 src/components/feedback-overlay/notification.tsx`：实现 Notification Provider 和 service
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`
    - 范围对象：`src/components/feedback-overlay/notification.tsx`、`src/components/feedback-overlay/notification.test.tsx`
    - 处理动作：实现 `SconeNotificationProvider`、`notification` 和 Notification 类型，覆盖 open、update、close、clear、placement、maxVisible、persistent。
    - 验收点：Notification 测试验证稳定 id、定向 update、action 点击、closeButton、programmatic、persistent 和队列展示。
    - 重要度：10/10

- [ ] `10 src/index.ts`：导出 Feedback / Overlay 公共 API
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`
    - 处理动作：导出 9 个组件、2 个 Provider、2 个 service 和 RUNBOOK 指定公共类型。
    - 验收点：导出测试通过，且不导出内部 helper、内部 store 或内部 id 生成器。
    - 重要度：9/10

- [ ] `11 feat/feedback-overlay-loop`：同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：`feat/feedback-overlay-loop`、`main`
    - 处理动作：在实现与导出完成后同步 `main` 最新代码并处理冲突。
    - 验收点：当前分支包含 `main` 最新提交，Feedback / Overlay 相关测试仍通过。
    - 重要度：9/10

- [ ] `12 docs/40-readiness/IMPLEMENTATION-COVERAGE.md`：更新实现覆盖记录
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：同步 Feedback / Overlay 的实现、测试和剩余覆盖状态。
    - 验收点：readiness 文档区分已实现、已测试、未覆盖或延期项，且不再把本闭环描述为未开始。
    - 重要度：8/10

- [ ] `13 docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`：清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-FEEDBACK-OVERLAY.md`
    - 处理动作：闭环完成并迁移必要证据后删除临时 RUNBOOK。
    - 验收点：RUNBOOK 已删除，长期结论已进入 readiness 或治理文档，`TODO.md` 中已无本闭环完成项。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
