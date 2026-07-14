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

## 04 Styles, Theme, And Demo Entry

### Evidence

- `src/styles.css` imports Tailwind, shadcn CSS, Geist font, and `src/styles/theme.css`.
- `src/styles/theme.css` is the actual token source for color, spacing, radius, shadow, font, motion, z-index, control, page, and drawer variables.
- `src/styles/theme.test.ts` asserts required token variables and ensures only `styles.css` references `--scone-*` outside `theme.css`.
- `src/app.tsx` and `src/main.tsx` are demo/runtime entry files; they do not import public package APIs, routers, request clients, stores, or product contracts.
- `rg` found no router, network, or state library usage in `src/app.tsx`, `src/main.tsx`, or style files.

### Assessment

- The demo entry is isolated from the library public API and does not create product runtime assumptions.
- Theme value ownership is clear in `src/styles/theme.css`.
- `src/styles.css` correctly maps Tailwind v4 `@theme inline` names to current `--scone-*` variables.

### Candidate Finding

### [P1] Tailwind config references stale token variable names

* **位置**：`tailwind.config.ts`
* **类别**：结构 / 配置
* **问题**：`tailwind.config.ts` maps font, fontSize, motion, and zIndex extensions to variables such as `--scone-font-family-body`, `--scone-motion-duration-fast`, and `--scone-z-index-sticky`, while `theme.css` defines `--scone-font-body`, `--scone-duration-fast`, and `--scone-z-sticky`.
* **影响**：The CSS-first path still works through `src/styles.css`, but maintainers reading or reusing `tailwind.config.ts` get a stale token contract. If any utility is generated from these config keys, it will reference undefined variables.
* **证据**：`rg "scone-font-family|scone-font-size|scone-motion|scone-z-index"` only returns `tailwind.config.ts`; `src/styles/theme.css` defines the shorter current names and no matching old names.
* **建议**：Either update `tailwind.config.ts` to the current `theme.css` variable names or remove stale config extensions that are superseded by Tailwind v4 `@theme inline`.
* **功能风险**：中；changing token names can affect generated utilities, but the fix is localized to build/style config.
* **置信度**：高

## 05 Form Structure And Field Context

### Evidence

- `SconeForm` provides only `disabled`, `readOnly`, and `requiredMark` through context.
- `SconeField.Root` resolves form-level state, owns generated ids, and provides label/description/message/control metadata.
- `SconeField.Control` uses Radix `Slot.Root` for as-child composition and injects ids, name, ARIA, disabled, readOnly, and data-state attributes.
- `src/components/form/control.ts` centralizes Field-to-control prop injection and is used by all standalone form controls.
- Tests cover label/description/message linkage, invalid/required ARIA, form state override, and stable refs.

### Assessment

- Form and Field responsibilities are separated clearly: form-level defaults, field-level semantic grouping, and control-level ARIA injection.
- Context scope is local and does not introduce global state or product-specific form behavior.
- `control.ts` is a real shared helper, not a one-off abstraction.
- Fast Refresh warning exceptions for `form.tsx` and `field.tsx` match the compound/context export pattern.

### Candidate Finding

### [P2] Form context internals are part of the public package surface

* **位置**：`src/components/form/form.tsx`、`src/components/form/field.tsx`、`src/components/form/index.ts`、`src/index.ts`
* **类别**：API / 封装
* **问题**：`useSconeFormContext`, `useSconeFieldContext`, `SconeFormContextValue`, and `SconeFieldContextValue` are exported from the public package entry. `SconeFieldContextValue` includes internal id fields such as `fieldId`, `labelId`, `descriptionId`, and `messageId`.
* **影响**：Consumers can couple to internal Field wiring. Future changes to id generation, description/message semantics, or context shape become public compatibility concerns.
* **证据**：`src/index.ts` exports both hooks and context value types; `src/index.test.ts` asserts these exports; internal callers are form controls plus `src/components/form/control.ts`.
* **建议**：Keep current exports for compatibility. For a future breaking or migration release, consider keeping hooks internal or exporting a smaller read-only field-state type that excludes generated ids.
* **功能风险**：中；removing or narrowing these exports would affect consumers and public export tests.
* **置信度**：高
