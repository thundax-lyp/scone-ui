# Systematic Code Review 2026-07

## Status

- Scope: full frontend framework codebase review for `scone-ui`.
- Mode: docs-only audit; no source behavior changes in review tasks.
- Source of execution order: `TODO.md`.
- Temporary runbook: `docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`.

## 01 Baseline

### Project Facts

- Framework: React 19 with TypeScript strict mode.
- Build tool: Vite 8 with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Styling: Tailwind CSS 4, project CSS in `src/styles.css` and `src/styles/theme.css`.
- Test runner: Vitest 4 with jsdom and `@testing-library/react`.
- Lint: ESLint 10, TypeScript ESLint recommended rules, React Hooks rules, React Refresh export rule.
- Package manager/runtime: pnpm 10, Node `>=22`.
- Public package entry: `src/index.ts`.
- Demo-only runtime entry: `src/main.tsx` -> `src/app.tsx`.

### Boundary Facts

- This repository is a component library and governance workspace, not a product application.
- No router, request layer, backend contract module, global store, or server-state library is present.
- Source code is organized by public component families: `components/form`, `components/data-display`, `components/layout`, `components/feedback-overlay`, `components/navigation`, `components/media`, `patterns`, `lib`, `types`, `styles`.
- `src/components/ui` contains shadcn/Radix primitive wrappers and is excluded from the public package entry.
- Current lint configuration intentionally disables Fast Refresh component-only export warnings for vendored UI files, Form compound/context files, and Pattern compound files.

### Verification Baseline

Configured commands:

- `pnpm format:check`
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

Recent evidence before this review branch:

- `pnpm format:check` passed.
- `pnpm test -- src/index.test.ts` ran the full Vitest suite: 69 files, 253 tests passed.
- `pnpm lint` passed.

### Initial Assessment

- The current technology stack is intentionally small for a reusable UI library.
- Absence of routing, network, and global state is aligned with repository scope.
- The highest-risk review areas are public API shape, compound component exports, Pattern state ownership, and consistency between SPEC, DESIGN, readiness, and source.

## 02 Public Entry And Export Guard

### Evidence

- `src/index.ts` exports component families, Admin Patterns, foundation types, and library utilities.
- `src/index.test.ts` asserts runtime public exports, representative exported types, Pattern compound objects, and docs-only Recipe exclusions.
- `docs/10-specs/COMPONENT-SELECTION.md` and `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md` define Recipes as docs-only and forbid `src/recipes/`.
- `find src -maxdepth 2 -type d` confirms there is no `src/recipes` directory.
- `rg "Scone(Result|Logo|Popover|Grid|DrawerForm|ConfirmationFlow|DashboardMetric)|src/recipes|Recipe" src ...` only finds Recipe names in docs and negative export assertions.

### Assessment

- Public component and Pattern exports are aligned with current Export Groups.
- Recipe boundaries are guarded by both absence of source directory and negative public export assertions.
- Component-family barrels export only their own family members and public types.
- No P0/P1 issue found in public export completeness or no-recipe-source guard.

### Candidate Finding

### [P3] Public entry grouping is harder to scan than family barrels

* **位置**：`src/index.ts`
* **类别**：结构
* **问题**：库级入口同时使用 family barrel re-export 和 direct file re-export；feedback、layout、navigation 的顺序与族目录不完全一致。
* **影响**：不会改变功能，但增加人工审核导出面时的扫描成本。
* **证据**：`src/index.ts` 先通过 `./components/navigation` 导出大部分 navigation，再单独从 `./components/navigation` 导出 `SconePagination`；feedback 和 layout 直接按文件导出。
* **建议**：后续触及导出入口时，按 Export Groups 分块，并优先复用组件族 barrel；保持 `src/index.test.ts` 的完整导出列表作为守护。
* **功能风险**：低；只要导出名和类型保持不变，消费者不受影响。
* **置信度**：高

## 03 Foundation, Utilities, And Theme-Independent Primitives

### Evidence

- `src/types/foundation.ts` contains only shared vocabulary and generic item/state types.
- `src/lib/aria.ts`, `src/lib/cn.ts`, `src/lib/compose-refs.ts`, and `src/lib/use-controllable-state.ts` are small leaf utilities.
- `rg` confirms `src/types` and `src/lib` do not import from `components` or `patterns`.
- `cn`, ARIA helpers, and `useControllableState` have multiple real callers across component families.
- `any` is not present in the reviewed files; assertions are limited to React ref assignment and callable setter narrowing.

### Assessment

- Foundation and utility dependency direction is correct.
- Shared types are broad but still library-level vocabulary, not product-specific domain models.
- Utility functions have real cross-family reuse and are not premature global abstractions.
- No duplicated className, ARIA id, ref composition, or controlled/uncontrolled helper was found in this layer.

### Candidate Finding

### [P2] Controlled state helper cannot represent `undefined` as a controlled value

* **位置**：`src/lib/use-controllable-state.ts`
* **类别**：状态 / API / 类型
* **问题**：`isControlled` is derived from `value !== undefined`; components using this helper cannot distinguish omitted `value` from an intentionally controlled `undefined` value.
* **影响**：For components where `undefined` is the documented empty value, controlled clearing must usually be represented by omitting `value` or using a different sentinel. This is easy to miss when reviewing custom inputs.
* **证据**：`UseControllableStateOptions<T>` declares `value?: T`, `defaultValue?: T | (() => T)`, and the hook returns `T | undefined`; callers include `SconeNumberInput`, `SconeDatePicker`, `SconeUpload`, `SconeImage`, `FilterBar`, and multiple navigation/form controls.
* **建议**：Do not change the helper globally during this audit. When fixing related components, either document this contract explicitly or introduce a controlled sentinel only where `undefined` must be a valid controlled value.
* **功能风险**：中；changing this helper would affect many controls and could alter controlled/uncontrolled behavior.
* **置信度**：高
