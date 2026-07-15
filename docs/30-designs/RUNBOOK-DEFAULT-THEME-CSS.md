# RUNBOOK Default Theme CSS

## Purpose

本 RUNBOOK 用于指导 `scone-ui` 从 example 视觉蓝图中抽取组件库默认主题 CSS。

目标是在 `packages/scone-ui` 中形成一个可发布、可单独导入、只服务组件库公共 API 的 `default.theme.css`，让 AI、IDE Agent 和调用方应用可以明确区分：

- 组件库默认主题变量。
- 组件库结构样式入口。
- example 页面演示样式。
- 调用方应用自己的业务页面样式。

本 RUNBOOK 是临时执行计划，不是长期规则来源。完成后应把稳定结论迁移到包 README、`PACKAGE-AI-GUIDE.md`、文档站或治理文档，再删除本文件。

## Scope

纳入本次闭环：

- `packages/scone-ui/src/styles/theme.css` 当前 token 和 shadcn/Tailwind 变量桥接。
- 新增或重命名为 `packages/scone-ui/src/default.theme.css` 的发布入口设计。
- `packages/scone-ui/src/styles.css` 对默认 theme 的引用关系。
- `packages/scone-ui/package.json` 的 `exports`、`files`、`build:styles`。
- example 中可作为组件默认主题参考的通用视觉信息。
- example 基线截图，作为视觉回归参考。
- package README、`PACKAGE-AI-GUIDE.md`、文档站快速开始或 AI 使用指南中的导入顺序说明。
- package、example、docs 的最小充分验证命令。

可作为蓝图的 example 信息：

- 色彩语义：背景、前景、主色、弱文本、边框、控件背景、危险/成功/警告/信息色。
- 控件尺度：按钮、输入框、选择器、表单项、表格、分页、tabs、menu 的高度和间距。
- 交互状态：hover、focus、focus-visible、disabled、selected、active、loading。
- 暗色主题变量：只抽取组件库需要的 theme token，不抽取页面专属背景层次。
- 圆角、阴影、边框、focus ring、滚动条等组件可复用基础。

不纳入本次闭环：

- 不迁移 `scone-example-*` 页面类名到 `packages/scone-ui`。
- 不复制 dashboard、workplace、table-list、card-list、account page 等页面布局 CSS。
- 不把 Ant Design Pro 风格页面间距作为组件库规则。
- 不新增产品应用级 UI 规则。
- 不改变组件公共 props 或导出名，除非后续明确发现样式入口必须配套类型或文档调整。
- 不在本 RUNBOOK 中直接决定未来品牌色，只记录当前抽取流程和判断标准。
- 不把截图作为自动化测试替代品。

## Baseline Evidence

参考截图保存于：

[`docs/40-readiness/assets/default-theme-baseline/`](../40-readiness/assets/default-theme-baseline/)

截图索引：

- `analysis-desktop.png`：分析页，覆盖 dashboard 卡片、统计、图表、列表组合。
- `table-list-desktop.png`：查询表格页，覆盖 filter、toolbar、table、pagination。
- `basic-form-desktop.png`：基础表单页，覆盖 field、input、textarea、segmented、button。
- `account-settings-desktop.png`：账户设置页，覆盖原生 select、textarea、avatar、侧边设置导航。
- `analysis-dark-desktop.png`：分析页深色主题，覆盖暗色变量和主题切换状态。
- `analysis-mobile.png`：移动端分析页，覆盖窄屏 shell、menu 和主要内容响应式。

截图采集条件：

- 本地 URL：`http://localhost:5173/scone-ui/example/`
- 截图日期：2026-07-15
- 桌面视口：浏览器默认视口
- 移动视口：`390x844`
- 控制台：采集时无 `error` / `warn`

## Current State

当前包样式入口：

- `packages/scone-ui/src/styles.css`
    - 导入 `tailwindcss`
    - 导入 `tw-animate-css`
    - 导入 `shadcn/tailwind.css`
    - 导入 `@fontsource-variable/geist`
    - 导入 `./styles/theme.css`
    - 定义 Tailwind `@theme inline`
    - 定义少量 base reset

