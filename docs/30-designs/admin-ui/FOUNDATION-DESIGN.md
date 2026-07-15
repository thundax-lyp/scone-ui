# Admin UI Foundation Design

## Theme And Foundation Design

依据文件：

- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

Theme 是 `admin-ui` 的视觉实现合约。后续实现必须把语义 token 映射为 CSS variables、Tailwind theme 和组件 class，不在组件文件或组件 SPEC 中散落固定 px/rem、hex、阴影、字体数值或 z-index 数值。

目标文件：

| 文件                                     | 职责                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `packages/scone-ui/src/styles/theme.css` | CSS variables 唯一数值源。                                                                                      |
| `packages/scone-ui/src/styles.css`       | 引入 theme、Tailwind layers 和全局基础样式。                                                                    |
| `tailwind.config.ts`                     | 必要目标文件；默认只映射 `packages/scone-ui/src/styles/theme.css` 中的 CSS variables，不维护第二套 token 数值。 |

硬约束：

- 不创建第二套 `tokens.ts` 数值源。
- TypeScript token 名称如需实现，只允许导出 token key，不导出 token 数值。
- CSS variables 使用 `--scone-*` 前缀，例如 `--scone-color-background`、`--scone-spacing-md`、`--scone-radius-sm`。
- 组件 class 只能消费语义 token，例如 `bg-background`、`text-foreground`、`border-border`、`ring-ring`。
- `tone` 到颜色的映射由 theme 决定，组件只传递 `tone` 语义。
- 当前主题目标只覆盖 light theme；dark mode 不在本设计范围内，纳入前必须先补 contrast、surface、overlay 和 chart/token 映射。

Token families：

| 族         | 最小 key                                                                                                                                                      | 设计要求                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Color      | `background`、`foreground`、`muted`、`muted-foreground`、`border`、`ring`、`primary`、`primary-foreground`、`neutral`、`info`、`success`、`warning`、`danger` | 覆盖背景、前景、边框、焦点、状态和语义色；不得直接使用产品品牌色或后端状态名。 |
| Spacing    | `2xs`、`xs`、`sm`、`md`、`lg`、`xl`                                                                                                                           | 用于组件内部间距、组件间距和页面分段；默认 API 不接受任意 number。             |
| Radius     | `sm`、`md`、`lg`、`full`                                                                                                                                      | 控件、卡片、浮层和可交互元素圆角；组件不得内联任意圆角。                       |
| Shadow     | `sm`、`md`、`lg`                                                                                                                                              | 浮层、弹窗、抽屉和悬浮菜单层级；状态变化不得依赖阴影作为唯一反馈。             |
| Typography | `body`、`label`、`title`、`mono`                                                                                                                              | 字号、行高、字重和等宽字体语义层级。                                           |
| Focus      | `ring`、`ring-offset`                                                                                                                                         | 键盘焦点可见样式，所有可交互组件共享。                                         |
| Motion     | `duration-fast`、`duration-default`、`easing-standard`                                                                                                        | 浮层、折叠、加载和状态切换动画；不得阻断 reduced motion。                      |
| Z-index    | `sticky`、`dropdown`、`popover`、`drawer`、`modal`、`toast`                                                                                                   | 由 theme 或 overlay policy 管理，组件不得私自递增数字。                        |
| Control    | `control-height-sm/md/lg`、`icon-size-sm/md/lg`、`hit-area-min`、`table-row-height-*`、`list-row-height-*`、`toolbar-height-*`                                | 控件高度、图标尺寸、点击热区和数据行高度。                                     |

Size 和 density：

| 名称               | 值                                  | 适用范围                                                                                                                    |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `SconeControlSize` | `sm`、`md`、`lg`                    | Button、Input、SearchInput、PasswordInput、Select、Segmented、Checkbox、Switch、Radio、NumberInput、DatePicker 等控件高度。 |
| `SconeDensity`     | `compact`、`default`、`comfortable` | Table、List、Descriptions、Toolbar 和 DataTable 区域的信息密度。                                                            |

规则：

