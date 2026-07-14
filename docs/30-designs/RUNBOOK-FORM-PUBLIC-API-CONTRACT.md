# Form Public API Contract Runbook

## Purpose

完成 `form-public-api-contract` 闭环，处理 Systematic Code Review 2026-07 中与 Form 公共 API 契约相关的三个 P2 问题：

- `useControllableState` 的 controlled `undefined` 契约。
- Form context internals 的公共导出边界。
- text input value plumbing 在同族控件中的重复。

本次闭环不做 breaking change。目标是把当前兼容契约用测试和必要注释锁住，并把可安全收口的重复逻辑收敛到 Form 内部实现。

## Scope

纳入本次闭环的文件：

- `src/lib/use-controllable-state.ts`
- `src/lib/use-controllable-state.test.tsx`
- `src/components/form/form.tsx`
- `src/components/form/field.tsx`
- `src/components/form/index.ts`
- `src/components/form/input.tsx`
- `src/components/form/input.test.tsx`
- `src/components/form/search-input.tsx`
- `src/components/form/search-input.test.tsx`
- `src/components/form/password-input.tsx`
- `src/components/form/password-input.test.tsx`
- `src/components/form/textarea.tsx`
- `src/components/form/textarea.test.tsx`
- `src/index.ts`
- `src/index.test.ts`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

允许新增仅供 Form 内部使用的辅助文件，位置必须在 `src/components/form/` 下；新增文件不得从 `src/index.ts` 公共导出。

## Non-goals

- 不删除 `useSconeFormContext`、`useSconeFieldContext`、`SconeFormContextValue` 或 `SconeFieldContextValue` 的公共导出。
- 不改变 `useControllableState` 以 `value !== undefined` 判定 controlled mode 的运行时语义。
- 不把 generated field ids 从 `SconeFieldContextValue` 中移除。
- 不调整 Form 以外组件族的受控状态行为。
- 不引入产品应用级表单规则、校验模型、后端契约或业务 workflow。

## Plan

### Task 1: 锁定 controlled `undefined` 契约

文件：

- `src/lib/use-controllable-state.ts`
- `src/lib/use-controllable-state.test.tsx`

字段和数据结构：

- `UseControllableStateOptions<T>.value?: T`：继续表示可选受控值；当字段值为 `undefined` 时，运行时按未传入处理。
- `UseControllableStateOptions<T>.defaultValue?: T | (() => T)`：继续作为 uncontrolled 初始值来源。
- `UseControllableStateOptions<T>.onValueChange?: (value: T) => void`：setter 提交新值时继续通知。
- `ControllableStateSetter<T>`：保持 `(next: T | ((previous: T | undefined) => T)) => void`，不改变 `previous` 可为 `undefined` 的类型。

执行要求：

- 在 `src/lib/use-controllable-state.ts` 的 `const isControlled = value !== undefined;` 附近加简短注释，明确 `undefined` 是当前契约中的 uncontrolled sentinel。
- 在 `src/lib/use-controllable-state.test.tsx` 增加测试：`value` 显式为 `undefined` 且 `defaultValue` 有值时，初始值来自 `defaultValue`。
- 同一测试必须执行 setter，断言本地值更新为新值，并断言 `onValueChange` 收到该新值。
- 不新增 `isControlled`、`controlled`、`allowUndefinedValue` 等新字段。

### Task 2: 锁定 Form context 公共导出边界

文件：

- `src/components/form/form.tsx`
- `src/components/form/field.tsx`
- `src/components/form/index.ts`
- `src/index.ts`
- `src/index.test.ts`

字段和数据结构：

- `SconeFormContextValue.disabled?: boolean`：继续公开。
- `SconeFormContextValue.readOnly?: boolean`：继续公开。
- `SconeFormContextValue.requiredMark?: boolean | "optional"`：继续公开。
- `SconeFieldContextValue.fieldId: string`：继续公开。
- `SconeFieldContextValue.labelId: string`：继续公开。
- `SconeFieldContextValue.descriptionId: string`：继续公开。
- `SconeFieldContextValue.messageId: string`：继续公开。
- `SconeFieldContextValue.name?: string`：继续公开。
- `SconeFieldContextValue.invalid?: boolean`：继续公开。
- `SconeFieldContextValue.required?: boolean`：继续公开。
- `SconeFieldContextValue.disabled?: boolean`：继续公开。
- `SconeFieldContextValue.readOnly?: boolean`：继续公开。
- `SconeFieldContextValue.requiredMark?: boolean | "optional"`：继续公开。

执行要求：

- `src/components/form/index.ts` 继续导出 `SconeForm`、`useSconeFormContext`、`SconeFormContextValue`、`SconeFormProps`。
- `src/components/form/index.ts` 继续导出 `SconeField`、`useSconeFieldContext`、`SconeFieldContextValue` 和各 Field slot props。
- `src/index.ts` 继续从 `./components/form` 导出上述 runtime API 和类型。
- `src/index.test.ts` 必须继续断言 `useSconeFormContext` 和 `useSconeFieldContext` 是 runtime public exports。
- `src/index.test.ts` 必须补齐 `SconeFieldContextValue["labelId"]`、`["descriptionId"]`、`["messageId"]` 的 `string` 类型断言；已有 `["fieldId"]` 断言保留。
- 不新增替代公共类型，不新增 deprecated alias，不删除任何现有导出。

### Task 3: 收敛 `SconeInput` 和 `SconeSearchInput` 文本值 plumbing