当前默认 theme：

- `packages/scone-ui/src/styles/theme.css`
    - 定义 `--scone-*` 组件库 token。
    - 定义 shadcn/Tailwind 兼容变量，如 `--background`、`--foreground`、`--primary`、`--border`、`--radius`、`--sidebar-*`。

当前包发布：

- `packages/scone-ui/package.json`
    - 已导出 `./styles.css`。
    - 未导出 `./default.theme.css`。
    - `build:styles` 当前复制 `src/styles.css` 和 `src/styles/theme.css`。

## Target Shape

目标样式入口建议：

```css
/* calling app */
import "scone-ui/styles.css";
```

默认零配置路径：

- `styles.css` 继续保持一站式可用。
- `styles.css` 内部引用默认 theme，确保旧调用方不需要新增导入。

高级覆盖路径：

```css
/* optional explicit package theme */
@import "scone-ui/default.theme.css";
@import "scone-ui/styles.css";
```

或在应用中覆盖：

```css
@import "scone-ui/styles.css";

:root {
    --scone-color-primary: ...;
}
```

发布入口目标：

- `scone-ui/styles.css`：完整组件库样式入口。
- `scone-ui/default.theme.css`：默认主题变量入口。
- `scone-ui/styles/theme.css`：是否保留由迁移兼容性决定；若保留，应文档化为内部兼容路径，不作为优先推荐。

## Extraction Principles

抽取判断必须满足以下原则：

1. 先抽变量，再抽选择器。
2. 只抽 `Scone*` 组件、后台 Pattern 和公共 primitive wrapper 需要的样式能力。
3. example 只作为视觉蓝图，不作为实现权威。
4. 不迁移页面布局、业务组合或演示专属选择器。
5. 不把 `scone-example-*` 类名引入 `packages/scone-ui`。
6. 不让 `default.theme.css` 依赖 example。
7. 不让 `default.theme.css` 包含组件结构选择器，除非该选择器确实属于公共组件 root 或公共 data attribute。
8. 暗色主题必须使用稳定入口，例如 `.dark` 或 `[data-theme="dark"]`；避免只服务 example 的属性名。
9. 所有公共主题变量必须能被 README / AI Guide 解释。
10. 不为了追求视觉完全一致而扩大包的全局副作用。

## Token Naming

优先沿用现有 `--scone-*` token：

- 色彩：`--scone-color-*`
- 间距：`--scone-spacing-*`
- 圆角：`--scone-radius-*`
- 阴影：`--scone-shadow-*`
- 字体：`--scone-font-*`
- 动效：`--scone-duration-*`、`--scone-easing-*`
- 层级：`--scone-z-*`
- 控件尺寸：`--scone-control-height-*`

保留 shadcn/Tailwind 桥接变量：

- `--background`
- `--foreground`
- `--card`
- `--popover`
- `--primary`
- `--secondary`
- `--muted`
- `--accent`
- `--destructive`
- `--border`
- `--input`
- `--ring`
- `--radius`
- `--sidebar-*`

新增 token 前必须检查：

- 是否已有等价 `--scone-*`。
- 是否只有 example 页面在使用。
- 是否能被至少一个公共组件或 Pattern 复用。
- 是否需要 docs 说明。

## Component Family Order

按风险从低到高抽取：

1. Foundation tokens
    - color、typography、spacing、radius、shadow、focus ring、z-index。
2. General
    - `SconeButton`、Typography。
3. Data entry
    - `SconeInput`、`SconeTextArea`、`SconeSelect`、`SconeCombobox`、`SconeCheckbox`、`SconeRadioGroup`、`SconeSwitch`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
4. Data display
    - `SconeCard`、`SconeTable`、`SconeDescriptions`、`SconeList`、`SconeStatistic`、`SconeBadge`、`SconeTag`、`SconeTimeline`。
