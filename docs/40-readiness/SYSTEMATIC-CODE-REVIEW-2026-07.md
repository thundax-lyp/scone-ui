# Systematic Code Review 2026-07

## Status

- Scope: full frontend framework codebase review for `scone-ui`.
- Mode: docs-only audit; no source behavior changes in review tasks.
- Source of execution order: `TODO.md`.
- Temporary runbook: removed during readiness closure; long-lived evidence remains in this report.

## Final Review Summary

### 总体评价

当前代码库的主要优点：

- 技术栈和仓库边界清晰：这是 admin-ui 组件库和 UI 治理仓库，没有引入路由、请求层、全局 store 或产品业务模型。
- 公共导出守护强：`src/index.test.ts` 同时验证完整 runtime exports、代表性类型、Admin Pattern compound objects、Recipe no-source/no-export 边界。
- 组件族组织基本稳定：Form、Data Display、Layout、Feedback / Overlay、Navigation、Media、Patterns 的目录职责清楚，`src/components/ui` 没有外泄为公共 API。
- 测试覆盖广：当前 69 个测试文件覆盖组件、Pattern、导出、Foundation、theme 和 utilities。

最影响清晰度和简洁度的问题：

- 一部分复杂交互被手写在上层组件中，尤其是 Combobox、DatePicker、Dropdown；这些组件承担 overlay、focus、keyboard、selection 等多类职责。
- readiness 和部分 Pattern SPEC/DESIGN 对实现状态描述偏乐观，容易把“覆盖完成”误读成“无已知实现问题”。
- 若干公共 API 暴露了未兑现或过宽的行为，例如 AppShell change callbacks、Section Root shorthand、Form context internals。
- 少数边界状态没有被明确建模，例如 invalid number/progress input。

是否存在明显的过度设计：

- 没有发现大型全局架构过度设计；整体依赖少、层次浅。
- 局部存在“手写复杂交互”的错误复杂度，不是抽象层过多，而是没有充分复用已有 Radix/shadcn primitives。

是否存在模块边界问题：

- 组件、Pattern、Foundation 的依赖方向整体合理。
- 主要边界问题是 public API 边界偏宽：Form context internals 进入公共入口，Pattern docs/types 暴露了未实现或不完整行为。

建议优先处理的三个方向：

1. 修复明确 P1 行为问题：Tailwind stale token config、NumberInput/Progress invalid numeric edge cases、Confirm async rejection。
2. 收口 Pattern API 与文档：AppShell callbacks、Section Root shorthand、FilterBar hidden search state，逐项决定实现还是修正文档。
3. 降低复杂交互维护成本：优先用现有 primitives 重构或约束 Combobox、DatePicker、Dropdown 的 overlay/focus/keyboard 行为。

### 问题清单索引

完整问题字段见下方逐任务章节；本索引用于按严重程度阅读。

P0：未发现。

P1：

- Tailwind config references stale token variable names.
- Combobox hand-rolls complex overlay and listbox behavior.
- NumberInput can commit `NaN` into component state.
- DatePicker hand-rolls dialog calendar behavior.
- Progress can render `NaN%` when `max` is invalid.
- Confirm can create unhandled promise rejections.
- Dropdown hand-rolls menu popover behavior without outside-click close.
- AppShell exposes change callbacks that are never called.
- Section Root shorthand is specified but not implemented.
- Readiness says there is no pending implementation work despite verified audit findings.
- Pattern documentation includes behavior not implemented in source.

P2：

- Controlled state helper cannot represent `undefined` as a controlled value.
- Form context internals are part of the public package surface.
- Text input value plumbing is duplicated across sibling components.
- Descriptions `style` prop is applied to an internal `dl`, not the root.
- Badge root props do not target the same element as the forwarded ref.
- Layout primitive props are narrower than neighboring root components.
- Alert always announces as urgent.
- Toast timers reset on unrelated provider rerenders.
- Tabs and Segmented expose weaker root passthrough than peer components.
- Command active item can become stale after filtering.
- FilterBar can keep hidden search state.
- Some tests are tightly coupled to internal slot markup.

P3：

- Public entry grouping is harder to scan than family barrels.
- `cn` import path is inconsistent.
- Demo App test validates copy instead of library behavior.

### 推荐的目录结构调整

当前没有必须立即执行的目录搬迁。后续可以在触及相关代码时做一项低风险整理：

```text
调整前：
src/lib/cn.ts
src/lib/utils.ts  # one-line re-export

调整后：
src/lib/cn.ts
```

理由：`src/lib/utils.ts` 只重新导出 `cn`，导致 `../../lib/utils` 与 `@/lib/cn` 两种导入路径并存。删除前需要统一所有调用方 import，并确认公共入口仍从 `src/lib/cn.ts` 导出 `cn`。

### 推荐的重命名清单

| 当前名称       | 建议名称 | 位置   | 原因                                                                       | 影响范围 |
| -------------- | -------- | ------ | -------------------------------------------------------------------------- | -------- |
| 无必须重命名项 | 无       | 全仓库 | 本次审核没有发现高收益且低歧义的命名修正；主要问题是行为、边界和文档对齐。 | 无       |

### 建议执行顺序

1. 低风险、高收益修改：修复 stale Tailwind token config、Progress/NumberInput invalid numeric handling、Confirm async rejection。
2. 模块边界和 API 调整：收口 AppShell callbacks、Section Root shorthand、FilterBar hidden search；决定 Form context internals 是否继续公开；统一 `cn` import path。
3. 状态与副作用重构：落实 Toast timer stability、Command filtered active state、Alert role/tone semantics。
4. 需要人工确认的修改：Combobox/DatePicker/Dropdown 是否迁移到现有 primitives；Section Root shorthand 是实现还是从 SPEC 移除；AppShell callbacks 是移除还是补交互触发；Form context 公共导出是否允许未来 breaking change。

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

