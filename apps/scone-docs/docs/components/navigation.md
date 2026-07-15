---
title: 导航总览
sidebar_position: 4
---

# 导航总览

导航组件处理路径、菜单、切换、树、分页和命令入口。它们只表达 UI 状态和可访问交互，不内置路由、权限、菜单数据加载或产品导航策略。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 面包屑 | `SconeBreadcrumb` | 展示当前位置路径。 |
| 分页 | `SconePagination` | 数据分页状态桥接。 |
| 标签页 | `SconeTabs` | 局部内容视图切换。 |
| 分段控制 | `SconeSegmented` | 轻量模式或状态切换。 |
| 树 | `SconeTree` | 层级数据选择、展开和勾选。 |
| 下拉菜单 | `SconeDropdown`、`SconeDropdownItem`、`SconeDropdownLabel`、`SconeDropdownSeparator` | 更多操作和菜单动作。 |
| 导航菜单 | `SconeMenu` | 结构化导航项。 |
| 命令面板 | `SconeCommand` | 命令搜索、快捷入口。 |
| 文字提示 | `SconeTooltip` | 短辅助提示。 |
| 手风琴 | `SconeAccordion` | 多区域折叠。 |
| 折叠区域 | `SconeCollapsible` | 单区域展开/收起。 |

## 选择规则

- 位置路径用 `SconeBreadcrumb`，不要用 `SconeMenu` 模拟。
- 内容视图切换用 `SconeTabs`，轻量模式切换用 `SconeSegmented`。
- 命令或更多操作用 `SconeDropdown` / `SconeMenu`，不要用 `SconeSelect`。
- 大量命令搜索用 `SconeCommand`，不要塞进 Dropdown。
- 短辅助提示用 `SconeTooltip`；错误说明、规则说明和可点击内容不放进 Tooltip。

## 边界

- 路由跳转、权限过滤、菜单数据加载和当前路由匹配由调用方应用处理。
- 不复制 AntD Anchor、Steps、Tour 等完整导航矩阵；未纳入能力按 Scone specs 的覆盖审计处理。
