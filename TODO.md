# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `04-layout-root-passthrough`：补齐 Layout primitives root attrs/ref passthrough
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-COMPONENT-CONTRACTS.md`
    - 范围对象：`src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx` 及对应测试文件
    - 处理动作：让 `SconeStackProps`、`SconeInlineProps`、`SconeCompactProps`、`SconeToolbarProps` 扩展 root `React.HTMLAttributes<HTMLDivElement>`，并将 rest attrs、`style`、`className` 和 ref 透传到 root `<div>`。
    - 验收点：每个组件测试覆盖 `id`、`role`、`aria-*` 或 `data-*` passthrough，且 `data-scone-layout`、`data-gap`、`data-align`、`data-wrap`、`data-orientation`、`data-size`、`data-density` 不被 caller 覆盖。
    - 重要度：8/10

- [ ] `05-cn-import-cleanup`：统一触及文件的 `cn` import
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-COMPONENT-CONTRACTS.md`
    - 范围对象：`src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/lib/utils.ts`、`src/lib/cn.test.ts`
    - 处理动作：将本次触及 layout 文件的 `cn` import 统一到 `@/lib/cn`，并仅在全仓库无剩余 `lib/utils` 调用时删除 `src/lib/utils.ts` 及对应 legacy 兼容测试。
    - 验收点：本次触及源码不再从 `../../lib/utils` 导入 `cn`；若 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 仍有非本次范围命中，则保留 `src/lib/utils.ts` 和 legacy 测试。
    - 重要度：6/10

- [ ] `06-review-and-runbook-closure`：验证并收口 review 文档和 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-COMPONENT-CONTRACTS.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/30-designs/RUNBOOK-FOUNDATION-COMPONENT-CONTRACTS.md`、`docs/30-designs/README.md`、`TODO.md`
    - 处理动作：运行 RUNBOOK 要求的测试和静态检查后，删除已完全处理的 review finding 章节和索引条目，清理 RUNBOOK 及 Active Runbooks 引用，并删除已完成 TODO。
    - 验收点：`pnpm test -- src/styles/theme.test.ts src/components/data-display/descriptions.test.tsx src/components/data-display/badge.test.tsx src/components/layout/stack.test.tsx src/components/layout/inline.test.tsx src/components/layout/compact.test.tsx src/components/layout/toolbar.test.tsx src/lib/cn.test.ts`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check` 通过，review 文档不保留已完全处理问题，RUNBOOK 文件和索引引用已清理。
    - 重要度：9/10

## 待审阅任务项

## 待讨论项
