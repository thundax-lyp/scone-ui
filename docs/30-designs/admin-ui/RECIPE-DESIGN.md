# Admin UI Recipe Design

## Recipe Designs

依据文件：

- `docs/10-specs/recipes/DRAWER-FORM.md`
- `docs/10-specs/recipes/CONFIRMATION-FLOW.md`
- `docs/10-specs/recipes/POPOVER.md`
- `docs/10-specs/recipes/LOGO.md`
- `docs/10-specs/recipes/RESULT.md`
- `docs/10-specs/recipes/DASHBOARD-METRIC.md`
- `docs/10-specs/recipes/GRID.md`

Recipe 总规则：

- Recipe 是可复制组合方案，不产生新的正式 `Scone*` 组件 API。
- Recipe 可以复用组件、Layout 和 Pattern，但不新增业务流程、请求、权限或路由假设。
- `direct-docs-only` Recipe 不创建 wrapper，不从 `packages/scone-ui/src/index.ts` 导出。
- 全部 Recipe 保持文档和示例边界，不创建 `src/recipes/` 源码入口。

| Recipe           | 复用对象                                                                           | 目标落点                                     | 是否源码 | 不新增 `Scone*` API 的原因                   | 验证方式                    |
| ---------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- | -------------------------------------------- | --------------------------- |
| DrawerForm       | `SconeDrawer`、`SconeForm`、`SconeFormSection`、`SconeFormActions`、`SconeConfirm` | `docs/10-specs/recipes/DRAWER-FORM.md`       | 否       | 是组合流程，不是通用任务容器 API             | 文档结构和示例边界验证      |
| ConfirmationFlow | `SconeConfirm`、AlertDialog、Button                                                | `docs/10-specs/recipes/CONFIRMATION-FLOW.md` | 否       | 危险确认由组件组合表达，业务动作由调用方处理 | Confirm 行为和文案结构验证  |
| Popover          | Radix/shadcn Popover parts、Button、Stack                                          | `docs/10-specs/recipes/POPOVER.md`           | 否       | 底层组件足够，admin-ui 只记录边界            | docs-only 边界验证          |
| Logo             | AppShell brand slot、Image/Text 或自定义节点                                       | `docs/10-specs/recipes/LOGO.md`              | 否       | 产品身份不进入通用组件库                     | docs-only 边界验证          |
| Result           | Empty/Alert、Typography、Button                                                    | `docs/10-specs/recipes/RESULT.md`            | 否       | 结果页结构强依赖产品动作                     | docs-only 边界验证          |
| Dashboard Metric | `SconeStatistic`、Card、Grid recipe                                                | `docs/10-specs/recipes/DASHBOARD-METRIC.md`  | 否       | 指标业务口径由产品侧组合                     | 文档结构和示例边界验证      |
| Grid             | CSS grid/Tailwind utilities、Page/Section/Card                                     | `docs/10-specs/recipes/GRID.md`              | 否       | 布局 recipe 不需要独立 `SconeGrid`           | 响应式列数和 token 间距验证 |

### DrawerForm

DrawerForm 适合短到中等长度创建/编辑任务。

组合边界：

- Drawer title 说明任务对象。
- 内容区放 `SconeForm` 和 `SconeFormSection`。
- footer 放取消和提交按钮。
- loading 时禁用重复提交。
- 超长表单、复杂表格和多步骤流程改用 FormPage。

Dirty close：

- Drawer 接收 `onRequestClose(reason)`。
- 调用方判断当前表单是否 dirty。
- 非 dirty 时直接设置 `open=false`。
- dirty 时打开 `SconeConfirm`，说明未保存内容的影响。
- 用户确认放弃后再设置 `open=false`。

### ConfirmationFlow

ConfirmationFlow 用于危险、不可逆或影响较大的动作。

组合边界：

- title 写动作结果，不写泛泛的“确认操作”。
- description 说明影响范围。
- `destructive` 只改变语义和视觉，不替代确认结构。
- 异步确认期间保持焦点稳定，并防止重复提交。
- 业务删除、权限判断和请求由调用方处理。

### Popover

Popover 是可交互浮层 recipe，不作为独立高层组件导出。

组合边界：

- 用 Radix/shadcn Popover parts 组合交互浮层。
- 用于按钮、筛选小面板或复杂说明。
- 内容不适合 Tooltip，但也不需要 Dialog 的任务隔离。
- 必须继承 Radix Popover 焦点和关闭行为。
- 不承载危险确认；危险确认使用 Confirm。

### Logo

Logo 是产品身份 recipe，不作为 `SconeLogo` 通用组件导出。

组合边界：

- AppShell 的 brand slot 中组合产品 logo、名称和跳转。
- 产品名、品牌图形和跳转目标由产品侧决定。
- 如需统一布局，在 AppShell recipe 中提供 brand slot。

### Result

Result 是结果页或结果区块 recipe，用于提交成功、无权限、异常中断或流程完成。

组合边界：

- 默认由 Empty/Alert、Typography、Button 组合。
- 产品侧决定返回、继续创建、查看详情等具体动作。
- 不作为独立组件导出，避免固定产品级结果页结构。

### Dashboard Metric

Dashboard Metric 是指标卡 recipe，不作为独立组件。

组合边界：

- 简单指标使用 `SconeStatistic` + Card。
- 多指标组使用 Grid + Card。
- 趋势、同比、业务含义由产品侧组合。

### Grid

Grid 是布局 recipe，不作为独立 `SconeGrid` 组件。

组合边界：

- 使用 CSS grid 或 Tailwind grid utilities，由 Page/Section/Card 提供外层语义。
- 列数使用响应式 preset，例如 `base: 1`、`md: 2`、`xl: 3`。
- 间距引用 Foundation `SconeSpacingToken`。
- Grid 不拥有数据状态；卡片组内每个 Card 独立表达 loading/empty/error。

Recipe 非目标：

- 不导出 `SconePopover`、`SconeLogo`、`SconeResult` 或 `SconeGrid`。
- 不创建 `src/recipes/` 源码入口或 recipe service。
- 不把产品身份、业务结果动作、指标口径、请求或权限写入通用库。
