# Admin Shell Patterns Runbook

## Purpose

完成 Admin Shell Patterns 闭环：补齐应用框架、页面主滚动、结构分区和筛选条四类高频 admin-ui 结构 Pattern，让调用方可以在不引入产品业务规则的前提下组合后台页面骨架。

## Scope

本次闭环只覆盖以下源码与测试落点：

- `src/patterns/app-shell.tsx`：实现 `AppShell.Root/Sidebar/Header/Main/Aside`。
- `src/patterns/app-shell.test.tsx`：覆盖 AppShell 布局、侧栏收起、辅助区开合和 Main 容器语义。
- `src/patterns/page.tsx`：实现 `Page.Root/Header/Content/StickyActions`。
- `src/patterns/page.test.tsx`：覆盖 Page 主滚动、maxWidth、density、页面级 actions 和底部 sticky actions。
- `src/patterns/section.tsx`：实现 `Section.Root/Header/Content/Footer`。
- `src/patterns/section.test.tsx`：覆盖 Section 语义分区、分区级 actions 和非 Card 结构边界。
- `src/patterns/filter-bar.tsx`：实现 `FilterBar.Root/Search/Fields/Actions/Summary`。
- `src/patterns/filter-bar.test.tsx`：覆盖搜索输入、筛选字段、展开区、应用、重置和摘要。
- `src/patterns/index.ts`：导出以上 Pattern 与公开类型，保留既有 DataTable 导出。
- `src/index.ts`：从包公共入口导出以上 Pattern 与公开类型，保留既有公共导出。

## Non-goals

- 不触碰 `src/patterns/data-table.tsx` 内部实现，避免与第三个 worktree 的 DataTable 工作重叠。
- 不新增产品级菜单、路由、权限、请求、URL 同步、业务字段 schema 或应用运行时假设。
- 不把 FilterBar 绑定到 DataTable 内部状态；FilterBar 只提交筛选意图。
- 不新增长期治理规则；本 RUNBOOK 是临时执行手册。
- 不在本次范围内扩展 Recipe、FormPage、DetailPage、SettingsPage 或 MasterDetail。

## Data Structures

以下字段为本次实现需要落地的公开 props/state。字段名、可选性和事件签名必须保持清晰；如需偏离，先更新本 RUNBOOK 或 `docs/30-designs/admin-ui/PATTERN-DESIGN.md`。

### `src/patterns/app-shell.tsx`

- `AppShellRootProps`
  - `children: React.ReactNode`
  - `className?: string`
- `AppShellSidebarProps`
  - `children?: React.ReactNode`
  - `className?: string`
  - `collapsed?: boolean`
  - `defaultCollapsed?: boolean`
  - `onCollapsedChange?: (collapsed: boolean) => void`
- `AppShellHeaderProps`
  - `children?: React.ReactNode`
  - `className?: string`
  - `actions?: React.ReactNode`
- `AppShellMainProps`
  - `children: React.ReactNode`
  - `className?: string`
- `AppShellAsideProps`
  - `children?: React.ReactNode`
  - `className?: string`
  - `open?: boolean`
  - `defaultOpen?: boolean`
  - `onOpenChange?: (open: boolean) => void`

### `src/patterns/page.tsx`

- `PageRootProps`
  - `children: React.ReactNode`
  - `className?: string`
  - `maxWidth?: "narrow" | "content" | "wide" | "full"`
  - `density?: SconeDensity`
- `PageHeaderProps`
  - `children?: React.ReactNode`
  - `className?: string`
  - `title?: React.ReactNode`
  - `description?: React.ReactNode`
  - `actions?: React.ReactNode`
- `PageContentProps`
  - `children: React.ReactNode`
  - `className?: string`
- `PageStickyActionsProps`
  - `children: React.ReactNode`
  - `className?: string`
  - `align?: "start" | "end" | "between"`

### `src/patterns/section.tsx`

- `SectionRootProps`
  - `children: React.ReactNode`
  - `className?: string`
  - `density?: SconeDensity`
- `SectionHeaderProps`
  - `children?: React.ReactNode`
  - `className?: string`
  - `title?: React.ReactNode`
  - `description?: React.ReactNode`
  - `actions?: React.ReactNode`
- `SectionContentProps`
  - `children: React.ReactNode`
  - `className?: string`
- `SectionFooterProps`
  - `children: React.ReactNode`
  - `className?: string`

### `src/patterns/filter-bar.tsx`

- `FilterBarFilters = Record<string, unknown>`
- `FilterBarState`
  - `searchValue: string`
  - `filters: FilterBarFilters`
- `FilterBarRootProps`
  - `children: React.ReactNode`
  - `className?: string`
  - `searchValue?: string`
  - `defaultSearchValue?: string`
  - `onSearchChange?: (value: string) => void`
  - `filters?: FilterBarFilters`
  - `defaultFilters?: FilterBarFilters`
  - `onFiltersChange?: (filters: FilterBarFilters) => void`
  - `expanded?: boolean`
  - `defaultExpanded?: boolean`
  - `onExpandedChange?: (expanded: boolean) => void`
  - `onApply?: (state: FilterBarState) => void`
  - `onReset?: () => void`
