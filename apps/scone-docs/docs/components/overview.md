---
title: 组件总览
sidebar_position: 1
---

# 组件总览

`scone-ui` 提供后台管理界面所需的组件、页面 Pattern 和反馈服务。分类用于导航；真实导出、props 和事件以当前安装包的 `dist/index.d.ts` 为准。

生成业务界面时，先选公共 API，再确认类型。

## 文档结构

- 分类总览：选择规则、能力边界、反模式。
- 单组件页：导入方式、Props、Service API、使用规则。
- Pattern / Recipe：页面组合方式，不代表新增 `Scone*` 导出。

## 使用入口

<div className="scone-overview-resource-grid">
    <a className="scone-overview-resource-card" href="../guide/quick-start">
        <strong>快速开始</strong>
        <span>安装、样式引入和基础组件示例。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://thundax-lyp.github.io/scone-ui/docs/">
        <strong>文档站</strong>
        <span>公开文档入口。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://github.com/thundax-lyp/scone-ui">
        <strong>GitHub</strong>
        <span>源码、议题和发布包维护入口。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://www.npmjs.com/package/scone-ui">
        <strong>npm</strong>
        <span>查看发布包、版本和安装信息。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://thundax-lyp.github.io/scone-ui/example/">
        <strong>示例站</strong>
        <span>查看组件库在页面中的实际组合方式。</span>
    </a>
</div>

## 通用

通用组件是高频基础表达能力。按钮和排版也会在各自能力分类中出现。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./general"><strong>通用总览</strong><span>按钮、排版和选择边界。</span></a>
    <div className="scone-overview-card"><strong>SconeButton</strong><span>按钮、提交、加载和危险动作入口。</span></div>
    <div className="scone-overview-card"><strong>SconeTypography</strong><span>标题、文本和段落排版能力。</span></div>
</div>

## 布局

布局组件负责间距、对齐、滚动和局部区域结构；页面结构使用 Pattern。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./layout"><strong>布局总览</strong><span>空间、排列、滚动和分隔面板规则。</span></a>
    <div className="scone-overview-card"><strong>SconeStack</strong><span>垂直排列。</span></div>
    <div className="scone-overview-card"><strong>SconeInline</strong><span>水平排列。</span></div>
    <div className="scone-overview-card"><strong>SconeCompact</strong><span>紧凑控件组合。</span></div>
    <div className="scone-overview-card"><strong>SconeToolbar</strong><span>工具栏布局。</span></div>
    <div className="scone-overview-card"><strong>SconeScrollArea</strong><span>滚动区域。</span></div>
    <div className="scone-overview-card"><strong>SconeSeparator</strong><span>视觉分隔。</span></div>
    <div className="scone-overview-card"><strong>SconeSplitPane</strong><span>分隔面板。</span></div>
</div>

## 导航

导航组件负责路径、菜单、分页、标签页、树和命令入口；路由跳转由调用方应用接入。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./navigation"><strong>导航总览</strong><span>导航、菜单、命令和切换组件的选择规则。</span></a>
    <div className="scone-overview-card"><strong>SconeBreadcrumb</strong><span>路径面包屑。</span></div>
    <div className="scone-overview-card"><strong>SconePagination</strong><span>分页控制。</span></div>
    <div className="scone-overview-card"><strong>SconeTabs</strong><span>局部视图切换。</span></div>
    <div className="scone-overview-card"><strong>SconeSegmented</strong><span>分段选择。</span></div>
    <div className="scone-overview-card"><strong>SconeTree</strong><span>树形数据。</span></div>
    <div className="scone-overview-card"><strong>SconeDropdown</strong><span>下拉菜单。</span></div>
    <div className="scone-overview-card"><strong>SconeDropdownItem</strong><span>下拉菜单项。</span></div>
    <div className="scone-overview-card"><strong>SconeDropdownLabel</strong><span>下拉分组标签。</span></div>
    <div className="scone-overview-card"><strong>SconeDropdownSeparator</strong><span>下拉分隔线。</span></div>
    <div className="scone-overview-card"><strong>SconeMenu</strong><span>导航菜单。</span></div>
    <div className="scone-overview-card"><strong>SconeCommand</strong><span>命令面板。</span></div>
    <div className="scone-overview-card"><strong>SconeTooltip</strong><span>文字提示。</span></div>
    <div className="scone-overview-card"><strong>SconeAccordion</strong><span>手风琴折叠。</span></div>
    <div className="scone-overview-card"><strong>SconeCollapsible</strong><span>可折叠区域。</span></div>
