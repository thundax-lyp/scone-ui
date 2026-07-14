# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `11-data-display-atoms`：11 审核数据展示原子组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx`
    - 处理动作：检查 tone/status、loading、closable、计数、时间线 item 和业务中性边界。
    - 验收点：输出原子展示组件是否存在命名误导、业务语义泄漏或防御性判断噪音的结论。
    - 重要度：8/10

- [ ] `12-typography-layout`：12 审核 Typography 和 Layout primitives
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/data-display/typography.tsx`、`src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`
    - 处理动作：检查排版、间距、排列、紧凑布局和工具栏是否只承载基础结构语义。
    - 验收点：输出 Typography/Layout 是否存在重叠职责、无意义 wrapper 或 Props 命名不一致的结论。
    - 重要度：8/10

- [ ] `13-layout-scroll-resize`：13 审核滚动、分隔和可调整布局
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/layout/scroll-area.tsx`、`src/components/layout/separator.tsx`、`src/components/layout/split-pane.tsx`、`src/components/layout/scroll-area.test.tsx`、`src/components/layout/split-pane.test.tsx`
    - 处理动作：检查滚动边界、ARIA separator、键盘 resize、CSS 长度校验和测试可读性。
    - 验收点：输出布局交互是否存在隐式状态、副作用清理或复杂控制流问题的结论。
    - 重要度：8/10

- [ ] `14-feedback-status`：14 审核反馈状态组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx`
    - 处理动作：检查状态语义、action slot、ARIA、loading / progress 边界和错误展示职责。
    - 验收点：输出反馈状态组件是否存在重复语义、错误处理混淆或可访问性缺口的结论。
    - 重要度：8/10

- [ ] `15-feedback-overlays`：15 审核浮层组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/toast.tsx`、`src/components/feedback-overlay/notification.tsx`
    - 处理动作：检查 close reason、focus 行为、队列 service、Provider API 和异步确认边界。
    - 验收点：输出浮层和 service 是否存在内部实现泄漏、状态入口过多或副作用风险的结论。
    - 重要度：9/10

- [ ] `16-navigation-primary`：16 审核基础导航组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/navigation/breadcrumb.tsx`、`src/components/navigation/pagination.tsx`、`src/components/navigation/tabs.tsx`、`src/components/navigation/segmented.tsx`
    - 处理动作：检查路径、分页、内容切换、模式切换的命名、状态和可访问性边界。
    - 验收点：输出基础导航是否存在 API 冲突、状态重复或测试过度依赖内部实现的结论。
    - 重要度：8/10

- [ ] `17-navigation-menu-command`：17 审核菜单、命令和树组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/navigation/dropdown.tsx`、`src/components/navigation/menu.tsx`、`src/components/navigation/command.tsx`、`src/components/navigation/tree.tsx`
    - 处理动作：检查动作项、导航项、命令项和树节点的数据结构、键盘模型和业务边界。
    - 验收点：输出复杂导航组件是否存在万能 schema、职责重叠或认知复杂度问题的结论。
    - 重要度：9/10

- [ ] `18-navigation-disclosure-media`：18 审核 disclosure 和媒体组件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/navigation/accordion.tsx`、`src/components/navigation/collapsible.tsx`、`src/components/navigation/tooltip.tsx`、`src/components/media/image.tsx`、`src/components/media/avatar.tsx`
    - 处理动作：检查展开状态、短提示边界、图片 fallback、头像 fallback 和媒体业务中性边界。
    - 验收点：输出 disclosure/media 是否存在必读信息误放、fallback 不清或产品语义泄漏的结论。
    - 重要度：7/10

- [ ] `19-pattern-shell-page-section`：19 审核 AppShell、Page 和 Section Pattern
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/patterns/app-shell.tsx`、`src/patterns/page.tsx`、`src/patterns/section.tsx`、`src/patterns/index.ts`
    - 处理动作：检查页面主滚动、全局空间、分区语义、compound parts 和公共导出边界。
    - 验收点：输出 shell/page/section 是否存在职责重叠、命名不准或产品应用假设的结论。
    - 重要度：10/10

- [ ] `20-pattern-filter-data-table`：20 审核 FilterBar 和 DataTable Pattern
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/patterns/filter-bar.tsx`、`src/patterns/data-table.tsx`、`src/patterns/filter-bar.test.tsx`、`src/patterns/data-table.test.tsx`
    - 处理动作：检查筛选状态、表格状态归属、selection 注入、分页入口和复杂度。
    - 验收点：输出 FilterBar/DataTable 是否存在状态事实源冲突、API 过宽或复杂控制流的结论。
    - 重要度：10/10

- [ ] `21-ui-vendored-boundary`：21 审核 shadcn/Radix vendored 边界
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/components/ui/button.tsx`、`src/components/ui/dialog.tsx`、`src/components/ui/dropdown-menu.tsx`、`src/components/ui/select.tsx`、`src/components/ui/table.tsx`
    - 处理动作：检查底层 UI 文件是否只作为 primitive 基座，是否被公共 API 或业务语义错误穿透。
    - 验收点：输出 vendored 基座是否存在不必要包装、重复依赖或跨边界内部引用的结论。
    - 重要度：7/10

- [ ] `22-tests-public-behavior`：22 审核测试策略和公共行为覆盖
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/index.test.ts`、`src/test/setup.ts`、`vitest.config.ts`、`src/app.test.tsx`
    - 处理动作：检查测试是否验证公共行为、导出守护、环境设置和示例入口，而非脆弱内部实现。
    - 验收点：输出测试结构是否存在维护成本高、Mock 过重或覆盖目标不清的问题。
    - 重要度：8/10

- [ ] `23-docs-spec-design-alignment`：23 审核 SPEC、DESIGN 和 readiness 对齐
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/10-specs/COMPONENT-SELECTION.md`、`docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`、`docs/30-designs/admin-ui/VERIFICATION-DESIGN.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：检查需求矩阵、设计落点、验证矩阵和实现证据是否一致且不过期。
    - 验收点：输出文档与源码是否存在状态不一致、重复规则或过期证据的结论。
    - 重要度：9/10

- [ ] `24-review-report`：24 汇总系统性代码审核报告
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：按 RUNBOOK 输出总体评价、问题清单、目录结构调整、重命名清单和建议执行顺序。
    - 验收点：审核报告按 P0/P1/P2/P3 排序，所有建议都有证据、影响范围和功能风险。
    - 重要度：10/10

- [ ] `25-readiness-runbook-closure`：25 更新 Implementation Coverage 并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/30-designs/README.md`、`TODO.md`
    - 处理动作：把有长期价值的审核结论迁移到 readiness，删除临时 RUNBOOK 和索引，并收窄或删除已完成 TODO。
    - 验收点：readiness 记录审核状态，RUNBOOK 文件和索引被清理，TODO 只保留未完成任务。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
