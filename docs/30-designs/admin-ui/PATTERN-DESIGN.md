# Admin UI Pattern Design

## Admin Pattern Designs

依据文件：

- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`
- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/PAGE.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/10-specs/patterns/DATA-TABLE.md`
- `docs/10-specs/patterns/FORM-PAGE.md`
- `docs/10-specs/patterns/DETAIL-PAGE.md`
- `docs/10-specs/patterns/SETTINGS-PAGE.md`
- `docs/10-specs/patterns/MASTER-DETAIL.md`

Pattern 总规则：

- Pattern 只表达高频 Admin 结构、slot、状态归属和组合边界。
- Pattern 不定义万能配置对象，不内置请求、权限、路由、业务字段或产品文案。
- Pattern parts 从 `src/patterns/index.ts` 和 `src/index.ts` 导出；内部 helper 不导出。
- Page 和 Section Pattern 固定使用 `Page`、`Section` 命名空间导出，不使用 `SconePage`、`SconeSection` 命名。

| Pattern | 目标文件 | Compound parts | 状态归属 | 验证点 |
| --- | --- | --- | --- | --- |
| AppShell | `src/patterns/app-shell.tsx` | `AppShell.Root/Sidebar/Header/Main/Aside` | Sidebar collapsed、Aside open 只管理展示状态 | 全局空间、Main 收缩、唯一 Page 入口 |
| Page | `src/patterns/page.tsx` | `Page.Root/Header/Content/StickyActions` | Page density/maxWidth/sticky padding；不拥有数据 | 主滚动唯一、actions 分层、StickyActions 不遮挡 |
| Section | `src/patterns/section.tsx` | `Section.Root/Header/Content/Footer` | Section density；不拥有数据 | 语义 section、Header actions 分区级、非视觉 Card |
| FilterBar | `src/patterns/filter-bar.tsx` | `FilterBar.Root/Search/Fields/Actions/Summary` 或等价 parts | searchValue、filters、expanded 由调用方或 Pattern bridge 管理 | onApply/onReset、窄屏换行、展开区 |
| DataTable | `src/patterns/data-table.tsx` | `DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` | sorting/filtering/pagination/selection/columnVisibility 由调用方拥有；DataTable 只留出 adapter/interface 边界 | TableRegion、loading/error/empty、pagination 唯一入口 |
| FormPage | `src/patterns/form-page.tsx` | 推荐组合，不强制单组件 API | 表单状态库由 adapter 或调用方拥有 | 长表单页面滚动、FormActions sticky |
| DetailPage | `src/patterns/detail-page.tsx` | 推荐组合，不强制单组件 API | 详情数据由调用方拥有 | Descriptions/List/Card 组合，不用 disabled input |
| SettingsPage | `src/patterns/settings-page.tsx` | 推荐组合，不强制单组件 API | 设置项状态由调用方拥有 | Section/Card 分组、危险区 Alert/Confirm |
| MasterDetail | `src/patterns/master-detail.tsx` | 推荐组合，不强制单组件 API | selected item 由调用方拥有 | SplitPane、窄屏单列降级 |

### AppShell

`AppShell.Root/Sidebar/Header/Main/Aside` 定义后台应用全局空间。`Sidebar` 管理 collapsed 展示状态，`Aside` 管理 open 展示状态；菜单数据、路由、权限和产品 logo 均由产品侧提供。

设计边界：

- `AppShell.Main` 内只承载一个 `Page.Root`。
- AppShell 不拥有页面滚动；滚动从 `AppShell.Main` 进入 `Page.Content`。
- `AppShell.Main` 必须允许内部滚动区域收缩，默认等价于 `min-height: 0` / `min-width: 0`。

### Page

`Page.Root/Header/Content/StickyActions` 是页面主结构。`Page.Content` 是页面唯一主滚动容器，`Page.Header.actions` 只放页面级动作，Table 批量操作不放这里。

设计边界：

- `Page.Root.maxWidth` 使用 preset：`narrow`、`content`、`wide`、`full`。
- `Page.StickyActions` 必须给 `Page.Content` 留出底部 padding。
- Page 不内置数据请求、权限判断或路由。

### Section

`Section.Root/Header/Content/Footer` 是页面结构分段，不是 Card 变体。Section 不增加边框、阴影或背景层级；需要视觉容器时使用 `SconeCard`。

设计边界：