</div>

## 数据录入

数据录入组件负责收集、编辑和提交结构化信息；业务校验和请求留在调用方。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./data-entry"><strong>数据录入总览</strong><span>表单、字段和输入控件合同。</span></a>
    <div className="scone-overview-card"><strong>SconeButton</strong><span>按钮、提交、加载和危险动作入口。</span></div>
    <div className="scone-overview-card"><strong>SconeInput</strong><span>单行文本输入。</span></div>
    <div className="scone-overview-card"><strong>SconeSearchInput</strong><span>搜索输入和查询触发。</span></div>
    <div className="scone-overview-card"><strong>SconePasswordInput</strong><span>密码输入与可见性切换。</span></div>
    <div className="scone-overview-card"><strong>SconeTextArea</strong><span>多行文本输入。</span></div>
    <div className="scone-overview-card"><strong>SconeNumberInput</strong><span>数字输入。</span></div>
    <div className="scone-overview-card"><strong>SconeSelect</strong><span>选项选择。</span></div>
    <div className="scone-overview-card"><strong>SconeCombobox</strong><span>可搜索选择。</span></div>
    <div className="scone-overview-card"><strong>SconeCheckbox</strong><span>二元或多选项。</span></div>
    <div className="scone-overview-card"><strong>SconeRadioGroup</strong><span>互斥选项组。</span></div>
    <div className="scone-overview-card"><strong>SconeSwitch</strong><span>开关状态。</span></div>
    <div className="scone-overview-card"><strong>SconeSlider</strong><span>范围或数值滑动输入。</span></div>
    <div className="scone-overview-card"><strong>SconeDatePicker</strong><span>日期选择。</span></div>
    <div className="scone-overview-card"><strong>SconeUpload</strong><span>文件选择和上传 UI 桥接。</span></div>
    <div className="scone-overview-card"><strong>SconeForm</strong><span>表单容器和提交边界。</span></div>
    <div className="scone-overview-card"><strong>SconeField</strong><span>标签、控件、说明和错误消息组合。</span></div>
    <div className="scone-overview-card"><strong>SconeFieldGroup</strong><span>相关字段分组。</span></div>
    <div className="scone-overview-card"><strong>SconeFormSection</strong><span>表单区块。</span></div>
    <div className="scone-overview-card"><strong>SconeFormActions</strong><span>表单操作区。</span></div>
</div>

## 数据展示

数据展示组件负责表格、详情、列表、标签、指标和文本内容；数据获取和权限过滤留在调用方。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./data-display"><strong>数据展示总览</strong><span>表格、列表、详情和排版组件规则。</span></a>
    <div className="scone-overview-card"><strong>SconeTable</strong><span>基础表格。</span></div>
    <div className="scone-overview-card"><strong>SconeDescriptions</strong><span>详情字段列表。</span></div>
    <div className="scone-overview-card"><strong>SconeList</strong><span>列表信息展示。</span></div>
    <div className="scone-overview-card"><strong>SconeCard</strong><span>独立内容块。</span></div>
    <div className="scone-overview-card"><strong>SconeTag</strong><span>标签和分类标记。</span></div>
    <div className="scone-overview-card"><strong>SconeBadge</strong><span>状态点、计数和提示徽标。</span></div>
    <div className="scone-overview-card"><strong>SconeStatistic</strong><span>指标数值。</span></div>
    <div className="scone-overview-card"><strong>SconeTimeline</strong><span>事件时间线。</span></div>
    <div className="scone-overview-card"><strong>SconeTypography</strong><span>排版容器。</span></div>
    <div className="scone-overview-card"><strong>SconeTitle</strong><span>标题文本。</span></div>
    <div className="scone-overview-card"><strong>SconeText</strong><span>行内文本。</span></div>
    <div className="scone-overview-card"><strong>SconeParagraph</strong><span>段落文本。</span></div>
