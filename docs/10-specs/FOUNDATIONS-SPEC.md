# Foundations Spec

## Purpose

本文档是 `admin-ui` 跨组件规则的权威来源。组件 SPEC 不重复维护这些规则，只说明是否支持、是否偏离，以及复合组件中的状态传播方式。

## API Vocabulary

| 术语          | 含义                           | 使用规则                                                                             |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| `variant`     | 同一组件族内的视觉结构或层级。 | 词表由组件族限定，不承载状态、尺寸和业务类型。                                       |
| `tone`        | 语义色。                       | `default`、`neutral`、`info`、`success`、`warning`、`danger`。不得只靠颜色传递信息。 |
| `status`      | 流程状态。                     | 用于 `Progress`、异步任务或步骤，例如 `idle`、`active`、`success`、`error`。         |
| `intent`      | 操作意图。                     | 仅在 Pattern 或 action 描述中使用，组件 API 优先使用 `tone` 或 `destructive`。       |
| `destructive` | 危险动作语义。                 | 用于删除、撤销、不可逆提交等动作；不自动触发确认流程。                               |
| `size`        | 控件尺寸。                     | 只用于按钮、输入、选择等控件高度。                                                   |
| `density`     | 信息密度。                     | 用于表格、列表、详情和布局区域。                                                     |
| `orientation` | 排列方向。                     | `horizontal` 或 `vertical`。                                                         |
| `align`       | 交叉轴或内容对齐。             | 只表达布局对齐，不表达业务优先级。                                                   |
| `side`        | 浮层或侧边位置。               | `top`、`right`、`bottom`、`left`。                                                   |
| `disabled`    | 不可交互且通常不参与提交。     | 禁止点击、输入和聚焦，保留可读文本。                                                 |
| `readOnly`    | 可读可聚焦但不可编辑。         | 适用于表单和可复制内容，不用于按钮。                                                 |
| `loading`     | 操作或区域正在等待结果。       | 必须保留布局尺寸；交互是否禁用由组件 SPEC 明确。                                     |
| `invalid`     | 当前输入或区域存在校验错误。   | 必须与错误文案关联。                                                                 |
| `required`    | 必填语义。                     | 视觉标记不能替代 HTML/ARIA 关联。                                                    |
| `selected`    | 当前项被选中。                 | 用于列表、表格、树、菜单和 tabs。                                                    |
| `expanded`    | 当前项展开。                   | 用于树、折叠区域、菜单分组和可展开行。                                               |
| `compact`     | 更紧凑组合方式。               | 优先作为布局或 density 规则，不新增大量 boolean。                                    |

## Theme Contract

Theme 是 `admin-ui` 的视觉实现合约，负责把语义 token 映射为 CSS variables、Tailwind theme 和组件 class。组件 SPEC 只引用 theme 语义，不在组件文档中散落 px/rem、hex、阴影或字体数值。

Theme 必须提供以下 token 族：

| Token 族   | 用途                                         | 最小要求                                                                                                                   |
| ---------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Color      | 背景、前景、边框、焦点、状态和语义色。       | 提供 `background`、`foreground`、`muted`、`border`、`ring`、`primary`、`neutral`、`info`、`success`、`warning`、`danger`。 |
| Spacing    | 组件内部间距、组件间距和页面分段。           | 使用 Foundation spacing 词表：`2xs`、`xs`、`sm`、`md`、`lg`、`xl`。                                                        |
| Radius     | 控件、卡片、浮层和可交互元素圆角。           | 至少提供 `sm`、`md`、`lg`、`full`；组件不得内联任意圆角。                                                                  |
| Shadow     | 浮层、弹窗、抽屉和悬浮菜单层级。             | 至少提供 `sm`、`md`、`lg`；状态变化不得依赖阴影作为唯一反馈。                                                              |
| Typography | 字号、行高、字重和等宽字体。                 | 至少提供 `body`、`label`、`title`、`mono` 的语义层级。                                                                     |
| Focus      | 键盘焦点可见样式。                           | 必须映射到 `ring` 或等价 CSS variable，所有可交互组件共享。                                                                |
| Motion     | 浮层、折叠、加载和状态切换动画。             | 至少定义 duration 和 easing；不得阻断 reduced motion。                                                                     |
| Z-index    | 浮层、弹窗、抽屉、toast 和 sticky 区域层级。 | 必须由 theme 或 overlay policy 管理，不允许组件私自递增数字。                                                              |
| Control    | 控件高度、图标尺寸、点击热区和数据行高度。   | 至少定义本文件 Size And Density 中列出的 token key。                                                                       |