- Header actions 是分区级动作，不是页面级动作。
- Section 不建立新的主滚动。
- `SconeFormSection` 是表单语境下的 Section helper/shorthand。

### FilterBar

FilterBar 是列表页筛选 Pattern，可作为 DataTable part 导出，也可单独组合。它只提交筛选意图，不直接修改 Table 内部状态。

状态和事件：

- `searchValue/defaultSearchValue/onSearchChange`
- `filters/defaultFilters/onFiltersChange`
- `onApply({ searchValue, filters })`
- `onReset()`
- `expanded/defaultExpanded/onExpandedChange`

设计边界：

- 简单筛选横向排布，窄屏允许换行。
- 超过 3-5 个筛选项时使用展开区或 Drawer recipe。
- 筛选表单不使用完整编辑表单的提交区样式。

### DataTable

DataTable 是数据管理 Pattern，由 `SconeTable`、`SconeToolbar`、FilterBar、Pagination 和批量操作组合。它不是完整 Ant Design Table，也不是一个接收所有状态和请求配置的万能对象。

固定 anatomy：

1. `DataTable.Root`
2. `DataTable.FilterBar`
3. `DataTable.Toolbar`
4. `DataTable.BulkActions`
5. `DataTable.TableRegion`
6. `DataTable.Pagination`

与基础组件的关系：

- `SconeTable` 只消费当前 `columns`、`dataSource`、`rowKey`、`density`、`scroll.x`、`onRow` 和 cell render。
- `SconePagination` 只在 `DataTable.Pagination` 中渲染，不作为 `SconeTable` prop。
- `FilterBar` 只提交筛选意图，不直接修改 Table 内部状态。
- `SconeToolbar` 只提供 `start/end/actions` 布局，不拥有 selected count 或权限状态。

状态归属：

- sorting、filtering、pagination、selection、column visibility 由调用方拥有。
- DataTable 不引入 TanStack Table 作为推荐 recipe 基座；只为外部表格状态库留出 adapter/interface 边界。
- `DataTable.TableRegion` 负责 loading、empty、error 容器、横向滚动边界和 selection column 注入。
- `selectedCount` 从 `selection.selectedRowKeys.length` 派生，不在 Toolbar 内单独维护。
- `BulkActions` 接收当前 selected keys/rows，不读取业务 store。
- `Pagination` 触发 `onChange(nextState, reason)` 后，由调用方更新查询状态和数据。

TableRegion 规则：

- loading/empty/error 状态优先级为 `loading > error > empty`。
- 横向滚动由 Region viewport 承载，`SconeTable.scroll.x` 只声明表格最小宽度或允许横向 overflow。
- 垂直滚动必须有 `heightPreset` 或父容器高度约束；禁止由 Table 自行接管 `overflow-y`。
- sticky header 只在 TableRegion viewport 内固定，不支持 fixed column。

非目标：

- 不内置请求状态机、权限判断或 URL 同步。
- 不提供完整 AntD Table `onChange` 聚合语义。
- 不支持虚拟滚动、可编辑单元格、复杂树表格、拖拽列宽、列顺序、fixed column 或完整 DataGrid 键盘模型。

### FormPage

FormPage 是 Page + `SconeForm` + `FormSection` + `FormActions` 的页面级组合。

设计边界：

- 编辑页和创建页使用页面滚动，长表单不放 Dialog。
- `FormActions` 可 sticky，但必须避免遮挡最后一个字段。
- 表单状态库通过 adapter 或调用方连接，不写入基础 Form。

### DetailPage

DetailPage 使用 Page + Section + Descriptions/List/Card 组合。

设计边界：

- 键值详情优先用 `SconeDescriptions`。
- 只读字段不要伪装成 disabled input，除非需要保持表单布局。
- 状态标签用 Tag，计数用 Badge，重要异常用 Alert。

### SettingsPage

SettingsPage 由多个 Section 或 Card 组成。

设计边界：

- 单项即时设置可用 Field + Switch/Select。
- 多字段设置使用 FormSection + FormActions。
- 危险区使用 Alert 或 Confirm recipe，不依赖红色 Card 标题表达风险。

### MasterDetail

MasterDetail 使用 SplitPane 或响应式 Page 组合。

设计边界：

- 左侧 master 承载列表、树或搜索结果。
- 右侧 detail 承载详情、编辑或预览。
- 窄屏优先切换为列表 -> 详情的单列导航，不强行保持双栏。