- **位置**：`src/index.ts`
- **类别**：结构
- **问题**：库级入口同时使用 family barrel re-export 和 direct file re-export；feedback、layout、navigation 的顺序与族目录不完全一致。
- **影响**：不会改变功能，但增加人工审核导出面时的扫描成本。
- **证据**：`src/index.ts` 先通过 `./components/navigation` 导出大部分 navigation，再单独从 `./components/navigation` 导出 `SconePagination`；feedback 和 layout 直接按文件导出。
- **建议**：后续触及导出入口时，按 Export Groups 分块，并优先复用组件族 barrel；保持 `src/index.test.ts` 的完整导出列表作为守护。
- **功能风险**：低；只要导出名和类型保持不变，消费者不受影响。
- **置信度**：高

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

- **位置**：`src/lib/use-controllable-state.ts`
- **类别**：状态 / API / 类型
- **问题**：`isControlled` is derived from `value !== undefined`; components using this helper cannot distinguish omitted `value` from an intentionally controlled `undefined` value.
- **影响**：For components where `undefined` is the documented empty value, controlled clearing must usually be represented by omitting `value` or using a different sentinel. This is easy to miss when reviewing custom inputs.
- **证据**：`UseControllableStateOptions<T>` declares `value?: T`, `defaultValue?: T | (() => T)`, and the hook returns `T | undefined`; callers include `SconeNumberInput`, `SconeDatePicker`, `SconeUpload`, `SconeImage`, `FilterBar`, and multiple navigation/form controls.
- **建议**：Do not change the helper globally during this audit. When fixing related components, either document this contract explicitly or introduce a controlled sentinel only where `undefined` must be a valid controlled value.
- **功能风险**：中；changing this helper would affect many controls and could alter controlled/uncontrolled behavior.
- **置信度**：高

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

- **位置**：`tailwind.config.ts`
- **类别**：结构 / 配置
- **问题**：`tailwind.config.ts` maps font, fontSize, motion, and zIndex extensions to variables such as `--scone-font-family-body`, `--scone-motion-duration-fast`, and `--scone-z-index-sticky`, while `theme.css` defines `--scone-font-body`, `--scone-duration-fast`, and `--scone-z-sticky`.
- **影响**：The CSS-first path still works through `src/styles.css`, but maintainers reading or reusing `tailwind.config.ts` get a stale token contract. If any utility is generated from these config keys, it will reference undefined variables.
- **证据**：`rg "scone-font-family|scone-font-size|scone-motion|scone-z-index"` only returns `tailwind.config.ts`; `src/styles/theme.css` defines the shorter current names and no matching old names.
- **建议**：Either update `tailwind.config.ts` to the current `theme.css` variable names or remove stale config extensions that are superseded by Tailwind v4 `@theme inline`.
- **功能风险**：中；changing token names can affect generated utilities, but the fix is localized to build/style config.
- **置信度**：高

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

- **位置**：`src/components/form/form.tsx`、`src/components/form/field.tsx`、`src/components/form/index.ts`、`src/index.ts`
- **类别**：API / 封装
- **问题**：`useSconeFormContext`, `useSconeFieldContext`, `SconeFormContextValue`, and `SconeFieldContextValue` are exported from the public package entry. `SconeFieldContextValue` includes internal id fields such as `fieldId`, `labelId`, `descriptionId`, and `messageId`.
- **影响**：Consumers can couple to internal Field wiring. Future changes to id generation, description/message semantics, or context shape become public compatibility concerns.
- **证据**：`src/index.ts` exports both hooks and context value types; `src/index.test.ts` asserts these exports; internal callers are form controls plus `src/components/form/control.ts`.
- **建议**：Keep current exports for compatibility. For a future breaking or migration release, consider keeping hooks internal or exporting a smaller read-only field-state type that excludes generated ids.
- **功能风险**：中；removing or narrowing these exports would affect consumers and public export tests.
- **置信度**：高

## 06 Form Text Inputs And Button Controls

### Evidence

- `SconeButton` wraps the shadcn button, maps Scone size tokens, blocks click handling while loading, and exposes `ariaLabel` for icon-only cases.
- `SconeInput`, `SconeSearchInput`, `SconePasswordInput`, and `SconeTextArea` all use `useControllableState` and `getSconeControlStateProps`.
- Text controls omit native `value`, `defaultValue`, and `onChange` from inherited props, then reintroduce explicit value APIs plus native `onChange`.
- Tests cover uncontrolled changes, clear action, password visibility, loading-disabled button behavior, Field state, refs, and count display.

### Assessment

- API naming is consistent across text controls.
- Field integration is centralized enough to avoid divergent ARIA behavior.
- `loading`, `disabled`, `readOnly`, and `invalid` semantics are explicit and covered by focused tests.
- No immediate functionality bug found in this task scope.

### Candidate Finding

### [P2] Text input value plumbing is duplicated across sibling components

- **位置**：`src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx`
- **类别**：重复代码 / 状态
- **问题**：Each text control repeats the same controlled/uncontrolled setup, Field prop injection, `ariaLabel` merge, invalid normalization, and `onChange` ordering.
- **影响**：The code is still readable, but fixes to value semantics or Field injection must be manually mirrored across four files. This raises maintenance risk for future behavior changes.
- **证据**：All four components call `useControllableState<string>`, `useSconeFieldContext`, `getSconeControlStateProps`, and `normalizeSconeAriaInvalid`, then call `setCurrentValue` before user `onChange`.
- **建议**：Do not introduce a broad abstraction now. If a second behavior fix touches these files, extract a small internal hook local to `components/form` for text control state and field props.
- **功能风险**：中；an extraction would affect all text controls, so it should be paired with existing focused tests.
- **置信度**：高