文件：

- `src/components/form/input.tsx`
- `src/components/form/input.test.tsx`
- `src/components/form/search-input.tsx`
- `src/components/form/search-input.test.tsx`
- 可新增 `src/components/form/text-control.ts`

控件和操作：

- `SconeInput`：
    - 用户在 textbox 输入文本时，继续更新显示值。
    - 输入操作必须先触发 `onValueChange(nextValue)`，再触发原生 `onChange(event)`。
    - `ariaLabel` 继续映射到输入框 `aria-label`，且不覆盖显式 `aria-label` 的最终语义。
    - Field 包裹下继续注入 `id`、`name`、`aria-labelledby`、`aria-describedby`、`aria-invalid`、`aria-required`、`disabled`、`readOnly` 和状态 data attributes。
- `SconeSearchInput`：
    - 用户在 searchbox 输入文本时，继续更新显示值。
    - clear button 点击时继续调用同一 setter，把值置为 `""` 并触发 `onValueChange("")`。
    - `loading` 为 true 时显示 loading 图标，不显示 clear button。
    - `readOnly` 或 `disabled` 时不显示 clear button。

执行要求：

- 可以新增 `src/components/form/text-control.ts`，只放 Form 内部 helper 或 hook。
- helper 只集中处理 `useControllableState<string>`、`useSconeFieldContext`、`getSconeControlStateProps`、`normalizeSconeAriaInvalid`、`ariaLabel` 合并和 change 提交流程。
- helper 不得导出到 `src/components/form/index.ts` 或 `src/index.ts`。
- `SconeInput` 保持单个 `<Input>` 的 ref 目标不变。
- `SconeSearchInput` 保持外层 `data-scone-search-input` wrapper、Search 图标、Loader 图标和 clear button 行为不变。
- 测试必须覆盖 `SconeInput` 输入时 `onValueChange` 在原生 `onChange` 之前执行。
- 测试必须覆盖 `SconeSearchInput` 输入时 `onValueChange` 在原生 `onChange` 之前执行，并保留 clear button 行为覆盖。

### Task 4: 收敛 `SconePasswordInput` 和 `SconeTextArea` 文本值 plumbing

文件：

- `src/components/form/password-input.tsx`
- `src/components/form/password-input.test.tsx`
- `src/components/form/textarea.tsx`
- `src/components/form/textarea.test.tsx`
- `src/components/form/text-control.ts`，如果 Task 3 已新增

控件和操作：

- `SconePasswordInput`：
    - 用户在 password textbox 输入文本时，继续更新显示值。
    - 输入操作必须先触发 `onValueChange(nextValue)`，再触发原生 `onChange(event)`。
    - visibility button 点击后继续在 `type="password"` 与 `type="text"` 间切换。
    - `disabled` 或 `readOnly` 时 visibility button 继续不可交互。
    - button 文案继续在 `visibilityLabel` 与 `hideVisibilityLabel` 之间切换。
- `SconeTextArea`：
    - 用户在 textarea 输入多行文本时，继续更新显示值。
    - 输入操作必须先触发 `onValueChange(nextValue)`，再触发原生 `onChange(event)`。
    - `showCount` 为 true 时继续显示字符数。
    - 有 `maxLength` 时 count 继续显示为 `${count}/${maxLength}`；无 `maxLength` 时显示 `count`。
    - `autoSize` 为 true 时继续向 textarea 写入 `data-autosize` 和 `field-sizing-content` class。

执行要求：

- 复用 Task 3 的内部 helper，不为 password 和 textarea 再复制一套通用受控逻辑。
- `SconePasswordInput` 保持外层 `data-scone-password-input` wrapper、Eye/EyeOff 图标和 visibility button 行为不变。
- `SconeTextArea` 保持外层 `data-scone-textarea` wrapper、count 区域和 textarea ref 目标不变。
- 测试必须覆盖 `SconePasswordInput` 输入时 `onValueChange` 在原生 `onChange` 之前执行，并保留 visibility toggle 覆盖。
- 测试必须覆盖 `SconeTextArea` 输入时 `onValueChange` 在原生 `onChange` 之前执行，并保留 count 覆盖。

### Task 5: 同步审查文档并收口

文件：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
- `docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`

执行要求：

- 完全处理后，从 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 删除以下已关闭章节：
    - `[P2] Controlled state helper cannot represent undefined as a controlled value`
    - `[P2] Form context internals are part of the public package surface`
    - `[P2] Text input value plumbing is duplicated across sibling components`
- 如其中任何一项没有完全处理，不删除对应章节，只把建议收窄为剩余风险。
- 任务关闭前删除 `docs/30-designs/RUNBOOK-FORM-PUBLIC-API-CONTRACT.md`。

## Verification

最小验证命令：

```bash
pnpm test -- src/lib/use-controllable-state.test.tsx src/components/form/input.test.tsx src/components/form/search-input.test.tsx src/components/form/password-input.test.tsx src/components/form/textarea.test.tsx src/index.test.ts
pnpm typecheck
```

如实现过程中新增 Form 内部 helper 或触碰导出入口，补充运行：

```bash
pnpm lint
pnpm format:check
```

## Closure

完成代码和测试后必须同步 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`。如果上述三个问题已被测试、注释或内部实现收口完全覆盖，应删除对应章节，而不是继续保留为待处理发现。

任务关闭前删除本 RUNBOOK；如存在仍需长期保留的结论，只沉淀到 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`。