</div>

## 反馈和浮层

反馈组件负责结果、提示、加载、进度、对话框、抽屉和全局通知。服务 API 必须配套 Provider。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./feedback"><strong>反馈总览</strong><span>状态、浮层、关闭原因和全局提示服务。</span></a>
    <div className="scone-overview-card"><strong>SconeAlert</strong><span>页内警告和状态提示。</span></div>
    <div className="scone-overview-card"><strong>SconeDialog</strong><span>短流程对话框。</span></div>
    <div className="scone-overview-card"><strong>SconeDrawer</strong><span>侧边抽屉和长表单编辑。</span></div>
    <div className="scone-overview-card"><strong>SconeConfirm</strong><span>确认动作。</span></div>
    <div className="scone-overview-card"><strong>SconeEmpty</strong><span>空状态。</span></div>
    <div className="scone-overview-card"><strong>SconeLoading</strong><span>加载状态。</span></div>
    <div className="scone-overview-card"><strong>SconeProgress</strong><span>进度反馈。</span></div>
    <div className="scone-overview-card"><strong>SconeToastProvider</strong><span>Toast 容器。</span></div>
    <div className="scone-overview-card"><strong>toast</strong><span>全局轻提示服务。</span></div>
    <div className="scone-overview-card"><strong>SconeNotificationProvider</strong><span>通知容器。</span></div>
    <div className="scone-overview-card"><strong>notification</strong><span>全局通知服务。</span></div>
</div>

## 其他

其他分类目前包含头像、图片和公共工具说明。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./media-other"><strong>其他总览</strong><span>头像、图片、Recipe 边界和非目标能力。</span></a>
    <div className="scone-overview-card"><strong>SconeAvatar</strong><span>头像和名称缩写。</span></div>
    <div className="scone-overview-card"><strong>SconeImage</strong><span>图片展示。</span></div>
</div>

## 后台 Pattern

Pattern 是后台页面组合协议，用于页面骨架、筛选、表格区域和内容区块。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./patterns"><strong>Pattern 总览</strong><span>页面骨架、筛选、数据表和区块组合。</span></a>
    <div className="scone-overview-card"><strong>AppShell</strong><span>后台应用框架区域。</span></div>
    <div className="scone-overview-card"><strong>Page</strong><span>页面根、头部、主体和粘性操作。</span></div>
    <div className="scone-overview-card"><strong>Section</strong><span>页面区块。</span></div>
    <div className="scone-overview-card"><strong>FilterBar</strong><span>筛选条件、搜索和摘要。</span></div>
    <div className="scone-overview-card"><strong>DataTable</strong><span>管理页数据表、工具栏、筛选和分页组合。</span></div>
    <a className="scone-overview-card scone-overview-link-card" href="./recipes"><strong>Recipes</strong><span>DrawerForm、ConfirmationFlow、Popover、Result 等组合示例边界。</span></a>
</div>

## 选择规则

| 场景 | 优先选择 |
| --- | --- |
| 普通按钮、提交按钮、加载按钮 | `SconeButton` |
| 表单字段结构 | `SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` |
| 管理页列表、筛选和批量操作 | `DataTable` Pattern |
| 基础表格 | `SconeTable` |
| 页面骨架 | `AppShell`、`Page`、`Section` |
| 详情字段 | `SconeDescriptions` |
| 长表单编辑 | `SconeDrawer` + 表单组件 |
| 全局提示 | `SconeToastProvider` + `toast`，或 `SconeNotificationProvider` + `notification` |

## 边界

- 所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入。
- 包样式只在应用入口或组件预览入口引入一次：`import "scone-ui/styles.css";`。
- 不导入 `scone-ui/components/ui/*`、`src` 路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不发明 Recipe 组件名，例如 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid`。
- 请求、路由、权限、mutation、校验 schema 和产品文案留在调用方应用。