命名规则：

- CSS variables 使用 `--scone-*` 前缀，例如 `--scone-color-background`、`--scone-spacing-md`、`--scone-radius-sm`。
- Tailwind theme 扩展必须映射到同一批 CSS variables，不维护第二套数值。
- 组件 class 只能消费语义 token，例如 `bg-background`、`text-foreground`、`border-border`、`ring-ring`。
- `tone` 到颜色的映射由 theme 决定，组件只传递 `tone` 语义。

禁止事项：

- 组件 SPEC 不写固定 hex、rgb、px、rem、box-shadow 或 z-index 数值。
- 组件实现不直接使用产品品牌色、业务状态色或后端状态名。
- 不为单个组件创建私有 token，除非该 token 被提升到本节并说明适用范围。
- 不在 `className` 默认值中写不可替换的任意值，例如 `h-[37px]`、`shadow-[...]`、`z-[9999]`。

### Theme Source Files

| 文件                   | 职责                                               |
| ---------------------- | -------------------------------------------------- |
| `src/styles/theme.css` | CSS variables 唯一数值源。                         |
| `tailwind.config.*`    | 只映射 `src/styles/theme.css` 中的 CSS variables。 |
| `src/styles.css`       | 引入 theme、Tailwind layers 和全局基础样式。       |

不得创建第二套 `tokens.ts` 数值源。若实现需要 TypeScript token 名称，只能导出 token key，不导出数值。

### Minimum Token Keys

| 族         | 最小 key                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color      | `background`、`foreground`、`muted`、`muted-foreground`、`border`、`ring`、`primary`、`primary-foreground`、`neutral`、`info`、`success`、`warning`、`danger` |
| Spacing    | `2xs`、`xs`、`sm`、`md`、`lg`、`xl`                                                                                                                           |
| Radius     | `sm`、`md`、`lg`、`full`                                                                                                                                      |
| Shadow     | `sm`、`md`、`lg`                                                                                                                                              |
| Typography | `body`、`label`、`title`、`mono`                                                                                                                              |
| Focus      | `ring`、`ring-offset`                                                                                                                                         |
| Motion     | `duration-fast`、`duration-default`、`easing-standard`                                                                                                        |
| Z-index    | `sticky`、`dropdown`、`popover`、`drawer`、`modal`、`toast`                                                                                                   |
| Control    | `control-height-sm/md/lg`、`icon-size-sm/md/lg`、`hit-area-min`、`table-row-height-*`、`list-row-height-*`、`toolbar-height-*`                                |

当前主题实现范围包含 light theme。Dark mode 不作为当前主题目标；若后续纳入，必须先补 contrast、surface、overlay 和 chart/token 映射。

## Spacing

间距使用 token，不允许任意 number 作为默认公共 API。

| Token | 用途                         |
| ----- | ---------------------------- |
| `2xs` | 图标和短文本内部间距。       |
| `xs`  | 紧凑行内元素和表格行操作。   |
| `sm`  | 表单字段内部组合、按钮组。   |
| `md`  | 常规字段、卡片内容、列表项。 |
| `lg`  | 页面 section 之间。          |
| `xl`  | PageContent 大块区域之间。   |

需要任意数值时只能通过 `style` 或 `className` 局部覆盖，不进入组件核心 props。

## Size And Density

`size` 表达单个可交互控件高度；`density` 表达信息区域的行高、内边距和扫描节奏。二者可以组合，但不得互相替代。

