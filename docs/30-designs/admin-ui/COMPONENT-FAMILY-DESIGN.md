# Admin UI Component Family Design

## Component Family Designs

### Form

依据文件：

- `docs/10-specs/COMPONENT-SPEC-FORM.md`
- `docs/10-specs/components/form/SCONE-BUTTON.md`
- `docs/10-specs/components/form/SCONE-INPUT.md`
- `docs/10-specs/components/form/SCONE-SEARCH-INPUT.md`
- `docs/10-specs/components/form/SCONE-PASSWORD-INPUT.md`
- `docs/10-specs/components/form/SCONE-TEXTAREA.md`
- `docs/10-specs/components/form/SCONE-SELECT.md`
- `docs/10-specs/components/form/SCONE-FORM.md`
- `docs/10-specs/components/form/SCONE-FIELD.md`
- `docs/10-specs/components/form/SCONE-FIELD-GROUP.md`
- `docs/10-specs/components/form/SCONE-FORM-SECTION.md`
- `docs/10-specs/components/form/SCONE-FORM-ACTIONS.md`
- `docs/10-specs/components/form/SCONE-COMBOBOX.md`
- `docs/10-specs/components/form/SCONE-SWITCH.md`
- `docs/10-specs/components/form/SCONE-CHECKBOX.md`
- `docs/10-specs/components/form/SCONE-RADIO-GROUP.md`
- `docs/10-specs/components/form/SCONE-NUMBER-INPUT.md`
- `docs/10-specs/components/form/SCONE-SLIDER.md`
- `docs/10-specs/components/form/SCONE-DATE-PICKER.md`
- `docs/10-specs/components/form/SCONE-UPLOAD.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeButton` | `scone-wrapper` | 支持 `asChild` | `src/components/form/button.tsx` | loading / disabled | `src/components/form/button.tsx` |
| `SconeInput` | `scone-wrapper` | 否 | `src/components/form/input.tsx` | disabled / readOnly / invalid via Field | `src/components/form/input.tsx` |
| `SconeSearchInput` | `scone-wrapper` | 否 | `src/components/form/search-input.tsx` | disabled / readOnly / loading / clearable | `src/components/form/search-input.tsx` |
| `SconePasswordInput` | `scone-wrapper` | 否 | `src/components/form/password-input.tsx` | disabled / readOnly / visibility toggle | `src/components/form/password-input.tsx` |
| `SconeTextArea` | `scone-wrapper` | 否 | `src/components/form/textarea.tsx` | disabled / readOnly / autoSize / count | `src/components/form/textarea.tsx` |
| `SconeSelect` | `scone-wrapper` | 支持 | `src/components/form/select.tsx` | disabled / readOnly / invalid / open / selected | `src/components/form/select.tsx`、`src/types/foundation.ts` |
| `SconeForm` | `custom` | 支持 | `src/components/form/form.tsx` | disabled / readOnly / requiredMark | `src/components/form/form.tsx` |
| `SconeField` | `custom` | 支持 | `src/components/form/field.tsx` | invalid / disabled / readOnly / required | `src/components/form/field.tsx` |
| `SconeFieldGroup` | `pattern-only` | 否 | `src/components/form/field-group.tsx` | semantic grouping | `src/components/form/field-group.tsx` |
| `SconeFormSection` | `pattern-only` | 部分 | `src/components/form/form-section.tsx` | section grouping | `src/components/form/form-section.tsx` |
| `SconeFormActions` | `pattern-only` | 部分 | `src/components/form/form-actions.tsx` | sticky / align | `src/components/form/form-actions.tsx` |
| `SconeCombobox` | `scone-wrapper` | 支持 | `src/components/form/combobox.tsx` | loading / empty / selected / expanded | `src/components/form/combobox.tsx`、`src/types/foundation.ts` |
| `SconeSwitch` | `vendored-shadcn` | 否 | `src/components/form/switch.tsx` | checked / disabled / invalid via Field | `src/components/form/switch.tsx` |
| `SconeCheckbox` | `vendored-shadcn` | 否 | `src/components/form/checkbox.tsx` | checked / indeterminate / disabled / invalid via Field | `src/components/form/checkbox.tsx` |
| `SconeRadioGroup` | `vendored-shadcn` | 支持 | `src/components/form/radio-group.tsx` | selected / disabled / invalid via Field | `src/components/form/radio-group.tsx`、`src/types/foundation.ts` |
| `SconeNumberInput` | `custom` | 否 | `src/components/form/number-input.tsx` | disabled / readOnly / invalid | `src/components/form/number-input.tsx` |
| `SconeSlider` | `vendored-shadcn` | 支持 | `src/components/form/slider.tsx` | selected range / disabled / invalid via Field | `src/components/form/slider.tsx` |
| `SconeDatePicker` | `custom` | 否 | `src/components/form/date-picker.tsx` | open / disabled / readOnly / invalid | `src/components/form/date-picker.tsx` |
| `SconeUpload` | `custom` | 否 | `src/components/form/upload.tsx` | files / disabled / reject | `src/components/form/upload.tsx` |

