# Code Rules

## Purpose

本文档固定 `scone-ui` 的 TypeScript、React、测试和代码审阅规则。

`scone-ui` 是 admin-ui 组件库，不是产品应用仓库。规则只约束公共组件、Pattern、库内工具、示例和测试，不引入产品路由、请求、权限、业务状态或后端契约规则。

## Scope

当前范围：

- `src/` 下除 `src/components/ui/` 之外的 TypeScript / React 代码。
- `src/components/ui/` 作为 vendored shadcn/Radix primitive 源码，整体排除在 lint / format 之外；上层 Scone wrapper 必须承担公共 API、可访问性、测试和类型边界。
- `src/test/`、`src/**/*.test.ts`、`src/**/*.test.tsx`。
- `eslint.config.mjs`、`vitest.config.ts` 和测试 reporter 等工具链入口。

不在范围内：

- 产品应用页面规则。
- 后端 API 业务契约。
- 未发布的外部消费者代码。
- shadcn/Radix vendored primitive 的内部实现风格。

## Principles

- 一致性优先于局部灵活性。
- 可机器门禁的规则优先沉淀到 ESLint、TypeScript、Vitest 或构建脚本。
- 暂时不能稳定门禁的语义判断固定放入 `Review Rules`。
- 同一条规则只归入一个层级；门禁已覆盖的规则不得在 `Review Rules` 重复。
- 门禁规则应尽量给出清晰失败信息，避免依赖开发者记忆。

## Hard Rules

Hard Rules 必须已经由 ESLint、TypeScript、Vitest、build 或明确脚本稳定验证。

### Code Quality

- `SCONE_CODE_ARROW_FUNCTION`：生产代码和测试中的命名函数默认使用 `const name = (...) => {}`；禁止 `function name(...)` 和普通 `function (...)` 表达式。由 ESLint `no-restricted-syntax` 门禁。`src/components/ui/` 不纳入门禁。
- `SCONE_CODE_NO_CONSOLE`：禁止 `console.*`。临时诊断必须删除，不通过注释长期豁免。由 ESLint `no-console` 门禁。
- `SCONE_CODE_NO_EXPLICIT_ANY`：禁止显式 `any`。无法建模或外部输入未知时使用 `unknown`，再通过类型缩窄或运行时校验进入内部模型。由 ESLint `@typescript-eslint/no-explicit-any` 门禁。
- `SCONE_CODE_EXPORTED_FUNCTION_BOUNDARY_TYPES`：导出的函数、hook 和组件入口必须显式声明参数类型和返回类型。由 ESLint `@typescript-eslint/explicit-module-boundary-types` 门禁。
- `SCONE_CODE_UNKNOWN_CATCH_CALLBACK`：Promise rejection callback 中的错误值必须按 `unknown` 处理。由 ESLint `@typescript-eslint/use-unknown-in-catch-callback-variable` 门禁。
- `SCONE_CODE_NO_INFERRABLE_LOCAL_TYPES`：局部变量、参数和属性的显然基础类型不重复标注，让 TypeScript 自动推断。由 ESLint `@typescript-eslint/no-inferrable-types` 门禁。
- `SCONE_CODE_NO_UNNECESSARY_TYPE_ARGUMENTS`：默认泛型实参和不必要类型参数不得显式写出。由 ESLint `@typescript-eslint/no-unnecessary-type-arguments`、`@typescript-eslint/no-unnecessary-type-constraint`、`@typescript-eslint/no-unnecessary-type-parameters` 门禁。
- `SCONE_CODE_NO_NESTED_TERNARY`：禁止嵌套三元表达式。复杂条件先拆成局部变量、helper 或普通分支。由 ESLint `no-nested-ternary` 门禁。
- `SCONE_CODE_HOOKS_RULES`：React Hooks 必须符合 `eslint-plugin-react-hooks` 推荐规则。

### Formatting

- `SCONE_FORMAT_PRETTIER`：全库格式使用 Prettier，缩进为 4 spaces。`src/components/ui/**/*.{ts,tsx}` 作为 vendored primitive 排除在格式化之外。

### Public Boundary

