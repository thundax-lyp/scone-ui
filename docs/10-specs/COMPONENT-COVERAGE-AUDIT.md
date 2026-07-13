# Component Coverage Audit

## Purpose

本文档对照 Ant Design 与 shadcn/ui 的官方组件清单，判断 `admin-ui` 是否缺少应定义的通用能力。审计目标不是复刻两个库，而是避免遗漏 Admin UI 高频基础组件，并明确当前不纳入项。

## Reference Baseline

- 审计日期：2026-07-13。
- Ant Design 6.5.0 Components Overview：`https://ant.design/components/overview/`，对照分类为 General、Layout、Navigation、Data Entry、Data Display、Feedback、Other。
- shadcn/ui Components：`https://ui.shadcn.com/docs/components`，对照组件包括 Accordion、Alert Dialog、Breadcrumb、Button、Calendar、Combobox、Command、Data Table、Field、Pagination、Scroll Area、Separator、Sheet、Sonner、Toast 等。
- 本基线是 2026-07-13 的范围决策快照，只用于判断当前 SPEC 是否遗漏 admin 高频基础能力，不声明官网实时清单准确性。
- 本文档本身即为冻结快照；未来重新审计时应另起审计结论或更新本节日期和来源，不自动跟随官网变化。
- 重新审计触发条件：升级 Ant Design 主版本、更新 shadcn/ui registry 基线、组件库准备新增组件目标，或迁移证据显示现有清单缺项。

## Coverage Decision Matrix

| 来源组件                                 | 处理方式      | admin-ui 归属                           | 原因                                                         |
| ---------------------------------------- | ------------- | --------------------------------------- | ------------------------------------------------------------ |
| Button                                   | 已覆盖        | `SconeButton`                           | 操作基础。                                                   |
| Typography                               | 已覆盖        | `SconeTypography`                       | 文本、标题、段落基础能力。                                   |
| Icon                                     | 不作为组件    | Foundation Icon Policy                  | 图标尺寸、语义和可访问规则由 Foundation 定义，不做 UI 组件。 |
| FloatButton                              | 不纳入        | Recipe / product side                   | 后台管理页较少需要悬浮主操作，易变成产品行为。               |
| Divider / Separator                      | 已覆盖        | `SconeSeparator`                        | Admin 表单、菜单、详情分隔高频，需要 token 化。              |
| Flex / Space                             | 已覆盖        | `SconeStack` / `SconeInline`            | 使用更明确的布局语义。                                       |
| Grid                                     | 已覆盖为 Recipe | Grid Recipe                           | 不定义复杂 responsive grid 组件，由 Admin Pattern 记录。     |
| Layout / Sidebar                         | 已覆盖为 Pattern | App Shell Pattern                    | 不内置产品导航数据。                                         |
| Splitter / Resizable                     | 已覆盖        | `SconeSplitPane`                        | 主从视图和可调整区域。                                       |
| Scroll Area                              | 已覆盖        | `SconeScrollArea`                       | 表格区域、侧栏列表、Drawer 内容需要明确滚动容器。            |
| Anchor                                   | 不纳入        | Product doc page recipe                 | 长文档锚点导航低频，不进入 admin 组件核心。                  |
| Breadcrumb                               | 已覆盖        | `SconeBreadcrumb`                       | 后台多层页面定位高频。                                       |
| Pagination                               | 已覆盖        | `SconePagination`                       | DataTable 和列表管理页核心能力。                             |
| Steps                                    | Recipe        | FormPage / product flow recipe          | 多步骤流程偏业务，以 Recipe 组合，不做独立组件。             |
| AutoComplete                             | 合并          | `SconeCombobox`                         | 与 Select/Command 边界重叠，按 Combobox 定义。               |
| Cascader                                 | Recipe        | Tree + Combobox recipe                  | 层级选择常与业务数据耦合，不做独立基础组件。                 |
| ColorPicker                              | 不纳入        | Direct third-party                      | Admin 通用性不足。                                           |
| Mentions                                 | 不纳入        | Business / editor feature               | 更接近协作编辑或评论业务。                                   |
| Radio / Radio Group                      | 已覆盖        | `SconeRadioGroup`                       | 表单单选高频，不能只靠 Select。                              |
| Rate                                     | 不纳入        | Business Component                      | 后台通用管理低频。                                           |
| Slider                                   | 已覆盖        | `SconeSlider`                           | 数值范围输入有通用价值。                                     |
| TimePicker                               | DatePicker 覆盖 | DatePicker `date-time` mode           | 当前用 `DatePicker mode="date-time"` 覆盖，不设独立 TimePicker。 |
| Transfer                                 | Recipe        | Tree/List + actions recipe              | 穿梭选择常涉及大数据、搜索和权限，不做基础组件。             |
| TreeSelect                               | Recipe        | Tree + Select/Combobox recipe           | 依赖 Tree 和表单值语义，不做独立基础组件。                   |
| Calendar                                 | DatePicker 覆盖 | DatePicker calendar panel             | 展示日历低频；日期输入由 DatePicker 覆盖。                   |
| Carousel                                 | 不纳入        | Business / marketing                    | 不符合 Admin 核心场景。                                      |
| Collapse / Accordion / Collapsible       | 已覆盖        | `SconeAccordion` / `SconeCollapsible`   | 设置页、筛选展开、详情折叠高频。                             |
| Popover / Hover Card                     | 已覆盖为 Recipe | Popover Recipe / HoverCard 不纳入     | Popover 有交互价值；HoverCard 在 Admin 中低频。              |
| QRCode                                   | 不纳入        | Direct library / Recipe                 | 领域性强，按需组合。                                         |
| Tour                                     | 不纳入        | Product onboarding                      | 强产品流程。                                                 |
| Message / Toast / Sonner                 | 已覆盖        | `SconeToast` / service                  | 非阻断反馈高频，需统一语义和位置策略。                       |
| Notification                             | 已覆盖        | `SconeNotification` / service           | 长内容或系统通知高频，但不与 Toast 混用。                    |
| Result                                   | 已覆盖为 Recipe | Result Recipe                         | 结果页可由 Empty/Alert/Button 组合。                         |
| Watermark                                | 不纳入        | Product/security policy                 | 与产品安全和合规策略相关。                                   |
| App / ConfigProvider                     | 不作为 UI 组件 | Provider / build governance             | 进入实现架构，不进入组件 SPEC 主清单。                       |
| Aspect Ratio                             | 不纳入        | Utility                                 | 媒体展示直接使用底层能力。                                   |
| Button Group / Toggle / Toggle Group     | 合并          | `SconeCompact` / `SconeSegmented`       | 用 Compact 和 Segmented 覆盖主要场景。                       |
| Command                                  | 已覆盖        | `SconeCommand`                          | 搜索命令和 Combobox 基座。                                   |
| Context Menu / Menubar / Navigation Menu | 合并          | `SconeDropdown` / `SconeMenu`           | 当前按动作菜单和导航菜单两类语义覆盖，不单独扩张。           |
| Input Group / Item / Kbd / Label         | 合并          | Field / Form helper                     | 作为 Field anatomy 或文档 helper，不单独扩张。               |
| Input OTP                                | 不纳入        | Business auth component                 | 登录验证偏产品应用。                                         |
| Native Select                            | 不单独纳入    | Direct native/shadcn                    | 由 Select 策略覆盖。                                         |