状态模型：

- 输入值统一以 `value/defaultValue/onValueChange` 表达，原生 `onChange` 仅作为 DOM event 透传。
- 打开状态统一以 `open/defaultOpen/onOpenChange` 表达，适用于 Select、Combobox、DatePicker。
- 勾选状态统一以 `checked/defaultChecked/onCheckedChange` 表达，适用于 Switch、Checkbox。
- `SconeForm` 提供表单级 `disabled`、`readOnly` 和 `requiredMark` context；字段级 props 可覆盖表单级值。
- `SconeField` 负责 label、description、message、invalid、required、disabled、readOnly 的 ARIA 关联和状态传播。
- `loading` 在 Button/SearchInput/Combobox 等操作或局部选择场景中只表达 UI 等待，不发起请求。

DOM/ref/className 边界：

- `SconeButton` ref 指向 button 或 `asChild` child 的稳定交互元素；`className` 透传到可交互根节点。
- 文本输入、SearchInput、PasswordInput、TextArea、NumberInput ref 指向原生 input/textarea。
- Select、Combobox、DatePicker ref 指向 trigger/input 的稳定交互边界，浮层内容 slot 单独接受样式边界。
- `SconeField.Root` ref 指向字段容器；`SconeField.Control` 使用 Slot/asChild 向 control 注入 id、ARIA 和状态。
- Form helpers ref 指向语义容器，不创建额外业务层。

可访问性边界：

- 输入控件必须可通过 label 查询；无可见 label 时必须提供 `ariaLabel`。
- `SconeField.Label` 的 `htmlFor` 指向 `fieldId`；非 labelable trigger 使用 `aria-labelledby`。
- `SconeField.Description` 和 `SconeField.Message` 的 id 必须合并到 control 的 `aria-describedby`。
- invalid 时 control 必须有 `aria-invalid=true` 或 Radix trigger 的等价 ARIA/data 状态。
- required 必须体现在 label 标记和 control 的 `aria-required` 或原生 `required`。
- Checkbox、Switch、RadioGroup、Slider、Select、Combobox、DatePicker 必须保留键盘操作。

Source strategy 处理：

- `scone-wrapper` 组件只补充 Admin 语义、token、size、loading、ariaLabel、Field 状态关联和稳定 slot，不破坏底层 ref/asChild/ARIA。
- `vendored-shadcn` 组件只调整 token、density、class 边界，保留 Radix checked/value/keyboard 语义。
- `custom` 组件必须在实现前补齐键盘、ARIA、受控/非受控和边界条件测试，尤其是 Form/Field、NumberInput、DatePicker、Upload。
- `pattern-only` Form helpers 只表达结构，不内置保存、请求、路由、权限、校验规则对象或业务文案。

验证点：

- `src/components/form/form.test.tsx` 验证 Form/Field label、description、message、required、disabled、readOnly 和 invalid 传播。
- Form 组件测试按组件文件同目录放置，验证各控件的受控值、默认值、回调、ref、className、可访问名称和核心键盘行为。
- Upload 验证 `accept`、`multiple`、`maxFiles`、`maxSize`、`beforeAdd`、`onReject` 和 disabled 行为。
- DatePicker 验证键盘打开、选择、关闭、`disabledDate` 和 Field 错误关联。

