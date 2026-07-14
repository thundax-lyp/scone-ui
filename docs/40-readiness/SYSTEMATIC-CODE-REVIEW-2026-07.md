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

- 若干公共 API 暴露过宽的行为，例如 Form context internals。
- 部分组件 root props、测试断言和导入路径仍有低风险一致性维护空间。

是否存在明显的过度设计：

- 没有发现大型全局架构过度设计；整体依赖少、层次浅。
- 局部存在“手写复杂交互”的错误复杂度，不是抽象层过多，而是没有充分复用已有 Radix/shadcn primitives。

是否存在模块边界问题：

- 组件、Pattern、Foundation 的依赖方向整体合理。
- 主要边界问题是 public API 边界偏宽：Form context internals 进入公共入口。

建议优先处理的三个方向：

1. 收口 public API 边界：决定 Form context internals 是否继续公开。
2. 持续清理组件 root props 和剩余 `cn` import path 的一致性维护项。
3. 减少非布局契约测试对内部 slot 标记的非必要耦合。

### 问题清单索引

完整问题字段见下方逐任务章节；本索引用于按严重程度阅读。

P0：未发现。

P1：未发现未关闭项。

P2：

- Controlled state helper cannot represent `undefined` as a controlled value.
- Form context internals are part of the public package surface.
- Text input value plumbing is duplicated across sibling components.
- Descriptions `style` prop is applied to an internal `dl`, not the root.
- Badge root props do not target the same element as the forwarded ref.
- Layout primitive props are narrower than neighboring root components.
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

1. 需要人工确认的修改：Form context 公共导出是否允许未来 breaking change。
2. 模块边界和 API 调整：统一剩余 `cn` import path，收口 Data Display / Layout root props 边界。
3. 测试维护：减少非布局契约测试对内部 slot 标记的耦合。

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
- `SconeCombobox` delegates overlay behavior to `Popover` and search/list behavior to `Command`, with an independent clear button.
- Tests cover selection, controlled open, Field invalid state, checkbox indeterminate state, and basic combobox search/select/clear behavior.

### Assessment

- Select, Switch, Checkbox, and RadioGroup APIs are predictable and aligned with existing Foundation option/state types.
- Choice controls consistently route Field state through `getSconeControlStateProps`.
- Combobox overlay/listbox/focus/keyboard behavior is now covered by focused tests for trigger, Escape, outside click, keyboard selection, disabled option, clear button, and controlled fields.

## 08 Form Custom Inputs And Helpers

### Evidence

- `SconeNumberInput` rejects non-finite values before committing numeric state.
- `SconeSlider` delegates range behavior to the shadcn/Radix slider primitive.
- `SconeDatePicker` delegates overlay behavior to `Popover`, keeps date selection local, and exposes an independent clear button.
- `SconeUpload` validates `accept`, `maxSize`, `maxFiles`, and async `beforeAdd`, then reports structured rejections.
- `SconeFormActions` only expresses alignment and sticky action layout.

### Assessment

- Slider, Upload, and FormActions have clear responsibilities and focused tests.
- Upload rejection behavior is explicit enough for consumers and does not introduce backend/product assumptions.
- DatePicker overlay/focus/clear behavior is now covered by focused tests for trigger, Enter/Space, Escape, outside click, disabled date, controlled fields, and clear button.

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

## 11 Data Display Atoms

### Evidence

- `SconeCard` wraps shadcn card slots and exposes title, description, actions, footer, loading, and variant.
- `SconeTag`, `SconeBadge`, `SconeStatistic`, and `SconeTimeline` use Foundation tone vocabulary without embedding product-specific statuses.
- Tests cover loading card overlay, tag close action, badge overflow/dot/children, statistic slots, timeline reverse/pending/click, refs, and className.

### Assessment

- These components are mostly small, business-neutral wrappers.
- Tone/status naming is consistent with Foundation vocabulary.
- No unnecessary product workflows, request assumptions, or global state were found.

## 12 Typography And Layout Primitives

### Evidence

