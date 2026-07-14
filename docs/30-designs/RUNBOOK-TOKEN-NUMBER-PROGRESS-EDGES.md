# Token, NumberInput, And Progress Edge Fix Runbook

## Purpose

完成 `Systematic Code Review 2026-07` 中三项 P1 小范围修复：Tailwind config stale token 变量名、`SconeProgress` invalid `max` 产生 `NaN%`、`SconeNumberInput` 非有限数字提交 `NaN`。

## Scope

- `tailwind.config.ts`
- `src/styles/theme.test.ts`
- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/progress.test.tsx`
- `src/components/form/number-input.tsx`
- `src/components/form/number-input.test.tsx`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

## Non-goals

- 不调整 `src/styles/theme.css` token 命名和 token 值。
- 不重构 Tailwind v4 CSS-first 配置路径。
- 不改动 `useControllableState` 的 controlled `undefined` 语义。
- 不处理本次审查报告中的其他 P1/P2/P3 问题。

## Data And Behavior Contracts

### Tailwind token mapping

`tailwind.config.ts` 只处理 `theme.extend` 内 stale token 引用，不新增 theme 字段。`theme.css` 没有当前 `--scone-font-size-*` token，因此 `fontSize` stale extension 需要删除，而不是映射到 font family token。

- `theme.extend.fontFamily.body`: `var(--scone-font-body)`
- `theme.extend.fontFamily.label`: `var(--scone-font-label)`
- `theme.extend.fontFamily.title`: `var(--scone-font-title)`
- `theme.extend.fontFamily.mono`: `var(--scone-font-mono)`
- `theme.extend.fontSize`: 删除 `body`、`label`、`title` 三个 stale `--scone-font-size-*` 映射；不新增替代字段。
- `theme.extend.transitionDuration.fast`: `var(--scone-duration-fast)`
- `theme.extend.transitionDuration.DEFAULT`: `var(--scone-duration-default)`
- `theme.extend.transitionTimingFunction.standard`: `var(--scone-easing-standard)`
- `theme.extend.zIndex.sticky`: `var(--scone-z-sticky)`
- `theme.extend.zIndex.dropdown`: `var(--scone-z-dropdown)`
- `theme.extend.zIndex.popover`: `var(--scone-z-popover)`
- `theme.extend.zIndex.drawer`: `var(--scone-z-drawer)`
- `theme.extend.zIndex.modal`: `var(--scone-z-modal)`
- `theme.extend.zIndex.toast`: `var(--scone-z-toast)`

### `SconeProgress` numeric model

`src/components/feedback-overlay/progress.tsx` 的内部归一化结果需要明确包含以下字段，字段名可按实现保持简洁，但语义必须一致：

- `value`: 传给 Radix `ProgressPrimitive.Root` 的 `value`，必须是有限数字。
- `max`: 传给 Radix `ProgressPrimitive.Root` 的 `max`，必须是大于 `0` 的有限数字；原始 `max` 非有限或 `<= 0` 时使用 `100`。
- `percent`: 用于 `aria-valuetext`、可见百分比文本、`ProgressPrimitive.Indicator` `transform` 的整数百分比，必须是 `0` 到 `100` 的有限数字。

前端控件行为：

- 控件：`SconeProgress`
- 操作：渲染 `<SconeProgress value={50} max={0} showLabel />`
- 预期：progressbar 不出现 `NaN`；可见 label 为 `50%` 或与归一化语义一致的有限百分比；`aria-valuetext` 为同一有限百分比；indicator transform 不包含 `NaN`。
- 操作：渲染 `<SconeProgress value={50} max={Number.NaN} showLabel />`
- 预期：同上，不产生 `NaN%`、`translateX(NaN%)` 或非有限 ARIA 值。

### `SconeNumberInput` input commit model

`src/components/form/number-input.tsx` 的提交路径只允许三类值进入 `setCurrentValue` / `onValueChange`：

- `undefined`: 用户把输入框清空时提交。
- finite `number`: 用户输入可解析的有限数字时提交，并继续应用 `min` / `max` clamp。
- stepper finite `number`: 用户点击 `Increment value` / `Decrement value` 按钮时提交，并继续应用 `step`、`min`、`max`。

非空输入解析为 `NaN`、`Infinity`、`-Infinity` 或其他非有限数字时，不调用 `setCurrentValue`，不调用 `onValueChange`，不把 `NaN` 写入输入框状态。

前端控件行为：

- 控件：`SconeNumberInput`
- 操作：用户在 number input 中输入非有限中间态文本，例如 exponent fragment。
- 预期：`onValueChange` 不收到 `NaN`；输入框不会被组件状态提交为 `NaN`。
- 操作：用户清空 number input。
- 预期：`onValueChange(undefined)` 保持现有行为。
- 操作：用户随后输入合法数字，或点击 `Increment value` / `Decrement value`。
- 预期：合法数字仍提交，stepper 仍按 `step`、`min`、`max` 生效。

## Plan

### Task 1: Tailwind token config

文件范围：

- `tailwind.config.ts`
- `src/styles/theme.test.ts`

执行：

1. 将 `tailwind.config.ts` 中 `theme.extend.fontFamily`、`transitionDuration`、`transitionTimingFunction`、`zIndex` 的 stale `--scone-*` 变量名替换为当前 `theme.css` 变量名。
2. 删除 `tailwind.config.ts` 中 `theme.extend.fontSize.body`、`fontSize.label`、`fontSize.title` 三个 stale 映射；不新增 font size token。
3. 在 `src/styles/theme.test.ts` 增加 Tailwind config 回归测试：断言 config 文本不包含 `--scone-font-family-`、`--scone-font-size-`、`--scone-motion-`、`--scone-z-index-`。
4. 同一测试断言 config 文本包含当前变量名：`--scone-font-body`、`--scone-font-label`、`--scone-font-title`、`--scone-font-mono`、`--scone-duration-fast`、`--scone-duration-default`、`--scone-easing-standard`、`--scone-z-sticky`、`--scone-z-dropdown`、`--scone-z-popover`、`--scone-z-drawer`、`--scone-z-modal`、`--scone-z-toast`。

### Task 2: Progress invalid max

文件范围：

- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/progress.test.tsx`

