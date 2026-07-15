# Default Theme Baseline

本文档记录 `default.theme.css` 抽取完成后的 example 视觉基线。

基线用于后续修改组件库默认主题、删除 example CSS 或调整公开样式入口时判断是否出现非预期视觉回退。它不是自动化测试，也不是产品 UI 规范。

## Capture

- 日期：2026-07-15
- 本地地址：`http://localhost:5175/scone-ui/example/`
- 桌面视口：`1440x1000`
- 移动视口：`390x844`
- 控制台：截图采集时无 `error` / `warn`

## Expected Changes

本次基线反映以下已完成变更：

- package 默认主题由 `scone-ui/default.theme.css` 集中提供。
- `scone-ui/styles.css` 内置默认 theme，调用方不需要额外导入 `default.theme.css`。
- 表单、数据展示、导航、反馈浮层和后台 Pattern 使用 package token 或 Tailwind / shadcn bridge。
- example CSS 删除可由 package theme 覆盖的重复默认值，但保留示例站页面布局和演示视觉。

## Screenshots

| 文件                                                                                           | 路由                  | 覆盖范围                                  |
| ---------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------- |
| [`analysis-desktop.png`](./assets/default-theme-baseline/analysis-desktop.png)                 | `/dashboard/analysis` | dashboard 卡片、统计、图表、列表组合      |
| [`table-list-desktop.png`](./assets/default-theme-baseline/table-list-desktop.png)             | `/list/table-list`    | filter、toolbar、table、pagination        |
| [`basic-form-desktop.png`](./assets/default-theme-baseline/basic-form-desktop.png)             | `/form/basic-form`    | field、input、textarea、segmented、button |
| [`account-settings-desktop.png`](./assets/default-theme-baseline/account-settings-desktop.png) | `/account/settings`   | 原生 select、textarea、avatar、设置导航   |
| [`analysis-dark-desktop.png`](./assets/default-theme-baseline/analysis-dark-desktop.png)       | `/dashboard/analysis` | 深色主题变量和主题切换状态                |
| [`analysis-mobile.png`](./assets/default-theme-baseline/analysis-mobile.png)                   | `/dashboard/analysis` | 移动端 shell、menu、主要内容响应式        |

## Usage

后续修改 `packages/scone-ui` 默认主题或从 example 删除通用 CSS 前，应先确认本基线仍代表当前待保护视觉。

如果视觉变化是预期的，更新对应截图，并在 PR 描述中说明变化原因。
