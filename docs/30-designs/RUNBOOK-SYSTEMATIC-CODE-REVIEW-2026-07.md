# RUNBOOK: Systematic Code Review 2026-07

## Purpose

执行一次全项目系统性代码审核，重点识别影响清晰度、维护成本、复杂度、模块边界、公共 API 和类型安全的问题。

本 RUNBOOK 是本次审核的临时执行手册。稳定审核方法以 `docs/00-governance/HOW-TO-SYSTEMATIC-CODE-REVIEW.md` 为准。

## Scope

纳入本次审核：

- `src/` 下全部 React / TypeScript 源码、测试、样式入口和公共导出。
- `docs/10-specs/` 中定义的 Admin UI 需求、组件、Pattern、Recipe 和 Foundation 规则。
- `docs/30-designs/` 中定义的架构、文件落点、类型、导出面、组件族、Pattern、Recipe 和验证策略。
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 中记录的实现覆盖和验证证据。
- 构建、测试、lint、TypeScript 和依赖配置：`package.json`、`eslint.config.mjs`、`tsconfig.json`、`vite.config.ts`、`vitest.config.ts`。

审核维度：

- 命名、目录结构、模块边界、职责划分。
- 公开 API、Props、Hooks、Context、工具函数、类型导出。
- 数据流、状态管理、副作用、控制流和认知复杂度。
- TypeScript 类型设计、错误处理、可测试性、依赖封装。
- 重复代码、错误抽象、无效代码和认知噪音。

## Non-goals

- 不直接修改源码或测试，除非用户明确要求进入修复阶段。
- 不把格式、换行、引号风格作为主要审核问题。
- 不为减少代码行数牺牲可读性。
- 不为了“最佳实践”引入新抽象。
- 不假设未来产品需求。
- 不迁移产品应用级 UI 规则到本仓库。
- 不输出大量低价值细枝末节；相同根因合并报告。

## Plan

### 1. 建立审核基线

读取必需输入：

1. `docs/AGENTS.md`
2. `docs/00-governance/HOW-TO-SYSTEMATIC-CODE-REVIEW.md`
3. `docs/10-specs/README.md`
4. `docs/10-specs/ADMIN-UI-SPEC.md`
5. `docs/10-specs/COMPONENT-SELECTION.md`
6. `docs/10-specs/ADMIN-PATTERNS-SPEC.md`
7. `docs/30-designs/DESIGN-ADMIN-UI.md`
8. `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
9. `src/index.ts`
10. `src/index.test.ts`
11. `package.json`
12. `eslint.config.mjs`
13. `tsconfig.json`
14. `vite.config.ts`
15. `vitest.config.ts`

记录项目事实：

- 框架、构建工具、测试工具、lint 工具、样式系统和主要依赖。
- 是否存在路由、请求层、全局 store、服务端状态库。
- 当前验证命令状态和工作区状态。

### 2. 公开 API 和导出面审查

检查：

- `src/index.ts` 是否与 `COMPONENT-SELECTION.md` Export Groups 一致。
- `src/index.test.ts` 是否覆盖公共导出和 no-recipe-source 边界。
- 组件族 `index.ts` 是否只导出本族公共 API。
- 是否存在暴露内部实现细节、重复 API 或没有实际使用场景的扩展点。

输出证据：

- 公开导出与 SPEC 的对齐结论。
- 可疑 API 的全部调用方和影响范围。

### 3. 模块依赖方向审查

检查依赖方向：

```text
Foundation -> lib/types -> components/ui -> components/* -> patterns -> docs-only recipes
```

验证：

- 组件不依赖 Pattern。
- Foundation 不依赖组件。
- Pattern 不包含请求、权限、路由或产品流程。
- Recipe 不创建 `src/recipes/`，不新增正式 `Scone*` API。
- 公共工具是否真的跨组件复用。

### 4. 组件族和 Pattern 深读

按以下顺序审核：

1. Foundation / utilities / theme
2. Form
3. Data Display
4. Layout
5. Feedback / Overlay
6. Navigation
7. Media
8. Admin Patterns
9. Recipe docs-only 边界

每个域检查：

- 命名是否准确、一致。
- 文件位置和导出名是否匹配职责。
- 组件是否混入业务规则、请求、路由、权限或产品文案。
- Props 是否存在冲突、重复、过多 boolean 或过早扩展点。
- 状态是否有单一事实来源。
- `className`、`ref`、ARIA、受控/非受控 API 是否稳定。
- 测试是否验证公共行为，而不是内部实现。

### 5. 类型、状态和副作用审查

检查：

- `any`、`unknown`、类型断言和复杂泛型是否必要。
- 可选属性是否导致对象状态不明确。
- 公共类型是否导出过宽或泄漏内部实现。
- `useEffect` 是否用于状态同步或可派生计算。
- 事件监听器、定时器、订阅是否正确清理。
- loading、empty、error、disabled、readOnly、invalid、selected、expanded 的归属是否符合 SPEC。

### 6. 复杂度、重复和无效代码审查

检查：

- 条件嵌套、三元表达式、布尔逻辑和分支数量。
- 是否存在万能函数、万能 Props 或过早抽象。
- 是否存在只调用一次且没有提升可读性的包装函数。
- 重复代码是否同源；变化原因不同的代码不得强行合并。
- 废弃 TODO、注释掉代码、无意义注释、无意义中间变量和过时兼容层。

### 7. 调用方和风险验证

对每个候选问题：

- 用 `rg` 查找全部引用。
- 记录影响的源码、测试、公共导出和文档。
- 说明功能风险和兼容风险。
- 需要人工确认的问题明确标记“需要人工确认”。

### 8. 输出审核报告

报告结构必须符合用户要求：

1. 总体评价。
2. 按 P0、P1、P2、P3 排序的问题清单。
3. 推荐的目录结构调整。
4. 推荐的重命名清单。
5. 建议执行顺序。

问题格式：

```text
### [严重程度] 问题标题

* **位置**：
* **类别**：
* **问题**：
* **影响**：
* **证据**：
* **建议**：
* **功能风险**：
* **置信度**：
```

## Verification

审核前记录基线：

- `git status --short`
- `pnpm format:check`
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

审核中使用：

- `rg --files`
- `rg "<symbol>"`
- `find src -maxdepth 3 -type f`
- `git diff --stat`
- `git status --short`

如果只做审核不修改代码，验证命令只作为当前状态证据，不代表修复完成。

## Closure

本 RUNBOOK 是临时文件。审核报告完成后：

1. 将有长期价值的结论迁移到 `docs/40-readiness/` 或后续修复任务。
2. 删除本 RUNBOOK。
3. 清理 `docs/30-designs/README.md` 中可能新增的临时索引。