## 07 Form Choice Controls

### Evidence

- `SconeSelect` delegates core select behavior to Radix/shadcn primitives and separately controls value and open state.
- `SconeSwitch`, `SconeCheckbox`, and `SconeRadioGroup` wrap Radix/shadcn primitives and consistently treat `readOnly` as disabled interaction.
- `SconeCombobox` implements its own popover, search input, option list, keyboard handling, and clear action.
- Tests cover selection, controlled open, Field invalid state, checkbox indeterminate state, and basic combobox search/select/clear behavior.

### Assessment

- Select, Switch, Checkbox, and RadioGroup APIs are predictable and aligned with existing Foundation option/state types.
- Choice controls consistently route Field state through `getSconeControlStateProps`.
- The custom Combobox carries significantly more interaction responsibility than the other controls in this group.

### Candidate Finding

### [P1] Combobox hand-rolls complex overlay and listbox behavior

- **位置**：`src/components/form/combobox.tsx`
- **类别**：复杂度 / 副作用 / 可访问性
- **问题**：Combobox implements popover visibility, filtering, keyboard selection, listbox rendering, and clear interaction manually. It nests a `span role="button"` clear control inside the trigger `button`, and it does not handle outside click, focus-out close, highlighted option state, or `aria-activedescendant`.
- **影响**：This increases maintenance cost and accessibility risk compared with neighboring controls that delegate interaction primitives to Radix/shadcn. Keyboard and focus behavior can diverge from expected combobox/listbox patterns.
- **证据**：`SconeCombobox` renders the overlay with a conditional absolute `<div>`, manual `onKeyDown` handlers, `role="listbox"` buttons, and a nested clear `span role="button"` inside the trigger.
- **建议**：Replace the hand-rolled overlay/listbox behavior with established primitives already in the repo, such as Popover + Command, or split the clear button outside the trigger and add focused tests for outside click, Escape, tab flow, active option, and disabled options.
- **功能风险**：中；Combobox selection/search behavior is user-facing and tests should be preserved before refactoring.
- **置信度**：高

## 08 Form Custom Inputs And Helpers

### Evidence

- `SconeNumberInput` parses native number input text with `Number(rawValue)` and stores `number | undefined`.
- `SconeSlider` delegates range behavior to the shadcn/Radix slider primitive.
- `SconeDatePicker` implements its own trigger, dialog, date grid, selected state, disabled dates, clear action, and open state.
- `SconeUpload` validates `accept`, `maxSize`, `maxFiles`, and async `beforeAdd`, then reports structured rejections.
- `SconeFormActions` only expresses alignment and sticky action layout.

### Assessment

- Slider, Upload, and FormActions have clear responsibilities and focused tests.
- Upload rejection behavior is explicit enough for consumers and does not introduce backend/product assumptions.
- DatePicker carries the same hand-rolled overlay risk as Combobox.

### Candidate Findings

### [P1] NumberInput can commit `NaN` into component state

- **位置**：`src/components/form/number-input.tsx`
- **类别**：状态 / 错误处理
- **问题**：`onChange` converts non-empty input text with `Number(rawValue)` and commits the result without checking `Number.isFinite`.
- **影响**：Native number inputs can transiently contain invalid text such as exponent fragments. Committing `NaN` can produce React value warnings and unstable `onValueChange` payloads.
- **证据**：`commitNumber(rawValue === "" ? undefined : Number(rawValue))` passes `NaN` through `clampNumber`; `clampNumber` only validates min/max, not the candidate value.
- **建议**：Treat non-finite parsed values as an uncommitted display state or reject them before calling `setCurrentValue` / `onValueChange`.
- **功能风险**：中；fixing this changes edge-case typing behavior and should preserve empty-value handling.
- **置信度**：高

### [P1] DatePicker hand-rolls dialog calendar behavior

- **位置**：`src/components/form/date-picker.tsx`
- **类别**：复杂度 / 副作用 / 可访问性
- **问题**：DatePicker manually implements open state, dialog rendering, calendar grid, date buttons, and clear interaction. It also nests a `span role="button"` clear control inside the trigger `button`.
- **影响**：Focus management, outside click, Escape close, calendar navigation, and nested interactive semantics are easy to regress and hard to reason about.
- **证据**：The open calendar is a conditional absolute `<div role="dialog">`; the trigger handles Enter/Space manually; the clear action is `span role="button"` within the trigger.
- **建议**：Use existing Popover/Dialog primitives for overlay behavior and make the clear control a real sibling button. Add focused tests for focus return, Escape/outside close, disabled dates, and keyboard date movement.
- **功能风险**：中；calendar interaction is user-facing and should be refactored behind behavior-preserving tests.
- **置信度**：高

## 10 Data Display Core

### Evidence

- `SconeTable` owns base table rendering, density, empty/loading/error rows, scroll width, row/cell DOM hooks, and cell rendering.
- `SconeList` owns repeated item rendering plus loading/error/empty state priority.
- `SconeDescriptions` owns description-list rendering, responsive columns, item span, density, bordered items, and nullish fallback.
- `DataTable.TableRegion` composes `SconeTable` for pattern-level selection and data-table states, so base `SconeTable` does not own pagination, request, or selection state.
- Tests cover state priority, row/cell passthrough, density, scroll, responsive columns, and nullish value fallback.

### Assessment

- Data display core components avoid product-specific behavior and keep request/pagination ownership outside the component layer.
- State priority is consistent: loading before error before empty.
- The boundary between `SconeTable` and `DataTable` Pattern is mostly clear.

