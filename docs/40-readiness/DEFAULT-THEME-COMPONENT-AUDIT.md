# Default Theme Component Audit

本文档记录 `default.theme.css` 抽取后的组件族主题使用审核结果。

依据文档：[`RUNBOOK-DEFAULT-THEME-CSS.md`](../30-designs/RUNBOOK-DEFAULT-THEME-CSS.md)

## Form

范围对象：`packages/scone-ui/src/components/form`

审核结论：表单组件族已经通过 Tailwind / shadcn bridge 使用 package theme token，不需要迁移 example CSS 或新增组件结构样式。

### Coverage

| Component group | Files                                                                                       | Theme evidence                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Button          | `button.tsx`                                                                                | variant 使用 `bg-primary`、`text-primary-foreground`、`border-input`、`hover:bg-accent`、`focus-visible:ring-ring/50`                      |
| Text controls   | `input.tsx`、`textarea.tsx`、`password-input.tsx`、`search-input.tsx`、`number-input.tsx`   | 控件边框、placeholder、focus、disabled、invalid 状态使用 `border-input`、`text-muted-foreground`、`ring-ring`、`border-destructive`        |
| Choice controls | `select.tsx`、`combobox.tsx`、`checkbox.tsx`、`radio-group.tsx`、`switch.tsx`、`slider.tsx` | 选择态、hover、focus、disabled 状态使用 `bg-primary`、`bg-muted`、`text-foreground`、`ring-ring`                                           |
| Date and upload | `date-picker.tsx`、`upload.tsx`                                                             | 触发器、清除按钮、列表文本使用 `border-input`、`hover:bg-muted`、`text-muted-foreground`、`ring-ring`                                      |
| Form structure  | `form.tsx`、`field.tsx`、`field-group.tsx`、`form-actions.tsx`、`form-section.tsx`          | label、description、message、actions 使用 `text-foreground`、`text-muted-foreground`、`text-destructive`、`bg-background`、`border-border` |

### Non-Changes

- 未发现 `scone-example-*` 选择器或 example 专属样式依赖。
- 未发现表单组件内硬编码的 hex、rgb、oklch 或 `color-mix` 颜色值。
- 未迁移页面布局、业务表单间距或 example 页面外观到 package theme。

### Verification

- `rg -n "#[0-9a-fA-F]{3,8}|rgba?\(|oklch\(|color-mix|scone-example" packages/scone-ui/src/components/form`
- `pnpm exec vitest run packages/scone-ui/src/components/form/*.test.tsx`
- `pnpm --filter scone-ui typecheck`
- `pnpm run build:example`

## Data Display

范围对象：`packages/scone-ui/src/components/data-display`

审核结论：数据展示组件族的基础面板、列表、表格和描述组件已经使用 package theme bridge；语义 tone 组件已从 Tailwind 内置色阶调整为 `--scone-color-*` token 引用。

### Coverage

| Component group     | Files                                                   | Theme evidence                                                                                                                               |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface display     | `card.tsx`、`list.tsx`、`table.tsx`、`descriptions.tsx` | 表面、边框、loading、empty、error 状态使用 `bg-card`、`bg-background`、`border-border`、`text-muted-foreground`、`text-destructive`          |
| Semantic indicators | `badge.tsx`、`tag.tsx`、`timeline.tsx`、`statistic.tsx` | `info`、`success`、`warning` 使用 `--scone-color-info`、`--scone-color-success`、`--scone-color-warning`；`danger` 使用 `destructive` bridge |
| Typography          | `typography.tsx`                                        | 默认、弱化、危险、成功、警告文本使用 `foreground`、`muted-foreground`、`destructive` 和 `--scone-color-*` token                              |

### Non-Changes

- 未发现 `scone-example-*` 选择器或 example 专属样式依赖。
- 未迁移 dashboard、table-list 或 account 页面布局样式。
- 未改变数据展示组件 props、渲染结构或语义 tone API。

### Verification

