---
title: 布局总览
sidebar_position: 3
---

# 布局总览

布局组件只负责空间、排列、分隔和局部滚动。页面级结构使用后台 Pattern。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 垂直排列 | `SconeStack` | 表单字段、说明块、纵向内容组。 |
| 水平排列 | `SconeInline` | 行内按钮、短文本和图标组合。 |
| 紧凑组合 | `SconeCompact` | 输入框 + 按钮、分段工具组合。 |
| 工具栏 | `SconeToolbar` | 局部操作条和批量操作条的空间组织。 |
| 滚动区域 | `SconeScrollArea` | 局部 viewport，不接管页面主滚动。 |
| 分隔线 | `SconeSeparator` | 语义分隔和视觉分组。 |
| 分隔面板 | `SconeSplitPane` | 主从区域、列表详情、可调整面板。 |

## 选择规则

- 页面结构优先使用 `Page`、`Section`、`AppShell`。
- 页面主滚动由 `Page.Content` 承担；局部滚动才使用 `SconeScrollArea`。
- 工具栏只组织空间，不定义筛选、批量操作或页面标题的业务语义。
- 间距和尺寸应使用 token 或 preset；任意 CSS 长度只作为显式覆盖。

## 反模式

- 用 `SconeCard` 包住整页来制造页面层级。
- 在 body、main、PageContent 和 Table 区域同时设置滚动。
- 用任意 number gap 拼页面节奏。
