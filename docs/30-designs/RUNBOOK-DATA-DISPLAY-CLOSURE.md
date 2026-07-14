# Data Display Closure Runbook

## Purpose

完成 `src/components/data-display/*` 的 Data Display 组件闭环，实现并验证以下公共组件和公共类型：

- `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`，其中 `SconeText`、`SconeTitle`、`SconeParagraph` 必须满足单组件 SPEC 字段，`SconeTypography` 作为 Export Surface 要求的排版基座导出
- `SconeCard`
- `SconeTable`
- `SconeDescriptions`
- `SconeList`
- `SconeTag`
- `SconeBadge`
- `SconeStatistic`
- `SconeTimeline`

本闭环以现有 Foundation types、工具函数、主题 token、`src/components/ui/table.tsx` 和 `src/components/ui/card.tsx` 为基础，不等待 Form、Pattern、Navigation 或 Feedback 组件族落地。所有组件必须是 admin-ui 组件库 primitive，不引入产品应用行为。

## Scope

本次闭环纳入：

- 创建 `src/components/data-display/` 组件目录和 `index.ts` 导出入口。
- 实现目标文件：
  - `src/components/data-display/typography.tsx`
  - `src/components/data-display/card.tsx`
  - `src/components/data-display/table.tsx`
  - `src/components/data-display/descriptions.tsx`
  - `src/components/data-display/list.tsx`
  - `src/components/data-display/tag.tsx`
  - `src/components/data-display/badge.tsx`
  - `src/components/data-display/statistic.tsx`
  - `src/components/data-display/timeline.tsx`
- 从 `src/components/data-display/index.ts` 汇总导出 Data Display 公共组件和公共类型。
- 从 `src/index.ts` 汇总导出 Data Display 公共 API。
- 为每个组件新增同目录 `*.test.tsx`，覆盖公共行为、类型边界和可访问性要求。
- 必要时仅调整 `src/components/ui/card.tsx`、`src/components/ui/table.tsx` 的复用方式，不改变其作为 shadcn 基座的职责。

本次字段级数据结构和 props 变更必须精确落在以下文件：

- `src/components/data-display/typography.tsx`
  - `SconeTypographyProps`
    - `as?: keyof JSX.IntrinsicElements`
    - `size?: "sm" | "md" | "lg"`
    - `weight?: "regular" | "medium" | "semibold"`
    - `tone?: "default" | "muted" | "danger" | "success" | "warning"`
    - `truncate?: boolean | number`
    - `children?: React.ReactNode`
    - `className?: string`
  - `SconeTextProps`、`SconeTitleProps`、`SconeParagraphProps` 必须复用或收窄 `SconeTypographyProps`，不得新增业务字段。
- `src/components/data-display/card.tsx`
  - `SconeCardProps`
    - `title?: React.ReactNode`
    - `description?: React.ReactNode`
    - `actions?: React.ReactNode`
    - `footer?: React.ReactNode`
    - `loading?: boolean`
    - `variant?: "plain" | "outlined" | "elevated"`
    - `children?: React.ReactNode`
    - `className?: string`
- `src/components/data-display/table.tsx`
  - `SconeTableColumn<T>`
    - `key: Key`
    - `title: React.ReactNode`
    - `dataIndex?: keyof T | readonly (string | number)[]`
    - `width?: number | string`
    - `minWidth?: number`
    - `align?: SconeAlign`
    - `sortable?: boolean`
    - `render?: (value: unknown, record: T, index: number) => React.ReactNode`
    - `className?: string`
    - `headerClassName?: string`
  - `SconeTableScroll`
    - `x?: number | string | true`
  - `SconeTableProps<T>`
    - `ariaLabel?: string`
    - `columns: SconeTableColumn<T>[]`
    - `dataSource: T[]`
    - `rowKey: string | ((record: T) => Key)`
    - `renderEmpty?: React.ReactNode | (() => React.ReactNode)`
    - `renderError?: React.ReactNode | (() => React.ReactNode)`
    - `loading?: boolean`
    - `density?: SconeDensity`
    - `scroll?: SconeTableScroll`
    - `onRow?: (record: T) => React.HTMLAttributes<HTMLTableRowElement>`
    - `onCell?: (record: T, column: SconeTableColumn<T>) => React.HTMLAttributes<HTMLTableCellElement>`
    - `className?: string`