- `SCONE_PUBLIC_ENTRY_ONLY`：公共组件、Pattern、service、hook、helper 和类型只能从 `src/index.ts` 形成发布入口；`src/components/ui/*` 不作为公共 API 导出。由 `src/index.test.ts` 和 build types 输出边界守护。
- `SCONE_RECIPE_DOCS_ONLY`：Recipe 只作为文档说明，不新增 `src/recipes/`，也不导出 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid` 等 recipe 名称。由 `src/index.test.ts` 守护。

### Testing

- `SCONE_TEST_QUIET_OUTPUT`：测试通过时输出必须保持简短汇总；通过用例中的 console 输出不应污染测试结果。由 `vitest.config.ts` 的 quiet reporter 和 `silent: "passed-only"` 处理。
- `SCONE_TEST_USER_SEMANTICS`：组件测试优先使用 role、label、ARIA state、可见文本、value 和 callback 断言；只有 documented slot / layout contract 才使用 `data-scone-*` 或 `data-slot`。

## Review Rules

Review Rules 由 AI 或人工审阅执行，暂不强制门禁。

### Type Modeling

- 组件必须定义清晰的 `Props` 类型；事件 callback 类型应表达参数、原因或状态 payload，不使用松散 `(value: unknown) => void` 逃避建模。
- 多状态对象优先使用 discriminated union，例如 `{ state: "loading" } | { state: "error"; error: unknown } | { state: "success"; data: T }`。只有状态维度独立且确实可组合时才使用多个 boolean。
- 不确定的外部输入使用 `unknown` 进入边界，经过运行时校验或类型缩窄后再传入内部组件模型。
- 避免过深泛型、条件类型和类型体操。公共 props 类型应能被消费者直接阅读；复杂类型必须有真实复用收益。
- 公共 API 类型不得泄露内部 DOM wiring、vendored primitive 私有结构或实现细节，除非这是明确承诺的 wrapper 扩展点。

### Runtime Validation

- 外部输入不仅要有 TypeScript 类型，还要在运行时校验。适用对象包括文件上传、尺寸字符串、分页状态、公共 helper 输入、服务型 API options、从 DOM 或第三方库回调进入的数据。
- 运行时校验失败应选择清晰策略：忽略、fallback、clamp、抛出带字段名的错误，或通过 callback 报告。不得静默产生 `NaN`、重复 id、无效 ARIA 或无法恢复状态。
- 运行时校验不应引入产品业务规则；组件库只校验 UI 契约和公共 API 契约。

### React And UI

- 复杂分支不要直接堆在 JSX 中。先用局部变量、helper 或子组件表达状态。
- 公共组件必须提供稳定可访问名称策略。图标按钮、搜索框、表格、分页、dialog/drawer/confirm 等可交互或结构化组件必须能通过 role/name 定位。
- 原生元素已有语义时不要为了测试覆盖 role；只补充稳定名称和 ARIA 关联。
- 组件 root 的 `ref`、`className` 和 HTML props 应指向同一个公共 root；内部 slot 需要额外样式入口时应显式命名。

### Tests

- 测试应验证用户可观察行为和公共 API 契约，不绑定无文档承诺的内部 DOM 结构。
- 行为修复必须包含回归测试；结构重构必须保留公共导出和代表性类型测试。
- 对服务型 API、timer、async confirmation、upload validation 等副作用代码，测试必须覆盖成功、失败和清理路径。

## Code Review Checklist

- [ ] 是否有规则可转成 ESLint / TypeScript / Vitest 门禁；如果有，是否已经接入 hard rule。
- [ ] 导出的组件、hook、helper 是否具备清晰参数和返回类型。
- [ ] Props 和 callback payload 是否表达真实公共契约。
- [ ] 多状态模型是否比多个 boolean 更适合 discriminated union。
- [ ] 是否避免显式 `any`；未知外部输入是否从 `unknown` 开始缩窄。
- [ ] 外部输入是否有运行时校验和失败策略。
- [ ] 是否避免过深泛型、条件类型和类型体操。
- [ ] 测试是否优先断言 role、label、ARIA、value、可见结果和 callback。
- [ ] 是否没有触碰 `src/components/ui/` vendored primitive，除非任务明确要求更新 vendored 基础组件。