### Candidate Finding

### [P2] Descriptions `style` prop is applied to an internal `dl`, not the root

- **位置**：`src/components/data-display/descriptions.tsx`
- **类别**：API / 封装
- **问题**：`SconeDescriptionsProps` inherits `style` from root div attributes, but the component destructures `style` and passes it to the internal `<dl>` through `getColumnsStyle`.
- **影响**：Consumers expecting `style` to apply to the ref/className root will be surprised. It also mixes public root styling with internal CSS variable plumbing.
- **证据**：`className` and `ref` are applied to the outer `<div>`, while `style={getColumnsStyle(columns, style)}` is applied to `<dl>`.
- **建议**：Split internal column style from root style, for example with a private `columnsStyle` object and pass caller `style` to the root.
- **功能风险**：低；existing tests assert CSS variables on `<dl>`, so tests need a small update if this is fixed.
- **置信度**：高

## 11 Data Display Atoms

### Evidence

- `SconeCard` wraps shadcn card slots and exposes title, description, actions, footer, loading, and variant.
- `SconeTag`, `SconeBadge`, `SconeStatistic`, and `SconeTimeline` use Foundation tone vocabulary without embedding product-specific statuses.
- Tests cover loading card overlay, tag close action, badge overflow/dot/children, statistic slots, timeline reverse/pending/click, refs, and className.

### Assessment

- These components are mostly small, business-neutral wrappers.
- Tone/status naming is consistent with Foundation vocabulary.
- No unnecessary product workflows, request assumptions, or global state were found.

### Candidate Finding

### [P2] Badge root props do not target the same element as the forwarded ref

- **位置**：`src/components/data-display/badge.tsx`
- **类别**：API / 封装
- **问题**：When `children` is present, the forwarded `ref` points to the outer wrapper span, but `className` and remaining span props are applied to the inner indicator span.
- **影响**：Consumers cannot reliably style or annotate the root element through normal `className` / HTML prop passthrough. This differs from neighboring atom components where ref, className, and props target the same root.
- **证据**：The children branch returns `<span ref={ref} className="relative ...">` and nests `{indicator}`; `indicator` applies `className` and `{...props}`.
- **建议**：Separate wrapper props from indicator props or introduce an explicit `indicatorClassName`; keep root `className` and HTML props aligned with `ref`.
- **功能风险**：低；visual positioning may change if className targeting is corrected, so update badge tests with both root and indicator assertions.
- **置信度**：高

## 12 Typography And Layout Primitives

### Evidence

- Typography primitives share `SconeTypographyProps` and use `as`, size, weight, tone, and truncate.
- `SconeStack`, `SconeInline`, `SconeCompact`, and `SconeToolbar` encode token-based spacing, alignment, compact grouping, and toolbar slots.
- Layout tests cover token gaps, wrap, split, density, orientation, ref, className, and style where exposed.
- Layout files import `cn` through `../../lib/utils`, while many other families import `@/lib/cn` directly.

### Assessment

- Typography and layout components do not own business state or product workflow.
- `SconeInline` split is decorative and hidden from assistive technology, which matches its separator intent.
- `SconeToolbar` stays primitive: selected count and permission/action semantics remain in Pattern/caller code.

### Candidate Findings

### [P2] Layout primitive props are narrower than neighboring root components

- **位置**：`src/components/layout/stack.tsx`、`inline.tsx`、`compact.tsx`、`toolbar.tsx`
- **类别**：API / 一致性
- **问题**：These primitives define bespoke props with only `className` and sometimes `style`, instead of extending `React.HTMLAttributes<HTMLDivElement>`.
- **影响**：Consumers cannot pass normal root attributes such as `id`, `role`, `aria-*`, or `data-*` consistently, even though these are root layout containers with forwarded refs.
- **证据**：`SconeStackProps`, `SconeInlineProps`, `SconeCompactProps`, and `SconeToolbarProps` are plain interfaces and the render functions do not spread remaining root props.
- **建议**：Extend `React.HTMLAttributes<HTMLDivElement>` while omitting conflicting names if needed, and spread remaining props onto the root div.
- **功能风险**：低；this is additive if implemented carefully.
- **置信度**：高

### [P3] `cn` import path is inconsistent

- **位置**：`src/lib/utils.ts`、`src/components/layout/*.tsx`、`src/components/feedback-overlay/*.tsx`
- **类别**：命名 / 依赖
- **问题**：Some files import `cn` from `../../lib/utils`, while most newer component and Pattern files import `@/lib/cn`.
- **影响**：`utils.ts` is only a one-line re-export, so it adds a second name/path for the same helper and makes dependency scanning noisier.
- **证据**：`src/lib/utils.ts` only exports `{ cn }`; `rg` shows layout and feedback-overlay files using `../../lib/utils`, while form/data-display/pattern files mostly use `@/lib/cn`.
- **建议**：When touching these files, standardize imports on `@/lib/cn` and remove `src/lib/utils.ts` if no callers remain.
- **功能风险**：低；pure import cleanup.
- **置信度**：高

## 13 Scroll, Separator, And Resizable Layout

### Evidence

- `SconeScrollArea` delegates viewport and scrollbar behavior to Radix ScrollArea and keeps `onScroll` on the viewport.
- `SconeSeparator` delegates role/orientation semantics to Radix Separator.
- `SconeSplitPane` implements size presets, CSS length validation, pointer drag, keyboard resize, and size commit callbacks itself.
- Tests cover ScrollArea viewport class/onScroll, Separator decorative/semantic modes, SplitPane orientation, controlled size, keyboard resize, pointer resize, min/max bounds, active drag cleanup, and invalid CSS length.

