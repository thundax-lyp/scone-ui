# Default Theme Baseline

本文档记录 `default.theme.css` 抽取前的 example 视觉基线。

基线用于后续从 example 抽取组件库默认主题时判断是否出现非预期视觉回退。它不是自动化测试，也不是产品 UI 规范。

## Capture

- 日期：2026-07-15
- 本地地址：`http://localhost:5173/scone-ui/example/`
- 桌面视口：浏览器默认视口
- 移动视口：`390x844`
- 控制台：截图采集时无 `error` / `warn`

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
