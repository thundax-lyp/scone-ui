# Default Theme Inventory

本文档记录 `default.theme.css` 抽取任务的 token 盘点结果。

稳定公开口径见 `packages/scone-ui/README.md`、`packages/scone-ui/PACKAGE-AI-GUIDE.md` 和文档站 guide。

## Source Files

- Package theme：`packages/scone-ui/src/styles/theme.css`
- Package style bridge：`packages/scone-ui/src/styles.css`
- Example blueprint：`apps/example/src/examples/library-example.css`
- Baseline evidence：[`DEFAULT-THEME-BASELINE.md`](./DEFAULT-THEME-BASELINE.md)

## Current Package Tokens

| Token group      | Current package token                                                                                                   | Bridge / use                                                | Judgment                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| Base color       | `--scone-color-background`                                                                                              | `--background`、`--card`、`--popover`、`--sidebar`          | Keep in package theme               |
| Text color       | `--scone-color-foreground`                                                                                              | `--foreground`、`--card-foreground`、`--popover-foreground` | Keep in package theme               |
| Muted color      | `--scone-color-muted`、`--scone-color-muted-foreground`                                                                 | `--muted`、`--muted-foreground`                             | Keep in package theme               |
| Border / ring    | `--scone-color-border`、`--scone-color-ring`                                                                            | `--border`、`--input`、`--ring`                             | Keep in package theme               |
| Brand / semantic | `--scone-color-primary`、`--scone-color-info`、`--scone-color-success`、`--scone-color-warning`、`--scone-color-danger` | `--primary`、`--destructive`、`--chart-*`                   | Keep and calibrate in package theme |
| Spacing          | `--scone-spacing-2xs` through `--scone-spacing-xl`                                                                      | Tailwind `@theme inline` spacing bridge                     | Keep in package theme               |
| Radius           | `--scone-radius-sm`、`--scone-radius-md`、`--scone-radius-lg`、`--scone-radius-full`                                    | Tailwind radius bridge and `--radius`                       | Keep in package theme               |
| Shadow           | `--scone-shadow-sm`、`--scone-shadow-md`、`--scone-shadow-lg`                                                           | Components and overlays                                     | Keep in package theme               |
| Font             | `--scone-font-body`、`--scone-font-label`、`--scone-font-title`、`--scone-font-mono`                                    | Tailwind font bridge                                        | Keep in package theme               |
| Interaction      | `--scone-focus-ring`、`--scone-focus-ring-offset`、duration、easing                                                     | Focus and motion states                                     | Keep in package theme               |
| Layer            | `--scone-z-*`                                                                                                           | sticky、dropdown、popover、drawer、modal、toast             | Keep in package theme               |
| Sizing           | `--scone-control-height-*`、`--scone-icon-size-*`、`--scone-hit-area-min`                                               | Form controls and icons                                     | Keep in package theme               |
| Layout widths    | `--scone-page-width-*`、`--scone-drawer-width-*`                                                                        | Page and drawer patterns                                    | Keep in package theme               |

## Example Candidate Values

| Example source                  | Candidate                                                               | Package target                                                                                 | Evidence                               | Judgment                                                                |
| ------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `library-example.css:2-5`       | `--example-bg`、`--example-panel`、`--example-soft`、`--example-accent` | `--background`、`--card`、`--muted`、`--primary` via `--scone-color-*`                         | analysis and table-list baseline       | Migrate only as component theme values; keep page layering in example   |
| `library-example.css:7-17`      | shadow、text、border、panel-muted、control-bg、tag-bg                   | `--scone-shadow-*`、`--foreground`、`--muted-foreground`、`--border`、`--input`、`--secondary` | form, table, account settings baseline | Migrate reusable control semantics; keep `--example-*` names in example |
| `library-example.css:18-20`     | scrollbar colors                                                        | no current package token                                                                       | example shell scrollbars               | Keep in example unless a public ScrollArea theme token is introduced    |
| `library-example.css:217-220`   | Ant-like light page theme overrides                                     | package semantic colors only                                                                   | form/list/profile/result pages         | Do not migrate page background and page shadow as package defaults      |
| `library-example.css:820-823`   | monitor page theme overrides                                            | package semantic colors only                                                                   | monitor page                           | Do not migrate page-specific monitor palette                            |
| `library-example.css:3969-3972` | account center page theme overrides                                     | package semantic colors only                                                                   | account page                           | Do not migrate page-specific shell styling                              |
| `library-example.css:4846-4862` | dark example theme values                                               | `.dark` / `[data-theme="dark"]` package theme block                                            | dark analysis baseline                 | Migrate dark component tokens; keep page-only shell values in example   |

## Public Component Evidence

| Public surface   | Evidence                                                                                                                                                                     | Theme implication                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Tailwind bridge  | `packages/scone-ui/src/styles.css:21-66` maps fonts, colors, radii and spacing                                                                                               | `default.theme.css` must provide bridge variables before component classes resolve                             |
| Form controls    | `packages/scone-ui/src/components/form/*` exposes data attributes such as `data-scone-field`, `data-scone-date-picker`, `data-scone-number-input`, `data-scone-search-input` | Control height, border, background, focus ring and disabled colors belong in package tokens                    |
| Data display     | `packages/scone-ui/src/components/data-display/*` plus table/card primitives                                                                                                 | Card, table, badge, statistic and timeline color/radius/spacing belong in package tokens                       |
| Navigation       | `packages/scone-ui/src/components/navigation/*` exposes `data-scone-navigation` and menu item depth attributes                                                               | Menu, tabs, pagination, dropdown and tooltip states need package token coverage                                |
| Feedback overlay | `packages/scone-ui/src/components/feedback-overlay/*` exposes alert, loading, progress, notification and toast data attributes                                               | Tone colors, z-index, overlay surface and focus states belong in package tokens                                |
| Patterns         | `packages/scone-ui/src/patterns/*` exposes `data-scone-pattern` and pattern part attributes                                                                                  | AppShell, Page, Section, FilterBar and DataTable must use package tokens without importing example page layout |

## Non-Migration List

- Do not migrate `scone-example-*` selectors.
- Do not migrate dashboard, workplace, account, result or list page layout rules.
- Do not migrate example-specific page padding, grid templates, hero sections or decorative illustrations.
- Do not migrate `--example-*` names into package CSS.
- Do not migrate example-only scrollbar styling unless a public ScrollArea theme token is designed.

## Execution Notes

- `scone-ui/styles.css` is the recommended complete style entry and includes the default theme.
- `scone-ui/default.theme.css` is the default token entry.
- `scone-ui/styles/theme.css` remains a compatibility entry that forwards the default theme.
