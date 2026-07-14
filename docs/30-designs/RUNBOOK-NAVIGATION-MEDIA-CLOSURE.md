# Navigation + Media Closure Runbook

## Purpose

完成 Navigation + Media 组件闭环，交付可导出的 `Scone*` 组件、同目录测试和实现覆盖证据。

本次闭环聚焦导航选择、展开、菜单、命令搜索、Tooltip、Image 和 Avatar。`SconePagination` 留给 DataTable worktree，不在本 RUNBOOK 执行。

## Scope

源码范围：

- `src/components/navigation/breadcrumb.tsx`
- `src/components/navigation/tabs.tsx`
- `src/components/navigation/segmented.tsx`
- `src/components/navigation/tree.tsx`
- `src/components/navigation/dropdown.tsx`
- `src/components/navigation/menu.tsx`
- `src/components/navigation/tooltip.tsx`
- `src/components/navigation/command.tsx`
- `src/components/navigation/accordion.tsx`
- `src/components/navigation/collapsible.tsx`
- `src/components/navigation/index.ts`
- `src/components/media/image.tsx`
- `src/components/media/avatar.tsx`
- `src/components/media/index.ts`
- `src/index.ts`

测试范围：

- `src/components/navigation/breadcrumb.test.tsx`
- `src/components/navigation/tabs.test.tsx`
- `src/components/navigation/segmented.test.tsx`
- `src/components/navigation/tree.test.tsx`
- `src/components/navigation/dropdown.test.tsx`
- `src/components/navigation/menu.test.tsx`
- `src/components/navigation/tooltip.test.tsx`
- `src/components/navigation/command.test.tsx`
- `src/components/navigation/accordion.test.tsx`
- `src/components/navigation/collapsible.test.tsx`
- `src/components/media/image.test.tsx`
- `src/components/media/avatar.test.tsx`
- `src/index.test.ts`

规格依据：

- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`
- `docs/10-specs/components/navigation/SCONE-BREADCRUMB.md`
- `docs/10-specs/components/navigation/SCONE-TABS.md`
- `docs/10-specs/components/navigation/SCONE-SEGMENTED.md`
- `docs/10-specs/components/navigation/SCONE-TREE.md`
- `docs/10-specs/components/navigation/SCONE-DROPDOWN.md`
- `docs/10-specs/components/navigation/SCONE-MENU.md`
- `docs/10-specs/components/navigation/SCONE-TOOLTIP.md`
- `docs/10-specs/components/navigation/SCONE-COMMAND.md`
- `docs/10-specs/components/navigation/SCONE-ACCORDION.md`
- `docs/10-specs/components/navigation/SCONE-COLLAPSIBLE.md`
- `docs/10-specs/components/media/SCONE-IMAGE.md`
- `docs/10-specs/components/media/SCONE-AVATAR.md`
- `docs/10-specs/COMPONENT-SELECTION.md`
- `docs/30-designs/admin-ui/FILE-PLACEMENT-DESIGN.md`
- `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`
- `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`

文档范围：

- 更新 `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`，新增 Navigation + Media 实现覆盖证据。
- 任务关闭时删除本 RUNBOOK；如仍有长期结论，先迁移到 readiness 文档。

## Non-goals

- 不实现、导出或测试 `SconePagination`、`src/components/navigation/pagination.tsx`。
- 不修改 DataTable、Table、Pattern 或 Recipe 的运行时实现。
- 不引入路由、权限过滤、菜单数据加载、图片鉴权、下载服务或产品级导航策略。
- 不把 Dropdown 用作表单选择；表单值选择仍属于 Select/Combobox 边界。
- 不把 Tooltip 用于错误说明、必读说明或可点击内容。
- 不新增产品应用级 UI 规则。

## Data Structures

本次允许新增或调整的 public type 必须只落在对应组件文件中，并从组件族入口和 `src/index.ts` 导出。

`src/components/navigation/breadcrumb.tsx`：

- `SconeBreadcrumbItem`
    - `key: Key`
    - `label: ReactNode`
    - `href?: string`
    - `disabled?: boolean`
    - `asChild?: boolean`
    - `className?: string`
- `SconeBreadcrumbProps`
    - `items: SconeBreadcrumbItem[]`
    - `separator?: ReactNode`
    - `maxItems?: number`
    - `onItemClick?: (item: SconeBreadcrumbItem) => void`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/tabs.tsx`：