执行：

1. 调整 `SconeProgress` 内部归一化逻辑，避免用原始 invalid `max` 计算 `percent`。
2. 确保 `ProgressPrimitive.Root` 的 `value`、`max`、`aria-valuetext` 和 `ProgressPrimitive.Indicator` 的 `transform` 使用同一组归一化结果。
3. 在 `progress.test.tsx` 增加 invalid `max` 回归用例，至少覆盖 `max={0}` 和 `max={Number.NaN}`。
4. 测试断言：`aria-valuetext` 不包含 `NaN`；可见百分比文本不包含 `NaN`；indicator `style.transform` 不包含 `NaN`；progressbar `aria-valuemax` 是有限正数。

### Task 3: NumberInput non-finite input

文件范围：

- `src/components/form/number-input.tsx`
- `src/components/form/number-input.test.tsx`

执行：

1. 调整 `SconeNumberInput` 的输入提交逻辑：`rawValue === ""` 仍提交 `undefined`；非空 `rawValue` 先解析为数字，只有 `Number.isFinite(parsedValue)` 时才提交。
2. 保持 `clampNumber` 对 `min` 和 `max` 的现有有限数字判断；不要把非有限输入交给 `clampNumber`。
3. 保持 `Increment value` 和 `Decrement value` 两个按钮的现有操作语义：基于 `currentValue ?? 0`、`step`、`min`、`max` 提交有限数字。
4. 在 `number-input.test.tsx` 增加回归用例：模拟用户输入非有限中间态，断言 `onValueChange` 不收到 `NaN`；随后清空输入断言收到 `undefined`；随后输入合法数字断言正常提交。

### Task 4: Review report cleanup

文件范围：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
- `docs/30-designs/RUNBOOK-TOKEN-NUMBER-PROGRESS-EDGES.md`
- `docs/30-designs/README.md`

执行：

1. 修复和验证完成后，从 `SYSTEMATIC-CODE-REVIEW-2026-07.md` 的 P1 索引中删除已完全处理的三项：Tailwind config stale token、NumberInput `NaN`、Progress `NaN%`。
2. 删除对应 finding 章节：`[P1] Tailwind config references stale token variable names`、`[P1] NumberInput can commit NaN into component state`、`[P1] Progress can render NaN% when max is invalid`。
3. 如需保留验证证据，只记录最终验证命令和结果，不记录执行中间状态。
4. 删除本 RUNBOOK，并从 `docs/30-designs/README.md` 的 `Active Runbooks` 移除入口。

## Verification

- `pnpm test -- src/styles/theme.test.ts src/components/feedback-overlay/progress.test.tsx src/components/form/number-input.test.tsx`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format:check`

## Closure

修复完成并通过验证后，同步 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`。已完全处理的问题从该报告的问题清单索引和对应 finding 章节中删除；如需保留验证证据，只记录最终验证结果。

完成 readiness 同步后，删除本文档，并在 `docs/30-designs/README.md` 的 `Active Runbooks` 中移除对应入口。