- `FilterBarSearchProps`
  - `className?: string`
  - `placeholder?: string`
  - `ariaLabel?: string`
- `FilterBarFieldsProps`
  - `children: React.ReactNode`
  - `className?: string`
- `FilterBarActionsProps`
  - `children: React.ReactNode`
  - `className?: string`
- `FilterBarSummaryProps`
  - `children?: React.ReactNode`
  - `className?: string`

## Frontend Behavior

前端实现必须精确到控件和操作：

- AppShell
  - `AppShell.Sidebar` 渲染侧边栏区域；当 `collapsed` 或内部 collapsed 状态为 `true` 时，根节点暴露 `data-collapsed="true"`。
  - 侧栏收起操作由调用方按钮触发 `onCollapsedChange(nextCollapsed)`；组件本身只维护展示状态，不渲染内置菜单或产品 logo。
  - `AppShell.Header` 渲染顶部栏；`actions` slot 放置用户菜单、通知、主题切换等调用方控件。
  - `AppShell.Aside` 渲染辅助面板；打开或关闭操作触发 `onOpenChange(nextOpen)`，关闭态不占用主要内容宽度。
  - `AppShell.Main` 使用可收缩主区域，承接一个 `Page.Root`，不创建页面滚动条。
- Page
  - `Page.Header` 显示页面标题、描述和页面级按钮，例如“新建”“保存”“导出”。
  - `Page.Content` 是页面唯一主滚动容器；表格、表单、Section 和空状态都放入该区域。
  - `Page.StickyActions` 固定在页面内容底部，用于“保存”“取消”“提交审核”等页面级确认操作；`align` 控制按钮组左对齐、右对齐或两端分布。
  - `maxWidth` 控制内容宽度：`narrow` 用于窄表单，`content` 用于常规页面，`wide` 用于宽列表，`full` 用于全宽管理视图。
- Section
  - `Section.Root` 渲染语义分区，不增加 Card 式边框、阴影或背景。
  - `Section.Header.actions` 放置分区级按钮，例如“编辑分区”“添加字段”“刷新模块”，不得放置整页主操作。
  - `Section.Content` 承载字段、列表、说明或自定义内容；不创建新的主滚动容器。
  - `Section.Footer` 承载分区级补充操作或说明，不承担页面级 sticky actions。
- FilterBar
  - `FilterBar.Search` 渲染搜索输入框；输入变更触发 `onSearchChange(value)`。
  - `FilterBar.Fields` 承载 Select、DatePicker、Checkbox、RadioGroup 等调用方筛选控件；控件值变化后由调用方更新 `filters` 并触发 `onFiltersChange(nextFilters)`。
  - `FilterBar.Actions` 承载“应用”“重置”“展开/收起”等按钮；点击“应用”触发 `onApply({ searchValue, filters })`，点击“重置”触发 `onReset()`。
  - `FilterBar.Summary` 展示已选筛选摘要，例如筛选标签、结果数量或当前条件说明。
  - 展开/收起操作修改 `expanded` 状态并触发 `onExpandedChange(nextExpanded)`；窄屏下 Search、Fields、Actions 允许换行。

## Plan

### Task 1: AppShell Layout Boundary

涉及文件：

- `src/patterns/app-shell.tsx`
- `src/patterns/app-shell.test.tsx`
- `src/patterns/index.ts`

执行内容：

1. 在 `src/patterns/app-shell.tsx` 中实现 `AppShell.Root/Sidebar/Header/Main/Aside` 和上述 AppShell props。
2. 为 `Sidebar` 实现 controlled/uncontrolled collapsed 状态；状态变化只通过 `onCollapsedChange(collapsed)` 通知调用方。
3. 为 `Aside` 实现 controlled/uncontrolled open 状态；状态变化只通过 `onOpenChange(open)` 通知调用方。
4. 为 Root、Sidebar、Header、Main、Aside 添加稳定 data attribute，支持测试和组合识别。
5. 在 `src/patterns/app-shell.test.tsx` 中覆盖 slot 渲染、collapsed/open 回调、Main 可收缩语义和 Header actions。
6. 在 `src/patterns/index.ts` 导出 `AppShell` 与 AppShell props 类型。

### Task 2: Page Primary Scroll Boundary

涉及文件：

- `src/patterns/page.tsx`
- `src/patterns/page.test.tsx`
- `src/patterns/index.ts`

执行内容：