### Assessment

- ScrollArea and Separator are thin, understandable primitive wrappers.
- SplitPane is the only stateful interaction component in this group and now has explicit bounds and active drag cleanup coverage.

### Candidate Findings

## 14 Feedback Status Components

### Evidence

- `SconeAlert` uses Foundation tone, title/description/icon/action slots, and currently always renders `role="alert"`.
- `SconeEmpty` renders title, description, image, action, and children without owning recovery logic.
- `SconeLoading` marks busy regions and provides spinner/skeleton status content.
- `SconeProgress` wraps Radix Progress and clamps value range before passing it to the primitive.
- Tests cover alert tone text, actions, empty actions, loading busy state, skeleton, not-loading state, progress ARIA values, status text, and clamping.

### Assessment

- Empty and Loading responsibilities are clear and business-neutral.
- Alert and Progress need small semantic hardening around urgency and invalid max values.

### Candidate Findings

### [P1] Progress can render `NaN%` when `max` is invalid

- **位置**：`src/components/feedback-overlay/progress.tsx`
- **类别**：错误处理 / 可访问性
- **问题**：`normalizeProgress` returns `0` for invalid or non-positive `max`, but `percent` is still calculated as `Math.round((normalizedValue / max) * 100)`.
- **影响**：`max={0}` or non-finite `max` can produce `NaN%` in `aria-valuetext`, visible labels, and transform styles.
- **证据**：`normalizeProgress(value, max)` guards `max <= 0`; `percent` divides by the original `max` afterward.
- **建议**：Normalize `max` before percent calculation, or return both normalized value and normalized max from one helper.
- **功能风险**：低；fix is localized and should add an invalid-max test.
- **置信度**：高

### [P2] Alert always announces as urgent

- **位置**：`src/components/feedback-overlay/alert.tsx`
- **类别**：可访问性 / API
- **问题**：All tones render `role="alert"`, including neutral and info notices.
- **影响**：Non-urgent informational content may be announced with assertive urgency by assistive technologies, increasing noise.
- **证据**：The root div has a fixed `role="alert"`; tone labels include neutral `Notice` and info `Information`.
- **建议**：Map severe tones to `alert` and non-severe tones to `status` or allow an explicit `role` override without forcing alert.
- **功能风险**：低；semantics change may affect tests that currently assume alert role for all tones.
- **置信度**：中

## 15 Feedback Overlays And Services

### Evidence

- `SconeDrawer` and `SconeDialog` delegate focus/outside/escape behavior to Radix Dialog and expose close reasons.
- `SconeConfirm` delegates alert dialog behavior to Radix AlertDialog and manages async `onConfirm` busy state.
- `toast` and `notification` are module-level services backed by `useSyncExternalStore` providers.
- Tests cover drawer/dialog title and close reasons, confirm duplicate async prevention, toast/notification update/dismiss/clear reasons, visible limits, and persistent notification marker.

### Assessment

- Drawer/Dialog close reason handling is explicit and avoids product workflow assumptions.
- Toast/Notification public services are intentionally exported with providers and have focused tests.
- Confirm async error handling is incomplete.

### Candidate Findings

### [P1] Confirm can create unhandled promise rejections

- **位置**：`src/components/feedback-overlay/confirm.tsx`
- **类别**：错误处理 / 副作用
- **问题**：`handleConfirm` awaits `onConfirm` inside `try/finally` but does not catch or surface rejection; the click handler calls it with `void handleConfirm()`.
- **影响**：If `onConfirm` rejects, the dialog remains open but the promise rejection can escape as an unhandled error, and the component gives no stable error callback or state path.
- **证据**：`await onConfirm?.(); setOpen(false);` is followed only by `finally { setConfirming(false); }`; no `catch` exists and the event handler discards the promise.
- **建议**：Either catch and keep the dialog open with an `onError` callback, or require callers to handle errors and wrap `onConfirm` execution defensively.
- **功能风险**：中；error semantics are user-facing and should be clarified before changing behavior.
- **置信度**：高

### [P2] Toast timers reset on unrelated provider rerenders

- **位置**：`src/components/feedback-overlay/toast.tsx`
- **类别**：副作用 / 状态
- **问题**：`visibleItems` is created with `items.slice(-maxVisible)` on every render and used directly in the timer effect dependency list.
- **影响**：A parent rerender can recreate `visibleItems`, clean up existing timers, and start new timers, extending toast lifetime unexpectedly.
- **证据**：`const visibleItems = items.slice(-maxVisible);` and `React.useEffect(..., [duration, visibleItems])`.
- **建议**：Memoize `visibleItems` by `[items, maxVisible]` or derive timer dependencies from stable item ids/durations.
- **功能风险**：低；localized to toast timeout behavior.
- **置信度**：中

## 16 Primary Navigation

### Evidence

- `SconeBreadcrumb` renders nav/ol structure, current page marker, collapse expansion, disabled handling, links/buttons, and optional `asChild`.
- `SconePagination` is controlled by `SconePaginationState` and emits `page` or `pageSize` change reasons.
- `SconeTabs` supports item helper mode and compound mode with roving tab keyboard behavior.
- `SconeSegmented` uses radiogroup semantics and controlled/uncontrolled selection.
- Tests cover current breadcrumb, collapsed breadcrumb, pagination changes, tabs activation modes, vertical tab keyboard flow, and segmented selection.

### Assessment

- Navigation components do not introduce routing assumptions.
- State ownership is caller-controlled where it should be: pagination and selected values are not hidden in global state.
- Tabs and Segmented have narrower root prop/ref APIs than most public components, but no immediate behavior bug was found in normal usage.

### Candidate Finding

### [P2] Tabs and Segmented expose weaker root passthrough than peer components