### Control Size Contract

| size | 控件高度 token      | 图标 token     | 默认用途                         |
| ---- | ------------------- | -------------- | -------------------------------- |
| `sm` | `control-height-sm` | `icon-size-sm` | 表格行内操作、紧凑筛选、短按钮。 |
| `md` | `control-height-md` | `icon-size-md` | 默认后台表单、工具栏和常规按钮。 |
| `lg` | `control-height-lg` | `icon-size-lg` | 低频强调操作或宽松表单。         |

**Rules:**

- Button、Input、SearchInput、PasswordInput、Select、Segmented、Checkbox、Switch、Radio、NumberInput、DatePicker 等控件必须从 control height token 推导高度。
- 图标按钮的可见图标使用 icon token；可点击区域不得小于 `hit-area-min`。
- `size="lg"` 不作为列表页、表格工具栏或高密度筛选默认值。
- TextArea 的 `size` 不控制整体高度；多行高度由 `rows`、`autoSize` 和 typography line-height 决定。

### Density Contract

| density       | 表格行高 token                 | 列表行高 token                | 工具栏高度 token             | 默认用途               |
| ------------- | ------------------------------ | ----------------------------- | ---------------------------- | ---------------------- |
| `compact`     | `table-row-height-compact`     | `list-row-height-compact`     | `toolbar-height-compact`     | 高频扫描和数据管理。   |
| `default`     | `table-row-height-default`     | `list-row-height-default`     | `toolbar-height-default`     | 常规后台页面。         |
| `comfortable` | `table-row-height-comfortable` | `list-row-height-comfortable` | `toolbar-height-comfortable` | 详情、设置和低频阅读。 |

**Rules:**

- Table、List、Descriptions、Toolbar 和 DataTable 区域必须引用 density token，不在组件内自行猜测行高或 padding。
- 同一区域内 `density` 应保持一致；表格内行操作按钮可使用 `size="sm"`，但表格行高仍由 `density` 决定。
- Toolbar `density="compact"` 默认搭配 `size="sm"` 控件；`density="default"` 默认搭配 `size="md"` 控件。
- `comfortable` 只用于阅读性优先的详情或设置区域，不用于大批量数据表。
- `size` 不表示 Drawer 宽度、Card 体量或页面宽度；这些场景使用 `widthPreset`、布局 token 或 Pattern 规则。

### Layout Size Contract

布局尺寸使用 preset 和 CSS 长度边界，不把无单位 `number` 作为公共 API。组件可以通过 `className` 做局部覆盖，但 SPEC 和默认实现必须先提供稳定 preset。

| 语义             | token / preset                                        | 使用对象                         |
| ---------------- | ----------------------------------------------------- | -------------------------------- |
| page width       | `page-width-narrow/content/wide/full`                 | `Page.Root`。                    |
| drawer width     | `drawer-width-sm/md/lg/full`                          | `SconeDrawer`。                  |
| split pane size  | `split-pane-size-narrow/medium/wide/fill`             | `SconeSplitPane`。               |
| table region     | `table-region-height-sm/md/lg/full`                   | `DataTable.TableRegion`。        |
| scroll viewport  | `scroll-viewport-height-sm/md/lg`                     | `SconeScrollArea` 局部滚动区域。 |
| sticky offset    | `sticky-offset-header/footer`                         | Page、DataTable 和 FormActions。 |
| responsive width | `ResponsiveValue<widthPreset>` 或 Tailwind class 覆盖 | Page、Drawer、SplitPane。        |

**Rules:**

- `widthPreset`、`heightPreset`、`minSizePreset` 和 `maxSizePreset` 是布局组件的主 API；任意 CSS 长度只能作为显式覆盖字段或 `className`。
- 覆盖字段必须带单位或百分比，例如 `320px`、`40rem`、`50%`；禁止无单位 `number`。
- 主滚动容器只能有一个。页面使用 `Page.Content`，局部区域使用 `SconeScrollArea` 或 Pattern 定义的 viewport slot。
- sticky header/footer 必须绑定到同一个 scroll viewport，并由对应 Pattern 负责留出 padding 或 offset。
- Table、Drawer、Page 和 SplitPane 不各自发明高度语义；需要新增 preset 时先更新本节。

