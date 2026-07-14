# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `3-image-src-reset`：3. 修复 Image 动态 src 失败状态重置
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAV-MEDIA-STATE-EDGES.md`
    - 范围对象：`src/components/media/image.tsx`、`src/components/media/image.test.tsx`
    - 处理动作：在 `SconeImage` 的 `src` 变化时重置内部 `failed` 状态为 `!src`。
    - 验收点：当前 `src` 触发 error 后 rerender 为新的非空 `src` 时，fallback 被 `<img>` 或 preview button 内的 `<img>` 替换，且新 `<img>` 使用新 `src`。
    - 重要度：9/10

- [ ] `4-avatar-src-reset`：4. 修复 Avatar 动态 src 失败状态重置
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAV-MEDIA-STATE-EDGES.md`
    - 范围对象：`src/components/media/avatar.tsx`、`src/components/media/avatar.test.tsx`
    - 处理动作：在 `SconeAvatar` 的 `src` 变化时重置内部 `failed` 状态为 `!src`。
    - 验收点：当前 `src` 触发 error 后 rerender 为新的非空 `src` 时，fallback 或 icon 被 `<img>` 替换，且新 `<img>` 使用新 `src`。
    - 重要度：9/10

- [ ] `5-readiness-closure`：5. 同步 readiness 并清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAV-MEDIA-STATE-EDGES.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-NAV-MEDIA-STATE-EDGES.md`、`TODO.md`
    - 处理动作：删除已完全处理的 review 问题章节，更新 Implementation Coverage 的待修复口径，并清理 RUNBOOK 与已完成 TODO。
    - 验收点：review 文档不再列出本次已解决的 Tooltip、Pagination、Image/Avatar P1 条目，Implementation Coverage 不再把本次已解决项列为待修复，RUNBOOK 被删除，`TODO.md` 删除或收窄已完成任务。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
