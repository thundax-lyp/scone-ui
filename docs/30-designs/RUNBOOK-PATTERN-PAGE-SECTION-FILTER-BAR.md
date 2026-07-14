# Page、Section 与 FilterBar Pattern RUNBOOK

## Purpose

完成 `Page + Section Pattern` 与独立 `FilterBar Pattern` 的组件库级闭环，让页面主滚动、底部固定操作区 padding、非 Card 分节语义、筛选栏受控组合，以及 `DataTable.FilterBar` 的复用边界在源码、导出和测试中保持一致。

## Scope

- 新增 `src/patterns/page.tsx` 与 `src/patterns/page.test.tsx`，提供 `Page.Root`、`Page.Main`、`Page.StickyActions`。
- 新增 `src/patterns/section.tsx` 与 `src/patterns/section.test.tsx`，提供非 `Card` 的 `Section.Root`、`Section.Header`、`Section.Title`、`Section.Description`、`Section.Actions`、`Section.Content`。
- 新增 `src/patterns/filter-bar.tsx` 与 `src/patterns/filter-bar.test.tsx`，提供独立 `FilterBar.Root`，覆盖 `search`、`filters`、`expandedContent`、`expanded`、`defaultExpanded`、`onExpandedChange`、`onApply`、`onReset`。
- 调整 `src/patterns/data-table.tsx` 与 `src/patterns/data-table.test.tsx`，让 `DataTable.FilterBar` 复用独立 `FilterBar.Root` 并保留 DataTable 槽位标识。
- 调整 `src/patterns/index.ts`、`src/index.ts`、`src/index.test.ts`，导出新增 pattern 和 props 类型。

## Non-goals

- 不迁移产品应用级 UI 规则，不新增 `UI-RULES.md`。
- 不引入业务筛选协议、后端查询参数、表格数据请求或应用运行时假设。
- 不把 `Section` 包装成 `SconeCard`，也不要求下游页面采用特定业务布局。
- 不重构无关基础组件、主题 token、表格选择逻辑或分页逻辑。
- 不提交代码；本 RUNBOOK 供审核后执行。

## Target API

### `src/patterns/page.tsx`

- `PageRootProps extends React.HTMLAttributes<HTMLDivElement>`：
    - `hasStickyActions?: boolean`：显式声明页面包含底部固定操作区；为 `Page.Main` 提供底部 padding 状态。
    - `density?: SconeDensity`：可选布局密度，默认 `default`。
- `PageMainProps extends React.HTMLAttributes<HTMLElement>`：
    - `asChild?: false`：本轮不实现 polymorphic 行为，保留普通 `main` 语义。
- `PageStickyActionsProps extends React.HTMLAttributes<HTMLDivElement>`：
    - `align?: "start" | "center" | "end" | "between"`：操作按钮排列方式，默认 `end`。
- `Page` 导出对象：
    - `Page.Root`
    - `Page.Main`
    - `Page.StickyActions`

### `src/patterns/section.tsx`

- `SectionRootProps extends React.HTMLAttributes<HTMLElement>`：
    - `density?: SconeDensity`：控制分节间距，默认 `default`。
- `SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement>`：标题、描述和操作区容器。
- `SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement>`：
    - `level?: 2 | 3 | 4`：渲染 `h2`、`h3` 或 `h4`，默认 `2`。
- `SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement>`：描述文本容器。
- `SectionActionsProps extends React.HTMLAttributes<HTMLDivElement>`：标题区右侧操作容器。
- `SectionContentProps extends React.HTMLAttributes<HTMLDivElement>`：内容容器。
- `Section` 导出对象：
    - `Section.Root`
    - `Section.Header`
    - `Section.Title`
    - `Section.Description`
    - `Section.Actions`
    - `Section.Content`

### `src/patterns/filter-bar.tsx`

