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

* **位置**：`src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx`
* **类别**：重复代码 / 状态
* **问题**：Each text control repeats the same controlled/uncontrolled setup, Field prop injection, `ariaLabel` merge, invalid normalization, and `onChange` ordering.
* **影响**：The code is still readable, but fixes to value semantics or Field injection must be manually mirrored across four files. This raises maintenance risk for future behavior changes.
* **证据**：All four components call `useControllableState<string>`, `useSconeFieldContext`, `getSconeControlStateProps`, and `normalizeSconeAriaInvalid`, then call `setCurrentValue` before user `onChange`.
* **建议**：Do not introduce a broad abstraction now. If a second behavior fix touches these files, extract a small internal hook local to `components/form` for text control state and field props.
* **功能风险**：中；an extraction would affect all text controls, so it should be paired with existing focused tests.
* **置信度**：高

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

* **位置**：`src/components/form/combobox.tsx`
* **类别**：复杂度 / 副作用 / 可访问性
* **问题**：Combobox implements popover visibility, filtering, keyboard selection, listbox rendering, and clear interaction manually. It nests a `span role="button"` clear control inside the trigger `button`, and it does not handle outside click, focus-out close, highlighted option state, or `aria-activedescendant`.
* **影响**：This increases maintenance cost and accessibility risk compared with neighboring controls that delegate interaction primitives to Radix/shadcn. Keyboard and focus behavior can diverge from expected combobox/listbox patterns.
* **证据**：`SconeCombobox` renders the overlay with a conditional absolute `<div>`, manual `onKeyDown` handlers, `role="listbox"` buttons, and a nested clear `span role="button"` inside the trigger.
* **建议**：Replace the hand-rolled overlay/listbox behavior with established primitives already in the repo, such as Popover + Command, or split the clear button outside the trigger and add focused tests for outside click, Escape, tab flow, active option, and disabled options.
* **功能风险**：中；Combobox selection/search behavior is user-facing and tests should be preserved before refactoring.
* **置信度**：高

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

* **位置**：`src/components/form/number-input.tsx`
* **类别**：状态 / 错误处理
* **问题**：`onChange` converts non-empty input text with `Number(rawValue)` and commits the result without checking `Number.isFinite`.
* **影响**：Native number inputs can transiently contain invalid text such as exponent fragments. Committing `NaN` can produce React value warnings and unstable `onValueChange` payloads.
* **证据**：`commitNumber(rawValue === "" ? undefined : Number(rawValue))` passes `NaN` through `clampNumber`; `clampNumber` only validates min/max, not the candidate value.
* **建议**：Treat non-finite parsed values as an uncommitted display state or reject them before calling `setCurrentValue` / `onValueChange`.
* **功能风险**：中；fixing this changes edge-case typing behavior and should preserve empty-value handling.
* **置信度**：高

### [P1] DatePicker hand-rolls dialog calendar behavior

* **位置**：`src/components/form/date-picker.tsx`
* **类别**：复杂度 / 副作用 / 可访问性
* **问题**：DatePicker manually implements open state, dialog rendering, calendar grid, date buttons, and clear interaction. It also nests a `span role="button"` clear control inside the trigger `button`.
* **影响**：Focus management, outside click, Escape close, calendar navigation, and nested interactive semantics are easy to regress and hard to reason about.
* **证据**：The open calendar is a conditional absolute `<div role="dialog">`; the trigger handles Enter/Space manually; the clear action is `span role="button"` within the trigger.
* **建议**：Use existing Popover/Dialog primitives for overlay behavior and make the clear control a real sibling button. Add focused tests for focus return, Escape/outside close, disabled dates, and keyboard date movement.
* **功能风险**：中；calendar interaction is user-facing and should be refactored behind behavior-preserving tests.
* **置信度**：高

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

* **位置**：`src/components/data-display/descriptions.tsx`
* **类别**：API / 封装
* **问题**：`SconeDescriptionsProps` inherits `style` from root div attributes, but the component destructures `style` and passes it to the internal `<dl>` through `getColumnsStyle`.
* **影响**：Consumers expecting `style` to apply to the ref/className root will be surprised. It also mixes public root styling with internal CSS variable plumbing.
* **证据**：`className` and `ref` are applied to the outer `<div>`, while `style={getColumnsStyle(columns, style)}` is applied to `<dl>`.
* **建议**：Split internal column style from root style, for example with a private `columnsStyle` object and pass caller `style` to the root.
* **功能风险**：低；existing tests assert CSS variables on `<dl>`, so tests need a small update if this is fixed.
* **置信度**：高

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

