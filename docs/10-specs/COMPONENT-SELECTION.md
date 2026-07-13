# Component Selection Guide

## Purpose

本文档是当前 `admin-ui` SPEC 的实现范围和选择指南。表中出现的组件、Layout、Admin Pattern 和 Recipe 均视为当前可实现、可导出或可按文档组合验证的能力。

权威术语以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准；不纳入当前范围的原因见 [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md)。

## Selection Rules

| 场景           | 使用                      | 不使用                |
| -------------- | ------------------------- | --------------------- |
| 分组展示       | `SconeCard`               | `Section`             |
| 页面结构分段   | `Section` Pattern         | `SconeCard`           |
| 长表单编辑     | `SconeDrawer` 或 FormPage | Dialog                |
| 单值输入       | `SconeSelect`             | Dropdown              |
| 基础表格       | `SconeTable`              | DataTable Pattern     |
| 列表管理页表格 | DataTable Pattern         | `SconeTable` 单独承担 |
| 未知时长等待   | `SconeLoading`            | `SconeProgress`       |
| 可量化进度     | `SconeProgress`           | Loading               |
| 空数据         | `SconeEmpty`              | Alert                 |
| 错误提示       | `SconeAlert`              | Empty                 |
| 字段布局       | `SconeField`              | `SconeForm`           |
| 表单语义容器   | `SconeForm`               | FieldGroup            |
| 分页           | `SconePagination`         | Table 内部请求        |
| 语义分段       | Section                   | Separator             |
| 局部滚动       | `SconeScrollArea`         | PageContent 主滚动    |
| 大量选项搜索选择 | `SconeCombobox`          | `SconeSelect` 承担搜索 |
| 命令搜索       | `SconeCommand`            | Dropdown               |
| 命令或更多操作 | `SconeDropdown` / Menu    | Select                 |
| 短辅助提示     | `SconeTooltip`            | 错误说明或必读文案    |
| 内容视图切换   | `SconeTabs`               | 全局导航               |
| 轻量模式切换   | `SconeSegmented`          | Tabs                   |
| 短暂反馈       | `SconeToast`              | Alert                  |
| 系统通知       | `SconeNotification`       | Toast                  |
| 单选比较       | `SconeRadioGroup`         | Select                 |
| 精确数字       | `SconeNumberInput`        | Input 文本解析         |
| 粗略范围调节   | `SconeSlider`             | NumberInput 单独承担   |
| 位置路径       | `SconeBreadcrumb`         | Menu                   |
| 多区域折叠     | `SconeAccordion`          | Collapsible            |
| 单区域折叠     | `SconeCollapsible`        | Accordion              |

## Capability Matrix

| 组件/能力                              | 层级          | Source strategy     | `Scone*` export | Compound | 状态能力                                 | SPEC 状态 |
| -------------------------------------- | ------------- | ------------------- | --------------- | -------- | ---------------------------------------- | --------- |
| Button                                 | Component     | `scone-wrapper`     | 是              | 支持     | loading / disabled                       | 可实现    |
| Input / Search / Password / TextArea   | Component     | `scone-wrapper`     | 是              | 否       | disabled / readOnly / invalid via Field  | 可实现    |
| Select                                 | Component     | `scone-wrapper`     | 是              | 支持     | disabled / readOnly / invalid via Field  | 可实现    |
| Field / Form                           | Component     | `custom`            | 是              | 支持     | invalid / disabled / readOnly / required | 可实现    |
| Form helpers                           | Pattern helper | `pattern-only`      | 是              | 部分     | sticky / section / grouping              | 可实现    |
| Stack / Inline / Compact / Toolbar     | Layout        | `custom`            | 是              | 否       | 不承载业务状态                           | 可实现    |
| Separator / ScrollArea                 | Layout        | `vendored-shadcn`   | 是              | ScrollArea 支持 | 不承载业务状态                    | 可实现    |
| SplitPane                              | Layout        | `custom`            | 是              | 否       | 不承载业务状态                           | 可实现    |
| Page / Section / FilterBar / DataTable | Admin Pattern | `pattern-only`      | Pattern parts   | 支持     | data / sticky / selection 按 Pattern     | 可实现    |
| Table                                  | Component     | `scone-wrapper`     | 是              | 否       | standalone loading / empty / error       | 可实现    |
| Pagination                             | Component     | `custom`            | 是              | 否       | disabled                                 | 可实现    |
| Drawer                                 | Component     | `scone-wrapper`     | 是              | 支持     | loading / close reason                   | 可实现    |
| Card / Alert / Empty / Loading / Progress | Component  | `scone-wrapper`     | 是              | 否       | loading / empty / error                  | 可实现    |
| Descriptions / Tag / Badge / List / Typography / Statistic | Component | `custom` | 是 | 否 | empty / loading 按组件适用 | 可实现 |
| Switch / Checkbox                      | Component     | `vendored-shadcn`   | 是              | 否       | checked / disabled / invalid via Field   | 可实现    |
| RadioGroup / Slider                    | Component     | `vendored-shadcn`   | 是              | 支持     | selected / disabled / invalid via Field  | 可实现    |
| NumberInput / DatePicker / Upload      | Component     | `custom`            | 是              | 否       | disabled / readOnly / invalid via Field  | 可实现    |
| Combobox / Command                     | Component     | `scone-wrapper`     | 是              | 支持     | loading / empty / selected / expanded    | 可实现    |
| Breadcrumb / Tabs / Dropdown / Menu    | Component     | `vendored-shadcn`   | 是              | 支持     | selected / expanded                      | 可实现    |
| Segmented / Accordion / Collapsible    | Component     | `vendored-shadcn`   | 是              | 支持     | selected / expanded                      | 可实现    |
| Tree                                   | Component     | `custom`            | 是              | 否       | selected / checked / expanded            | 可实现    |
| Image / Avatar / Tooltip               | Component     | `vendored-shadcn`   | 是              | Tooltip 支持 | fallback / hover / focus              | 可实现    |
| Dialog / Confirm                       | Component     | `scone-wrapper`     | 是              | 支持     | close reason / loading / destructive     | 可实现    |
| Toast / Notification                   | Component service | `scone-wrapper`  | 是              | Provider | queued feedback / persistent notice      | 可实现    |
| Timeline                                | Component     | `custom`            | 是              | 否       | event sequence                           | 可实现    |
| Popover / Logo / Result                | Recipe        | `direct-docs-only`  | 否              | 使用底层 | 按 recipe 组合                           | 可执行边界 |