### Loading Categories

| 类别     | 使用对象                     | 行为                                                |
| -------- | ---------------------------- | --------------------------------------------------- |
| `action` | Button、单个提交动作。       | 保持原尺寸，默认禁用重复触发。                      |
| `region` | Drawer、Card、Section 区域。 | 设置 `aria-busy`，保留内容容器尺寸。                |
| `data`   | Table、List、DataTable。     | `loading > error > empty`；由数据区域决定状态容器。 |

## Icon Policy

`admin-ui` 不提供独立 `SconeIcon` 组件。图标是内容和状态的辅助表达，默认由调用方传入，组件只规定尺寸、语义和可访问边界。

| 场景                 | 规则                                                                |
| -------------------- | ------------------------------------------------------------------- |
| 图标按钮             | 必须提供可见文本或 `ariaLabel`；可点击区域不得小于 `hit-area-min`。 |
| 按钮前后图标         | 图标尺寸跟随 `size` 对应的 `icon-size-*` token。                    |
| Alert/Empty 状态图标 | 图标只能辅助 `tone` 和文本，不得作为唯一状态信息。                  |
| Badge dot            | 必须有相邻文本、`ariaLabel` 或被标记对象的可读状态说明。            |
| 导航和菜单图标       | 图标不替代 `label`；折叠导航仍需保留可访问名称。                    |
| 装饰性图标           | 必须对辅助技术隐藏，避免重复朗读。                                  |

推荐实现策略：

- 默认使用项目约定的 SVG icon library 或传入 `ReactNode`，不把图标库写死为组件 API。
- 组件内部需要固定图标时，只能用于通用状态，例如 loading spinner、clear、close、expand/collapse；图标尺寸仍引用 control token。
- 产品业务图标、品牌图形、资源类型图标和权限图标由产品侧组合，不进入 Foundation token 或通用组件。

## Shared Types

本节定义跨组件共享类型的语义字段。正式 TypeScript 类型可在实现阶段细化，但不得改变这里定义的字段职责和非目标。

### Breakpoint

断点词表沿用 Tailwind 默认断点命名，避免组件库产生第二套响应式语言。

| 名称   | 语义                     |
| ------ | ------------------------ |
| `base` | 默认值，适用于所有宽度。 |
| `sm`   | 小屏及以上。             |
| `md`   | 中屏及以上。             |
| `lg`   | 大屏及以上。             |
| `xl`   | 宽屏及以上。             |
| `2xl`  | 超宽屏及以上。           |

### `ResponsiveValue<T>`

`ResponsiveValue<T>` 使用对象形态，不使用数组形态。

```ts
type ResponsiveValue<T> =
    | T
    | {
          base?: T;
          sm?: T;
          md?: T;
          lg?: T;
          xl?: T;
          "2xl"?: T;
      };
```

**Rules:**

- `base` 是默认值；更大断点覆盖更小断点。
- 组件不得自行定义 `mobile`、`tablet`、`desktop` 等第二套断点。
- Descriptions `columns`、Toolbar wrap、Page `maxWidth`、Drawer `widthPreset` 等响应式 API 都引用该结构。

### `SconeOption<Value = string>`

用于 Select、Segmented、Combobox 和 RadioGroup 的基础选项。

| 字段          | 类型        | 说明           |
| ------------- | ----------- | -------------- |
| `value`       | `Value`     | 稳定值。       |
| `label`       | `ReactNode` | 用户可读标签。 |
| `disabled`    | `boolean`   | 是否禁用。     |
| `description` | `ReactNode` | 可选补充说明。 |

**Rules:**

- `value` 必须稳定，不使用整条业务对象作为默认值。
- Select 默认 `Value = string`；需要 number/enum 时通过泛型或调用方映射。
- 远程加载、分组和自定义渲染由 Combobox/Command recipe 扩展，不塞入基础 Option。