* **位置**：`src/components/data-display/badge.tsx`
* **类别**：API / 封装
* **问题**：When `children` is present, the forwarded `ref` points to the outer wrapper span, but `className` and remaining span props are applied to the inner indicator span.
* **影响**：Consumers cannot reliably style or annotate the root element through normal `className` / HTML prop passthrough. This differs from neighboring atom components where ref, className, and props target the same root.
* **证据**：The children branch returns `<span ref={ref} className="relative ...">` and nests `{indicator}`; `indicator` applies `className` and `{...props}`.
* **建议**：Separate wrapper props from indicator props or introduce an explicit `indicatorClassName`; keep root `className` and HTML props aligned with `ref`.
* **功能风险**：低；visual positioning may change if className targeting is corrected, so update badge tests with both root and indicator assertions.
* **置信度**：高

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

* **位置**：`src/components/layout/stack.tsx`、`inline.tsx`、`compact.tsx`、`toolbar.tsx`
* **类别**：API / 一致性
* **问题**：These primitives define bespoke props with only `className` and sometimes `style`, instead of extending `React.HTMLAttributes<HTMLDivElement>`.
* **影响**：Consumers cannot pass normal root attributes such as `id`, `role`, `aria-*`, or `data-*` consistently, even though these are root layout containers with forwarded refs.
* **证据**：`SconeStackProps`, `SconeInlineProps`, `SconeCompactProps`, and `SconeToolbarProps` are plain interfaces and the render functions do not spread remaining root props.
* **建议**：Extend `React.HTMLAttributes<HTMLDivElement>` while omitting conflicting names if needed, and spread remaining props onto the root div.
* **功能风险**：低；this is additive if implemented carefully.
* **置信度**：高

### [P3] `cn` import path is inconsistent

* **位置**：`src/lib/utils.ts`、`src/components/layout/*.tsx`、`src/components/feedback-overlay/*.tsx`
* **类别**：命名 / 依赖
* **问题**：Some files import `cn` from `../../lib/utils`, while most newer component and Pattern files import `@/lib/cn`.
* **影响**：`utils.ts` is only a one-line re-export, so it adds a second name/path for the same helper and makes dependency scanning noisier.
* **证据**：`src/lib/utils.ts` only exports `{ cn }`; `rg` shows layout and feedback-overlay files using `../../lib/utils`, while form/data-display/pattern files mostly use `@/lib/cn`.
* **建议**：When touching these files, standardize imports on `@/lib/cn` and remove `src/lib/utils.ts` if no callers remain.
* **功能风险**：低；pure import cleanup.
* **置信度**：高

## 13 Scroll, Separator, And Resizable Layout

### Evidence

- `SconeScrollArea` delegates viewport and scrollbar behavior to Radix ScrollArea and keeps `onScroll` on the viewport.
- `SconeSeparator` delegates role/orientation semantics to Radix Separator.
- `SconeSplitPane` implements size presets, CSS length validation, pointer drag, keyboard resize, and size commit callbacks itself.
- Tests cover ScrollArea viewport class/onScroll, Separator decorative/semantic modes, SplitPane orientation, controlled size, keyboard resize, pointer resize, and invalid CSS length.

### Assessment

- ScrollArea and Separator are thin, understandable primitive wrappers.
- SplitPane is the only stateful interaction component in this group and deserves tighter contract enforcement.

### Candidate Findings

### [P1] SplitPane min/max presets are not enforced

* **位置**：`src/components/layout/split-pane.tsx`
* **类别**：API / 状态
* **问题**：`minSizePreset` and `maxSizePreset` are exposed and rendered as data attributes, but pointer and keyboard resizing do not clamp `resolvedSize` to those bounds.
* **影响**：The API suggests bounded resizing, but consumers can receive sizes outside the declared min/max range. This creates a misleading contract.
* **证据**：`minSizePreset` and `maxSizePreset` are only used in `data-min-size-preset` and `data-max-size-preset`; `updateFromPointer` and `nextKeyboardSize` clamp only to zero.
* **建议**：Either enforce min/max during pointer and keyboard updates or remove these props until bounds are implemented.
* **功能风险**：中；enforcing bounds changes resize behavior and should update pointer/keyboard tests.
* **置信度**：高

### [P2] SplitPane pointer listeners lack unmount cleanup

* **位置**：`src/components/layout/split-pane.tsx`
* **类别**：副作用
* **问题**：Pointer listeners are registered on `window` during drag and removed only on `pointerup`.
* **影响**：If the component unmounts during an active drag, listeners can remain attached and call stale closures.
* **证据**：`handlePointerDown` calls `window.addEventListener("pointermove", ...)` and `window.addEventListener("pointerup", ...)`; there is no effect cleanup or pointer capture fallback.
* **建议**：Track active listeners in refs and clean them in a `useEffect` return callback, or use pointer capture on the handle.
* **功能风险**：低；cleanup is internal but should preserve pointer resize tests.
* **置信度**：中

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