- `FilterBarRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onReset">`：
    - `search?: React.ReactNode`：搜索控件插槽，优先支持调用方传入受控 `SconeSearchInput` 或自定义控件。
    - `searchValue?: string`：内置搜索输入的受控值；仅在未传 `search` 时启用内置搜索输入。
    - `onSearchChange?: (value: string) => void`：内置搜索输入变更回调；仅在未传 `search` 时启用。
    - `searchPlaceholder?: string`：内置搜索输入 placeholder，默认 `Search`。
    - `filters?: React.ReactNode`：常驻筛选控件插槽。
    - `expandedContent?: React.ReactNode`：展开区筛选控件插槽。
    - `expanded?: boolean`：受控展开状态。
    - `defaultExpanded?: boolean`：非受控初始展开状态。
    - `onExpandedChange?: (expanded: boolean) => void`：点击展开按钮后的状态请求。
    - `onApply?: () => void`：点击应用按钮后的命令出口，不修改调用方筛选状态。
    - `onReset?: () => void`：点击重置按钮后的命令出口，不修改调用方筛选状态。
    - `applyLabel?: React.ReactNode`：应用按钮文案，默认 `Apply`。
    - `resetLabel?: React.ReactNode`：重置按钮文案，默认 `Reset`。
    - `expandLabel?: React.ReactNode`：展开按钮文案，默认 `More filters`。
    - `collapseLabel?: React.ReactNode`：收起按钮文案，默认 `Less filters`。
    - `applyDisabled?: boolean`：应用按钮禁用态。
    - `resetDisabled?: boolean`：重置按钮禁用态。
- `FilterBar` 导出对象：
    - `FilterBar.Root`

### `src/patterns/data-table.tsx`

- `DataTableFilterBarProps extends FilterBarRootProps`：
    - `children?: React.ReactNode`：兼容既有 children-only 用法；传入 `children` 时作为独立 `FilterBar.Root` 的内容或 fallback 插槽渲染。
- `DataTable.FilterBar` 必须保留：
    - `data-scone-data-table-part="filter-bar"`
    - 独立 `FilterBar.Root` 的 `data-scone-pattern="filter-bar"`

## Plan

### Task 1：Page pattern，2 个文件

- 文件：
    - `src/patterns/page.tsx`
    - `src/patterns/page.test.tsx`
- 实现：
    - `Page.Root` 渲染最外层 `div`，包含 `data-scone-pattern="page"`、`data-density`、`data-has-sticky-actions`。
    - `Page.Main` 渲染 `main`，作为主滚动区，包含 `data-scone-page-part="main"`。
    - `Page.Main` 在 `hasStickyActions=true` 时增加可测试的 bottom padding class 或 data 标识。
    - `Page.StickyActions` 渲染底部固定操作区，包含 `data-scone-page-part="sticky-actions"`，默认右对齐按钮。
- 前端控件和操作：
    - 主内容区域：滚动容器，承载页面主体内容。
    - 底部操作区：固定在 Page 底部，放置 `Save`、`Cancel` 等按钮，不遮挡主内容末尾。
    - 操作区排列：`align="end"` 右对齐，`align="between"` 两端分布。
- 测试：
    - 渲染 `Page.Root`、`Page.Main`、`Page.StickyActions` 后能通过 data 标识找到三层边界。
    - `hasStickyActions=true` 时 `Page.Main` 带底部 padding 状态。
    - `align` 改变时 `Page.StickyActions` 的布局状态可断言。

### Task 2：Section pattern，2 个文件

- 文件：
    - `src/patterns/section.tsx`
    - `src/patterns/section.test.tsx`
- 实现：
    - `Section.Root` 渲染 `section`，包含 `data-scone-pattern="section"`，不使用 `SconeCard`。
    - `Section.Header` 渲染标题区，包含 `data-scone-section-part="header"`。
    - `Section.Title` 根据 `level` 渲染 `h2`、`h3` 或 `h4`。
    - `Section.Description` 渲染说明文本。
    - `Section.Actions` 渲染标题区右侧操作容器。
    - `Section.Content` 渲染内容区，和 actions 保持层级分离。
- 前端控件和操作：
    - 标题控件：展示分节名称。
    - 描述控件：展示补充说明。
    - 操作区：放置 `Edit`、`Add`、`Refresh` 等按钮，位置固定在 header 右侧。
    - 内容区：放置表单、表格、描述列表或自定义内容。
- 测试：
    - `Section.Root` 没有 `data-scone-card` 或 Card 专属标识。
    - `Section.Actions` 位于 header 内，不位于 content 内。
    - 仅 content、标题加描述、标题加 actions 三类组合均稳定渲染。

### Task 3：独立 FilterBar pattern，2 个文件

- 文件：
    - `src/patterns/filter-bar.tsx`
    - `src/patterns/filter-bar.test.tsx`
