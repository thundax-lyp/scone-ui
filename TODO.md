# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `9. aria-exports`：导出公共 ARIA helper
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`、`src/lib/aria.ts`、`src/lib/aria.test.ts`
    - 处理动作：从库级入口导出已经测试锁定的 ARIA helper。
    - 验收点：`src/index.test.ts` 精确断言 ARIA helper 导出清单，且未导出 Field/Form 专属逻辑或私有 helper。
    - 重要度：9/10

- [ ] `10. verification`：运行 Foundation + Public API 最小验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`package.json`、`src/styles/theme.css`、`src/types/foundation.ts`、`src/lib/aria.ts`、`src/index.ts`
    - 处理动作：运行 `pnpm typecheck`、`pnpm test`、`pnpm lint` 并修复本闭环引入的问题。
    - 验收点：三项验证通过，失败时仅修复与 Foundation + Public API 闭环相关的问题。
    - 重要度：10/10

- [ ] `11. main-sync`：同步 main 分支最新代码
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`
    - 处理动作：在收口前同步 `main` 分支最新代码到当前工作分支。
    - 验收点：当前分支包含 `main` 最新代码，且同步后相关验证仍通过或已记录需要修复的本闭环问题。
    - 重要度：10/10

- [ ] `12. runbook-cleanup`：清理 RUNBOOK 和已完成 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`、`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`TODO.md`
    - 处理动作：任务完成后删除 RUNBOOK，并从 `TODO.md` 删除已完成任务。
    - 验收点：RUNBOOK 已删除或其长期证据已迁移到 `docs/40-readiness/`，已完成 TODO 不保留在 `TODO.md`。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
