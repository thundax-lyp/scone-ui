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