* **位置**：`src/components/feedback-overlay/progress.tsx`
* **类别**：错误处理 / 可访问性
* **问题**：`normalizeProgress` returns `0` for invalid or non-positive `max`, but `percent` is still calculated as `Math.round((normalizedValue / max) * 100)`.
* **影响**：`max={0}` or non-finite `max` can produce `NaN%` in `aria-valuetext`, visible labels, and transform styles.
* **证据**：`normalizeProgress(value, max)` guards `max <= 0`; `percent` divides by the original `max` afterward.
* **建议**：Normalize `max` before percent calculation, or return both normalized value and normalized max from one helper.
* **功能风险**：低；fix is localized and should add an invalid-max test.
* **置信度**：高

### [P2] Alert always announces as urgent

* **位置**：`src/components/feedback-overlay/alert.tsx`
* **类别**：可访问性 / API
* **问题**：All tones render `role="alert"`, including neutral and info notices.
* **影响**：Non-urgent informational content may be announced with assertive urgency by assistive technologies, increasing noise.
* **证据**：The root div has a fixed `role="alert"`; tone labels include neutral `Notice` and info `Information`.
* **建议**：Map severe tones to `alert` and non-severe tones to `status` or allow an explicit `role` override without forcing alert.
* **功能风险**：低；semantics change may affect tests that currently assume alert role for all tones.
* **置信度**：中

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

* **位置**：`src/components/feedback-overlay/confirm.tsx`
* **类别**：错误处理 / 副作用
* **问题**：`handleConfirm` awaits `onConfirm` inside `try/finally` but does not catch or surface rejection; the click handler calls it with `void handleConfirm()`.
* **影响**：If `onConfirm` rejects, the dialog remains open but the promise rejection can escape as an unhandled error, and the component gives no stable error callback or state path.
* **证据**：`await onConfirm?.(); setOpen(false);` is followed only by `finally { setConfirming(false); }`; no `catch` exists and the event handler discards the promise.
* **建议**：Either catch and keep the dialog open with an `onError` callback, or require callers to handle errors and wrap `onConfirm` execution defensively.
* **功能风险**：中；error semantics are user-facing and should be clarified before changing behavior.
* **置信度**：高

### [P2] Toast timers reset on unrelated provider rerenders

* **位置**：`src/components/feedback-overlay/toast.tsx`
* **类别**：副作用 / 状态
* **问题**：`visibleItems` is created with `items.slice(-maxVisible)` on every render and used directly in the timer effect dependency list.
* **影响**：A parent rerender can recreate `visibleItems`, clean up existing timers, and start new timers, extending toast lifetime unexpectedly.
* **证据**：`const visibleItems = items.slice(-maxVisible);` and `React.useEffect(..., [duration, visibleItems])`.
* **建议**：Memoize `visibleItems` by `[items, maxVisible]` or derive timer dependencies from stable item ids/durations.
* **功能风险**：低；localized to toast timeout behavior.
* **置信度**：中

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

### [P1] Pagination range text can use an out-of-range page

* **位置**：`src/components/navigation/pagination.tsx`
* **类别**：状态 / 错误处理
* **问题**：The component clamps `currentPage` for controls, but `getPageRange(state)` uses the original `state.page`.
* **影响**：If a caller passes a page beyond `pageCount`, controls behave as if clamped while the visible range can show impossible values such as a start greater than total.
* **证据**：`currentPage = Math.min(Math.max(state.page, 1), pageCount)` is used for buttons; `<span>{getPageRange(state)}</span>` passes unclamped state.
* **建议**：Compute range from the same normalized page state used by controls.
* **功能风险**：低；only affects invalid external state display and should add a regression test.
* **置信度**：高

### [P2] Tabs and Segmented expose weaker root passthrough than peer components

* **位置**：`src/components/navigation/tabs.tsx`、`src/components/navigation/segmented.tsx`
* **类别**：API / 一致性
* **问题**：`SconeTabs` root has no forwarded ref and does not extend root HTML attributes; `SconeSegmented` has root attrs/ref but uses custom selection keyboard logic without focus movement tests.
* **影响**：Consumers have less ability to instrument tabs roots, and segmented keyboard behavior can leave focus and selected item out of sync in edge cases.
* **证据**：`SconeTabsRoot` is a plain function component; tests do not cover root ref/props. `SconeSegmented` handles arrows at root and changes value but does not focus the next option.
* **建议**：Add root ref/HTML passthrough to Tabs and add segmented keyboard focus tests before changing focus behavior.
* **功能风险**：低 to 中；Tabs ref passthrough is additive, Segmented focus changes affect keyboard users.
* **置信度**：中

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
