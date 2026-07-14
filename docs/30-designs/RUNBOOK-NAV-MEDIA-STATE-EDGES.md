# Navigation And Media State Edge Fix Runbook

## Purpose

完成导航与媒体组件的小型 P1 边界修复，消除重复 DOM id、分页范围文案越界，以及动态 `src` 切换后失败状态不重置的问题。

## Scope

本次闭环只覆盖以下文件：

- `src/components/navigation/tooltip.tsx`
- `src/components/navigation/pagination.tsx`
- `src/components/media/image.tsx`
- `src/components/media/avatar.tsx`
- 最小相关测试文件：按现有测试布局新增或修改对应 `*.test.tsx`，不得扩大到无关组件族。
- 收口文档：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

目标行为：

- `SconeTooltip` 使用 `React.useId()` 生成实例级 tooltip id；触发控件打开后，触发控件的 `aria-describedby` 指向同实例 tooltip 内容的 `id`，多个 `SconeTooltip` 同屏打开时不产生重复 DOM id。
- `SconePagination` 的 range 文案基于 clamp 后的页码计算；输入字段精确为 `SconePaginationState.page`、`SconePaginationState.pageSize`、`SconePaginationState.total`，越界 `page` 不再导致展示范围越界。
- `SconeImage` 在 `src` 字段变化时重置内部 `failed` 状态为 `!src`，允许新图片地址重新进入 `<img>` 渲染与加载流程。
- `SconeAvatar` 在 `src` 字段变化时重置内部 `failed` 状态为 `!src`，允许新头像地址重新进入 `<img>` 渲染与加载流程。
- 完全处理后，同步清理 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 中已解决的问题章节，而不是保留“已完成”的中间状态说明。

## Non-goals

- 不调整导航或媒体组件的公开 API。
- 不重构组件目录、导出面或样式 token。
- 不引入产品应用级 UI 规则或业务分页规则。
- 不处理本范围外的图片懒加载、缓存、占位图策略或无障碍策略重构。
- 不新增或修改公共数据结构字段；本任务只修正现有字段 `page`、`pageSize`、`total`、`src` 和内部状态 `failed` 的使用方式。

## Plan

### Task 1: Tooltip id uniqueness

文件：

- `src/components/navigation/tooltip.tsx`
- 对应 navigation tooltip 测试文件

控件和操作：

- 控件：`SconeTooltip` 触发元素和 `role="tooltip"` 内容。
- 操作：同屏渲染至少两个 `SconeTooltip`，分别通过 focus、hover 或 pointer enter 打开。
- 字段：tooltip 内容节点 `id`；触发元素 `aria-describedby`。
- 要求：将固定 `id="scone-tooltip"` 改为 `React.useId()` 派生的实例级 id；打开时 `aria-describedby` 使用同一个实例级 id；关闭时保留现有受控/非受控 open 行为和 Escape 关闭行为。

### Task 2: Pagination range clamp

文件：

- `src/components/navigation/pagination.tsx`
- 对应 navigation pagination 测试文件

控件和操作：

- 控件：`SconePagination` range 文案、`Previous` 按钮、`Next` 按钮、页码按钮、`Rows per page` select。
- 操作：传入 `state.page < 1`、`state.page > pageCount`、正常页码三类状态。
- 字段：`SconePaginationState.page`、`SconePaginationState.pageSize`、`SconePaginationState.total`。
- 要求：range 文案的 start/end 使用 clamp 后页码计算；`Previous`、`Next`、页码按钮和 `Rows per page` select 的现有交互语义不扩大修改。

### Task 3: Media src failure reset

文件：

- `src/components/media/image.tsx`
- `src/components/media/avatar.tsx`
- 对应 media image/avatar 测试文件

控件和操作：

- 控件：`SconeImage` 的图片容器、fallback、preview button、preview dialog；`SconeAvatar` 的 `<img>`、fallback、icon。
- 操作：先触发当前 `src` 的 image error，再 rerender 为新的非空 `src`。
- 字段：props `src`；内部状态 `failed`；`SconeImageProps.previewOpen/defaultPreviewOpen` 不纳入本次状态变更。
- 要求：仅在 `src` 变化时重置 `failed` 为 `!src`；不因 `alt`、`fallback`、`className`、`width`、`height`、`size`、`shape` 等非 `src` 字段变化重置失败状态。

### Task 4: Review document closure

文件：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

操作：

- 若 `src/components/navigation/pagination.tsx` 的修复和测试已完成，删除 `### [P1] Pagination range text can use an out-of-range page` 章节。
- 若 `src/components/navigation/tooltip.tsx` 的修复和测试已完成，删除 `### [P1] Tooltip uses a fixed DOM id` 章节。
- 若 `src/components/media/image.tsx` 与 `src/components/media/avatar.tsx` 的修复和测试均已完成，删除 `### [P1] Image and Avatar do not reset failure state when src changes` 章节。
- 同步更新该文档顶部 P1 索引和总结中对应条目，确保不再列出已经完全处理的问题。

## Verification

执行最小相关验证：

- 多个 `SconeTooltip` 同屏渲染并打开时，断言每个 `role="tooltip"` 的 `id` 唯一，且每个触发控件的 `aria-describedby` 指向对应内容节点。
- `SconePagination` 传入 `state={{ page: 0, pageSize: 10, total: 95 }}` 时，range 文案应等同第 1 页。
- `SconePagination` 传入 `state={{ page: 99, pageSize: 10, total: 95 }}` 时，range 文案应等同最后一页。
- `SconeImage` 从失败 `src` 切换到新的非空 `src` 时，断言 fallback 被替换为 `<img>` 或 preview button 内的 `<img>`，并使用新 `src`。
- `SconeAvatar` 从失败 `src` 切换到新的非空 `src` 时，断言 fallback/icon 被替换为 `<img>`，并使用新 `src`。
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 不再包含已经完全处理的三个 P1 章节及其索引条目。
- 运行仓库中覆盖上述测试的最小 test/lint 命令；若现有脚本无法精确筛选，则记录实际运行的最近似命令。

## Closure

实现、测试、`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 同步清理和审核完成后删除本 RUNBOOK。若验证结论需要长期保留，应迁移到 `docs/40-readiness/` 下的对应 evidence 或 readiness 文档后再删除本文件。