- `SconeTabsItem`
    - `value: string`
    - `label: ReactNode`
    - `content?: ReactNode`
    - `disabled?: boolean`
- `SconeTabsProps`
    - `value?: string`
    - `defaultValue?: string`
    - `onValueChange?: (value: string) => void`
    - `orientation?: "horizontal" | "vertical"`
    - `activationMode?: "automatic" | "manual"`
    - `items?: SconeTabsItem[]`
    - `ariaLabel?: string`
    - `children?: ReactNode`
    - `className?: string`

`src/components/navigation/segmented.tsx`：

- `SconeSegmentedProps`
    - `options: SconeOption<string>[]`
    - `value?: string`
    - `defaultValue?: string`
    - `onValueChange?: (value: string) => void`
    - `size?: "sm" | "md"`
    - `disabled?: boolean`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/tree.tsx`：

- `SconeTreeNode`
    - `key: Key`
    - `title: ReactNode`
    - `children?: SconeTreeNode[]`
    - `disabled?: boolean`
    - `disableCheckbox?: boolean`
    - `className?: string`
- `SconeTreeSelectInfo`
    - `node: SconeTreeNode`
    - `selected: boolean`
- `SconeTreeCheckInfo`
    - `node: SconeTreeNode`
    - `checked: boolean`
- `SconeTreeExpandInfo`
    - `node: SconeTreeNode`
    - `expanded: boolean`
- `SconeTreeProps`
    - `treeData: SconeTreeNode[]`
    - `selectedKeys?: Key[]`
    - `defaultSelectedKeys?: Key[]`
    - `checkedKeys?: Key[]`
    - `defaultCheckedKeys?: Key[]`
    - `expandedKeys?: Key[]`
    - `defaultExpandedKeys?: Key[]`
    - `checkable?: boolean`
    - `selectable?: boolean`
    - `multiple?: boolean`
    - `onSelect?: (keys: Key[], info: SconeTreeSelectInfo) => void`
    - `onCheck?: (keys: Key[], info: SconeTreeCheckInfo) => void`
    - `onExpand?: (keys: Key[], info: SconeTreeExpandInfo) => void`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/dropdown.tsx`：

- `SconeActionItem`
    - `key: Key`
    - `label: ReactNode`
    - `icon?: ReactNode`
    - `disabled?: boolean`
    - `destructive?: boolean`
    - `separatorBefore?: boolean`
    - `className?: string`
- `SconeDropdownProps`
    - `trigger: ReactNode`
    - `items?: SconeActionItem[]`
    - `children?: ReactNode`
    - `open?: boolean`
    - `defaultOpen?: boolean`
    - `onOpenChange?: (open: boolean) => void`
    - `onSelect?: (item: SconeActionItem) => void`
    - `align?: "start" | "center" | "end"`
    - `side?: "top" | "right" | "bottom" | "left"`
    - `modal?: boolean`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/menu.tsx`：

- `SconeNavigationItem`
    - `key: string`
    - `label: ReactNode`
    - `icon?: ReactNode`
    - `children?: SconeNavigationItem[]`
    - `disabled?: boolean`
    - `asChild?: boolean`
    - `className?: string`
- `SconeMenuProps`
    - `items: SconeNavigationItem[]`
    - `selectedKeys?: string[]`
    - `defaultSelectedKeys?: string[]`
    - `openKeys?: string[]`
    - `defaultOpenKeys?: string[]`
    - `onSelect?: (key: string, item: SconeNavigationItem) => void`
    - `onOpenChange?: (keys: string[]) => void`
    - `orientation?: "vertical" | "horizontal"`
    - `collapsed?: boolean`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/tooltip.tsx`：

- `SconeTooltipProps`
    - `content: ReactNode`
    - `children: ReactNode`
    - `open?: boolean`
    - `defaultOpen?: boolean`
    - `onOpenChange?: (open: boolean) => void`
    - `side?: "top" | "right" | "bottom" | "left"`
    - `delay?: number`
    - `className?: string`

`src/components/navigation/command.tsx`：

- `SconeCommandItem`
    - `key: string`
    - `label: ReactNode`
    - `value?: string`
    - `description?: ReactNode`
    - `group?: string`
    - `icon?: ReactNode`
    - `disabled?: boolean`
    - `keywords?: string[]`
    - `className?: string`