- 实现：
    - `FilterBar.Root` 渲染 `div`，包含 `data-scone-pattern="filter-bar"`。
    - 未传 `search` 且传入 `searchValue` 或 `onSearchChange` 时渲染内置搜索输入。
    - 传入 `search` 时直接渲染搜索插槽，不再渲染内置搜索输入。
    - `filters` 渲染常驻筛选控件区。
    - `expandedContent` 渲染展开筛选区，受 `expanded` 或内部 `defaultExpanded` 状态控制。
    - 展开按钮点击后只调用 `onExpandedChange(nextExpanded)`，受控时不自行改变展开状态。
    - `Apply` 按钮点击调用 `onApply`，不修改搜索值、筛选项或展开状态。
    - `Reset` 按钮点击调用 `onReset`，不修改搜索值、筛选项或展开状态。
- 前端控件和操作：
    - 搜索输入：输入关键字后触发 `onSearchChange(value)`。
    - 常驻筛选控件：例如状态 Select、日期 DatePicker，作为 `filters` 插槽渲染。
    - 展开按钮：在 `More filters` 与 `Less filters` 间切换，请求展开或收起高级筛选。
    - 应用按钮：点击后触发应用筛选命令。
    - 重置按钮：点击后触发重置筛选命令。
    - 高级筛选区：只在展开状态下展示。
- 测试：
    - 内置搜索输入输入 `abc` 后调用 `onSearchChange("abc")`。
    - 传入 `search` 插槽时渲染自定义搜索控件。
    - 传入 `filters` 时常驻筛选控件可见。
    - `expanded=true` 时高级筛选区可见，`expanded=false` 时不可见。
    - 点击展开按钮调用 `onExpandedChange(true)` 或 `onExpandedChange(false)`。
    - 点击 Apply、Reset 分别调用 `onApply`、`onReset`，且不隐式清空输入。
    - `applyDisabled`、`resetDisabled` 时对应按钮不可点击。

### Task 4：DataTable 复用与导出闭环，5 个文件

- 文件：
    - `src/patterns/data-table.tsx`
    - `src/patterns/data-table.test.tsx`
    - `src/patterns/index.ts`
    - `src/index.ts`
    - `src/index.test.ts`
- 实现：
    - `DataTable.FilterBar` 改为包装独立 `FilterBar.Root`。
    - `DataTable.FilterBar` 保留 `data-scone-data-table-part="filter-bar"`。
    - `DataTable.FilterBar` 继续支持 children-only：
        - `<DataTable.FilterBar><input aria-label="Query" /></DataTable.FilterBar>`
    - `DataTable.FilterBar` 支持独立 `FilterBar.Root` 的字段：
        - `searchValue`
        - `onSearchChange`
        - `filters`
        - `expandedContent`
        - `expanded`
        - `defaultExpanded`
        - `onExpandedChange`
        - `onApply`
        - `onReset`
        - `applyLabel`
        - `resetLabel`
        - `expandLabel`
        - `collapseLabel`
        - `applyDisabled`
        - `resetDisabled`
    - `src/patterns/index.ts` 导出 `Page`、`Section`、`FilterBar`、`DataTable` 和所有 pattern props 类型。
    - `src/index.ts` 从 `./patterns` 继续导出 pattern 和类型。
- 前端控件和操作：
    - DataTable 顶部筛选栏可直接展示搜索输入、常驻筛选控件、高级筛选区、Apply、Reset。
    - 表格筛选栏操作只发出命令，不触发表格数据请求或分页重置。
    - 既有 DataTable 自定义筛选内容不改变视觉层级和插槽边界。
- 测试：
    - `DataTable.FilterBar` 同时具备 `data-scone-data-table-part="filter-bar"` 与 `data-scone-pattern="filter-bar"`。
    - children-only 用法仍能找到自定义 `Query` 输入。
    - `DataTable.FilterBar` 传入 `searchValue`、`onSearchChange`、`onApply`、`onReset` 后行为与独立 `FilterBar.Root` 一致。
    - 根导出测试覆盖 `Page`、`Section`、`FilterBar` 和新增类型导出路径。

## Verification

- 运行 `pnpm test -- src/patterns/page.test.tsx src/patterns/section.test.tsx src/patterns/filter-bar.test.tsx src/patterns/data-table.test.tsx`。
- 运行 `pnpm test -- src/index.test.ts`，确认根导出不回退。
- 如新增或调整类型导出触发构建约束，运行仓库现有最小类型检查或构建命令。
- 检查 `src/patterns/*.tsx` 中新增 pattern 均使用组件库通用边界，不包含产品业务字段。

## Closure

实现、测试和审核完成后删除本 RUNBOOK。若执行过程中形成长期规则，只迁移到 `docs/00-governance/`；若形成可复用验证证据，只迁移到 `docs/40-readiness/`。
