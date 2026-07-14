# Admin UI Verification Design

## Verification Design

依据文件：

- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本文档只定义后续验证策略，不表示测试文件已经创建。

| 能力类型 | 验证对象 | 验证行为 | 目标入口 |
| --- | --- | --- | --- |
| Foundation/theme | CSS variables、Tailwind 映射、token 消费 | `src/styles/theme.css` 是唯一数值源；Tailwind 只映射变量；不创建第二套 `tokens.ts` 数值源。 | `src/types/foundation.test.ts`、静态检查 |
| Public exports | `src/index.ts`、组件族入口、Pattern 入口 | Export Groups 与 `docs/10-specs/COMPONENT-SELECTION.md` 一致；docs-only Recipe 不导出。 | `src/index.test.ts` |
| Component 基础行为 | `className`、`ref`、可访问名称、核心状态 | 每个组件的稳定 DOM 边界可透传 `className` 和 ref；无可见 label 时支持 `ariaLabel`。 | 与组件文件同目录的 `*.test.tsx` |
| Radix/shadcn wrapper | focus、keyboard、ARIA、close、`asChild` | wrapper 不破坏 focus trap、focus restore、roving focus、typeahead、Escape、outside interaction、ARIA 和 `asChild`。 | 与 wrapper 文件同目录的 `*.test.tsx` |
| Custom component | keyboard、ARIA、受控/非受控、边界条件 | Tree、SplitPane、NumberInput、DatePicker、Upload、Timeline 等 custom 能力必须单独验证交互模型。 | 与组件文件同目录的 `*.test.tsx` |
| Pattern | slot 组合、状态归属、滚动/sticky、业务职责不进入 | Page 主滚动唯一；DataTable 状态由调用方拥有并只留 props/callback 边界；Pattern 不发起请求或判断权限。 | 与 Pattern 文件同目录的 `*.test.tsx` |
| Recipe | 组合可复制、无新增正式 API、关键状态可验证 | docs-only Recipe 明确无源码落点；不创建 `src/recipes/` 源码入口。 | 文档和示例验证 |
| Type/data structure | 公共类型导出、私有类型不泄漏、事件 payload、service options、ref 类型 | 公共类型从约定入口导出；回调不承载业务对象；service 类型不泄漏内部 queue/store。 | `src/types/foundation.test.ts`、`src/index.test.ts` |

最小验证清单：

- Form：label、description、message、invalid、required、disabled、readOnly 与 control 关联。
- Data Display：Table/List 的 `loading > error > empty` 优先级；Table 不承接 pagination、selection、请求。
- Layout：ScrollArea viewport、SplitPane 键盘 resize、Toolbar wrap 和 density。
- Feedback/Overlay：Drawer/Dialog/Confirm 的 focus trap、focus restore、close reason、ariaLabel/title。
- Navigation：Tabs ARIA 关联、Dropdown/Menu 键盘、Tree ARIA tree、Pagination state。
- Media：Image/Avatar fallback、alt、preview open。
- Pattern：DataTable.TableRegion、Page.Content 主滚动、Section 非 Card、FilterBar submit intent。
- Recipe：DrawerForm dirty close、ConfirmationFlow destructive description、Popover/Logo/Result docs-only。

## File-Level Acceptance Matrix

以下矩阵是实现阶段的最小验收入口。每个目标源码文件必须有同目录同名测试，除非该项明确为 docs-only。

