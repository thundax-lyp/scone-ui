# Admin UI File Placement Design

## File Placement Design

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本节只定义后续目标文件名，不创建源码文件。

| 文件 | 职责 | SPEC 来源 | 公共 API |
| --- | --- | --- | --- |
| `docs/30-designs/README.md` | designs 目录索引，列出当前有效设计文档。 | `docs/00-governance/DOCUMENT-RULES.md` | 否 |
| `docs/30-designs/DESIGN-ADMIN-UI.md` | Admin UI 设计总入口，保留设计文档导航、审核结论和状态。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `docs/30-designs/admin-ui/*.md` | Admin UI 分主题详细设计文档。 | `docs/10-specs/*.md` | 否 |
| `src/styles/theme.css` | CSS variables 唯一数值源。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `src/styles.css` | 引入 theme、Tailwind layers 和全局基础样式。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `tailwind.config.ts` | 必要目标文件；默认只映射 `src/styles/theme.css` 中的 CSS variables，不维护第二套 token 数值。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `src/types/foundation.ts` | Foundation shared types，例如 `ResponsiveValue<T>`、`SconeOption<Value>`、`Key`、`SconeTone` 和词表类型。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 是 |
| `src/lib/cn.ts` | className 合并工具。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/compose-refs.ts` | ref 合并工具。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/use-controllable-state.ts` | 受控/非受控状态辅助。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/aria.ts` | ARIA/id 辅助。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/components/form/index.ts` | Form 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-FORM.md` | 是 |
| `src/components/data-display/index.ts` | Data Display 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md` | 是 |
| `src/components/layout/index.ts` | Layout 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-LAYOUT.md` | 是 |
| `src/components/feedback-overlay/index.ts` | Feedback And Overlay 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md` | 是 |
| `src/components/navigation/index.ts` | Navigation 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md` | 是 |
| `src/components/media/index.ts` | Media 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md` | 是 |
| `src/patterns/index.ts` | Admin Pattern 导出入口。 | `docs/10-specs/ADMIN-PATTERNS-SPEC.md` | 是 |
| `src/index.ts` | 库级公共导出入口，汇总 Foundation types、组件族、Pattern parts 和 provider/service export。 | `docs/10-specs/COMPONENT-SELECTION.md` | 是 |

组件目标文件：

| 组件族 | 目标文件 |
| --- | --- |
| Form | `src/components/form/button.tsx`、`src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx`、`src/components/form/select.tsx`、`src/components/form/form.tsx`、`src/components/form/field.tsx`、`src/components/form/field-group.tsx`、`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx`、`src/components/form/combobox.tsx`、`src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/radio-group.tsx`、`src/components/form/number-input.tsx`、`src/components/form/slider.tsx`、`src/components/form/date-picker.tsx`、`src/components/form/upload.tsx` |
| Data Display | `src/components/data-display/descriptions.tsx`、`src/components/data-display/table.tsx`、`src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/typography.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx` |
| Layout | `src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/split-pane.tsx`、`src/components/layout/separator.tsx`、`src/components/layout/scroll-area.tsx` |
| Feedback And Overlay | `src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx`、`src/components/feedback-overlay/toast.tsx`、`src/components/feedback-overlay/notification.tsx` |
| Navigation | `src/components/navigation/breadcrumb.tsx`、`src/components/navigation/pagination.tsx`、`src/components/navigation/tabs.tsx`、`src/components/navigation/segmented.tsx`、`src/components/navigation/tree.tsx`、`src/components/navigation/dropdown.tsx`、`src/components/navigation/menu.tsx`、`src/components/navigation/tooltip.tsx`、`src/components/navigation/command.tsx`、`src/components/navigation/accordion.tsx`、`src/components/navigation/collapsible.tsx` |
| Media | `src/components/media/image.tsx`、`src/components/media/avatar.tsx` |

Pattern 目标文件：

| Pattern | 目标文件 |
| --- | --- |
| AppShell | `src/patterns/app-shell.tsx` |
| Page | `src/patterns/page.tsx` |
| Section | `src/patterns/section.tsx` |
| FilterBar | `src/patterns/filter-bar.tsx` |
| DataTable | `src/patterns/data-table.tsx` |
| FormPage | `src/patterns/form-page.tsx` |
| DetailPage | `src/patterns/detail-page.tsx` |
| SettingsPage | `src/patterns/settings-page.tsx` |
| MasterDetail | `src/patterns/master-detail.tsx` |

Recipe 目标文件：

| Recipe | 目标落点 |
| --- | --- |
| DrawerForm | docs-only：`docs/10-specs/recipes/DRAWER-FORM.md`，不创建 `src/recipes/drawer-form.tsx`。 |
| ConfirmationFlow | docs-only：`docs/10-specs/recipes/CONFIRMATION-FLOW.md`，不创建 `src/recipes/confirmation-flow.tsx`。 |
| Popover | docs-only：`docs/10-specs/recipes/POPOVER.md`，不创建 `SconePopover`。 |
| Logo | docs-only：`docs/10-specs/recipes/LOGO.md`，不创建 `SconeLogo`。 |
| Result | docs-only：`docs/10-specs/recipes/RESULT.md`，不创建 `SconeResult`。 |
| Dashboard Metric | docs-only：`docs/10-specs/recipes/DASHBOARD-METRIC.md`，不创建 `src/recipes/dashboard-metric.tsx`。 |
| Grid | docs-only：`docs/10-specs/recipes/GRID.md`，不创建 `src/recipes/grid.tsx`。 |

测试目标文件：

| 范围 | 目标测试文件 |
| --- | --- |
| Foundation | `src/types/foundation.test.ts` |
| Shared utilities | 与 `src/lib/*.ts` 同目录的同名 `*.test.ts`。 |
| Components | 与 `src/components/**/*.tsx` 同目录的同名 `*.test.tsx`。 |
| Patterns | 与 `src/patterns/*.tsx` 同目录的同名 `*.test.tsx`。 |
| Recipes | 文档和示例验证，不创建 `src/recipes/recipes.test.tsx`。 |
| Public exports | `src/index.test.ts` |

## Source Layout Design

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

源码布局应以 `src/index.ts` 作为公共导出入口，以组件族目录作为内部组织边界，以 `src/types/foundation.ts` 和 `src/lib/*.ts` 承载跨组件共享能力。

目标结构：

```text
src/
  components/
    data-display/
    feedback-overlay/
    form/
    layout/
    media/
    navigation/
  lib/
  patterns/
  recipes/
  styles/
  types/
  index.ts
```

设计规则：

- `src/components/*/index.ts` 只导出本组件族公共组件和本族公共类型，不导出私有 helper。
- 单组件文件优先承载组件实现和紧耦合 props 类型；组件族公共类型按组件族分散定义并从组件族入口汇总，再由 `src/index.ts` 汇总导出。
- 跨组件共享词表和基础状态桥接类型才提升到 `src/types/foundation.ts`。
- `src/lib/*.ts` 只承载组件库通用工具，不承载产品业务、请求、权限、路由或状态机。
- `src/patterns/*.tsx` 只导出 Pattern compound parts，不导出大配置对象。
- Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口，不新增 `Scone*` export。
- `src/styles/theme.css` 是 CSS variables 唯一数值源；`src/styles.css` 只负责引入 theme、Tailwind layers 和全局基础样式。
- `src/index.ts` 汇总公共 API，导出范围必须与 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups 一致。