- **位置**：`src/components/navigation/tabs.tsx`、`src/components/navigation/segmented.tsx`
- **类别**：API / 一致性
- **问题**：`SconeTabs` root has no forwarded ref and does not extend root HTML attributes; `SconeSegmented` has root attrs/ref but uses custom selection keyboard logic without focus movement tests.
- **影响**：Consumers have less ability to instrument tabs roots, and segmented keyboard behavior can leave focus and selected item out of sync in edge cases.
- **证据**：`SconeTabsRoot` is a plain function component; tests do not cover root ref/props. `SconeSegmented` handles arrows at root and changes value but does not focus the next option.
- **建议**：Add root ref/HTML passthrough to Tabs and add segmented keyboard focus tests before changing focus behavior.
- **功能风险**：低 to 中；Tabs ref passthrough is additive, Segmented focus changes affect keyboard users.
- **置信度**：中

## 17 Menu, Command, And Tree Navigation

### Evidence

- `SconeDropdown` implements trigger cloning, open state, absolute menu rendering, keyboard navigation, item selection, and focus restoration.
- `SconeMenu` owns selected/open key arrays and nested menu rendering without route assumptions.
- `SconeCommand` owns search input, filtering, grouping, active item, loading, empty state, and selection.
- `SconeTree` owns expanded/selected/checked key arrays, flattening, keyboard navigation, treeitem rendering, and checkbox state.
- Tests cover item selection, disabled states, keyboard movement, tree expand/check/select, command filtering, and service-free navigation behavior.

### Assessment

- Menu and Tree have larger state surfaces but remain UI-level, not product workflow-level.
- Dropdown and Command hand-roll interaction behavior that is usually delegated to Radix/cmdk primitives.

### Candidate Findings

### [P1] Dropdown hand-rolls menu popover behavior without outside-click close

- **位置**：`src/components/navigation/dropdown.tsx`
- **类别**：复杂度 / 可访问性
- **问题**：Dropdown manually renders an absolute menu and keyboard loop, but does not close on outside pointer/focus and does not focus the first item when opened by keyboard.
- **影响**：Open menus can remain visible after unrelated interactions, and keyboard users need extra navigation before reaching menu items.
- **证据**：The component conditionally renders `<div role="menu">` and handles Escape/Arrow keys internally; no document listener, Popover/Menu primitive, or focus-first effect exists.
- **建议**：Use existing Radix dropdown primitive or add outside interaction and initial focus behavior with tests.
- **功能风险**：中；menu interaction behavior is user-facing.
- **置信度**：高

### [P2] Command active item can become stale after filtering

- **位置**：`src/components/navigation/command.tsx`
- **类别**：状态 / 可访问性
- **问题**：`activeKey` is initialized from `selectedKey` and updated by keyboard/mouse, but filtering does not move it to the first enabled filtered item.
- **影响**：After typing a search query, pressing Enter may do nothing until the user presses ArrowDown, even when results are visible.
- **证据**：`filteredItems` and `enabledItems` are derived each render; `selectActive` only selects an item matching `activeKey`; no effect resets `activeKey` when `normalizedQuery` or `enabledItems` changes.
- **建议**：When filtered enabled items change, set activeKey to the first enabled item unless `selectedKey` is externally controlling it.
- **功能风险**：低；behavior becomes more predictable but should be covered with a filter-then-enter test.
- **置信度**：高

## 18 Disclosure And Media Components

### Evidence

- `SconeAccordion` and `SconeCollapsible` delegate disclosure behavior to Radix primitives.
- `SconeTooltip` manually controls open state, delay, trigger cloning, Escape close, positioning, and instance-scoped `aria-describedby`.
- `SconeImage` and `SconeAvatar` store image failure state and render fallback on missing/error source.
- Tests cover accordion single/multiple, collapsible controlled state, tooltip focus/hover/Escape and unique ids, image fallback/preview/source reset, and avatar fallback/source reset.

### Assessment

- Accordion and Collapsible are clear primitive wrappers.
- Tooltip and media fallback state now cover multiple instances and source changes.

## 19 AppShell, Page, And Section Patterns

### Evidence

- `AppShell` exposes Root/Sidebar/Header/Main/Aside compound parts and keeps `Main` as a non-scrolling page host.
- `Page` exposes Root/Header/Main/Content/StickyActions and owns max width, density, main scroll, and sticky action inset.
- `Section` exposes Root/Header/Title/Description/Actions/Content/Footer and avoids card styling.
- Tests cover shell slots, controlled/default display state, main shrink behavior, page scroll/sticky inset, and Section semantic non-card structure.

### Assessment

- Pattern components do not import routing, permissions, product logo, request, or store code.
- Main scroll ownership is mostly aligned with AppShell/Page design.
- AppShell and Section expose or document behavior that is not actually implemented.

### Candidate Findings

### [P1] AppShell exposes change callbacks that are never called

- **位置**：`src/patterns/app-shell.tsx`
- **类别**：API / 状态
- **问题**：`AppShell.Sidebar` exposes `onCollapsedChange` and `AppShell.Aside` exposes `onOpenChange`, but both callbacks are ignored with `void`.
- **影响**：The API suggests interactive controlled/uncontrolled state, but the components only render based on props. Consumers cannot observe or initiate changes through these callbacks.
- **证据**：`AppShellSidebar` computes `effectiveCollapsed = collapsed ?? defaultCollapsed` then `void onCollapsedChange`; `AppShellAside` computes `effectiveOpen = open ?? defaultOpen` then `void onOpenChange`.
- **建议**：Either remove the callbacks until trigger behavior exists, or add explicit trigger/toggle affordances that call them.
- **功能风险**：中；removing props is breaking, adding behavior needs design confirmation.
- **置信度**：高