明确非目标：

- 不绑定 React Hook Form、Formik 或自研 store。
- 不提供 AntD Form 风格全局 `form` 实例和 rules 系统。
- 不内置请求、字典加载、权限判断、业务校验规则或保存文案。
- 不用 placeholder 替代 label。

### Data Display

依据文件：

- `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`
- `docs/10-specs/components/data-display/SCONE-DESCRIPTIONS.md`
- `docs/10-specs/components/data-display/SCONE-TABLE.md`
- `docs/10-specs/components/data-display/SCONE-CARD.md`
- `docs/10-specs/components/data-display/SCONE-TAG.md`
- `docs/10-specs/components/data-display/SCONE-BADGE.md`
- `docs/10-specs/components/data-display/SCONE-LIST.md`
- `docs/10-specs/components/data-display/SCONE-TYPOGRAPHY.md`
- `docs/10-specs/components/data-display/SCONE-STATISTIC.md`
- `docs/10-specs/components/data-display/SCONE-TIMELINE.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeDescriptions` | `custom` | 否 | `src/components/data-display/descriptions.tsx` | density / bordered | `src/types/foundation.ts`、组件文件 |
| `SconeTable` | `scone-wrapper` | 否 | `src/components/data-display/table.tsx` | loading / empty / error | `src/types/foundation.ts`、组件文件 |
| `SconeCard` | `scone-wrapper` | 否 | `src/components/data-display/card.tsx` | loading | `src/components/data-display/card.tsx` |
| `SconeTag` | `custom` | 否 | `src/components/data-display/tag.tsx` | tone / closable | `src/components/data-display/tag.tsx` |
| `SconeBadge` | `custom` | 否 | `src/components/data-display/badge.tsx` | count / dot / tone | `src/components/data-display/badge.tsx` |
| `SconeList` | `custom` | 否 | `src/components/data-display/list.tsx` | loading / empty / error | `src/components/data-display/list.tsx`、`src/types/foundation.ts` |
| `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` | `custom` | 否 | `src/components/data-display/typography.tsx` | tone / truncate | `src/components/data-display/typography.tsx` |
| `SconeStatistic` | `custom` | 否 | `src/components/data-display/statistic.tsx` | tone | `src/components/data-display/statistic.tsx` |
| `SconeTimeline` | `custom` | 否 | `src/components/data-display/timeline.tsx` | event sequence | `src/types/foundation.ts`、组件文件 |

状态模型：

- Table 和 List 的数据状态优先级固定为 `loading > error > empty`。
- Card 的 `loading` 是 region loading，必须保留内容容器尺寸并可设置 `aria-busy`。
- Descriptions 不使用 disabled input 表达只读详情；编辑态交给 Form/Field。
- Tag/Badge 的 `tone` 只表达语义色，业务枚举到 `tone` 的映射由调用方处理。
- Timeline 只表达通用事件序列，不承载审批、权限或业务状态机。

DOM/ref/className 边界：

- `SconeTable` ref 指向 table 外层稳定容器或 table 元素，具体边界需在实现前固定；`className` 透传到表格根容器。
- `SconeDescriptions` ref 指向 descriptions 根容器；item className 仅影响项级样式。
- `SconeCard` ref 指向 card 根容器，`actions`、`footer` 是稳定 slot。
- Tag、Badge、Statistic、Typography ref 指向根文本或展示元素。
- `SconeTimeline` ref 指向 timeline 根容器，item click 不作为业务动作执行器。

可访问性边界：

- Table 无外部标题时必须提供 `ariaLabel`。
- Table 操作列应有明确列标题或 `ariaLabel`；危险动作使用 `destructive` 并配合 Confirm recipe。
- Badge `dot` 不能只靠颜色传递状态，必须通过相邻文本、`ariaLabel` 或被标记对象的可读状态说明补足语义。
- Typography 保持语义 HTML 和可读对比度，不内置业务文案样式。
- Timeline item 的时间、标题和描述必须可读，时间格式由调用方处理。

