# Implementation Coverage

## Purpose

本文档记录 Admin UI SPEC、DESIGN、源码实现和验证证据的当前收口状态。它是 readiness 证据，不替代 SPEC、DESIGN 或发布说明。

读取规则：

- 需求范围以 `docs/10-specs/COMPONENT-SELECTION.md` 和 `docs/10-specs/ADMIN-PATTERNS-SPEC.md` 为准。
- 设计落点以 `docs/30-designs/DESIGN-ADMIN-UI.md` 和 `docs/30-designs/admin-ui/` 为准。
- 实现完成必须同时满足：公共导出存在、源码存在、同目录测试存在、验证命令通过。
- Recipe 保持 docs-only；完成标准是文档边界清楚、无源码入口、无正式 `Scone*` API 导出。

## Current Status

| 覆盖对象           | 状态     | 说明                                                                                         |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| SPEC 覆盖          | 完成     | 当前能力矩阵、组件选择、Pattern 和 Recipe 均已定义。                                         |
| DESIGN 覆盖        | 完成     | 架构、文件落点、类型、导出面、组件族、Pattern、Recipe 和验证策略均已定义。                   |
| 组件族实现         | 完成覆盖 | Form、Data Display、Layout、Feedback / Overlay、Navigation、Media 均有源码、公共导出和测试。 |
| Admin Pattern 实现 | 完成覆盖 | `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` 均有源码、公共导出和测试。           |
| Recipe 收口        | 完成     | Recipe 全部保持 docs-only，不创建 `src/recipes/`，不导出 recipe `Scone*` API。               |
| 公共导出守护       | 完成     | `src/index.test.ts` 验证公共导出和 no-recipe-source 边界。                                   |
| 系统性代码审核     | 完成     | 审核报告见 [`SYSTEMATIC-CODE-REVIEW-2026-07.md`](./SYSTEMATIC-CODE-REVIEW-2026-07.md)。      |

结论：当前 `docs/10-specs/` 与 `docs/30-designs/` 覆盖的 Admin UI 范围已完成实现或 docs-only 覆盖闭环；系统性审核已识别待修复项，不能再表述为“无未完成实现项”。

## Coverage Matrix

| 业务域                         | 状态 | 公共入口                                                       | 验证入口                                                                                            |
| ------------------------------ | ---- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Foundation / theme / utilities | 完成 | `src/types/foundation.ts`、`src/lib/*`、`src/styles/theme.css` | `src/types/foundation.test.ts`、`src/lib/*.test.*`、`src/styles/theme.test.ts`、`src/index.test.ts` |
| Form                           | 完成 | `src/components/form/index.ts`、`src/index.ts`                 | `src/components/form/*.test.tsx`、`src/index.test.ts`                                               |
| Data Display                   | 完成 | `src/components/data-display/index.ts`、`src/index.ts`         | `src/components/data-display/*.test.tsx`、`src/index.test.ts`                                       |
| Layout                         | 完成 | `src/components/layout/*`、`src/index.ts`                      | `src/components/layout/*.test.tsx`、`src/index.test.ts`                                             |
| Feedback / Overlay             | 完成 | `src/components/feedback-overlay/*`、`src/index.ts`            | `src/components/feedback-overlay/*.test.tsx`、`src/index.test.ts`                                   |
| Navigation                     | 完成 | `src/components/navigation/index.ts`、`src/index.ts`           | `src/components/navigation/*.test.tsx`、`src/index.test.ts`                                         |
| Media                          | 完成 | `src/components/media/index.ts`、`src/index.ts`                | `src/components/media/*.test.tsx`、`src/index.test.ts`                                              |
| Admin Patterns                 | 完成 | `src/patterns/index.ts`、`src/index.ts`                        | `src/patterns/*.test.tsx`、`src/index.test.ts`                                                      |
| Recipes                        | 完成 | docs-only，无源码入口                                          | `src/index.test.ts` no-recipe-source / no-recipe-export 守护                                        |