### [P1] Section Root shorthand is specified but not implemented

- **位置**：`docs/10-specs/patterns/SECTION.md`、`src/patterns/section.tsx`
- **类别**：文档对齐 / API
- **问题**：The SPEC table lists `Section.Root` props `title`, `description`, and `actions` as shorthand, but `SectionRootProps` only accepts `children` and `density` beyond HTML attributes.
- **影响**：Consumers reading the SPEC will expect Root shorthand that does not exist, and implementation coverage can be overstated.
- **证据**：`docs/10-specs/patterns/SECTION.md` says `Section.Root` supports title/description/actions; source implements those only on `Section.Header`.
- **建议**：Decide whether Root shorthand is required. Either implement it with tests or correct the SPEC/design/readiness language to Header-only shorthand.
- **功能风险**：低 to 中；doc-only correction is low risk, implementation adds API surface.
- **置信度**：高

## 20 FilterBar And DataTable Patterns

### Evidence

- `FilterBar.Root` owns search/filter/expanded state boundaries and provides compound parts through context.
- `DataTable.Root` provides density, selection, and pagination context; `TableRegion` composes `SconeTable`; `Pagination` composes `SconePagination`.
- `DataTable` keeps sorting/filtering request logic out of the pattern and does not import route/request/store code.
- Tests cover FilterBar controlled/uncontrolled search and expanded state, built-in and compound actions, DataTable selection injection, bulk actions, state priority, children escape hatch, and pagination context/prop override.

### Assessment

- DataTable is not a monolithic request table; state ownership remains mostly with callers.
- Selection injection is isolated to `DataTable.TableRegion`, leaving base `SconeTable` simpler.
- FilterBar has an overloaded `filters` prop and one hidden-state edge case.

### Candidate Finding

### [P2] FilterBar can keep hidden search state

- **位置**：`src/patterns/filter-bar.tsx`
- **类别**：状态 / API
- **问题**：The built-in search input renders only when `search`, `searchValue`, or `onSearchChange` is provided. `defaultSearchValue` alone initializes state but does not render the search control.
- **影响**：A default search value can be included in `onApply` while no search UI is visible, which makes the active state hard to understand.
- **证据**：`shouldRenderSearch` ignores `defaultSearchValue`; `useControllableState` still initializes `effectiveSearchValue` from `defaultSearchValue`; `onApply` always includes `searchValue`.
- **建议**：Include `defaultSearchValue` in `shouldRenderSearch`, or avoid initializing search state when no search UI is rendered.
- **功能风险**：低；could add a visible search input in a currently hidden edge case.
- **置信度**：高

## 21 Vendored UI Boundary

### Evidence