### `Key`

组件库内部稳定标识使用 `Key = string | number`。跨网络或 URL 状态时推荐调用方先规范为 string。

### `SconeTone`

组件语义色类型。

```ts
type SconeTone = "default" | "neutral" | "info" | "success" | "warning" | "danger";
```

**Rules:**

- `tone` 只表达语义色，不表达业务枚举、后端状态或流程阶段。
- `destructive` 动作可映射到 `danger` 视觉语义，但仍保留独立动作语义。

### `SconeSpacingToken`

组件间距 token 类型。

```ts
type SconeSpacingToken = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
```

### `SconeControlSize`

控件尺寸类型。

```ts
type SconeControlSize = "sm" | "md" | "lg";
```

### `SconeDensity`

信息密度类型。

```ts
type SconeDensity = "compact" | "default" | "comfortable";
```

### `SconeDescriptionItem`

用于 Descriptions 的键值展示项。

| 字段        | 类型        | 说明           |
| ----------- | ----------- | -------------- |
| `key`       | `Key`       | 稳定项 key。   |
| `label`     | `ReactNode` | 用户可读标签。 |
| `children`  | `ReactNode` | 展示值。       |
| `span`      | `number`    | 可选跨列数量。 |
| `className` | `string`    | 项级样式。     |

**Rules:**

- `label` 不直接使用后端字段名。
- 空值展示策略由调用方或 Descriptions recipe 处理，不在 item 内写业务 fallback。

### `SconePaginationState`

用于 Pagination、Table 和 DataTable Pattern 的分页桥接。

| 字段       | 类型     | 说明                |
| ---------- | -------- | ------------------- |
| `page`     | `number` | 当前页，从 1 开始。 |
| `pageSize` | `number` | 每页数量。          |
| `total`    | `number` | 总条数。            |

**Rules:**

- Pagination 组件只消费和发出分页状态，不发起请求。
- 受控事件统一为 `onChange(nextState, reason)`；`reason` 为 `page` 或 `pageSize`。
- `pageSize` 变化默认把 `page` 重置为 1，除非调用方在受控状态中显式覆盖。
- 服务端分页、游标分页和 URL 同步由调用方或 DataTable recipe 处理。
- 游标分页不复用该类型；需要时单独定义 CursorPagination recipe。

### `SconePaginationChangeReason`

分页变化原因。

| 值         | 含义           |
| ---------- | -------------- |
| `page`     | 页码变化。     |
| `pageSize` | 每页数量变化。 |

### `SconeTableSorting`

DataTable 排序状态桥接。

| 字段        | 类型              | 说明         |
| ----------- | ----------------- | ------------ |
| `columnKey` | `string`          | 排序列 key。 |
| `direction` | `"asc" \| "desc"` | 排序方向。   |

**Rules:**

- 排序状态只表达 UI 和查询意图，不在组件内发起请求。
- 多列排序可用数组顺序表达优先级；是否允许多列由 DataTable recipe 或调用方决定。

### `SconeTableColumn<T>`

基础表格列定义。

| 字段        | 类型                                     | 说明               |
| ----------- | ---------------------------------------- | ------------------ |
| `key`       | `string`                                 | 稳定列 key。       |
| `title`     | `ReactNode`                              | 用户可读列标题。   |
| `dataIndex` | `keyof T \| string`                      | 简单取值路径。     |
| `render`    | `(value, record: T, index) => ReactNode` | 自定义单元格渲染。 |
| `align`     | `"start" \| "center" \| "end"`           | 单元格对齐。       |
| `width`     | `number \| string`                       | 可选列宽。         |
| `ellipsis`  | `boolean`                                | 单行截断展示。     |
| `className` | `string`                                 | 列级样式。         |

**Rules:**

