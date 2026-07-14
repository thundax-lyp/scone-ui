# HOW-TO: Systematic Code Review

## Purpose

本文档定义一次系统性前端代码审核的执行手册。目标是从需求、公开 API、源码结构、测试和验证证据出发，识别影响清晰度、维护成本、复杂度和类型安全的问题。

本文档按用户明确要求持续保留，用作系统性代码审核的稳定执行流程。

## Scope

审核范围：

- `src/` 下的 React / TypeScript 源码、测试、样式入口和公共导出。
- `docs/10-specs/` 中定义的组件、Pattern、Recipe 和 Foundation 需求。
- `docs/30-designs/` 中定义的架构、文件落点、类型、导出面、组件族、Pattern、Recipe 和验证策略。
- `docs/40-readiness/` 中记录的实现覆盖和验证证据。
- 构建、测试、lint、TypeScript 和依赖配置。

重点审核维度：

- 命名、目录结构、模块边界、职责划分。
- 公开 API、Props、Hooks、Context、工具函数、类型导出。
- 数据流、状态管理、副作用、控制流和认知复杂度。
- TypeScript 类型设计、错误处理、可测试性、依赖封装。
- 重复代码、错误抽象、无效代码和认知噪音。

## Non-goals

- 不直接修改代码，除非用户明确要求进入修复阶段。
- 不基于个人风格提出格式化、换行、引号等低价值意见。
- 不为了减少代码行数而压缩代码。
- 不为了套用设计模式引入新抽象。
- 不假设未来产品需求。
- 不迁移产品应用级 UI 规则到本仓库。

## Inputs

必读输入：

1. `docs/AGENTS.md`
2. `docs/00-governance/DOCUMENT-RULES.md`
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

按需读取：

- 涉及某个组件族时，读取对应 `docs/10-specs/COMPONENT-SPEC-*.md` 和 `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`。
- 涉及 Pattern 时，读取 `docs/30-designs/admin-ui/PATTERN-DESIGN.md`。
- 涉及 Recipe 时，读取 `docs/30-designs/admin-ui/RECIPE-DESIGN.md`。
- 涉及类型或公共数据结构时，读取 `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md`。
- 涉及导出面时，读取 `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`。

## Plan

### 1. 项目识别

确认框架、构建工具、状态管理、路由、主要依赖和目录结构：

- React / TypeScript / Vite / Vitest / ESLint / Tailwind。
- 是否存在路由、请求层、全局 store、服务端状态库。
- `src/components/*`、`src/patterns/*`、`src/lib/*`、`src/types/*` 的职责边界。

### 2. 公开导出和入口审查

检查：

- `src/index.ts` 是否与 `COMPONENT-SELECTION.md` Export Groups 一致。
- `src/index.test.ts` 是否守住公共导出和 Recipe docs-only 边界。
- 组件族入口是否只导出本族公共组件和公共类型。
- barrel export 是否掩盖跨模块内部依赖。

### 3. 模块依赖方向审查

按依赖方向检查：

```text
Foundation -> lib/types -> components/ui -> components/* -> patterns -> recipes/docs
```

重点确认：

- 组件不依赖 Pattern。
- Foundation 不依赖组件。
- Recipe 不创建源码入口。
- Pattern 不包含请求、权限、路由或产品业务流程。
- 公共工具是否真的跨组件复用。

### 4. 组件族审查

按组件族逐项检查：

- Form
- Data Display
- Layout
- Feedback / Overlay
- Navigation
- Media
- Admin Patterns

每个组件族检查：

- 文件名、导出名、组件名、Props 类型名是否一致。
- 组件职责是否清晰，是否混合业务规则、请求、路由或权限。
- Props 是否存在冲突、重复、过多 boolean 或不必要扩展点。
- 状态是否有单一事实来源。
- `className`、`ref`、ARIA、受控/非受控 API 是否稳定。
- 测试是否验证公共行为，而不是内部实现细节。

### 5. 类型设计审查

检查：

- `any`、`unknown`、类型断言是否必要。
- 泛型是否降低理解成本。
- 可选属性是否导致对象状态不明确。
- 重复类型是否可以合并到已有公共类型。
- 类型是否泄漏内部实现细节。
- 公共类型是否导出过宽。

### 6. 副作用和状态审查

检查：

- `useEffect` 是否用于状态同步或可派生计算。
- 事件监听器、定时器、订阅是否清理。
- 异步流程是否存在竞态。
- loading、empty、error、disabled、readOnly、invalid、selected、expanded 的归属是否符合 SPEC。
- Context 是否只用于真实跨层共享状态。

### 7. 复杂度、重复和错误抽象审查

检查：

- 条件嵌套、三元表达式、布尔逻辑是否难以理解。
- 是否存在万能函数、万能 Props 或过早抽象。
- 是否存在只调用一次且没有提升可读性的包装函数。
- 重复代码是否同源；不同变化原因的代码不得强行合并。
- 是否存在无意义中间变量、废弃 TODO、注释掉代码或过时兼容层。

### 8. 调用方验证

提出任何重命名、移动、API 调整前，必须：

- 用 `rg` 查找全部引用。
- 说明影响的源码、测试、公共导出和文档。
- 判断是否影响现有功能、扩展能力或类型安全。
- 对无法确认的事项标记“需要人工确认”。

### 9. 输出审核结果

输出必须先给总体评价，再给问题清单。问题按 P0、P1、P2、P3 排序；相同根因合并报告。

每个问题使用固定格式：

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

最后输出：

- 推荐的目录结构调整。
- 推荐的重命名清单。
- 建议执行顺序。

## Verification

审核前运行或记录当前基线：

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

如果只做审核不改代码，验证命令用于确认当前状态，不作为“修复已完成”证据。

## Closure

本文档是长期 HOW-TO，不随单次审核完成而删除。

后续如果执行修复，应另起具体任务或 PR，并在 `docs/40-readiness/` 记录实际修改范围、验证命令和剩余风险。
