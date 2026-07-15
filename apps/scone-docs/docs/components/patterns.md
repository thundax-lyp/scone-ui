---
title: 后台 Pattern
sidebar_position: 9
---

# 后台 Pattern

Pattern 是后台页面的高频组合结构。它们提供推荐 anatomy 和状态归属，但不把业务流程封装成万能组件。

## Pattern

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 应用框架 | `AppShell.Root`、`AppShell.Sidebar`、`AppShell.Header`、`AppShell.Main`、`AppShell.Aside` | 后台应用区域组织。 |
| 页面 | `Page.Root`、`Page.Header`、`Page.Content`、`Page.StickyActions` | 页面标题、主体和粘性操作。 |
| 区块 | `Section.Root`、`Section.Header`、`Section.Content`、`Section.Footer` | 页面结构分段。 |
| 筛选条 | `FilterBar.Root`、`FilterBar.Search`、`FilterBar.Fields`、`FilterBar.Actions`、`FilterBar.Summary` | 搜索、筛选和筛选摘要。 |
| 数据表 | `DataTable.Root`、`DataTable.FilterBar`、`DataTable.Toolbar`、`DataTable.BulkActions`、`DataTable.TableRegion`、`DataTable.Pagination` | 管理页数据表组合。 |

## 选择规则

- 页面结构用 `Page` 和 `Section`，不要用 `SconeCard` 拼整页层级。
- 管理页列表优先使用 `DataTable` Pattern，基础展示表才使用 `SconeTable`。
- 筛选区域使用 `FilterBar`，不要临时拼 `div + input + button`。
- `AppShell` 只组织后台应用框架，不内置路由、权限或菜单数据加载。

## 边界

- Pattern 不产生产品级 `ListPage`、权限菜单、请求状态机、路由绑定或业务字典映射。
- Pattern 可以组合组件和状态槽位，但业务字段、接口调用、校验 schema 和产品文案留在调用方应用。