- 列定义只描述当前表格展示，不承载请求、权限、字典加载或业务动作执行。
- `width` 用于列展示宽度，可以是带单位 CSS 长度、百分比或数字像素值；表格整体横向滚动仍由 `SconeTableScroll` 和 `DataTable.TableRegion` 决定。
- `ellipsis` 只承诺单行文本截断，不自动提供 Tooltip；完整内容查看由 cell render、Popover recipe 或详情页组合。
- 排序、筛选、列显隐、固定列是 DataTable/TanStack recipe 扩展，不进入基础列必选语义。
- 操作列仍使用普通 column，但其 cell 内容必须有可访问名称。

### `SconeTableScroll`

基础表格横向滚动配置。

| 字段 | 类型                | 说明                             |
| ---- | ------------------- | -------------------------------- |
| `x`  | `boolean \| string` | 是否启用横向滚动或指定最小宽度。 |

**Rules:**

- 基础 Table scroll 只支持横向 overflow。
- 垂直滚动、高度和 sticky header 由 DataTable `TableRegion` 或 `SconeScrollArea` 统一管理，不写入基础 Table prop。
- sticky header 由 DataTable.TableRegion 管理；fixed column、virtual scroll、双向虚拟化不属于基础 Table scroll。
- 不沿用 AntD `{ x, y }` 的完整语义；垂直滚动扩展必须先补 TableRegion spec。

### `SconeRowSelection<T>`

DataTable selection UI 的状态桥接。

| 字段               | 类型                                                        | 说明             |
| ------------------ | ----------------------------------------------------------- | ---------------- |
| `selectedRowKeys`  | `Key[]`                                                     | 当前选中行 key。 |
| `onChange`         | `(keys: Key[], rows: T[]) => void`                          | 选中变化。       |
| `getCheckboxProps` | `(record: T) => { disabled?: boolean; ariaLabel?: string }` | 行选择控件属性。 |

**Rules:**

- RowSelection 不属于基础 `SconeTable` prop；由 DataTable `TableRegion` 或 SelectableTable recipe 注入选择列。
- RowSelection 只管理选择控件状态，不定义批量动作。
- selected count 和 bulk actions 属于 DataTable Pattern。
- 当前 RowSelection 默认多选；单选选择需要通过调用方约束 `selectedRowKeys` 长度或后续扩展独立 selection mode。

### `SconeBaseItem`

动作、导航、路径和命令项的共享最小字段。各组件必须扩展自己的 item 类型，不复用一个万能 schema。

| 字段       | 类型        | 说明             |
| ---------- | ----------- | ---------------- |
| `key`      | `string`    | 稳定项 key。     |
| `label`    | `ReactNode` | 可读文本或节点。 |
| `icon`     | `ReactNode` | 可选图标。       |
| `disabled` | `boolean`   | 是否禁用。       |

### `SconeActionItem`

用于 Dropdown、ActionMenu 和行操作菜单。

| 字段          | 类型                    | 说明           |
| ------------- | ----------------------- | -------------- |
| `key`         | `string`                | 稳定项 key。   |
| `label`       | `ReactNode`             | 动作文案。     |
| `icon`        | `ReactNode`             | 可选图标。     |
| `disabled`    | `boolean`               | 是否禁用。     |
| `destructive` | `boolean`               | 危险动作语义。 |
| `onSelect`    | `(key: string) => void` | 简单选择回调。 |

**Rules:**

- `destructive` 只表达语义，不自动打开确认。
- 权限过滤由调用方在传入 items 前完成。

### `SconeNavigationItem`

用于 Menu、Sidebar 和导航集合。

| 字段       | 类型                    | 说明         |
| ---------- | ----------------------- | ------------ |
| `key`      | `string`                | 稳定项 key。 |
| `label`    | `ReactNode`             | 导航文本。   |
| `icon`     | `ReactNode`             | 可选图标。   |
| `disabled` | `boolean`               | 是否禁用。   |
| `children` | `SconeNavigationItem[]` | 子导航。     |

**Rules:**

- 路由链接通过 compound children + `asChild` 或调用方 wrapper 组合，不把 router API 写入 item schema。
- `selectedKeys` 表达 UI 选中，不内置 URL 匹配。

