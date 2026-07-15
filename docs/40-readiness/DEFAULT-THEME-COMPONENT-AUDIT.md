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