- `SconeCommandProps`
    - `items: SconeCommandItem[]`
    - `value?: string`
    - `defaultValue?: string`
    - `onValueChange?: (value: string) => void`
    - `selectedKey?: string`
    - `onSelect?: (key: string, item: SconeCommandItem) => void`
    - `loading?: boolean`
    - `renderEmpty?: ReactNode | (() => ReactNode)`
    - `placeholder?: string`
    - `ariaLabel?: string`
    - `className?: string`

`src/components/navigation/accordion.tsx`：

- `SconeAccordionItem`
    - `value: string`
    - `trigger: ReactNode`
    - `content: ReactNode`
    - `disabled?: boolean`
    - `className?: string`
- `SconeAccordionProps`
    - `type: "single" | "multiple"`
    - `value?: string | string[]`
    - `defaultValue?: string | string[]`
    - `onValueChange?: (value: string | string[]) => void`
    - `collapsible?: boolean`
    - `items?: SconeAccordionItem[]`
    - `children?: ReactNode`
    - `className?: string`

`src/components/navigation/collapsible.tsx`：

- `SconeCollapsibleProps`
    - `open?: boolean`
    - `defaultOpen?: boolean`
    - `onOpenChange?: (open: boolean) => void`
    - `trigger: ReactNode`
    - `children: ReactNode`
    - `className?: string`

`src/components/media/image.tsx`：

- `SconeImageProps`
    - `src?: string`
    - `alt: string`
    - `fallback?: ReactNode`
    - `preview?: boolean`
    - `previewOpen?: boolean`
    - `defaultPreviewOpen?: boolean`
    - `onPreviewOpenChange?: (open: boolean) => void`
    - `width?: number | string`
    - `height?: number | string`
    - `objectFit?: "cover" | "contain"`
    - `onLoad?: React.ReactEventHandler<HTMLImageElement>`
    - `onError?: React.ReactEventHandler<HTMLImageElement>`
    - `className?: string`

`src/components/media/avatar.tsx`：

- `SconeAvatarProps`
    - `src?: string`
    - `alt?: string`
    - `fallback?: ReactNode`
    - `icon?: ReactNode`
    - `size?: "sm" | "md" | "lg"`
    - `shape?: "circle" | "square"`
    - `onLoad?: React.ReactEventHandler<HTMLImageElement>`
    - `onError?: React.ReactEventHandler<HTMLImageElement>`
    - `className?: string`

## Plan

按 2-5 个文件为一组推进。每组文件清单必须包含实际会修改或新增的文件；每组完成源码、测试和局部验证后再进入下一组。

### Task 1: Breadcrumb 和 Segmented

文件：

- `src/components/navigation/breadcrumb.tsx`
- `src/components/navigation/breadcrumb.test.tsx`
- `src/components/navigation/segmented.tsx`
- `src/components/navigation/segmented.test.tsx`

前端控件和操作：

- Breadcrumb 渲染为 `nav` + 有序路径；最后一项显示当前页，带 `aria-current="page"`，不可触发 `onItemClick`。
- Breadcrumb 链接项可点击；点击时向 `onItemClick` 传回完整 `SconeBreadcrumbItem`。
- Breadcrumb 超过 `maxItems` 时显示折叠按钮；用户点击折叠按钮后可看到被折叠的路径项。
- Segmented 渲染为单选控件组；用户点击选项或使用方向键切换当前值。
- Segmented `disabled` 或 option `disabled` 时，点击和键盘操作不得触发 `onValueChange`。

验收：

- Breadcrumb current、链接项点击、折叠项展开和 disabled item 行为均可测试。
- Segmented 支持受控和非受控状态。
- 测试覆盖 `aria-current`、`onItemClick` payload、折叠按钮、键盘切换和 disabled 行为。

### Task 2: Tabs

文件：

- `src/components/navigation/tabs.tsx`
- `src/components/navigation/tabs.test.tsx`

前端控件和操作：

- Tabs 渲染 tablist、tab 和 tabpanel；用户点击 tab 后切换对应 panel。
- Tabs `items` helper 根据 `SconeTabsItem.content` 渲染 panel；`children` compound parts 不被 helper 阻断。
- Tabs `activationMode="manual"` 时，方向键只移动焦点，Enter 或 Space 才切换内容。
- Tabs `activationMode="automatic"` 时，方向键移动焦点并切换当前内容。
- Tabs `orientation="vertical"` 时，使用上下方向键移动焦点；horizontal 时使用左右方向键。
- Tabs disabled item 可见但不可点击、不可被键盘激活。