- `src/components/data-display/descriptions.tsx`
  - `SconeDescriptionItem`
    - `key: Key`
    - `label: React.ReactNode`
    - `value: React.ReactNode`
    - `span?: 1 | 2 | 3 | 4`
    - `emptyFallback?: React.ReactNode`
  - `SconeDescriptionsProps`
    - `title?: React.ReactNode`
    - `items: SconeDescriptionItem[]`
    - `columns?: number | ResponsiveValue<number>`
    - `bordered?: boolean`
    - `density?: SconeDensity`
    - `className?: string`
- `src/components/data-display/list.tsx`
  - `SconeListProps<T>`
    - `dataSource: T[]`
    - `renderItem: (item: T) => React.ReactNode`
    - `rowKey: string | ((item: T) => Key)`
    - `loading?: boolean`
    - `renderEmpty?: React.ReactNode | (() => React.ReactNode)`
    - `renderError?: React.ReactNode | (() => React.ReactNode)`
    - `density?: SconeDensity`
    - `bordered?: boolean`
    - `className?: string`
- `src/components/data-display/tag.tsx`
  - `SconeTagProps`
    - `tone?: SconeTone`
    - `closable?: boolean`
    - `onClose?: () => void`
    - `children?: React.ReactNode`
    - `className?: string`
- `src/components/data-display/badge.tsx`
  - `SconeBadgeProps`
    - `count?: number | string`
    - `dot?: boolean`
    - `tone?: SconeTone`
    - `overflow?: number`
    - `ariaLabel?: string`
    - `children?: React.ReactNode`
    - `className?: string`
- `src/components/data-display/statistic.tsx`
  - `SconeStatisticProps`
    - `title?: React.ReactNode`
    - `value: React.ReactNode`
    - `prefix?: React.ReactNode`
    - `suffix?: React.ReactNode`
    - `description?: React.ReactNode`
    - `tone?: SconeTone`
    - `className?: string`
- `src/components/data-display/timeline.tsx`
  - `SconeTimelineItem`
    - `key: Key`
    - `title: React.ReactNode`
    - `description?: React.ReactNode`
    - `time?: React.ReactNode`
    - `tone?: SconeTone`
    - `icon?: React.ReactNode`
  - `SconeTimelineProps`
    - `items: SconeTimelineItem[]`
    - `pending?: React.ReactNode`
    - `reverse?: boolean`
    - `onItemClick?: (item: SconeTimelineItem) => void`
    - `className?: string`

依据文档：

- `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`
- `docs/10-specs/components/data-display/SCONE-TYPOGRAPHY.md`
- `docs/10-specs/components/data-display/SCONE-CARD.md`
- `docs/10-specs/components/data-display/SCONE-TABLE.md`
- `docs/10-specs/components/data-display/SCONE-DESCRIPTIONS.md`
- `docs/10-specs/components/data-display/SCONE-LIST.md`
- `docs/10-specs/components/data-display/SCONE-TAG.md`
- `docs/10-specs/components/data-display/SCONE-BADGE.md`
- `docs/10-specs/components/data-display/SCONE-STATISTIC.md`
- `docs/10-specs/components/data-display/SCONE-TIMELINE.md`
- `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`
- `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md`
- `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`
- `docs/30-designs/admin-ui/FILE-PLACEMENT-DESIGN.md`

## Non-goals

- 不实现 Form、Layout、Navigation、Media、Feedback、Overlay 或 Pattern 组件族。
- 不实现 `DataTable` Pattern、筛选、分页控件、selection checkbox column、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。
- 不新增业务数据模型、请求协议、权限判断、路由约定、业务状态机或产品文案。
- 不把 Tag 或 Badge 绑定到业务枚举；业务枚举到 `SconeTone` 的映射由调用方处理。
- 不用 disabled input 表达只读详情；只读详情由 `SconeDescriptions` 等展示组件承担。
- 不创建 `src/recipes/`，不把 Confirm、Empty、Loading、Pagination 等其他组件族能力作为本闭环前置条件。
- 不给 `SconeStatistic` 新增 `trend`、`delta`、`precision` 或业务口径字段；趋势解释由调用方通过 `description`、`prefix`、`suffix` 或外部组合表达。
- 不在 `SconeTableColumn<T>` 中新增权限、请求、字典加载、批量操作、编辑单元格或 TanStack Table 实例字段。
- 不在 `SconeTimelineItem` 中新增审批节点、处理人、权限动作、业务状态码或流程推进字段。

