---
title: 组件总览
sidebar_position: 1
---

# 组件总览

`scone-ui` 为后台管理界面提供可复用的 React + Tailwind CSS 组件、页面 Pattern 和反馈服务。文档阅读结构参考 Ant Design 的组件分类：通用、布局、导航、数据录入、数据展示、反馈和其他；组件实现和公共 API 归属以 Scone specs 为准。

生成或编写业务界面时，应优先从 `"scone-ui"` 包入口选择下列公共 API，再根据当前安装版本的 `dist/index.d.ts` 确认 props、事件名和类型。

## 文档结构

- 分类页的“总览”用于解释该分类的选择规则、能力边界和反模式。
- 单组件页用于解释单个 `Scone*` 组件的定位、导入、Props、Service API 和使用边界。
- Pattern 和 Recipe 页用于解释后台页面组合，不代表新增 `Scone*` 组件导出。

## 使用入口

<div className="scone-overview-resource-grid">
    <a className="scone-overview-resource-card" href="../guide/quick-start">
        <strong>快速开始</strong>
        <span>安装、样式引入和基础组件示例。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://github.com/scone-ui/scone-ui">
        <strong>GitHub</strong>
        <span>源码、议题和发布包维护入口。</span>
    </a>
    <a className="scone-overview-resource-card" href="https://scone-ui.github.io/scone-ui/example/">
        <strong>示例站</strong>
        <span>查看组件库在页面中的实际组合方式。</span>
    </a>
</div>

## 通用 2

通用组件是高频基础表达能力。为保持 Scone specs 的组件边界，`SconeButton` 的完整合同归入数据录入，Typography 组件的完整合同归入数据展示。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./general"><strong>通用说明</strong><span>按钮、排版和通用选择边界。</span></a>
    <div className="scone-overview-card"><strong>SconeButton</strong><span>按钮、提交、加载和危险动作入口。</span></div>
    <div className="scone-overview-card"><strong>SconeTypography</strong><span>标题、文本和段落排版能力。</span></div>
</div>

## 布局 7

用于组织间距、对齐、滚动和局部区域结构。布局组件不定义产品导航协议，也不替代页面 Pattern。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./layout"><strong>布局说明</strong><span>空间、排列、滚动和分隔面板规则。</span></a>
    <div className="scone-overview-card"><strong>SconeStack</strong><span>垂直排列。</span></div>
    <div className="scone-overview-card"><strong>SconeInline</strong><span>水平排列。</span></div>
    <div className="scone-overview-card"><strong>SconeCompact</strong><span>紧凑控件组合。</span></div>
    <div className="scone-overview-card"><strong>SconeToolbar</strong><span>工具栏布局。</span></div>
    <div className="scone-overview-card"><strong>SconeScrollArea</strong><span>滚动区域。</span></div>
    <div className="scone-overview-card"><strong>SconeSeparator</strong><span>视觉分隔。</span></div>
    <div className="scone-overview-card"><strong>SconeSplitPane</strong><span>分隔面板。</span></div>
</div>

## 导航 14

用于页面路径、菜单、分页、标签页、树和命令入口。导航组件只负责 UI 结构和状态表达，路由跳转由调用方应用接入。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./navigation"><strong>导航说明</strong><span>导航、菜单、命令和切换组件的选择规则。</span></a>
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

## 数据录入 19

用于收集、编辑和提交结构化信息。表单组件只表达 UI 状态和交互，不内置请求、权限、业务校验 schema 或产品字段规则。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./data-entry"><strong>数据录入说明</strong><span>表单、字段和输入控件合同。</span></a>
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

## 数据展示 12

用于展示列表、表格、说明信息、统计指标和文本内容。数据展示组件应接收已整理的数据，不承担数据获取或权限过滤。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./data-display"><strong>数据展示说明</strong><span>表格、列表、详情和排版组件规则。</span></a>
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

## 反馈和浮层 11

用于呈现结果、提示、加载、进度、对话框、抽屉和全局通知。服务型 API 必须配套对应 Provider。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./feedback"><strong>反馈说明</strong><span>状态、浮层、关闭原因和全局提示服务。</span></a>
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

## 其他 2

用于头像、图片和媒体占位展示。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./media-other"><strong>媒体与其他说明</strong><span>头像、图片、Recipe 边界和非目标能力。</span></a>
    <div className="scone-overview-card"><strong>SconeAvatar</strong><span>头像和名称缩写。</span></div>
    <div className="scone-overview-card"><strong>SconeImage</strong><span>图片展示。</span></div>
</div>

## 后台 Pattern 5

Pattern 是后台页面组合协议，不是业务流程框架。它们适合组织页面骨架、筛选、表格区域和内容区块。

<div className="scone-overview-grid">
    <a className="scone-overview-card scone-overview-link-card" href="./patterns"><strong>Pattern 说明</strong><span>页面骨架、筛选、数据表和区块组合。</span></a>
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
- 请求、路由、权限、mutation、校验 schema 和产品文案必须留在调用方应用中。