- `rg -n "sky-|emerald-|amber-" packages/scone-ui/src/components/data-display`
- `pnpm exec vitest run packages/scone-ui/src/components/data-display/*.test.tsx`
- `pnpm --filter scone-ui typecheck`
- `pnpm run build:example`

## Navigation

范围对象：`packages/scone-ui/src/components/navigation`

审核结论：导航组件族已经通过 Tailwind / shadcn bridge 使用 package theme token，不需要迁移 example CSS 或新增组件结构样式。

### Coverage

| Component group           | Files                                             | Theme evidence                                                                                                                                      |
| ------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menu and tree             | `menu.tsx`、`tree.tsx`                            | item 默认、hover、selected、focus 状态使用 `text-muted-foreground`、`bg-accent`、`text-accent-foreground`、`ring-ring`                              |
| Tabs and segmented        | `tabs.tsx`、`segmented.tsx`                       | 容器、active、inactive 状态使用 `bg-muted`、`bg-background`、`text-foreground`、`text-muted-foreground`、`shadow-sm`                                |
| Dropdown and command      | `dropdown.tsx`、`command.tsx`                     | overlay surface、item active、destructive、separator 使用 `bg-popover`、`text-popover-foreground`、`bg-accent`、`border-border`、`text-destructive` |
| Breadcrumb and pagination | `breadcrumb.tsx`、`pagination.tsx`                | 链接、当前项、page item、select 使用 `text-muted-foreground`、`text-foreground`、`border-primary`、`bg-primary`、`border-border`                    |
| Disclosure and tooltip    | `accordion.tsx`、`collapsible.tsx`、`tooltip.tsx` | focus、content、tooltip surface 使用 `ring-ring`、`text-muted-foreground`、`bg-foreground`、`text-background`                                       |

### Non-Changes

- 未发现 `scone-example-*` 选择器或 example 专属样式依赖。
- 未发现导航组件内硬编码的 hex、rgb、oklch 或 `color-mix` 颜色值。
- 未迁移 example shell、侧边栏布局或移动端页面结构样式。

### Verification

- `rg -n "#[0-9a-fA-F]{3,8}|rgba?\(|oklch\(|color-mix|scone-example|sky-|emerald-|amber-" packages/scone-ui/src/components/navigation`
- `pnpm exec vitest run packages/scone-ui/src/components/navigation/*.test.tsx`
- `pnpm --filter scone-ui typecheck`
- `pnpm run build:example`

## Feedback Overlay

范围对象：`packages/scone-ui/src/components/feedback-overlay`

审核结论：反馈与浮层组件族的 overlay、surface、状态色和 focus 状态由 package theme token 覆盖；成功、警告和遮罩样式已从固定 Tailwind 色阶调整为 `--scone-*` token 引用。

### Coverage

| Component group            | Files                                     | Theme evidence                                                                                                                                 |
| -------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Alert and progress         | `alert.tsx`、`progress.tsx`               | 成功、警告状态使用 `--scone-color-success`、`--scone-color-warning`；危险和 active 状态使用 `destructive`、`primary` bridge                    |
| Dialog, drawer and confirm | `dialog.tsx`、`drawer.tsx`、`confirm.tsx` | overlay 使用 `--scone-color-overlay-backdrop`；surface、footer、focus 使用 `bg-popover`、`text-popover-foreground`、`bg-muted/50`、`ring-ring` |
| Toast and notification     | `toast.tsx`、`notification.tsx`           | surface、action、close、tone border 使用 `bg-popover`、`text-popover-foreground`、`text-primary`、`text-muted-foreground` 和 `--scone-color-*` |
| Empty and loading          | `empty.tsx`、`loading.tsx`                | empty、skeleton、loading mask 使用 `border-border`、`bg-muted`、`bg-background/60`、`text-muted-foreground`                                    |

### Non-Changes

- 未发现 `scone-example-*` 选择器或 example 专属样式依赖。
- 未迁移页面级空状态、结果页或业务反馈布局样式。
- 未改变 dialog、drawer、confirm、toast 或 notification 的公共 API。