Source strategy 处理：

- `SconeTable` 可复用 shadcn Table 的基础结构和 token，但不暴露 TanStack 实例，不复制 AntD Table API。
- `custom` 数据展示组件必须明确 item/column 数据结构、density、状态展示和 ref/className 边界。
- Card/Alert/Empty/Loading/Progress 等视觉容器和反馈组件在各自组件族中处理；Data Display 只处理业务中性展示。

验证点：

- Data Display 组件测试按组件文件同目录放置，验证 Table/List 的 `loading > error > empty` 优先级。
- 验证 Table columns、rowKey、cell render、横向 scroll、行操作列可访问名称和 ref/className。
- 验证 Descriptions columns 的 `ResponsiveValue<number>`、density、label 可读文本和长文本换行。
- 验证 Badge dot 的 `ariaLabel` 要求、Tag closable 的 `onClose`、Typography 的语义标签和 truncate。
- 验证 Timeline items、pending、reverse 和 `onItemClick` 不承载业务状态机。

明确非目标：

- 不绑定业务数据模型、请求协议、权限判断或路由。
- 基础 `SconeTable` 不内置筛选、toolbar、pagination controls、selection checkbox column、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。
- 不用 disabled input 伪装只读详情。
- 不在 Badge/Tag 内写入业务枚举含义。

### Layout

依据文件：

- `docs/10-specs/COMPONENT-SPEC-LAYOUT.md`
- `docs/10-specs/components/layout/SCONE-STACK.md`
- `docs/10-specs/components/layout/SCONE-INLINE.md`
- `docs/10-specs/components/layout/SCONE-COMPACT.md`
- `docs/10-specs/components/layout/SCONE-TOOLBAR.md`
- `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md`
- `docs/10-specs/components/layout/SCONE-SEPARATOR.md`
- `docs/10-specs/components/layout/SCONE-SCROLL-AREA.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeStack` | `custom` | 否 | `src/components/layout/stack.tsx` | 不承载业务状态 | `src/components/layout/stack.tsx`、`src/types/foundation.ts` |
| `SconeInline` | `custom` | 否 | `src/components/layout/inline.tsx` | 不承载业务状态 | `src/components/layout/inline.tsx`、`src/types/foundation.ts` |
| `SconeCompact` | `custom` | 否 | `src/components/layout/compact.tsx` | 不承载业务状态 | `src/components/layout/compact.tsx` |
| `SconeToolbar` | `custom` | 否 | `src/components/layout/toolbar.tsx` | density | `src/components/layout/toolbar.tsx`、`src/types/foundation.ts` |
| `SconeSplitPane` | `custom` | 否 | `src/components/layout/split-pane.tsx` | size preset / resize | `src/components/layout/split-pane.tsx` |
| `SconeSeparator` | `vendored-shadcn` | 否 | `src/components/layout/separator.tsx` | decorative / orientation | `src/components/layout/separator.tsx` |
| `SconeScrollArea` | `vendored-shadcn` | 支持 viewport slot | `src/components/layout/scroll-area.tsx` | 局部滚动 | `src/components/layout/scroll-area.tsx` |

状态和职责边界：

- Layout 组件只负责空间、排列、分隔、局部滚动和区域组织，不表达业务状态。
- `gap`、`density`、`sizePreset` 等 props 必须引用 Foundation token 或 preset，不把任意 number 作为主 API。
- Toolbar 只解决 `start` / `end` / `children` 布局，不内置 selected count、filter open、权限逻辑或页面标题。
- SplitPane 只表达布局尺寸和拖拽交互，不内置选中项、数据加载或主从视图状态。
- ScrollArea 是局部滚动容器；页面主滚动由 Page Pattern 承担。

DOM/ref/className 边界：

- Stack、Inline、Compact、Toolbar ref 指向根布局容器；`className` 和 `style` 只做局部覆盖。
- Separator ref 指向 Radix/shadcn separator 根元素，保留 decorative 和 orientation 语义。
- ScrollArea ref 指向根容器，`viewportClassName` 指向 viewport slot，`onScroll` 绑定 viewport。
- SplitPane ref 指向 split 根容器，resize handle 的 DOM 边界由组件内部稳定维护。