1. 在 `src/patterns/page.tsx` 中实现 `Page.Root/Header/Content/StickyActions` 和上述 Page props。
2. `Page.Root` 支持 `maxWidth` 与 `density`，并通过 data attribute 暴露当前值。
3. `Page.Content` 承担页面唯一主滚动区域，保证最后内容不会被 `Page.StickyActions` 遮挡。
4. `Page.Header` 明确 title、description、actions 的渲染位置。
5. `Page.StickyActions` 支持 `align: "start" | "end" | "between"`。
6. 在 `src/patterns/page.test.tsx` 中覆盖主滚动容器、sticky actions、maxWidth、density 和 header actions。
7. 在 `src/patterns/index.ts` 导出 `Page` 与 Page props 类型。

### Task 3: Section Structural Boundary

涉及文件：

- `src/patterns/section.tsx`
- `src/patterns/section.test.tsx`
- `src/patterns/index.ts`

执行内容：

1. 在 `src/patterns/section.tsx` 中实现 `Section.Root/Header/Content/Footer` 和上述 Section props。
2. `Section.Root` 使用语义 `section`，支持 `density`，不添加 Card 式视觉容器样式。
3. `Section.Header` 明确 title、description、actions 的分区级位置。
4. `Section.Content` 和 `Section.Footer` 只提供结构 slot，不建立主滚动。
5. 在 `src/patterns/section.test.tsx` 中覆盖语义 section、header actions、content、footer、density 和非 Card 边界。
6. 在 `src/patterns/index.ts` 导出 `Section` 与 Section props 类型。

### Task 4: FilterBar Interaction Boundary

涉及文件：

- `src/patterns/filter-bar.tsx`
- `src/patterns/filter-bar.test.tsx`
- `src/patterns/index.ts`

执行内容：

1. 在 `src/patterns/filter-bar.tsx` 中实现 `FilterBar.Root/Search/Fields/Actions/Summary`、`FilterBarFilters` 和 `FilterBarState`。
2. `FilterBar.Root` 支持 `searchValue/defaultSearchValue/onSearchChange`、`filters/defaultFilters/onFiltersChange`、`expanded/defaultExpanded/onExpandedChange`。
3. `FilterBar.Search` 渲染输入控件，默认使用 `ariaLabel` 或稳定默认可访问名称。
4. `FilterBar.Fields` 承载调用方筛选控件，不解析业务字段 schema。
5. `FilterBar.Actions` 承载调用方按钮；Root 提供 apply/reset 的状态边界，点击后分别触发 `onApply({ searchValue, filters })` 和 `onReset()`。
6. `FilterBar.Summary` 承载当前筛选摘要，不计算业务结果数量。
7. 在 `src/patterns/filter-bar.test.tsx` 中覆盖搜索输入、筛选字段、展开/收起、应用、重置、摘要和窄屏换行相关 data/class 语义。
8. 在 `src/patterns/index.ts` 导出 `FilterBar`、`FilterBarFilters`、`FilterBarState` 与 FilterBar props 类型。

### Task 5: Export Surface And Regression Check

涉及文件：

- `src/patterns/index.ts`
- `src/index.ts`
- `src/patterns/data-table.tsx`
- `src/patterns/data-table.test.tsx`

执行内容：

1. 检查 `src/patterns/index.ts` 中新增导出不会覆盖或重命名既有 `DataTable` 导出。
2. 检查 `src/index.ts` 从包公共入口导出 `AppShell`、`Page`、`Section`、`FilterBar` 以及对应公开 props/state 类型。
3. 只在必要时读取 `src/patterns/data-table.tsx` 和 `src/patterns/data-table.test.tsx` 确认导出兼容；不得修改 DataTable 内部。
4. 如后续需要让 `DataTable.FilterBar` 复用独立 `FilterBar`，另起任务处理，不纳入本 RUNBOOK 的源码变更。

## Verification

实现完成后运行并记录以下验证：

```bash
pnpm test -- src/patterns/app-shell.test.tsx src/patterns/page.test.tsx src/patterns/section.test.tsx src/patterns/filter-bar.test.tsx src/patterns/data-table.test.tsx
pnpm typecheck
pnpm lint
```

验证重点：

- `AppShell.Main` 能承载唯一 Page 入口，并允许内部滚动区域收缩。
- `Page.Content` 是页面主滚动容器，`Page.StickyActions` 不遮挡最后内容。
- `Section` 保持语义分区，不建立新的主滚动，也不伪装成 Card。
- `FilterBar` 的 search、filters、expanded、apply 和 reset 由调用方状态边界驱动。
- `src/patterns/index.ts` 不破坏既有 `DataTable` 导出。
- `src/index.ts` 从包公共入口暴露新增 Pattern，不破坏既有公共导出。
- `src/patterns/data-table.test.tsx` 继续通过，证明本次导出和新增 Pattern 未回归既有 DataTable 行为。

## Closure

任务关闭时删除本 RUNBOOK。若实现过程产生长期有效的 Pattern 约束，先迁移到 `docs/30-designs/admin-ui/PATTERN-DESIGN.md` 或对应 readiness 文档，再删除本临时文档。
