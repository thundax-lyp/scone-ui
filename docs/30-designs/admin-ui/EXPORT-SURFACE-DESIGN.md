# Admin UI Export Surface Design

## Export Surface Design

依据文件：

- `docs/10-specs/COMPONENT-SELECTION.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

公共导出必须以 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups 为准。`src/index.ts` 是库级公共入口；组件族入口只导出本族能力和必要公共类型；Recipe 不默认形成正式 `Scone*` API。

| Export group | 导出名称 | 所属文件路径 | 导出形态 | Compound | Source strategy | 类型归属 | 验证入口 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Admin Pattern exports | `Page.Root/Header/Content/StickyActions` | `src/patterns/page.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/page.tsx` | `src/patterns/page.test.tsx` |
| Admin Pattern exports | `Section.Root/Header/Content/Footer` | `src/patterns/section.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/section.tsx` | `src/patterns/section.test.tsx` |
| Admin Pattern exports | `DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` | `src/patterns/data-table.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/data-table.tsx` | `src/patterns/data-table.test.tsx` |
| Typography | `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` | `src/components/data-display/typography.tsx` | `Scone*` export | 否 | `custom` | `src/components/data-display/typography.tsx` | `src/components/data-display/typography.test.tsx` |
| Form components | `SconeButton` | `src/components/form/button.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/button.tsx` | `src/components/form/button.test.tsx` |
| Form components | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | `src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Form components | `SconeSelect` | `src/components/form/select.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/select.tsx` | `src/components/form/select.test.tsx` |
| Form components | `SconeForm`、`SconeField` | `src/components/form/form.tsx`、`src/components/form/field.tsx` | `Scone*` export | 支持 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Form helpers | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | `src/components/form/field-group.tsx`、`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx` | helper export | 部分 | `pattern-only` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Additional form inputs | `SconeCombobox` | `src/components/form/combobox.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/combobox.tsx` | `src/components/form/combobox.test.tsx` |
| Additional form inputs | `SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeSlider` | `src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/radio-group.tsx`、`src/components/form/slider.tsx` | `Scone*` export | RadioGroup/Slider 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Additional form inputs | `SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | `src/components/form/number-input.tsx`、`src/components/form/date-picker.tsx`、`src/components/form/upload.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Layout primitives | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane` | `src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/split-pane.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Layout primitives | `SconeSeparator`、`SconeScrollArea` | `src/components/layout/separator.tsx`、`src/components/layout/scroll-area.tsx` | `Scone*` export | ScrollArea 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Data display | `SconeDescriptions`、`SconeList`、`SconeStatistic`、`SconeTimeline` | `src/components/data-display/descriptions.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Data display | `SconeTable` | `src/components/data-display/table.tsx` | `Scone*` export | 否 | `scone-wrapper` | `src/components/data-display/table.tsx` | `src/components/data-display/table.test.tsx` |
| Data display | `SconeCard`、`SconeTag`、`SconeBadge` | `src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx` | `Scone*` export | 否 | `scone-wrapper`/`custom` 按组件 SPEC 确认 | 各组件文件 | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconeBreadcrumb`、`SconeTabs`、`SconeDropdown`、`SconeMenu`、`SconeSegmented`、`SconeAccordion`、`SconeCollapsible` | `src/components/navigation/*.tsx` | `Scone*` export | 支持 | `vendored-shadcn` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconePagination`、`SconeTree` | `src/components/navigation/pagination.tsx`、`src/components/navigation/tree.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconeCommand` | `src/components/navigation/command.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/navigation/command.tsx` | `src/components/navigation/command.test.tsx` |
| Navigation and media | `SconeTooltip`、`SconeImage`、`SconeAvatar` | `src/components/navigation/tooltip.tsx`、`src/components/media/image.tsx`、`src/components/media/avatar.tsx` | `Scone*` export | Tooltip 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeDrawer`、`SconeDialog`、`SconeConfirm` | `src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx` | `Scone*` export | 支持 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` | `src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeToastProvider`、`toast` | `src/components/feedback-overlay/toast.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/toast.tsx` | `src/components/feedback-overlay/toast.test.tsx` |
| Feedback | `SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/notification.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/notification.tsx` | `src/components/feedback-overlay/notification.test.tsx` |
| Recipes | DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid | `docs/10-specs/recipes/*.md` | docs-only Recipe | 否 | `direct-docs-only` | 无公共类型 | 文档和示例验证 |

导出规则：

- `src/index.ts` 只导出 `COMPONENT-SELECTION.md` 中列入 Export Groups 的能力。
- `direct-docs-only` Recipe 不从 `src/index.ts` 导出。
- 不创建 `src/recipes/` 源码目录；Recipe 示例留在文档和示例边界内。
- `pattern-only` 只导出明确 compound parts；禁止单一万能配置对象。
- Provider/service export 必须同时导出必要 option 类型，避免调用方依赖私有结构。
- 组件族内部 helper、私有状态、私有 hook 不从公共入口导出。

## Coverage Matrix

依据文件：

- `docs/10-specs/COMPONENT-SELECTION.md`

本矩阵证明 `docs/10-specs/COMPONENT-SELECTION.md` 中当前能力均已进入 DESIGN。目标源码文件、类型定义位置和测试文件是设计落点，不代表已经创建。

| 能力 | SPEC 文件 | 层级 | Source strategy | 导出名称 | 目标源码文件 | 类型定义位置 | 状态能力 | 验证策略 | DESIGN 章节 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | `docs/10-specs/components/form/SCONE-BUTTON.md` | Component | `scone-wrapper` | `SconeButton` | `src/components/form/button.tsx` | `src/components/form/button.tsx` | loading / disabled | action loading、disabled、ref、className、ariaLabel | Component Family Designs / Form |
| Input / Search / Password / TextArea | `docs/10-specs/components/form/SCONE-INPUT.md` 等 | Component | `scone-wrapper` | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | `src/components/form/input.tsx` 等 | 各组件文件 | disabled / readOnly / invalid via Field | label 关联、readOnly/disabled、Field invalid | Component Family Designs / Form |
| Select | `docs/10-specs/components/form/SCONE-SELECT.md` | Component | `scone-wrapper` | `SconeSelect` | `src/components/form/select.tsx` | `src/components/form/select.tsx`、`src/types/foundation.ts` | disabled / readOnly / invalid via Field | value/open 受控、Radix 键盘、aria | Component Family Designs / Form |
| Field / Form | `docs/10-specs/components/form/SCONE-FIELD.md`、`SCONE-FORM.md` | Component | `custom` | `SconeField`、`SconeForm` | `src/components/form/field.tsx`、`src/components/form/form.tsx` | 各组件文件 | invalid / disabled / readOnly / required | label/description/message 关联、状态传播 | Component Family Designs / Form |
| Form helpers | `docs/10-specs/components/form/SCONE-FIELD-GROUP.md` 等 | Pattern helper | `pattern-only` | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | `src/components/form/field-group.tsx` 等 | 各组件文件 | sticky / section / grouping | sticky/actions 布局与业务边界 | Component Family Designs / Form |
| Stack / Inline / Compact / Toolbar | `docs/10-specs/components/layout/*.md` | Layout | `custom` | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar` | `src/components/layout/*.tsx` | 各组件文件、`src/types/foundation.ts` | 不承载业务状态 | density、gap、wrap、ref/className | Component Family Designs / Layout |
| Separator / ScrollArea | `docs/10-specs/components/layout/SCONE-SEPARATOR.md`、`SCONE-SCROLL-AREA.md` | Layout | `vendored-shadcn` | `SconeSeparator`、`SconeScrollArea` | `src/components/layout/separator.tsx`、`scroll-area.tsx` | 各组件文件 | 不承载业务状态 | viewport、局部滚动、Radix 行为 | Component Family Designs / Layout |
| SplitPane | `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md` | Layout | `custom` | `SconeSplitPane` | `src/components/layout/split-pane.tsx` | `src/components/layout/split-pane.tsx` | 不承载业务状态 | resize、keyboard、ARIA、preset | Component Family Designs / Layout |
| Page / Section / FilterBar / DataTable | `docs/10-specs/patterns/*.md` | Admin Pattern | `pattern-only` | `Page.*`、`Section.*`、`FilterBar`、`DataTable.*` | `src/patterns/*.tsx` | `src/patterns/*.tsx` | data / sticky / selection 按 Pattern | slot、状态归属、滚动/sticky、业务边界 | Admin Pattern Designs |
| Table | `docs/10-specs/components/data-display/SCONE-TABLE.md` | Component | `scone-wrapper` | `SconeTable` | `src/components/data-display/table.tsx` | `src/components/data-display/table.tsx`、`src/types/foundation.ts` | loading / empty / error | 状态优先级、columns、scroll、ref/className | Component Family Designs / Data Display |
| Pagination | `docs/10-specs/components/navigation/SCONE-PAGINATION.md` | Component | `custom` | `SconePagination` | `src/components/navigation/pagination.tsx` | `src/types/foundation.ts` | disabled | page/pageSize、ARIA、键盘 | Component Family Designs / Navigation |
| Drawer | `docs/10-specs/components/feedback-overlay/SCONE-DRAWER.md` | Component | `scone-wrapper` | `SconeDrawer` | `src/components/feedback-overlay/drawer.tsx` | `src/components/feedback-overlay/drawer.tsx`、`src/types/foundation.ts` | loading / close reason | focus trap/restore、close reason、widthPreset | Component Family Designs / Feedback |
| Card / Alert / Empty / Loading / Progress | `docs/10-specs/components/*/SCONE-*.md` | Component | `scone-wrapper` | `SconeCard`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` | 对应组件文件 | 各组件文件、`src/types/foundation.ts` | loading / empty / error | tone/status、aria-busy、action | Component Family Designs |
| Descriptions / Tag / Badge / List / Typography / Statistic | `docs/10-specs/components/data-display/*.md` | Component | `custom` | `SconeDescriptions` 等 | `src/components/data-display/*.tsx` | 各组件文件、`src/types/foundation.ts` | empty / loading 按组件适用 | density、tone、typography、item 类型 | Component Family Designs / Data Display |
| Switch / Checkbox | `docs/10-specs/components/form/SCONE-SWITCH.md`、`SCONE-CHECKBOX.md` | Component | `vendored-shadcn` | `SconeSwitch`、`SconeCheckbox` | `src/components/form/switch.tsx`、`checkbox.tsx` | 各组件文件 | checked / disabled / invalid via Field | checked 受控、Radix 行为、Field invalid | Component Family Designs / Form |
| RadioGroup / Slider | `docs/10-specs/components/form/SCONE-RADIO-GROUP.md`、`SCONE-SLIDER.md` | Component | `vendored-shadcn` | `SconeRadioGroup`、`SconeSlider` | `src/components/form/radio-group.tsx`、`slider.tsx` | 各组件文件、`src/types/foundation.ts` | selected / disabled / invalid via Field | keyboard、value、aria | Component Family Designs / Form |
| NumberInput / DatePicker / Upload | `docs/10-specs/components/form/*.md` | Component | `custom` | `SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | `src/components/form/number-input.tsx` 等 | 各组件文件 | disabled / readOnly / invalid via Field | custom 键盘、ARIA、事件 payload | Component Family Designs / Form |
| Combobox / Command | `docs/10-specs/components/form/SCONE-COMBOBOX.md`、`navigation/SCONE-COMMAND.md` | Component | `scone-wrapper` | `SconeCombobox`、`SconeCommand` | `src/components/form/combobox.tsx`、`src/components/navigation/command.tsx` | 各组件文件、`src/types/foundation.ts` | loading / empty / selected / expanded | search、selection、keyboard、empty | Component Family Designs |
| Breadcrumb / Tabs / Dropdown / Menu | `docs/10-specs/components/navigation/*.md` | Component | `vendored-shadcn` | `SconeBreadcrumb`、`SconeTabs`、`SconeDropdown`、`SconeMenu` | `src/components/navigation/*.tsx` | 各组件文件、`src/types/foundation.ts` | selected / expanded | aria-current、roving focus、typeahead | Component Family Designs / Navigation |
| Segmented / Accordion / Collapsible | `docs/10-specs/components/navigation/*.md` | Component | `vendored-shadcn` | `SconeSegmented`、`SconeAccordion`、`SconeCollapsible` | `src/components/navigation/*.tsx` | 各组件文件、`src/types/foundation.ts` | selected / expanded | value/open、keyboard、ARIA | Component Family Designs / Navigation |
| Tree | `docs/10-specs/components/navigation/SCONE-TREE.md` | Component | `custom` | `SconeTree` | `src/components/navigation/tree.tsx` | `src/types/foundation.ts`、组件文件 | selected / checked / expanded | tree keyboard、ARIA、selection/checking | Component Family Designs / Navigation |
| Image / Avatar / Tooltip | `docs/10-specs/components/media/*.md`、`navigation/SCONE-TOOLTIP.md` | Component | `vendored-shadcn` | `SconeImage`、`SconeAvatar`、`SconeTooltip` | `src/components/media/*.tsx`、`src/components/navigation/tooltip.tsx` | 各组件文件 | fallback / hover / focus | fallback、alt、tooltip trigger/focus | Component Family Designs / Media/Navigation |
| Dialog / Confirm | `docs/10-specs/components/feedback-overlay/SCONE-DIALOG.md`、`SCONE-CONFIRM.md` | Component | `scone-wrapper` | `SconeDialog`、`SconeConfirm` | `src/components/feedback-overlay/dialog.tsx`、`confirm.tsx` | 各组件文件、`src/types/foundation.ts` | close reason / loading / destructive | focus trap、close reason、destructive action | Component Family Designs / Feedback |
| Toast / Notification | `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`、`SCONE-NOTIFICATION.md` | Component service | `scone-wrapper` | `SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/toast.tsx`、`notification.tsx` | 各 service 文件 | queued feedback / persistent notice | provider/service API、稳定 id、queue | Component Family Designs / Feedback |
| Timeline | `docs/10-specs/components/data-display/SCONE-TIMELINE.md` | Component | `custom` | `SconeTimeline` | `src/components/data-display/timeline.tsx` | `src/types/foundation.ts`、组件文件 | event sequence | item sequence、tone、accessibility | Component Family Designs / Data Display |
| Popover / Logo / Result | `docs/10-specs/recipes/POPOVER.md`、`LOGO.md`、`RESULT.md` | Recipe | `direct-docs-only` | 无 `Scone*` export | docs-only | 无公共类型 | 按 recipe 组合 | 无 wrapper 原因和可验证组合 | Recipe Designs |

覆盖规则：

- Coverage Matrix 中的目标文件均为设计落点，不代表已经创建。
- 后续如果 SPEC 新增或排除能力，必须同步本矩阵和 `docs/10-specs/COMPONENT-SELECTION.md`。
- 若某个能力在单组件 SPEC 中调整 source strategy，以单组件 SPEC 和 `COMPONENT-SELECTION.md` 更新后的交集为准。