- Typography primitives share `SconeTypographyProps` and use `as`, size, weight, tone, and truncate.
- `SconeStack`, `SconeInline`, `SconeCompact`, and `SconeToolbar` encode token-based spacing, alignment, compact grouping, and toolbar slots.
- Layout tests cover token gaps, wrap, split, density, orientation, ref, className, and style where exposed.
- Some remaining non-target layout files and several other component wrappers still import `cn` through `src/lib/utils`, while newer component files import `@/lib/cn` directly.

### Assessment

- Typography and layout components do not own business state or product workflow.
- `SconeInline` split is decorative and hidden from assistive technology, which matches its separator intent.
- `SconeToolbar` stays primitive: selected count and permission/action semantics remain in Pattern/caller code.

### Candidate Finding

### [P3] `cn` import path is inconsistent

- **位置**：`src/lib/utils.ts`、`src/components/ui/*.tsx`、`src/components/feedback-overlay/*.tsx`、`src/components/layout/scroll-area.tsx`、`separator.tsx`、`split-pane.tsx`、部分 `navigation` 和 `media` 文件
- **类别**：命名 / 依赖
- **问题**：Some files import `cn` from `../../lib/utils`, while most newer component and Pattern files import `@/lib/cn`.
- **影响**：`utils.ts` is only a one-line re-export, so it adds a second name/path for the same helper and makes dependency scanning noisier.
- **证据**：`src/lib/utils.ts` only exports `{ cn }`; `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` still finds callers outside the completed `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar` cleanup.
- **建议**：When touching remaining files, standardize imports on `@/lib/cn` and remove `src/lib/utils.ts` only after no callers remain.
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

- `SconeAlert` uses Foundation tone, title/description/icon/action slots, maps urgent tones to `alert`, maps non-urgent tones to `status`, and allows explicit role override.
- `SconeEmpty` renders title, description, image, action, and children without owning recovery logic.
- `SconeLoading` marks busy regions and provides spinner/skeleton status content.
- `SconeProgress` wraps Radix Progress and clamps value range before passing it to the primitive.
- Tests cover alert tone text, actions, role mapping/override, empty actions, loading busy state, skeleton, not-loading state, progress ARIA values, status text, and clamping including invalid max values.

### Assessment

- Empty and Loading responsibilities are clear and business-neutral.
- Alert and Progress semantic hardening from this audit is complete.

## 15 Feedback Overlays And Services

### Evidence

- `SconeDrawer` and `SconeDialog` delegate focus/outside/escape behavior to Radix Dialog and expose close reasons.
- `SconeConfirm` delegates alert dialog behavior to Radix AlertDialog, manages async `onConfirm` busy state, catches rejected confirmations, and reports failures through `onError`.
- `toast` and `notification` are module-level services backed by `useSyncExternalStore` providers.
- Tests cover drawer/dialog title and close reasons, confirm duplicate async prevention and rejection handling, toast/notification update/dismiss/clear reasons, visible limits, toast timer rerender stability, and persistent notification marker.

### Assessment

- Drawer/Dialog close reason handling is explicit and avoids product workflow assumptions.
- Toast/Notification public services are intentionally exported with providers and have focused tests.
- Confirm async error handling and Toast timer stability findings from this audit are complete.

## 16 Primary Navigation

### Evidence

- `SconeBreadcrumb` renders nav/ol structure, current page marker, collapse expansion, disabled handling, links/buttons, and optional `asChild`.
- `SconePagination` is controlled by `SconePaginationState` and emits `page` or `pageSize` change reasons.
- `SconeTabs` supports item helper mode and compound mode with roving tab keyboard behavior.
- `SconeSegmented` uses radiogroup semantics and controlled/uncontrolled selection.
- Tests cover current breadcrumb, collapsed breadcrumb, pagination changes, tabs activation modes, tabs root passthrough/ref, vertical tab keyboard flow, segmented selection, and segmented keyboard focus movement.

### Assessment

- Navigation components do not introduce routing assumptions.
- State ownership is caller-controlled where it should be: pagination and selected values are not hidden in global state.
- Tabs root passthrough and Segmented keyboard focus findings from this audit are complete.

## 17 Menu, Command, And Tree Navigation

### Evidence