## Implemented Surface

公共导出面覆盖 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups：

- Form：`SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`、`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Data Display：`SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`、`SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`。
- Layout：`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Feedback / Overlay：`SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Navigation / Media：`SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar`。
- Admin Patterns：`AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` compound parts。

## Recipe Evidence

Recipe 全部为 docs-only，目标是说明可复制组合边界，不新增正式源码 API。

| Recipe           | 状态 | 组合边界                                                                                  |
| ---------------- | ---- | ----------------------------------------------------------------------------------------- |
| DrawerForm       | 完成 | 复用 `SconeDrawer`、`SconeForm`、`SconeFormSection`、`SconeFormActions`、`SconeConfirm`。 |
| ConfirmationFlow | 完成 | 复用 `SconeConfirm`、AlertDialog、Button，危险动作由调用方处理。                          |
| Popover          | 完成 | 复用 Radix/shadcn Popover parts、Button、Stack，不导出 `SconePopover`。                   |
| Logo             | 完成 | 复用 AppShell brand slot、Image/Text 或自定义节点，不导出 `SconeLogo`。                   |
| Result           | 完成 | 复用 Empty/Alert、Typography、Button，不导出 `SconeResult`。                              |
| Dashboard Metric | 完成 | 复用 `SconeStatistic`、Card、Grid recipe，不沉淀业务口径。                                |
| Grid             | 完成 | 复用 CSS grid / Tailwind utilities、Page、Section、Card，不导出 `SconeGrid`。             |

Recipe 守护：

- `src/recipes/` 不存在。
- `src/index.ts` 不导出 `SconeDrawerForm`、`SconeConfirmationFlow`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeDashboardMetric`、`SconeGrid`。
- `src/index.test.ts` 显式验证以上边界。

## Verification Evidence Summary

最近完整验证证据：

| 命令                | 状态 | 说明                                                              |
| ------------------- | ---- | ----------------------------------------------------------------- |
| `pnpm format:check` | 通过 | 全仓库格式符合 Prettier。                                         |
| `pnpm test`         | 通过 | 69 个 test files、293 个 tests。                                  |
| `pnpm typecheck`    | 通过 | TypeScript 无类型错误。                                           |
| `pnpm lint`         | 通过 | compound component / Pattern 文件已在 ESLint 配置中设置明确例外。 |
| `pnpm build`        | 通过 | Vite production build 成功。                                      |

审核证据：

- 系统性审核覆盖 `src/`、`docs/10-specs/`、`docs/30-designs/`、readiness、测试和构建配置。
- SplitPane resize preset 边界和 active drag listener cleanup 已由 `src/components/layout/split-pane.test.tsx` 覆盖。
- 审核结论按 P0/P1/P2/P3 汇总在 [`SYSTEMATIC-CODE-REVIEW-2026-07.md`](./SYSTEMATIC-CODE-REVIEW-2026-07.md)。
- P0：未发现。
- P1：主要集中在复杂 overlay/focus 交互和 Pattern API/docs 对齐。

本分支新增回归覆盖：