- Reviewed representative shadcn/Radix files: `button.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `select.tsx`, and `table.tsx`.
- `src/index.ts`, component-family barrels, and Pattern barrels do not export `src/components/ui/*`.
- Direct callers are wrapper components or other UI primitives, for example `SconeButton`, `SconeSelect`, `SconeTable`, and internal shadcn dialog/sheet/alert-dialog/command files.

### Assessment

- No P0/P1/P2 issue found in the vendored boundary itself.
- The UI files act as primitive bases and do not encode product workflow, routing, permissions, backend contracts, or business vocabulary.
- The main reuse opportunity is at higher layers: custom Dropdown, Combobox, and DatePicker behavior should consider existing Radix/shadcn primitives before adding more hand-rolled interaction code.

## 09 Form Layout Helpers

### Evidence

- `SconeFieldGroup` renders a semantic `fieldset`, optional `legend`, optional description, and a bounded 1/2/3-column grid.
- `SconeFormSection` renders a form-local `section`, optional header copy, local actions, and content wrapper.
- Tests cover semantic group lookup, description, column data attribute, title/actions/content rendering, ref, and className passthrough.
- Specs and designs explicitly describe `SconeFormSection` as a form-context helper/shorthand, not a replacement for the general `Section` Pattern.

### Assessment

- No P0/P1/P2 issue found in this task scope.
- Naming and file placement match responsibilities.
- The helpers are small but not arbitrary wrappers: they preserve fieldset and section semantics and encode documented form layout choices.
- The overlap with `Section` Pattern is documented and intentionally scoped to form pages.

## 22 Tests And Public Behavior

### Evidence

- `src/index.test.ts` checks the complete runtime public export key set, representative exported types, Pattern compound objects, and no-recipe-source/no-recipe-export boundaries.
- The public export guard explicitly asserts `AppShell`, `Page`, `Section`, `FilterBar`, and `DataTable` are exported, and `SconeDrawerForm`, `SconeConfirmationFlow`, `SconePopover`, `SconeLogo`, `SconeResult`, `SconeDashboardMetric`, and `SconeGrid` are not exported.
- `vitest.config.ts` uses jsdom, a single `@` alias, and one setup file.
- `src/test/setup.ts` only installs jest-dom and a minimal `ResizeObserver` mock.
- The repository currently has 69 test files.
- A search for `data-scone`, `data-slot`, `closest(`, `querySelector`, `toHaveClass`, and `toHaveAttribute` found 220 matching test lines. Many of these are valid layout-slot assertions, but they also make some tests sensitive to internal markup.
- `src/app.test.tsx` only asserts the demo heading text in `src/app.tsx`.

### Assessment

- The package-level export guard is strong and aligned with the docs-only Recipe boundary.
- Test setup is intentionally small and does not hide behavior behind heavy mocks.
- Component tests generally exercise public DOM behavior through Testing Library, with some justified use of documented `data-scone-*` slot attributes for layout Patterns.
- The main test maintenance risk is not coverage absence; it is over-reliance on internal slot/class details in areas where user-observable roles, labels, values, and callbacks would be more stable.

### Candidate Findings

### [P2] Some tests are tightly coupled to internal slot markup

- **位置**：`src/patterns/*.test.tsx`、`src/components/layout/*.test.tsx`、`src/components/feedback-overlay/*.test.tsx`
- **类别**：测试 / 封装
- **问题**：A meaningful share of tests locate elements through `closest("[data-scone-*]")`, `querySelector("[data-scone-*]")`, `data-slot`, or class assertions. This is useful when the slot attribute is a documented layout contract, but it becomes brittle when the test intent is user-facing behavior.
- **影响**：Markup-only refactors can fail tests even when public behavior is unchanged, which raises maintenance cost and makes future simplification feel riskier.
- **证据**：`rg "data-scone|data-slot|closest\\(|querySelector|toHaveClass|toHaveAttribute" src -g "*.test.*"` returns 220 lines across Pattern, layout, feedback, and data-display tests.
- **建议**：Keep data attribute assertions only for documented slot/layout contracts. When touching a test, prefer roles, labels, text, ARIA state, values, callbacks, and public props for behavior assertions.
- **功能风险**：低；this is a testing strategy cleanup and should not change runtime behavior.
- **置信度**：中

### [P3] Demo App test validates copy instead of library behavior

- **位置**：`src/app.test.tsx`
- **类别**：测试 / 无效代码
- **问题**：The test asserts the demo heading text `"React + TailwindCSS frontend project"` rather than a component-library behavior or public package contract.
- **影响**：This is low-cost but low-value coverage. Demo copy edits can fail CI without indicating a library regression.
- **证据**：`src/app.test.tsx` renders `App` and only checks one heading name.
- **建议**：Either treat it explicitly as a demo smoke test, or remove it once the package-level and component-level tests cover the intended library behavior.
- **功能风险**：低；removing or weakening the test does not change runtime code.
- **置信度**：高

## 23 SPEC, DESIGN, And Readiness Alignment

### Evidence

- `docs/10-specs/COMPONENT-SELECTION.md` and `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md` agree that Export Groups are the public surface and Recipes are docs-only.
- `docs/30-designs/admin-ui/VERIFICATION-DESIGN.md` points public export validation to `src/index.test.ts`, which now explicitly guards public Pattern exports and negative Recipe exports.
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` records all component families, Admin Patterns, and Recipes as complete, and says there is no pending implementation work.
- `docs/10-specs/patterns/SECTION.md` lists `Section.Root` shorthand props `title`, `description`, and `actions`, but source implements those props on `Section.Header`.
- `docs/10-specs/patterns/APP-SHELL.md` and `docs/30-designs/admin-ui/PATTERN-DESIGN.md` list AppShell change callbacks, while source explicitly ignores them.
- `docs/10-specs/patterns/FILTER-BAR.md` lists `defaultSearchValue`; source initializes the state but does not render the built-in search control when only `defaultSearchValue` is provided.

### Assessment

- Public export and Recipe docs-only boundaries are aligned across SPEC, DESIGN, readiness, source, and tests.
- The verification design remains useful as a matrix, but edge-case findings from this audit are not reflected in readiness.
- The current readiness document uses "完成" for implementation coverage and also says there is no pending implementation work. After this audit, that wording should be narrowed: coverage is complete, but remediation work remains.
- Pattern API mismatches should be resolved by either implementing the documented behavior or correcting the SPEC/DESIGN/readiness text. They should not stay as silent divergence.

### Candidate Finding

### [P1] Readiness says there is no pending implementation work despite verified audit findings

- **位置**：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
- **类别**：文档对齐 / 错误处理
- **问题**：The readiness document concludes the covered Admin UI scope is complete and says "当前无未完成实现项", but this audit found multiple source-backed P1/P2 issues, including stale Tailwind token config, ignored AppShell callbacks, unimplemented Section Root shorthand, and invalid Progress/NumberInput edge cases.
- **影响**：Readers can mistake "coverage complete" for "no known implementation work", which hides the actual remediation backlog and makes planning less accurate.
- **证据**：`IMPLEMENTATION-COVERAGE.md` marks all rows as complete; this audit report contains source-backed findings across sections 04, 08, 13, 14, 19, and 20.
- **建议**：In the closure task, keep coverage status as complete where accurate, but add a concise pending implementation work summary that points to this audit report.
- **功能风险**：低；docs-only correction.
- **置信度**：高

### [P1] Pattern documentation includes behavior not implemented in source

- **位置**：`docs/10-specs/patterns/APP-SHELL.md`、`docs/10-specs/patterns/SECTION.md`、`docs/10-specs/patterns/FILTER-BAR.md`、`src/patterns/app-shell.tsx`、`src/patterns/section.tsx`、`src/patterns/filter-bar.tsx`
- **类别**：文档对齐 / API
- **问题**：Several Pattern docs describe props or behavior that source does not fully deliver: AppShell change callbacks are ignored, Section Root shorthand is absent, and FilterBar can carry default search state without rendering the built-in search control.
- **影响**：Consumers following SPEC/DESIGN can write code against behavior that appears supported but is incomplete or invisible at runtime.
- **证据**：Earlier findings document `void onCollapsedChange`, `void onOpenChange`, the Section Root shorthand mismatch, and `shouldRenderSearch` ignoring `defaultSearchValue`.
- **建议**：Treat these as remediation items. For each one, choose one direction explicitly: implement the documented behavior with tests, or narrow the docs and public type expectations.
- **功能风险**：中；implementing behavior changes runtime API semantics, while narrowing docs may expose that current code is intentionally smaller than SPEC.
- **置信度**：高
