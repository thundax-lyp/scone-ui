# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

## 待审阅任务项

- [ ] `packages/scone-ui/src/components/feedback-overlay`：按反馈浮层组件族校准主题使用
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`packages/scone-ui/src/components/feedback-overlay`
    - 处理动作：检查 Alert、Dialog、Drawer、Confirm、Empty、Loading、Progress、toast、notification 是否使用公共 token。
    - 验收点：反馈浮层组件主题能力由 package token 覆盖，相关组件测试和 example 构建通过。
    - 重要度：8/10

- [ ] `packages/scone-ui/src/patterns`：按后台 Pattern 校准主题使用
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`packages/scone-ui/src/patterns`
    - 处理动作：检查 AppShell、Page、Section、FilterBar、DataTable 是否使用公共 token，并避免吸收 example 页面布局样式。
    - 验收点：Pattern 主题能力由 package token 覆盖，查询表格页和移动端 shell 无非预期视觉回退。
    - 重要度：9/10

- [ ] `apps/example/src/examples/library-example.css`：删除已由 package theme 覆盖的 example 重复样式
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`apps/example/src/examples/library-example.css`
    - 处理动作：在 package theme 覆盖公共组件后，删除只用于补组件默认主题的 example 重复 CSS。
    - 验收点：删除项均有 package 等价能力，baseline 截图无非预期变化，页面布局样式未被误删。
    - 重要度：8/10

- [ ] `packages/scone-ui/README.md`：同步默认主题导入说明
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`packages/scone-ui/README.md`、`packages/scone-ui/PACKAGE-AI-GUIDE.md`、`apps/scone-docs/static/llms.txt`
    - 处理动作：说明 `styles.css` 零配置入口、`default.theme.css` 默认 token 入口、`styles/theme.css` 兼容入口和调用方覆盖顺序，并同步 `llms.txt`。
    - 验收点：包 README、AI Guide 与 `llms.txt` 对导入顺序、覆盖方式和 example CSS 边界描述一致。
    - 重要度：9/10

- [ ] `apps/scone-docs/docs`：同步文档站默认主题说明
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`apps/scone-docs/docs/guide/quick-start.md`、`apps/scone-docs/docs/guide/ai-usage.md`
    - 处理动作：更新文档站中关于样式导入、默认主题和自定义 token 覆盖的说明。
    - 验收点：docs 站与 package README、AI Guide 对公开入口和导入顺序保持一致。
    - 重要度：8/10

- [ ] `docs/40-readiness/DEFAULT-THEME-BASELINE.md`：更新默认主题视觉基线
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`docs/40-readiness/DEFAULT-THEME-BASELINE.md`、`docs/40-readiness/assets/default-theme-baseline`
    - 处理动作：在主题抽取完成后重截受影响页面，并记录预期视觉变化。
    - 验收点：baseline 文档反映最终视觉状态，PR 描述能引用截图对比结论。
    - 重要度：8/10

- [ ] `docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`：收口默认主题 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 范围对象：`docs/30-designs/RUNBOOK-DEFAULT-THEME-CSS.md`
    - 处理动作：任务完成后删除 RUNBOOK，或将长期规则迁移到治理文档和发布包文档。
    - 验收点：`docs/30-designs/` 不残留已关闭 RUNBOOK，长期规则已在对应文档中沉淀。
    - 重要度：7/10

## 待讨论项