### `SconeBreadcrumbItem`

用于 Breadcrumb 路径。

| 字段      | 类型        | 说明                     |
| --------- | ----------- | ------------------------ |
| `key`     | `string`    | 稳定项 key。             |
| `label`   | `ReactNode` | 路径文本。               |
| `href`    | `string`    | 可选普通链接。           |
| `asChild` | `boolean`   | 使用子元素承载路由链接。 |
| `current` | `boolean`   | 是否当前页。             |

**Rules:**

- 最后一项默认视为 current，并设置 `aria-current="page"`。
- Breadcrumb item 不支持 `destructive` 或动作回调。

### `SconeCommandItem`

用于 Command 搜索项。

| 字段       | 类型        | 说明             |
| ---------- | ----------- | ---------------- |
| `key`      | `string`    | 稳定项 key。     |
| `label`    | `ReactNode` | 命令或结果标题。 |
| `keywords` | `string[]`  | 搜索关键词。     |
| `group`    | `string`    | 可选分组。       |
| `icon`     | `ReactNode` | 可选图标。       |
| `disabled` | `boolean`   | 是否禁用。       |

**Rules:**

- Command item 表达可搜索命令或结果，不表达表单值；表单选择由 Combobox 增加语义。

### `SconeTreeNode`

用于 Tree 和层级选择能力。

| 字段       | 类型              | 说明           |
| ---------- | ----------------- | -------------- |
| `key`      | `Key`             | 稳定节点 key。 |
| `label`    | `ReactNode`       | 用户可读标签。 |
| `children` | `SconeTreeNode[]` | 子节点。       |
| `disabled` | `boolean`         | 是否禁用。     |
| `icon`     | `ReactNode`       | 可选图标。     |

**Rules:**

- `key` 必须稳定，不使用数组 index。
- 异步加载、虚拟滚动和拖拽需要单独扩展，不写入基础节点类型。

### `SconeAccordionItem`

用于 Accordion 简化配置。复杂内容优先使用 compound children。

| 字段          | 类型        | 说明           |
| ------------- | ----------- | -------------- |
| `value`       | `string`    | 稳定项 value。 |
| `title`       | `ReactNode` | 触发器内容。   |
| `children`    | `ReactNode` | 展开内容。     |
| `disabled`    | `boolean`   | 是否禁用。     |
| `description` | `ReactNode` | 可选补充说明。 |

### `SconeTimelineItem`

用于 Timeline 的通用事件项。

| 字段          | 类型        | 说明             |
| ------------- | ----------- | ---------------- |
| `key`         | `Key`       | 稳定项 key。     |
| `time`        | `ReactNode` | 时间或时间摘要。 |
| `title`       | `ReactNode` | 事件标题。       |
| `description` | `ReactNode` | 事件说明。       |
| `icon`        | `ReactNode` | 可选图标。       |
| `tone`        | SconeTone   | 语义色。         |

**Rules:**

- TimelineItem 只描述通用事件展示，不承载审批、权限或流程状态机。
- 时间格式由调用方处理，不在组件内解析后端时间。

### `OverlayCloseReason`

浮层用户请求关闭原因。

| 值             | 含义                                     |
| -------------- | ---------------------------------------- |
| `escape`       | 按 Escape 关闭。                         |
| `outside`      | 点击外部区域关闭。                       |
| `closeButton`  | 点击关闭按钮。                           |
| `footerAction` | 点击 footer 中取消、关闭等显式关闭动作。 |
| `programmatic` | 调用方关闭。                             |

### `ToastPosition`

Toast 展示位置。

| 值              | 含义     |
| --------------- | -------- |
| `top-right`     | 右上。   |
| `top-center`    | 顶部居中 |
| `bottom-right`  | 右下。   |
| `bottom-center` | 底部居中 |

### `SconeToastItem`

Toast 队列中的展示项。