- `SconeDropdown` implements trigger cloning, open state, absolute menu rendering, keyboard navigation, item selection, and focus restoration.
- `SconeMenu` owns selected/open key arrays and nested menu rendering without route assumptions.
- `SconeCommand` owns search input, filtering, grouping, active item, loading, empty state, and selection.
- `SconeTree` owns expanded/selected/checked key arrays, flattening, keyboard navigation, treeitem rendering, and checkbox state.
- Tests cover item selection, disabled states, dropdown outside close, dropdown keyboard initial focus, keyboard movement, tree expand/check/select, command filtering, filtered active command selection, and service-free navigation behavior.

### Assessment

- Menu and Tree have larger state surfaces but remain UI-level, not product workflow-level.
- Dropdown outside interaction and Command filtered active item findings from this audit are complete.
- Dropdown remains a custom wrapper; future broad simplification can still consider deeper Radix primitive alignment.

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

- `AppShell` exposes Root/Sidebar/Header/Main/Aside compound parts, keeps `Main` as a non-scrolling page host, and no longer exposes unused change callbacks.
- `Page` exposes Root/Header/Main/Content/StickyActions and owns max width, density, main scroll, and sticky action inset.
- `Section` exposes Root/Header/Title/Description/Actions/Content/Footer, implements Root shorthand for title/description/actions, and avoids card styling.
- Tests cover shell slots, controlled/default display state, main shrink behavior, page scroll/sticky inset, Section Root shorthand, and Section semantic non-card structure.

### Assessment

- Pattern components do not import routing, permissions, product logo, request, or store code.
- Main scroll ownership is aligned with AppShell/Page design.
- AppShell callback and Section Root shorthand findings from this audit are complete.

## 20 FilterBar And DataTable Patterns

### Evidence

- `FilterBar.Root` owns search/filter/expanded state boundaries and provides compound parts through context.
- `DataTable.Root` provides density, selection, and pagination context; `TableRegion` composes `SconeTable`; `Pagination` composes `SconePagination`.
- `DataTable` keeps sorting/filtering request logic out of the pattern and does not import route/request/store code.
- Tests cover FilterBar controlled/uncontrolled search, default-only search visibility, apply payloads, expanded state, built-in and compound actions, DataTable selection injection, bulk actions, state priority, children escape hatch, and pagination context/prop override.

### Assessment

- DataTable is not a monolithic request table; state ownership remains mostly with callers.
- Selection injection is isolated to `DataTable.TableRegion`, leaving base `SconeTable` simpler.
- FilterBar has an overloaded `filters` prop, but the hidden search state finding from this audit is complete.

## 21 Vendored UI Boundary

### Evidence

- Reviewed representative shadcn/Radix files: `button.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `select.tsx`, and `table.tsx`.
- `src/index.ts`, component-family barrels, and Pattern barrels do not export `src/components/ui/*`.
- Direct callers are wrapper components or other UI primitives, for example `SconeButton`, `SconeSelect`, `SconeTable`, and internal shadcn dialog/sheet/alert-dialog/command files.

### Assessment

- No P0/P1/P2 issue found in the vendored boundary itself.
- The UI files act as primitive bases and do not encode product workflow, routing, permissions, backend contracts, or business vocabulary.
- The main reuse opportunity is at higher layers: custom Dropdown behavior should consider existing Radix/shadcn primitives before adding more hand-rolled interaction code.

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
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` records all component families, Admin Patterns, and Recipes as complete, while separately listing remaining remediation work.
- `docs/10-specs/patterns/SECTION.md` lists `Section.Root` shorthand props `title`, `description`, and `actions`; source implements those props on `Section.Root`.
- `docs/10-specs/patterns/APP-SHELL.md` and `docs/30-designs/admin-ui/PATTERN-DESIGN.md` no longer describe unused AppShell change callbacks.
- `docs/10-specs/patterns/FILTER-BAR.md` lists `defaultSearchValue`; source renders the built-in search control when only `defaultSearchValue` is provided.

### Assessment

- Public export and Recipe docs-only boundaries are aligned across SPEC, DESIGN, readiness, source, and tests.
- The verification design remains useful as a matrix, but edge-case findings from this audit are not reflected in readiness.
- The readiness document now distinguishes implementation coverage completion from remaining remediation work.
- Pattern API mismatches identified in this audit are resolved by implementation or documentation narrowing.