5. Navigation
    - `SconeMenu`、`SconeTabs`、`SconeDropdown`、`SconeBreadcrumb`、`SconePagination`、`SconeTree`、`SconeCommand`、`SconeTooltip`。
6. Feedback and overlay
    - `SconeAlert`、`SconeDialog`、`SconeDrawer`、`SconeConfirm`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、toast、notification。
7. Layout and Patterns
    - `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`、`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeScrollArea`、`SconeSeparator`、`SconeSplitPane`。

每个组件族只做一个小步 commit。跨组件族发现共享 token 时，先提交 token，再提交组件族调整。

## Detailed Plan

### Step 1. Inventory

- 从 `apps/example/src/examples/library-example.css` 提取候选变量和值。
- 从 `packages/scone-ui/src/styles/theme.css` 提取现有 token。
- 做映射表：
    - example 候选值。
    - 现有 `--scone-*`。
    - shadcn/Tailwind 桥接变量。
    - 目标归属：package theme / component style / example only。
- 明确不迁移清单。

产物：

- 临时记录可放在 RUNBOOK 中。
- 稳定结论迁移到 docs 或 package AI 文档。

### Step 2. Create Explicit Theme Entry

- 新增 `packages/scone-ui/src/default.theme.css`。
- 优先从 `src/styles/theme.css` 迁移或复制当前默认 theme。
- 调整 `src/styles.css` 引用：
    - 推荐 `@import "./default.theme.css";`
    - 如保留 `src/styles/theme.css`，确保没有双重定义或冲突。
- 更新 `build:styles`：
    - 输出 `dist/default.theme.css`。
    - 如保留兼容文件，也输出 `dist/styles/theme.css`。
- 更新 `exports`：
    - 新增 `"./default.theme.css": "./dist/default.theme.css"`。
- 更新 `files`：
    - 包含 `dist/default.theme.css`。

验证：

```sh
pnpm --filter scone-ui typecheck
pnpm run build
pnpm run pack:check
pnpm --filter @scone-ui/example typecheck
pnpm run build:example
```

### Step 3. Wire Documentation

- 更新根 `README.md`：只说明 workspace 命令是否变化。
- 更新 `packages/scone-ui/README.md`：
    - 说明 `styles.css` 零配置可用。
    - 说明 `default.theme.css` 是默认主题变量入口。
    - 说明调用方覆盖顺序。
- 更新 `packages/scone-ui/PACKAGE-AI-GUIDE.md`：
    - AI 生成代码时仍优先导入 `scone-ui/styles.css`。
    - 只有在用户明确要求自定义主题时，才单独提及 `default.theme.css`。
    - 不让 AI 依赖 example CSS。
- 更新 docs 站：
    - 快速开始。
    - AI 使用指南。
    - 可新增或更新主题说明章节，避免与 package AI Guide 冲突。

### Step 4. Extract Foundation Tokens

- 对齐 example 中最通用的值：
    - 主色。
    - 弱文本。
    - 边框。
    - 控件背景。
    - focus ring。
    - 默认阴影。
    - 控件高度。
    - 圆角。
- 不追求复制 example 页面背景层次。
- 确认暗色变量覆盖公共组件，而非 example 页面。

验证：

- 对比 baseline 截图。
- 重点检查 `analysis-dark-desktop.png` 对应路径。

### Step 5. Extract By Component Family

每个组件族执行：

1. 读取对应组件实现和 tests。
2. 找出组件依赖的 Tailwind class、data attribute、CSS 变量。
3. 判断是否需要新增 token。
4. 修改 package theme 或组件样式。
5. 不迁移 example 页面选择器。
6. 截取至少一个相关 example 页面。
7. 运行最小验证。
8. 小步 commit。

组件族对应参考图：

- Button / Statistic / Card：`analysis-desktop.png`
- Table / Pagination / Toolbar：`table-list-desktop.png`
- Input / TextArea / Field / Button：`basic-form-desktop.png`
- Avatar / Select / Settings form：`account-settings-desktop.png`
- Dark theme：`analysis-dark-desktop.png`
- Responsive shell：`analysis-mobile.png`