可访问性边界：

- Separator 默认可作为装饰性分隔，不表达语义分段；语义分段使用 Section/FormSection。
- SplitPane 必须定义 handle 键盘操作、ARIA orientation 和当前尺寸语义。
- ScrollArea 不得造成多层主滚动；sticky header/footer 必须绑定同一滚动上下文。
- Toolbar 窄屏允许换行，主操作保留可见，次要操作进入 Dropdown。

验证点：

- Layout 组件测试按组件文件同目录放置，验证 token gap、wrap、density、orientation、ref/className 和 viewport slot。
- 验证 SplitPane 的 preset、min/max、键盘 resize 和 CSS 长度覆盖必须带单位。
- 验证 ScrollArea 必须有明确高度来源，且 `onScroll` 来自 viewport。

明确非目标：

- 不提供 `ListPage`、`PageShell`、`FilterPanel`、`BatchActionBar`。
- 不用 Card 或旧 Panel 代替 Page/Section 管页面空间。
- 不在 body、main、PageContent、Table 多层同时设置主滚动。

### Feedback And Overlay

依据文件：

- `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DRAWER.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DIALOG.md`
- `docs/10-specs/components/feedback-overlay/SCONE-CONFIRM.md`
- `docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`
- `docs/10-specs/components/feedback-overlay/SCONE-EMPTY.md`
- `docs/10-specs/components/feedback-overlay/SCONE-LOADING.md`
- `docs/10-specs/components/feedback-overlay/SCONE-PROGRESS.md`
- `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`
- `docs/10-specs/components/feedback-overlay/SCONE-NOTIFICATION.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeDrawer` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/drawer.tsx` | open / loading / close reason | 组件文件、`src/types/foundation.ts` |
| `SconeDialog` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/dialog.tsx` | open / close reason | 组件文件、`src/types/foundation.ts` |
| `SconeConfirm` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/confirm.tsx` | open / loading / destructive | 组件文件 |
| `SconeAlert` | `scone-wrapper` | 否 | `src/components/feedback-overlay/alert.tsx` | tone / action | 组件文件、`src/types/foundation.ts` |
| `SconeEmpty` | `scone-wrapper` | 否 | `src/components/feedback-overlay/empty.tsx` | empty / action | 组件文件 |
| `SconeLoading` | `scone-wrapper` | 否 | `src/components/feedback-overlay/loading.tsx` | loading | 组件文件 |
| `SconeProgress` | `scone-wrapper` | 否 | `src/components/feedback-overlay/progress.tsx` | status / percent | 组件文件、`src/types/foundation.ts` |
| `SconeToastProvider`、`toast` | `scone-wrapper` | Provider | `src/components/feedback-overlay/toast.tsx` | queued feedback | 组件文件 |
| `SconeNotificationProvider`、`notification` | `scone-wrapper` | Provider | `src/components/feedback-overlay/notification.tsx` | persistent notice | 组件文件 |

状态模型：

- Drawer/Dialog 使用 `open/defaultOpen/onOpenChange` 桥接 Radix 状态。
- Drawer/Dialog 额外提供 `onRequestClose(reason)` 表达用户请求关闭，不自动改变 `open`。
- `OverlayCloseReason` 使用 Foundation 中的 `escape`、`outside`、`closeButton`、`footerAction`、`programmatic`。
- Confirm 的 `onConfirm` 不执行业务删除、权限判断或请求；异步期间外部 `loading` 防止重复提交。
- Toast/Notification service 只管理 UI 队列和关闭，不承载持久化、订阅来源或已读状态。

DOM/ref/className 边界：

- Drawer/Dialog/Confirm ref 指向浮层 content；trigger、overlay、content、footer slot 的 className 边界按组件实现固定。
- Alert、Empty、Loading、Progress ref 指向状态容器。
- Toast/Notification provider 挂载队列 viewport；service function 不暴露内部 store。

可访问性边界：

- 浮层必须有可见标题或 `ariaLabel`。
- 保留 Radix/shadcn focus trap、focus restore、Escape、outside interaction 和 ARIA 行为。
- Drawer 长内容必须有明确滚动区域，footer 固定。
- Confirm 默认焦点应落在取消或安全动作上；危险确认必须有 description。
- Alert 错误信息必须可读，不只展示错误码。
- Loading 区域设置 `aria-busy`；Progress 使用可量化进度语义。

验证点：

- Feedback And Overlay 组件测试按组件文件同目录放置，验证 focus trap/restore、Escape/outside/close button reason、ariaLabel/title。
- 验证 Confirm 异步确认防重复、destructive 与 description。
- 验证 Toast/Notification provider/service API、稳定 id、队列和 placement。
- 验证 Alert/Empty/Loading/Progress 的状态语义和可访问性。

明确非目标：

- 不用 Dialog 承载长表单或复杂数据表。
- 不自写 focus trap、Escape 关闭或 ARIA role 替代 Radix。
- 不内置 dirty 判断、二次确认、请求、权限、路由、通知订阅、持久化或业务确认文案。

### Navigation

依据文件：

- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`
- `docs/10-specs/components/navigation/SCONE-BREADCRUMB.md`
- `docs/10-specs/components/navigation/SCONE-PAGINATION.md`
- `docs/10-specs/components/navigation/SCONE-TABS.md`
- `docs/10-specs/components/navigation/SCONE-SEGMENTED.md`
- `docs/10-specs/components/navigation/SCONE-TREE.md`
- `docs/10-specs/components/navigation/SCONE-DROPDOWN.md`
- `docs/10-specs/components/navigation/SCONE-MENU.md`
- `docs/10-specs/components/navigation/SCONE-TOOLTIP.md`
- `docs/10-specs/components/navigation/SCONE-COMMAND.md`
- `docs/10-specs/components/navigation/SCONE-ACCORDION.md`
- `docs/10-specs/components/navigation/SCONE-COLLAPSIBLE.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeBreadcrumb` | `vendored-shadcn` | 支持 | `src/components/navigation/breadcrumb.tsx` | current | `src/types/foundation.ts`、组件文件 |
| `SconePagination` | `custom` | 否 | `src/components/navigation/pagination.tsx` | disabled / page state | `src/types/foundation.ts` |
| `SconeTabs` | `vendored-shadcn` | 支持 | `src/components/navigation/tabs.tsx` | selected | 组件文件、`src/types/foundation.ts` |
| `SconeSegmented` | `vendored-shadcn` | 支持 | `src/components/navigation/segmented.tsx` | selected / disabled | 组件文件、`src/types/foundation.ts` |
| `SconeTree` | `custom` | 否 | `src/components/navigation/tree.tsx` | selected / checked / expanded | `src/types/foundation.ts`、组件文件 |
| `SconeDropdown` | `vendored-shadcn` | 支持 | `src/components/navigation/dropdown.tsx` | open / action select | `src/types/foundation.ts`、组件文件 |
| `SconeMenu` | `vendored-shadcn` 或自研 menu/list navigation | 支持 | `src/components/navigation/menu.tsx` | selected / expanded / collapsed | `src/types/foundation.ts`、组件文件 |
| `SconeTooltip` | `vendored-shadcn` | 支持 | `src/components/navigation/tooltip.tsx` | hover / focus | 组件文件 |
| `SconeCommand` | `scone-wrapper` | 支持 | `src/components/navigation/command.tsx` | loading / empty / selected | `src/types/foundation.ts`、组件文件 |
| `SconeAccordion` | `vendored-shadcn` | 支持 | `src/components/navigation/accordion.tsx` | expanded | `src/types/foundation.ts`、组件文件 |
| `SconeCollapsible` | `vendored-shadcn` | 支持 | `src/components/navigation/collapsible.tsx` | expanded | 组件文件 |