矩阵规则：

- 本矩阵是当前实现范围；出现即代表可落代码或可按 Recipe 组合验证，不再设置额外状态门禁。
- `Source strategy` 只说明源码和封装策略，不替代组件语义。
- `pattern-only` 只导出文档定义的 compound parts，不导出万能配置对象。
- `direct-docs-only` 不产生 `Scone*` wrapper，只提供使用边界、token 约束和可测试组合。

## Export Groups

| 归属                  | 导出/标题                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin Pattern exports | `Page.Root/Header/Content/StickyActions`、`Section.Root/Header/Content/Footer`、`DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` |
| Typography            | `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`                                                                                        |
| Form components       | `SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`                      |
| Form helpers          | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`                                                                                             |
| Additional form inputs | `SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`              |
| Layout primitives     | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`                                    |
| Data display          | `SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`                              |
| Navigation and media  | `SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar` |
| Feedback              | `SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification` |
| Recipes               | DrawerForm Recipe、ConfirmationFlow Recipe、Popover Recipe、Logo Recipe、Result Recipe、Dashboard Metric、Grid Recipe                                |

## State Matrix

| 组件族                              | loading    | empty      | error                     | disabled       | readOnly | invalid  | selected       | expanded |
| ----------------------------------- | ---------- | ---------- | ------------------------- | -------------- | -------- | -------- | -------------- | -------- |
| Button                              | 支持       | 不适用     | 不适用                    | 支持           | 不适用   | 不适用   | 不适用         | 不适用   |
| Input / Select / Combobox            | 可选       | Combobox 支持 | 通过 Field              | 支持           | 支持     | 支持     | Select/Combobox 支持 | Select/Combobox 支持 |
| Form / Field                        | 表单级可选 | 不适用     | 支持                      | 可传播         | 可传播   | 支持     | 不适用         | 不适用   |
| Table / List                        | 支持       | 支持       | 支持                      | 行动作自行处理 | 不适用   | 不适用   | DataTable 支持 | 不适用   |
| Switch / Checkbox / RadioGroup / Slider | 不适用 | 不适用 | 通过 Field | 支持 | 不适用 | 支持 | 支持 | 不适用 |
| NumberInput / DatePicker / Upload    | 可选       | 不适用     | 通过 Field 或 Alert       | 支持           | 支持     | 支持     | 不适用         | DatePicker 支持 |
| Navigation / Menu / Tree             | 可选       | Command 支持 | 不适用                  | 支持项级       | 不适用   | 不适用   | 支持           | 支持     |
| Drawer / Dialog / Confirm            | 区域级可选 | 不适用     | 通过内容组合              | 可禁用操作     | 不适用   | 通过表单 | 不适用         | 不适用   |
| Alert / Empty / Loading / Progress / Toast / Notification | 自身表达 | Empty 表达 | Alert/Progress/Toast/Notification 表达 | 不适用 | 不适用 | 不适用 | 不适用 | 不适用 |

## Anti-patterns

- 用 Card 包住整页，再在内部嵌套多个 Card 制造层级。
- 用 Dialog 承载长表单、复杂表格或需要持续编辑的任务。
- 用 Select 表达“更多操作”或导航动作。
- 用 Tooltip 放错误原因、规则说明或按钮。
- 把 Table 的 `onChange` 设计成排序、筛选、分页、选择、请求的万能入口。
- 把 React Hook Form、接口请求或权限判断写入基础 Form。
- 为每个 `shadcn/ui` 组件创建没有额外语义的 `Scone*` wrapper。