### Verification

- `rg -n "bg-black|sky-|emerald-|amber-|scone-example" packages/scone-ui/src/components/feedback-overlay`
- `pnpm exec vitest run packages/scone-ui/src/components/feedback-overlay/*.test.tsx`
- `pnpm --filter scone-ui typecheck`
- `pnpm run build:example`

## Patterns

范围对象：`packages/scone-ui/src/patterns`

审核结论：后台 Patterns 已经通过 package theme bridge 使用公共 token，不需要吸收 example 页面布局样式。

### Coverage

| Pattern group      | Files                       | Theme evidence                                                                                                                                  |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Shell and page     | `app-shell.tsx`、`page.tsx` | shell、header、sidebar、aside、sticky actions 使用 `bg-background`、`border-border`、`text-foreground`、`text-muted-foreground`                 |
| Section            | `section.tsx`               | 标题、描述、actions、content、footer 使用 `text-foreground`、`text-muted-foreground`，并保持 section 默认不强制 card 化                         |
| Filter bar         | `filter-bar.tsx`            | filter surface、search、expanded region 使用 `border-border`、`bg-background`、`border-input`、`ring-ring`                                      |
| Data table pattern | `data-table.tsx`            | toolbar、bulk actions、state rows、pagination 使用 `border-border`、`bg-background`、`bg-muted/30`、`text-muted-foreground`、`text-destructive` |

### Non-Changes

- 未发现 `scone-example-*` 选择器或 example 专属样式依赖。
- 未迁移 dashboard、查询表格页、shell 或移动端页面布局样式。
- 未改变 AppShell、Page、Section、FilterBar 或 DataTable 公共 API。

### Verification

- `rg -n "#[0-9a-fA-F]{3,8}|rgba?\(|oklch\(|color-mix|scone-example|sky-|emerald-|amber-|bg-black" packages/scone-ui/src/patterns`
- `pnpm exec vitest run packages/scone-ui/src/patterns/*.test.tsx`
- `pnpm --filter scone-ui typecheck`
- `pnpm run build:example`

## Example CSS Cleanup

范围对象：`apps/example/src/examples/library-example.css`

审核结论：example CSS 已删除可由 package theme 覆盖的重复默认值，并保留只服务示例站页面布局和演示视觉的 `scone-example-*` 样式。

### Cleanup

| Cleanup group      | Change                                                                                                                                                                                                                   | Reason                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Foundation aliases | `--example-accent`、`--example-shadow`、`--example-text`、`--example-text-muted`、`--example-border-control`、`--example-panel-muted`、`--example-control-bg`、`--example-tag-bg` 改为引用 package token 或 bridge token | 避免 example 重复定义 package 默认主题值           |
| Page overrides     | Ant-like page overrides 中的 primary、info、shadow 改为 `--scone-color-primary`、`--scone-color-info`、`--scone-shadow-sm`                                                                                               | 保持示例页面视觉，同时让颜色来源回到 package theme |
| Dark theme bridge  | 删除 dark example 中重复声明的 `--background`、`--foreground`、`--primary`、`--border`、`--sidebar-*` 等 bridge 变量                                                                                                     | 深色 bridge 已由 `.dark` 默认主题提供              |

### Preserved

- 保留 `--example-bg`、`--example-panel`、`--example-soft`、滚动条和页面布局变量，因为它们属于 example 页面外观，不是组件默认主题。
- 保留 `scone-example-*` 页面选择器、dashboard/list/profile/workplace/result 页面样式和响应式规则。
- 未把 example CSS 迁移到 `packages/scone-ui`，调用方应用也不应导入 example CSS。

### Verification

- `pnpm --filter @scone-ui/example test -- --run`
- `pnpm run build:example`
- `pnpm --filter scone-ui typecheck`
- `pnpm exec prettier --check apps/example/src/examples/library-example.css TODO.md`