| 字段          | 类型        | 说明            |
| ------------- | ----------- | --------------- |
| `id`          | `string`    | 稳定 toast id。 |
| `title`       | `ReactNode` | 标题。          |
| `description` | `ReactNode` | 说明。          |
| `tone`        | SconeTone   | 语义色。        |
| `action`      | `ReactNode` | 可选单个动作。  |

**Rules:**

- ToastItem 不承载业务来源、持久化或通知订阅状态。
- `id` 可由调用方提供；未提供时由 service 生成并返回。

### `NotificationPlacement`

Notification 展示位置。

| 值             | 含义   |
| -------------- | ------ |
| `top-right`    | 右上。 |
| `bottom-right` | 右下。 |

### `SconeNotificationItem`

Notification 队列中的展示项。

| 字段          | 类型        | 说明                   |
| ------------- | ----------- | ---------------------- |
| `id`          | `string`    | 稳定 notification id。 |
| `title`       | `ReactNode` | 标题。                 |
| `description` | `ReactNode` | 说明。                 |
| `tone`        | SconeTone   | 语义色。               |
| `time`        | `ReactNode` | 时间或状态摘要。       |
| `action`      | `ReactNode` | 可选单个动作。         |
| `persistent`  | `boolean`   | 是否持久展示。         |

**Rules:**

- NotificationItem 只描述 UI 队列项；已读、订阅来源和持久化由产品侧处理。

## State Semantics

| 状态          | 视觉要求                        | 行为要求                                                           |
| ------------- | ------------------------------- | ------------------------------------------------------------------ |
| Focus visible | 键盘聚焦必须可见。              | 不移除浏览器或 Radix 可访问焦点行为。                              |
| Disabled      | 降低强调但保持可读。            | 不触发交互，不作为唯一权限表达。                                   |
| Readonly      | 与 disabled 视觉可区分。        | 可聚焦、可复制，不可修改。                                         |
| Loading       | 保留原尺寸，避免布局跳动。      | 操作级 loading 默认禁用重复提交；区域级 loading 设置 `aria-busy`。 |
| Invalid       | 与错误文案、输入和 label 关联。 | 使用 `aria-invalid` 和 `aria-describedby`。                        |
| Empty         | 说明当前没有什么。              | 可恢复时提供 `action`。                                            |
| Error         | 展示可读原因和恢复入口。        | 数据型组件中优先级高于 empty。                                     |
| Selected      | 与 hover/focus 区分。           | 必须能通过键盘或状态属性识别。                                     |
| Expanded      | 有明确展开指示。                | 使用 `aria-expanded` 或底层 Radix 状态。                           |

## Responsive Rules

- Admin UI 最小支持内容宽度为 `360px`。低于该宽度不保证完整数据表格体验。
- 页面主滚动由 `PageContent` 承担；局部滚动使用 `SconeScrollArea`。`scroll container` 只是普通概念，不是独立 Pattern 名称。
- 侧边栏在窄屏折叠为 drawer 或 icon rail；产品侧决定导航内容，组件库只定义布局行为。
- 表格窄屏优先横向滚动或列裁剪 recipe，不默认改造成卡片列表。
- 工具栏在窄屏允许换行；主操作优先保留可见，次要操作进入菜单。
- Drawer 在窄屏可提升为 `full` 宽度；Dialog 不承载长表单。

## Accessibility

- 基于 Radix 的组件必须保留原有键盘、焦点、ARIA 和关闭行为。
- 图标按钮、无可见 label 的输入、表格、Tabs、Segmented、Tree、Menu、Dialog 和 Drawer 必须有稳定可访问名称。
- 复合字段必须把 label、description、message 与 control 关联。
- Tooltip 不能承载必读信息；阻断性错误使用 Alert 或字段错误。
- 颜色状态必须配合文本、图标或结构，不得只依赖色彩。

## Content Rules

- 文案使用业务中性表达，不把产品名、接口名或后端字段名直接写入组件 SPEC。
- label 使用面向用户的短文本；description 解释约束或影响；message 表达校验或错误。
- 操作文案应说明动作本身，危险操作必须说明影响，确认流程由 Confirm 或 Pattern 组合。