- `src/styles/theme.test.ts` 覆盖 Tailwind config 不再引用 stale token 变量名，并引用当前 `theme.css` token。
- `src/components/feedback-overlay/progress.test.tsx` 覆盖 invalid `max` 不再产生非有限百分比、ARIA 或 indicator transform。
- `src/components/form/number-input.test.tsx` 覆盖非有限输入不会提交 `NaN`，并保留清空和合法输入提交行为。
- `src/components/feedback-overlay/confirm.test.tsx` 覆盖 async confirmation rejection 后 dialog 保持打开、busy 恢复并调用 `onError`。
- `src/components/feedback-overlay/toast.test.tsx` 覆盖 provider 无关 rerender 不重置 toast timeout。
- `src/components/feedback-overlay/alert.test.tsx` 覆盖 urgent / non-urgent role mapping 和显式 role override。
- `src/components/navigation/dropdown.test.tsx` 覆盖 outside pointer/focus close 和 keyboard open initial focus。
- `src/components/navigation/command.test.tsx` 覆盖 filter 后直接 Enter 选择可见 enabled item 且不选择 disabled filtered item。
- `src/components/navigation/tabs.test.tsx` 覆盖 Tabs root HTML props 和 ref passthrough。
- `src/components/navigation/segmented.test.tsx` 覆盖 arrow key selection 与 focus 同步并跳过 disabled option。
- `src/patterns/section.test.tsx` 覆盖 `Section.Root` title / description / actions shorthand。
- `src/patterns/filter-bar.test.tsx` 覆盖 `defaultSearchValue` 渲染内置 search input 并提交可见 search value。
- `src/lib/use-controllable-state.test.tsx` 覆盖 `value={undefined}` 继续按 uncontrolled sentinel 处理，并保留 setter 本地更新和 `onValueChange` 通知。
- `src/index.test.ts` 覆盖 `SconeFieldContextValue.fieldId`、`labelId`、`descriptionId`、`messageId` 作为当前公共类型契约。
- `src/components/form/input.test.tsx`、`search-input.test.tsx`、`password-input.test.tsx`、`textarea.test.tsx` 覆盖 text controls 继续先触发 `onValueChange`，再触发原生 `onChange`。

测试维护证据：

- `src/patterns/app-shell.test.tsx`、`src/patterns/page.test.tsx`、`src/patterns/section.test.tsx` 已将非契约用途的 DOM traversal 改为 role、text、button 操作或公开 layout contract 断言。
- `src/patterns/filter-bar.test.tsx`、`src/patterns/data-table.test.tsx` 已将筛选、表格和 toolbar 相关断言改为 input/select/button 操作、callback payload 和明确组合边界断言。
- `src/app.test.tsx` 已改为 demo entry smoke test，不再验证固定 demo copy。
- 本批次验证已执行 `pnpm exec prettier --write ...`、`pnpm lint`、`pnpm build`；全部代码任务完成后执行 `pnpm test`，结果为 69 个 test files、288 个 tests 通过。

## Boundaries

- 本仓库仍是 admin-ui 组件库和 UI 治理工作区，不沉淀产品应用级 UI 规则。
- 组件、Pattern 和 Recipe 不发起请求、不判断权限、不绑定路由、不写业务字段规则。
- `SconeTable` 不内置 pagination、selection 或请求状态机；这些由 `DataTable` Pattern 或调用方组合。
- `FilterBar` 不定义业务筛选 schema，不绑定 DataTable 内部状态，不重置分页。
- `AppShell` 不内置菜单、路由、权限、产品 logo 或切换按钮。
- Recipe 继续保持 docs-only；新增源码 API 前必须先更新 SPEC、DESIGN 和公共导出测试。

## Pending Implementation Work

本节只记录从本次系统性审核沉淀出的待修复方向；详细证据和风险见系统性审核报告。

1. 降低复杂交互维护成本：持续关注 Combobox、DatePicker 的 overlay、focus 和 keyboard 行为。
2. 处理剩余 P2/P3 维护项：Data Display / Layout root props 边界、剩余 `cn` import path、layout / feedback-overlay 测试内部标记耦合。

后续维护要求：

1. SPEC 新增、排除或改名能力时，同步更新 `COMPONENT-SELECTION.md`、DESIGN 覆盖矩阵、源码导出和本文档。
2. 新增源码组件或 Pattern 时，继续保持同目录测试和 `src/index.test.ts` 公共导出守护。
3. Recipe 如继续保持 docs-only，不得创建 `src/recipes/`，不得新增 recipe `Scone*` export。
4. `src/styles/theme.css` 继续作为 CSS variables 唯一数值源；不要创建第二套 token 数值源。