验收：

- 支持 `value`、`defaultValue`、`onValueChange`、`orientation`、`activationMode`、`items`、`ariaLabel`、`children`。
- 测试覆盖 tab/tabpanel ARIA 关联、manual activation、automatic activation、vertical keyboard、disabled item。

### Task 3: Accordion 和 Collapsible

文件：

- `src/components/navigation/accordion.tsx`
- `src/components/navigation/accordion.test.tsx`
- `src/components/navigation/collapsible.tsx`
- `src/components/navigation/collapsible.test.tsx`

前端控件和操作：

- Accordion 渲染多个 trigger 和 content；用户点击 trigger 展开或收起对应 content。
- Accordion `type="single"` 时同一时间最多展开一个 item；`collapsible` 控制单项是否可收起为空。
- Accordion `type="multiple"` 时允许多个 item 同时展开。
- Collapsible 渲染一个 trigger 和一个内容区域；用户点击 trigger 或按 Enter/Space 切换 open。
- Collapsible trigger 必须暴露 `aria-expanded`。

验收：

- Accordion 和 Collapsible 支持受控与非受控 open/value。
- 测试覆盖 single、multiple、collapsible、expanded 状态、content 关联和键盘切换。

### Task 4: Tooltip

文件：

- `src/components/navigation/tooltip.tsx`
- `src/components/navigation/tooltip.test.tsx`

前端控件和操作：

- Tooltip 包裹一个 trigger 控件；用户 hover trigger 后显示短提示。
- Tooltip trigger 获得焦点时显示 content；blur 后关闭。
- Tooltip 打开时用户按 Escape 关闭，并触发 `onOpenChange(false)`。
- Tooltip `delay` 控制打开延迟；`side` 控制出现方向。
- Tooltip content 不渲染按钮、链接、输入框或其他可交互控件。

验收：

- 支持 `open`、`defaultOpen`、`delay`、`side`、`onOpenChange`。
- 测试覆盖 hover、focus、blur、Escape、受控 open 和短内容展示。

### Task 5: Dropdown

文件：

- `src/components/navigation/dropdown.tsx`
- `src/components/navigation/dropdown.test.tsx`

前端控件和操作：

- Dropdown 渲染 trigger 和 menu；用户按 Enter/Space 或点击 trigger 打开菜单。
- Dropdown 用户按 ArrowDown/ArrowUp 移动菜单项焦点，按 Enter 选择 item。
- Dropdown 用户按 Escape 关闭菜单，并恢复 trigger 焦点。
- Dropdown `destructive` item 必须有可查询的危险样式或 data 状态。
- Dropdown `disabled` item 可见但不触发选择。
- Dropdown `items` helper 和 `children` compound 内容不能互相阻断。

验收：

- Dropdown 不作为表单选值控件。
- 测试覆盖 open、select、disabled、destructive、Escape close、focus restore、controlled open。

### Task 6: Menu

文件：

- `src/components/navigation/menu.tsx`
- `src/components/navigation/menu.test.tsx`

前端控件和操作：

- Menu 渲染 vertical/horizontal 菜单；用户点击 item 后更新 selected 状态并触发 `onSelect`。
- Menu 有 children 的 item 渲染为可展开分组；用户点击分组 trigger 或按 Enter/Space 切换 openKeys。
- Menu 用户按 ArrowDown/ArrowUp 或 ArrowLeft/ArrowRight 在可见菜单项之间移动焦点。
- Menu `collapsed` 时隐藏视觉文本但保留 item 可访问名称。
- Menu disabled item 可见但不可选择、不可展开。
- Menu 实现按 spec API 的 menu/list navigation 行为；允许复用 shadcn/Radix primitive，但不得被 Radix Navigation Menu 的站点导航模型改变对外行为。

验收：

- Menu 不内置路由、权限、URL 解析或数据加载。
- 测试覆盖 selectedKeys、openKeys、collapsed 可访问名称、disabled item、键盘导航。

### Task 7: Command

文件：

- `src/components/navigation/command.tsx`
- `src/components/navigation/command.test.tsx`

前端控件和操作：

- Command 渲染搜索输入和结果列表；用户输入关键字过滤 `label`、`value`、`keywords`。
- Command 用户按 ArrowDown/ArrowUp 移动 active item，按 Enter 触发 `onSelect(key, item)`。
- Command `loading` 时显示加载状态；无结果时显示 `renderEmpty`。
- Command grouped items 按 `group` 展示分组标题。
- Command disabled item 可见但不可被 Enter 选择。