## Added Components

以下能力已补入当前 SPEC，均可进入实现、导出和测试。

| 能力 | 权威规格 |
| ---- | -------- |
| `SconeSeparator`、`SconeScrollArea`、`SconeSplitPane` | [`COMPONENT-SPEC-LAYOUT.md`](./COMPONENT-SPEC-LAYOUT.md) |
| `SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar` | [`COMPONENT-SPEC-NAVIGATION-MEDIA.md`](./COMPONENT-SPEC-NAVIGATION-MEDIA.md) |
| `SconeRadioGroup`、`SconeSlider`、`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | [`COMPONENT-SPEC-FORM.md`](./COMPONENT-SPEC-FORM.md) |
| `SconeToast`、`SconeNotification`、`SconeDialog`、`SconeConfirm`、Result Recipe | [`COMPONENT-SPEC-FEEDBACK-OVERLAY.md`](./COMPONENT-SPEC-FEEDBACK-OVERLAY.md) |
| `SconeTimeline`、`SconeStatistic` | [`COMPONENT-SPEC-DATA-DISPLAY.md`](./COMPONENT-SPEC-DATA-DISPLAY.md) |

## Not In Scope

- AntD `FloatButton`、`Rate`、`Carousel`、`Tour`、`Watermark`、`App`、`ConfigProvider`。
- 独立 `Cascader`、`TreeSelect`、`TimePicker`、`Calendar`、`Transfer`、`ContextMenu`、`Menubar`、`NavigationMenu`。这些能力由当前 Tree、Combobox、DatePicker、Menu、Dropdown 或 Recipe 覆盖。
- `RichContent`、富文本/Markdown/HTML 渲染器、编辑器和内容安全白名单。它们依赖产品内容来源、安全策略和渲染协议，不进入基础组件库。
- shadcn 新增 AI/chat 相关 `Attachment`、`Bubble`、`Message`、`Message Scroller`、`Marker`。这些更接近具体 AI 产品界面，不进入通用 admin-ui 当前目标。