状态模型：

- Tabs、Segmented、Accordion 使用 `value/defaultValue/onValueChange` 或底层 Radix 等价模型。
- Dropdown、Tooltip、Collapsible 使用 `open/defaultOpen/onOpenChange`。
- Pagination 使用 `SconePaginationState` 和 `SconePaginationChangeReason`，只表达分页状态，不发起请求。
- Menu 只表达 UI 选中和展开，不等同权限或 URL 解析。
- Tree 以 `selectedKeys`、`checkedKeys`、`expandedKeys` 表达状态；异步加载、虚拟滚动、拖拽和 TreeSelect 不进入基础 Tree。

DOM/ref/className 边界：

- Breadcrumb、Tabs、Segmented、Dropdown、Menu、Tooltip、Accordion、Collapsible 保留底层 Radix/shadcn DOM 和 ref 语义。
- Tree ref 指向 tree 根容器，节点 DOM 边界必须稳定支持 roving focus。
- Command ref 指向 command 根容器或输入区域，item className 只影响可搜索项。
- Pagination ref 指向 nav 容器，按钮和 page item DOM 边界由组件内部稳定维护。

可访问性边界：

- Breadcrumb 最后一项默认 `aria-current="page"`。
- Tabs trigger/content 必须通过 ARIA 关联；manual 模式下焦点移动不自动切换内容。
- Segmented 当前项 selected 状态可查询；选项文案必须短。
- Dropdown 保留 roving focus、typeahead、Escape 关闭和焦点恢复。
- Tooltip 只放短解释，不放错误文案、表单说明、按钮或复杂交互。
- Tree 必须实现 ARIA tree、roving focus、方向键展开/收起、Home/End、checked/selected 状态。