- `size` 表达单个可交互控件高度，不表达 Drawer 宽度、Card 体量或页面宽度。
- `density` 表达信息区域的行高、内边距和扫描节奏，不替代控件 `size`。
- Toolbar `density="compact"` 默认搭配 `size="sm"` 控件；`density="default"` 默认搭配 `size="md"` 控件。
- `comfortable` 只用于阅读性优先的详情或设置区域，不用于大批量数据表。
- 图标按钮的可点击区域不得小于 `hit-area-min`。

Layout preset：

| 语义            | token / preset                            | 使用对象                       |
| --------------- | ----------------------------------------- | ------------------------------ |
| page width      | `page-width-narrow/content/wide/full`     | `Page.Root`                    |
| drawer width    | `drawer-width-sm/md/lg/full`              | `SconeDrawer`                  |
| split pane size | `split-pane-size-narrow/medium/wide/fill` | `SconeSplitPane`               |
| table region    | `table-region-height-sm/md/lg/full`       | `DataTable.TableRegion`        |
| scroll viewport | `scroll-viewport-height-sm/md/lg`         | `SconeScrollArea`              |
| sticky offset   | `sticky-offset-header/footer`             | Page、DataTable 和 FormActions |

布局规则：

- 布局尺寸使用 preset 和 CSS 长度边界，不把无单位 `number` 作为公共 API。
- 覆盖字段必须带单位或百分比，例如 `320px`、`40rem`、`50%`。
- 主滚动容器只能有一个；页面使用 `Page.Content`，局部区域使用 `SconeScrollArea` 或 Pattern 定义的 viewport slot。
- sticky header/footer 必须绑定到同一个 scroll viewport，并由对应 Pattern 负责留出 padding 或 offset。

Loading categories：

| 类别     | 使用对象                   | 行为                                                |
| -------- | -------------------------- | --------------------------------------------------- |
| `action` | Button、单个提交动作       | 保持原尺寸，默认禁用重复触发。                      |
| `region` | Drawer、Card、Section 区域 | 设置 `aria-busy`，保留内容容器尺寸。                |
| `data`   | Table、List、DataTable     | `loading > error > empty`，由数据区域决定状态容器。 |

Icon policy：

- 不提供独立 `SconeIcon` 组件。
- 图标由调用方传入，组件只规定尺寸、语义和可访问边界。
- 图标按钮必须提供可见文本或 `ariaLabel`。
- 装饰性图标必须对辅助技术隐藏。
- 产品业务图标、品牌图形、资源类型图标和权限图标由产品侧组合，不进入 Foundation token 或通用组件。

State semantics：

| 状态          | 设计要求                                                      |
| ------------- | ------------------------------------------------------------- |
| Focus visible | 键盘聚焦必须可见，不移除浏览器或 Radix 可访问焦点行为。       |
| Disabled      | 不触发交互，不作为唯一权限表达。                              |
| Readonly      | 可聚焦、可复制、不可修改，与 disabled 视觉可区分。            |
| Loading       | 保留原尺寸；操作级默认禁用重复提交；区域级设置 `aria-busy`。  |
| Invalid       | 使用 `aria-invalid` 和 `aria-describedby`，并与错误文案关联。 |
| Empty         | 说明当前没有什么；可恢复时提供 `action`。                     |
| Error         | 数据型组件中优先级高于 empty。                                |
| Selected      | 与 hover/focus 区分，并能通过键盘或状态属性识别。             |
| Expanded      | 使用 `aria-expanded` 或底层 Radix 状态。                      |

Responsive 和 accessibility：

- Admin UI 最小支持内容宽度为 `360px`。
- 页面主滚动由 `Page.Content` 承担；局部滚动使用 `SconeScrollArea`。
- 表格窄屏优先横向滚动或列裁剪 recipe，不默认改造成卡片列表。
- 工具栏窄屏允许换行，主操作优先可见，次要操作进入菜单。
- Drawer 窄屏可提升为 `full` 宽度；Dialog 不承载长表单。
- 基于 Radix 的组件必须保留原有键盘、焦点、ARIA 和关闭行为。
- Tooltip 不能承载必读信息；阻断性错误使用 Alert 或字段错误。
- 颜色状态必须配合文本、图标或结构，不得只依赖色彩。