## Plan

### Task 1: Typography Primitives

目标文件：

- `src/components/data-display/typography.tsx`
- `src/components/data-display/typography.test.tsx`

前端控件和操作：

- `SconeText`：短文本控件，支持 `as` 切换语义标签、`size`、`weight`、`tone`、`truncate`。
- `SconeTitle`：标题文本控件，默认渲染标题语义标签；操作只包含渲染标签和样式状态切换，不提供点击行为。
- `SconeParagraph`：段落文本控件，支持长文本和多行截断；不得因为截断导致原始内容不可由 DOM 文本读取。

验收要求：

- Typography tone 只映射视觉语义，不写入业务词汇。
- `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` 的 props 不新增业务字段。
- `truncate=true` 表达单行截断，`truncate=number` 表达多行截断；不改变传入文本内容。

### Task 2: Tag And Badge Primitives

目标文件：

- `src/components/data-display/tag.tsx`
- `src/components/data-display/badge.tsx`
- `src/components/data-display/tag.test.tsx`
- `src/components/data-display/badge.test.tsx`

前端控件和操作：

- `SconeTag`：短标签控件；`closable=true` 时渲染关闭按钮，点击关闭按钮只调用 `onClose`，不自行移除外部数据。
- `SconeBadge`：角标控件；支持包裹 `children` 的计数角标、独立计数、dot 状态点和 overflow 展示。

验收要求：

- `SconeTag` 的关闭按钮必须有可访问名称，键盘可触发。
- `SconeBadge` 的 `dot=true` 且无相邻可读语义时必须要求或使用 `ariaLabel`；`overflow` 展示规则必须稳定。

### Task 3: Content Containers And Metrics

目标文件：

- `src/components/data-display/card.tsx`
- `src/components/data-display/statistic.tsx`
- `src/components/data-display/card.test.tsx`
- `src/components/data-display/statistic.test.tsx`

前端控件和操作：

- `SconeCard`：分组展示容器；控件区域包括 header title、header description、header actions、content、footer。
- `SconeCard` 的 `loading=true`：容器设置 `aria-busy`，内容区域保留尺寸，loading 表现不得抢占 actions 或 footer 的 DOM 边界。
- `SconeStatistic`：指标展示控件；区域包括 title、prefix、value、suffix、description。

验收要求：

- `SconeCard` 基于 `src/components/ui/card.tsx` 组合，不创建第二套 card 基座。
- `SconeCard` 不允许卡片套卡片的专用 API；页面自然分段留给 Section Pattern。
- `SconeStatistic` 只展示字段，不计算趋势、不格式化业务口径、不新增 `trend`、`delta`、`precision`。

### Task 4: Structured Data Regions

目标文件：

- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/list.tsx`
- `src/components/data-display/descriptions.test.tsx`
- `src/components/data-display/list.test.tsx`

前端控件和操作：

- `SconeDescriptions`：只读键值详情区域；每个 item 渲染 label、value、可选 `emptyFallback`，`span` 控制当前项跨列。
- `SconeDescriptions` 的 `columns`：支持固定数字和 `ResponsiveValue<number>`；前端表现为响应式网格列数，不引入断点之外的自定义尺寸系统。
- `SconeList`：重复项列表区域；每项由 `renderItem(item)` 渲染，`rowKey` 只生成稳定 React key。
- `SconeList` 的状态展示：`loading`、`renderError`、`renderEmpty` 只控制列表区域内容，不触发请求、不改写 `dataSource`。

验收要求：

- `SconeDescriptions` 的 label 必须是用户可读内容，不直接把后端字段名作为设计默认。
- 长文本 value 必须允许换行；不得用 disabled input 伪装只读详情。
- `SconeList` 状态优先级固定为 `loading > error > empty`。
- 列表项按钮、菜单、链接等交互只能来自 `renderItem`，组件自身不定义 action schema。

### Task 5: Table Region

目标文件：

- `src/components/data-display/table.tsx`
- `src/components/data-display/table.test.tsx`
- `src/components/ui/table.tsx`

前端控件和操作：

- `SconeTable`：基础行列表格区域；控件包括 table container、thead、tbody、tr、th、td。
- 表头操作：`SconeTableColumn<T>.title` 渲染列标题；`sortable` 只作为可表达字段，不实现排序状态机或请求行为，除非 SPEC 后续明确补充交互合同。
- 单元格操作：简单值通过 `dataIndex` 读取，复杂展示通过 `render(value, record, index)` 返回 React 节点。
- 行操作：`onRow(record)` 只返回 DOM attributes，例如 `onClick`、`aria-selected`、`data-*`；不内置行选择、批量操作或权限动作。
- 单元格操作：`onCell(record, column)` 只返回 td DOM attributes，例如 `className`、`aria-label`、`onClick`。
- 横向滚动：`scroll.x` 控制外层横向滚动或 table 宽度，窄屏不得强行压缩列内容到不可读。
- 状态展示：`loading`、`renderError`、`renderEmpty` 优先级固定为 `loading > error > empty`。

验收要求：

- `SconeTable` 基于 `src/components/ui/table.tsx` 组合，不暴露 TanStack Table 实例，不复制 AntD Table API。
- 无外部标题时必须提供 `ariaLabel`，并传递到 table 或稳定 table region。
- 操作列必须有明确列标题或可访问名称；危险动作由调用方配合 Confirm recipe。
- 基础 Table 不实现 pagination、filter、toolbar、selection checkbox column、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。

### Task 6: Timeline And Public Exports

目标文件：

- `src/components/data-display/timeline.tsx`
- `src/components/data-display/index.ts`
- `src/index.ts`
- `src/components/data-display/timeline.test.tsx`
- `src/index.test.ts`

前端控件和操作：

- `SconeTimeline`：事件序列区域；每个 item 渲染 marker/icon、title、description、time。
- `pending`：渲染进行中项，只表达 UI 序列末端或反转后的对应位置，不推进流程。
- `reverse`：只改变展示顺序，不修改传入 `items`。
- `onItemClick(item)`：点击时间线项时回调 item；组件不执行审批、权限、路由或状态推进。
- `src/components/data-display/index.ts`：只导出本组件族公共组件和公共类型。
- `src/index.ts`：只汇总 Data Display 公共 API，不导出私有 helper。

验收要求：

- `SconeTimelineItem` 字段只包含 `key`、`title`、`description`、`time`、`tone`、`icon`。
- Timeline 视觉状态来自 `tone`，业务状态码由调用方映射。
- Export 测试必须证明 Data Display 入口和库级入口可导入目标组件与公共类型。

## Verification

必须运行并记录结果：

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

重点测试断言：

- `SconeTable` 和 `SconeList` 的状态优先级为 `loading > error > empty`。
- `SconeTable` 覆盖 columns、rowKey、cell render、horizontal scroll、ref/className、无标题时 `ariaLabel`。
- `SconeDescriptions` 覆盖 responsive columns、density、bordered、label/value 可读文本和长文本换行。
- `SconeTag` 覆盖 closable、`onClose` 和 tone；`SconeBadge` 覆盖 count、dot、overflow 和 `ariaLabel` 要求。
- `SconeTypography` 覆盖语义标签、tone、truncate；`SconeCard` 覆盖 loading region 和 `aria-busy`。
- `SconeStatistic` 覆盖 title、value、prefix、suffix、description、tone；不得测试或实现趋势计算。
- `SconeTimeline` 覆盖 items、pending、reverse、tone 和点击回调不执行业务动作。
- `src/components/data-display/index.ts` 和 `src/index.ts` 只导出 Data Display 公共 API，不导出私有 helper。

## Closure

闭环完成后：

- 删除 `docs/30-designs/RUNBOOK-DATA-DISPLAY-CLOSURE.md`。
- 将实现文件、测试文件、验证命令和剩余延期项沉淀到 `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 或新的 readiness evidence 文档。
- 不保留本 RUNBOOK 的过程性描述；只有仍有长期价值的实现覆盖证据进入 `docs/40-readiness/`。
