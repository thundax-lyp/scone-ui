# Implementation Coverage

## Purpose

本文档记录 Admin UI SPEC、DESIGN、源码实现和验证证据的当前收口状态。它是 readiness 证据，不替代 SPEC、DESIGN 或发布说明。

读取规则：

- 需求范围以 `docs/10-specs/COMPONENT-SELECTION.md` 和 `docs/10-specs/ADMIN-PATTERNS-SPEC.md` 为准。
- 设计落点以 `docs/30-designs/DESIGN-ADMIN-UI.md` 和 `docs/30-designs/admin-ui/` 为准。
- 实现完成必须同时满足：公共导出存在、源码存在、同目录测试存在、验证命令通过。
- Recipe 保持 docs-only；完成标准是文档边界清楚、无源码入口、无正式 `Scone*` API 导出。

## Current Status

| 覆盖对象           | 状态 | 说明                                                                               |
| ------------------ | ---- | ---------------------------------------------------------------------------------- |
| SPEC 覆盖          | 完成 | 当前能力矩阵、组件选择、Pattern 和 Recipe 均已定义。                               |
| DESIGN 覆盖        | 完成 | 架构、文件落点、类型、导出面、组件族、Pattern、Recipe 和验证策略均已定义。         |
| 组件族实现         | 完成 | Form、Data Display、Layout、Feedback / Overlay、Navigation、Media 均已实现并测试。 |
| Admin Pattern 实现 | 完成 | `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` 均已实现并测试。           |
| Recipe 收口        | 完成 | Recipe 全部保持 docs-only，不创建 `src/recipes/`，不导出 recipe `Scone*` API。     |
| 公共导出守护       | 完成 | `src/index.test.ts` 验证公共导出和 no-recipe-source 边界。                         |

结论：当前 `docs/10-specs/` 与 `docs/30-designs/` 覆盖的 Admin UI 范围已完成实现或 docs-only 验证闭环。

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

## Verification Evidence

当前验证命令：

| 命令                | 状态 | 说明                                                              |
| ------------------- | ---- | ----------------------------------------------------------------- |
| `pnpm format:check` | 通过 | 全仓库格式符合 Prettier。                                         |
| `pnpm test`         | 通过 | 69 个 test files、253 个 tests。                                  |
| `pnpm typecheck`    | 通过 | TypeScript 无类型错误。                                           |
| `pnpm lint`         | 通过 | compound component / Pattern 文件已在 ESLint 配置中设置明确例外。 |
| `pnpm build`        | 通过 | Vite production build 成功。                                      |

## Boundaries

- 本仓库仍是 admin-ui 组件库和 UI 治理工作区，不沉淀产品应用级 UI 规则。
- 组件、Pattern 和 Recipe 不发起请求、不判断权限、不绑定路由、不写业务字段规则。
- `SconeTable` 不内置 pagination、selection 或请求状态机；这些由 `DataTable` Pattern 或调用方组合。
- `FilterBar` 不定义业务筛选 schema，不绑定 DataTable 内部状态，不重置分页。
- `AppShell` 不内置菜单、路由、权限、产品 logo 或切换按钮。
- Recipe 继续保持 docs-only；新增源码 API 前必须先更新 SPEC、DESIGN 和公共导出测试。

## Maintenance Work

当前无未完成实现项。后续维护要求：

1. SPEC 新增、排除或改名能力时，同步更新 `COMPONENT-SELECTION.md`、DESIGN 覆盖矩阵、源码导出和本文档。
2. 新增源码组件或 Pattern 时，继续保持同目录测试和 `src/index.test.ts` 公共导出守护。
3. Recipe 如继续保持 docs-only，不得创建 `src/recipes/`，不得新增 recipe `Scone*` export。
4. `src/styles/theme.css` 继续作为 CSS variables 唯一数值源；不要创建第二套 token 数值源。