验收：

- Command 不写入表单值，只表达命令、搜索结果或可执行项。
- 测试覆盖搜索过滤、受控 value、selectedKey、group、loading、empty、disabled item 和键盘选择。

### Task 8: Tree

文件：

- `src/components/navigation/tree.tsx`
- `src/components/navigation/tree.test.tsx`

前端控件和操作：

- Tree 渲染 `role="tree"`、`treeitem` 和层级关系；只渲染当前 expandedKeys 可见节点。
- 用户点击节点标题时选择节点；`multiple=false` 时替换 selectedKeys，`multiple=true` 时允许追加或切换。
- `checkable=true` 时显示 checkbox；用户点击 checkbox 切换 checkedKeys，并触发 `onCheck`。
- 用户点击带 children 节点的展开按钮，切换 expandedKeys 并触发 `onExpand`。
- 键盘操作：ArrowDown/ArrowUp 移动可见节点焦点；ArrowRight 展开当前节点或进入第一个子节点；ArrowLeft 收起当前节点或回到父节点；Home/End 跳到首尾可见节点；Enter/Space 执行选择。
- disabled 节点可展示但不可被选择、勾选或展开；`disableCheckbox` 只禁用 checkbox。

验收：

- 支持 selectedKeys、checkedKeys、expandedKeys 的受控和非受控状态。
- 节点 key 必须稳定，测试覆盖嵌套节点、disabled 节点、multiple selection、checkable、roving focus 和 Home/End。
- 不实现异步加载、虚拟滚动、拖拽排序或 TreeSelect。

### Task 9: Media

文件：

- `src/components/media/image.tsx`
- `src/components/media/image.test.tsx`
- `src/components/media/avatar.tsx`
- `src/components/media/avatar.test.tsx`

前端控件和操作：

- Image 渲染 `img`，必须传入 `alt`；装饰性图片由调用方显式传 `alt=""`。
- Image 在 `src` 缺失或 `onError` 后显示 fallback，不留下破图占位。
- Image 根据 `width`、`height` 和 `objectFit` 输出稳定尺寸，避免加载后布局跳动。
- Image `preview=true` 时，用户点击图片打开预览；受控 `previewOpen` 由调用方控制，非受控 `defaultPreviewOpen` 自行维护。
- Avatar 渲染头像图片或 fallback/icon；图片失败后显示 fallback/icon。
- Avatar `size` 控制 `sm`、`md`、`lg` 尺寸；`shape` 控制 `circle` 或 `square`。

验收：

- Image 测试覆盖 alt、fallback、load/error、preview open 和尺寸样式。
- Avatar 测试覆盖 fallback、icon、load/error、size、shape。

### Task 10: Public export 和 readiness

文件：

- `src/components/navigation/index.ts`
- `src/components/media/index.ts`
- `src/index.ts`
- `src/index.test.ts`
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`

前端控件和操作：

- Navigation 组件从 `src/components/navigation/index.ts` 导出。
- Media 组件从 `src/components/media/index.ts` 导出。
- `src/index.ts` 公开导出本次全部组件和 public props type。
- `src/index.test.ts` 验证消费者可以从库入口导入本次全部组件。
- readiness 证据列出源码文件、测试文件、覆盖能力、验证命令和 `SconePagination` 延后说明。

验收：

- `SconePagination` 不从任何入口导出。
- `src/index.test.ts` 覆盖本次新增的组件和 props type public export。
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 的文件清单和验证结果与实际改动一致。

## Verification

必须运行并记录结果：

- `pnpm format`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test -- src/components/navigation src/components/media src/index.test.ts`
- `pnpm build`

重点验收：

- `SconePagination` 未新增实现、测试或 public export。
- Navigation 组件不引入路由、权限、URL 解析或数据加载。
- Menu、Dropdown、Command、Tabs、Tree 的键盘模型可测试。
- Tooltip 只承载短提示，Image/Avatar 均有 fallback 行为。
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 的证据与实际源码、测试、命令结果一致。

## Closure

任务完成并通过审核后：

- 删除 `docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`。
- 保留 `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 中的 Navigation + Media 实现覆盖证据。
- 若发现需要长期保留的新规则，先迁移到 `docs/00-governance/` 或对应 SPEC，再删除本 RUNBOOK。