验证点：

- Navigation 组件测试按组件文件同目录放置，验证受控状态、键盘交互、ARIA 关联、focus restore、selected/expanded 状态。
- Tree 单独验证 selected/checked/expanded、disabled 节点、Home/End 和方向键模型。
- Pagination 验证 pageSize 变化提交 `{ page: 1, pageSize, total }`。
- Command 验证输入过滤、方向键移动、Enter 选择、empty/loading 状态。

明确非目标：

- 不内置路由、权限过滤、菜单数据加载、URL 匹配或产品身份。
- Dropdown 不表达表单值，表单选值使用 Select/Combobox。
- Tabs 不做全局导航或路由系统。
- Tooltip 不承载必读说明、错误原因或可点击内容。

### Media

依据文件：

- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`
- `docs/10-specs/components/media/SCONE-IMAGE.md`
- `docs/10-specs/components/media/SCONE-AVATAR.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeImage` | `vendored-shadcn` | 否 | `src/components/media/image.tsx` | fallback / preview open | `src/components/media/image.tsx` |
| `SconeAvatar` | `vendored-shadcn` | 否 | `src/components/media/avatar.tsx` | fallback | `src/components/media/avatar.tsx` |

状态模型：

- Image preview 使用 `previewOpen/defaultPreviewOpen/onPreviewOpenChange`。
- Image 加载失败必须展示 fallback，不能只留下破图图标。
- Avatar 图片失败时必须显示 fallback 或 icon。
- Avatar 不内置在线状态、业务角色、权限标识或跳转行为。

DOM/ref/className 边界：

- Image ref 指向图片或图片容器的稳定边界，preview content 使用 overlay 规则。
- Avatar ref 指向 avatar 根容器，fallback/icon slot 必须尺寸稳定。
- `className` 透传到根容器，图片尺寸通过 `width`/`height` 稳定布局。

可访问性边界：

- Image `alt` 必须传入；装饰性图片由调用方显式传空字符串。
- Avatar `alt` 必须描述头像或对象标识；fallback 应短且稳定。
- preview 不绑定业务鉴权、下载或图片处理服务。

验证点：

- Media 组件测试按组件文件同目录放置，验证 alt、fallback、load/error、preview open 和尺寸稳定性。
- 验证 Avatar fallback 不造成布局跳动。

明确非目标：

- 品牌标识不使用 Avatar，按 Logo Recipe 组合。
- Image 不绑定业务鉴权、下载、转码、裁剪或图片处理服务。
