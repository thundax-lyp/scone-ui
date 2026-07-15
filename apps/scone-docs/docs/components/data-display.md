---
title: 数据展示总览
sidebar_position: 6
---

# 数据展示总览

数据展示组件用于表格、详情、列表、标签、指标、时间线和文本内容。组件应接收调用方整理好的数据，不绑定业务数据模型、请求协议、权限判断或路由。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 基础表格 | `SconeTable` | 业务中性的表格展示。 |
| 详情字段 | `SconeDescriptions` | 键值信息和只读详情。 |
| 列表 | `SconeList` | 简单记录列表。 |
| 内容块 | `SconeCard` | 独立分组展示。 |
| 标签和徽标 | `SconeTag`、`SconeBadge` | 分类、状态点、计数和提示。 |
| 指标 | `SconeStatistic` | 数值、趋势和摘要指标。 |
| 时间线 | `SconeTimeline` | 事件序列。 |
| 排版 | `SconeTypography`、`SconeTitle`、`SconeText`、`SconeParagraph` | 标题、正文、辅助文案。 |

## 状态优先级

数据区域的状态优先级固定为：

1. `loading`
2. `error`
3. `empty`
4. 正常数据

这条规则适用于表格、列表、详情和 DataTable 区域。组件可以表达状态，但请求、重试和权限判断由调用方处理。

## 选择规则

- 基础数据展示表用 `SconeTable`；列表管理页的筛选、批量操作和分页组合用 `DataTable` Pattern。
- 分组展示用 `SconeCard`；页面结构分段用 `Section` Pattern。
- 详情字段用 `SconeDescriptions`，不要手写样式化 `dl`。
- 空数据用 `SconeEmpty`，错误提示用 `SconeAlert`。

## 边界

- 不实现完整 AntD Table 配置对象、内置请求或万能 `onChange`。
- 表格排序、筛选、分页和选择状态应由调用方或 DataTable Pattern 明确桥接。