| 目标源码文件 | 目标测试文件 | 必验收点 |
| --- | --- | --- |
| `src/types/foundation.ts` | `src/types/foundation.test.ts` | `OverlayCloseReason` 与 `FOUNDATIONS-SPEC.md` 一致；`SconeOption<Value = string>` 默认泛型；`ResponsiveValue<T>` 不接受数组形态。 |
| `src/index.ts` | `src/index.test.ts` | 公共导出与 `COMPONENT-SELECTION.md` Export Groups 一致；Recipe 不导出；私有 helper 不泄漏。 |
| `src/components/form/button.tsx` | `src/components/form/button.test.tsx` | `SconeButtonProps`、loading 禁止重复触发、disabled、`ariaLabel`、`asChild` ref/className。 |
| `src/components/form/input.tsx`、`search-input.tsx`、`password-input.tsx`、`textarea.tsx` | 同目录同名 `*.test.tsx` | `value/defaultValue/onValueChange`、disabled/readOnly/invalid、Field ARIA 关联、clear/password toggle/count。 |
| `src/components/form/select.tsx`、`combobox.tsx` | 同目录同名 `*.test.tsx` | `SconeOption<Value>`、open/value 受控组合、keyboard、loading/empty、Field invalid。 |
| `src/components/form/form.tsx`、`field.tsx` | 同目录同名 `*.test.tsx` | Form context 传播；Field label/description/message/id/required/invalid 关联。 |
| `src/components/form/field-group.tsx`、`form-section.tsx`、`form-actions.tsx` | 同目录同名 `*.test.tsx` | 语义 grouping、section actions、sticky actions 不遮挡字段；不内置保存/请求。 |
| `src/components/form/switch.tsx`、`checkbox.tsx`、`radio-group.tsx`、`slider.tsx` | 同目录同名 `*.test.tsx` | checked/value 受控组合、Radix keyboard、invalid via Field、disabled。 |
| `src/components/form/number-input.tsx`、`date-picker.tsx`、`upload.tsx` | 同目录同名 `*.test.tsx` | custom keyboard/ARIA、边界值、`disabledDate`、文件 reject reason、disabled/readOnly/invalid。 |
| `src/components/data-display/descriptions.tsx`、`list.tsx`、`timeline.tsx` | 同目录同名 `*.test.tsx` | item 数据结构、density、loading/error/empty、timeline sequence、无业务状态机。 |
| `src/components/data-display/table.tsx` | `src/components/data-display/table.test.tsx` | `SconeTableColumn<T>`、`rowKey`、cell render、scroll.x、loading/error/empty；不内置 pagination/selection/request。 |
| `src/components/data-display/card.tsx`、`tag.tsx`、`badge.tsx`、`typography.tsx`、`statistic.tsx` | 同目录同名 `*.test.tsx` | tone/status 映射、loading region、closable、dot aria、语义 HTML、truncate。 |
| `src/components/layout/stack.tsx`、`inline.tsx`、`compact.tsx`、`toolbar.tsx` | 同目录同名 `*.test.tsx` | token gap、wrap、density、ref/className；不承载业务状态。 |
| `src/components/layout/split-pane.tsx` | `src/components/layout/split-pane.test.tsx` | min/max/size 带单位、keyboard resize、ARIA orientation、onSizeChange。 |
| `src/components/layout/separator.tsx`、`scroll-area.tsx` | 同目录同名 `*.test.tsx` | Radix semantics、viewport slot、onScroll 来源、不得形成第二主滚动。 |
| `src/components/feedback-overlay/drawer.tsx`、`dialog.tsx`、`confirm.tsx` | 同目录同名 `*.test.tsx` | `OverlayCloseReason`、focus trap/restore、Escape/outside/close/footerAction、destructive confirm、loading 防重复。 |
| `src/components/feedback-overlay/alert.tsx`、`empty.tsx`、`loading.tsx`、`progress.tsx` | 同目录同名 `*.test.tsx` | 可读状态、action、`aria-busy`、progress 可量化语义。 |
| `src/components/feedback-overlay/toast.tsx`、`notification.tsx` | 同目录同名 `*.test.tsx` | Provider props、service 返回稳定 id、update/dismiss/clear、queue、placement、close reason。 |
| `src/components/navigation/breadcrumb.tsx`、`tabs.tsx`、`segmented.tsx` | 同目录同名 `*.test.tsx` | `aria-current`、Tabs ARIA 关联、activation mode、value 受控。 |
| `src/components/navigation/dropdown.tsx`、`menu.tsx`、`command.tsx` | 同目录同名 `*.test.tsx` | action/item 数据结构、roving focus、typeahead、Escape、onSelect payload。 |
| `src/components/navigation/pagination.tsx`、`tree.tsx` | 同目录同名 `*.test.tsx` | pagination reason；Tree selected/checked/expanded、disabled node、Home/End 和方向键。 |
| `src/components/navigation/accordion.tsx`、`collapsible.tsx`、`tooltip.tsx` | 同目录同名 `*.test.tsx` | open/value 受控、keyboard、Tooltip 只承载短说明。 |
| `src/components/media/image.tsx`、`avatar.tsx` | 同目录同名 `*.test.tsx` | alt、fallback、preview open、失败状态和尺寸稳定。 |
| `src/patterns/app-shell.tsx` | `src/patterns/app-shell.test.tsx` | `AppShell.Main` 只承载 Page 入口、Sidebar/Aside 展示状态、Main 可收缩。 |
| `src/patterns/page.tsx`、`section.tsx` | 同目录同名 `*.test.tsx` | Page 主滚动唯一、StickyActions padding、Section 非 Card、actions 层级。 |
| `src/patterns/filter-bar.tsx` | `src/patterns/filter-bar.test.tsx` | `FilterBarState`、search/filters/expanded 受控组合、onApply/onReset、窄屏换行。 |
| `src/patterns/data-table.tsx` | `src/patterns/data-table.test.tsx` | TableRegion loading/error/empty、selection 注入、Pagination 唯一入口、外部状态库只通过 props/callback 接入。 |
| Recipe 文档 | 文档和示例验证 | DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid 均保持 docs-only，不创建 `src/recipes/`。 |