### Step 6. Remove Example Duplicates

只有在 package theme 已覆盖对应公共组件后，才允许删除 example 中的重复变量或通用组件覆盖。

删除前必须证明：

- 该 CSS 只是在补组件默认主题。
- 删除后 baseline 截图无非预期变化。
- 对应组件在 package 样式中已有等价能力。

不允许删除：

- example 页面布局样式。
- example 业务组合视觉。
- 只服务某个示例页的说明性布局。

### Step 7. Publish And PR Closure

- package 变更会触发 example 验证。
- docs 变更会触发 docs 验证。
- workflow / package.json 变更会触发 Full 验证。
- PR 描述必须写清：
    - 变更面。
    - 导入路径变化。
    - 兼容策略。
    - 截图验证结果。
    - 未覆盖项。

## Verification

基础命令：

```sh
pnpm run version:check
pnpm --filter scone-ui typecheck
pnpm run test
pnpm run build
pnpm run pack:check
pnpm --filter @scone-ui/example typecheck
pnpm run test:example
pnpm run build:example
pnpm --filter @scone-ui/docs typecheck
pnpm run build:docs
```

按变更面裁剪：

- 只改 RUNBOOK / 截图：`pnpm exec prettier --check <changed markdown files>`。
- 只改 package theme：Package + Example 验证。
- 改 package 导出或脚本：Full 验证。
- 改 README / docs：Docs site 验证。

截图验证：

- 每次会影响视觉的改动前，先保存或确认 baseline。
- 改动后至少重截受影响页面。
- 对比：
    - 桌面主页面。
    - 受影响组件页面。
    - 深色主题。
    - 移动端，如涉及 shell、menu、布局或控件宽度。
- 若视觉变化是预期的，必须在 commit 或 PR 描述中说明。

最低截图集合：

- `analysis-desktop.png`
- `table-list-desktop.png`
- `basic-form-desktop.png`
- `analysis-dark-desktop.png`
- `analysis-mobile.png`

## Risks

- 把 example 页面风格误当作组件库默认样式。
- `styles.css` 与 `default.theme.css` 重复导入导致覆盖顺序不清晰。
- 调用方自定义主题时覆盖点不稳定。
- 暗色主题只在 example 生效，而不是在普通调用方应用中可用。
- 修改 shadcn/Tailwind 桥接变量影响所有组件。
- package files 或 exports 漏配导致 npm 包不可导入新 CSS。
- 文档鼓励 AI 过度导入多个 CSS 入口，造成调用方困惑。

## Decision Checklist

每次抽取前检查：

- 这个样式是否属于公共组件，而不是 example 页面？
- 是否能用 `--scone-*` token 表达？
- 是否已有等价 token？
- 是否需要保留旧导入路径兼容？
- 是否影响暗色主题？
- 是否需要更新包 README / AI Guide？
- 是否需要更新 docs 站？
- 是否已截图？

每次抽取后检查：

- package 构建产物是否包含新 CSS。
- npm dry-run 是否包含新 CSS。
- example 是否仍能零配置运行。
- baseline 是否无非预期变化。
- PR 验证是否按变更面覆盖。

## Closure

任务完成时：

1. 删除本 RUNBOOK，或将仍有长期价值的流程迁移到治理文档。
2. 将最终导入规则写入：
    - `packages/scone-ui/README.md`
    - `packages/scone-ui/PACKAGE-AI-GUIDE.md`
    - docs 站快速开始 / AI 使用指南
3. 如果截图仍作为长期视觉参考保留，更新 `docs/40-readiness/DEFAULT-THEME-BASELINE.md`。
4. PR 描述中记录：
    - `default.theme.css` 的最终路径。
    - 兼容策略。
    - 验证命令。
    - 截图对比结论。
5. 删除临时执行记录，保持 `docs/30-designs/` 不残留已关闭 RUNBOOK。
