# Form 复杂交互与数值输入治理 RUNBOOK

## Purpose

收口 `src/components/form/*` 中维护成本最高的复杂交互和数值输入边界，目标是让 NumberInput、Combobox、DatePicker 的状态、overlay、focus、keyboard 和清除语义与现有组件库 primitive 保持一致，降低后续维护和可访问性风险。

## Scope

- `src/components/form/number-input.tsx`
- `src/components/form/number-input.test.tsx`
- `src/components/form/combobox.tsx`
- `src/components/form/combobox.test.tsx`
- `src/components/form/date-picker.tsx`
- `src/components/form/date-picker.test.tsx`
- 必要时只触及 `src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx` 的 value plumbing 评估或极小修正。

## API And State Contracts

### NumberInput

- 保留字段：`value?: number`、`defaultValue?: number`、`onValueChange?: (value: number | undefined) => void`、`min`、`max`、`step`、`disabled`、`readOnly`、`invalid`、`size`。
- 内部提交值只允许两类：`undefined` 或 `Number.isFinite(value) === true` 的 `number`。
- `event.currentTarget.value === ""` 时提交 `undefined`。
- `Number(event.currentTarget.value)` 为 `NaN`、`Infinity`、`-Infinity` 或其他非有限值时，不更新 `currentValue`，不调用 `onValueChange`。
- `clampNumber(value, min, max)` 只接收 finite number；`min`、`max` 仍只在可解析为 finite number 时生效。
- step button 使用字段：`currentValue`、`stepValue`、`min`、`max`；点击增减后仍通过同一 finite guard 和 clamp 逻辑提交。

### Combobox

- 保留字段：`options`、`value`、`defaultValue`、`onValueChange`、`open`、`defaultOpen`、`onOpenChange`、`searchValue`、`onSearchValueChange`、`placeholder`、`searchPlaceholder`、`emptyText`、`loading`、`disabled`、`readOnly`、`invalid`、`size`。
- 内部状态字段保持语义：`currentValue` 表示已选 `option.value`；`currentOpen` 表示 overlay 开关；`currentSearch` 表示搜索文本；新增或替换的 active 状态必须明确指向当前可选 option 的 `value` 或 stable id。
- `options[].value` 仍是选择和回调的唯一数据键；`options[].label` 只用于显示和搜索文本；`options[].disabled` 必须阻止鼠标选择和键盘选择。
- clear control 必须是独立 `button type="button"`，操作结果是 `onValueChange(undefined)`、清空搜索、关闭 overlay；不得再使用嵌套在 trigger button 内的 `span role="button"`。
- overlay 关闭来源必须覆盖 trigger 再次点击、Escape、outside pointer/focus、选择 option、clear button。

### DatePicker

- 保留字段：`value`、`defaultValue`、`onValueChange`、`open`、`defaultOpen`、`onOpenChange`、`disabledDate`、`placeholder`、`formatLabel`、`disabled`、`readOnly`、`invalid`、`size`。
- 内部状态字段保持语义：`currentValue` 表示已选日期；`currentOpen` 表示 calendar overlay 开关；月视图 anchor 默认来自 `currentValue ?? new Date()`，除非本次实现显式新增独立 anchor 状态。
- 日期按钮的数据来源仍是 `getMonthDays(anchorDate)`；`disabledDate(date) === true` 的日期不得被鼠标点击或键盘选择。
- clear control 必须是独立 `button type="button"`，操作结果是 `onValueChange(undefined)`、关闭 overlay；不得再使用嵌套在 trigger button 内的 `span role="button"`。
- overlay 关闭来源必须覆盖 trigger 再次点击、Escape、outside pointer/focus、选择日期、clear button，并在可验证范围内把焦点返回 trigger 或保持在合理的 primitive 默认路径。

## Non-goals

- 不处理 Navigation 的 Dropdown、Command 或其他 overlay 组件。
- 不新增产品应用级 UI 规则、业务流程、后端约定或运行时假设。
- 不扩大到全局 `useControllableState` 行为调整，除非当前 Form 修复无法在组件局部完成。
- 不为了抽象而提取 text input 通用 hook；只有当当前修复实际触达重复逻辑且收益明确时才做小范围内部整理。
- 不修改公共导出面，除非修复必须暴露已有组件的正确语义。

## Plan

### Task A: NumberInput 非有限值治理

相关文件：

- `src/components/form/number-input.tsx`
- `src/components/form/number-input.test.tsx`

前端控件和操作：

- 控件：数字文本框、increment button、decrement button。
- 操作：输入空字符串、输入无效 exponent 片段、输入正常数字、点击 increment、点击 decrement。

实现要求：

- 在 `number-input.tsx` 中把提交路径收敛为一个内部函数，例如 `commitNumberInput(rawValue: string)` 或等价实现。
- `rawValue === ""` 提交 `undefined`。
- `Number(rawValue)` 非 finite 时直接返回，不调用 `setCurrentValue`，不触发 `onValueChange`。
- `commitNumber(nextValue)` 只接受 `number | undefined`，且 number 分支必须经过 finite guard 后再进入 `clampNumber`。
- increment/decrement 继续以 `currentValue ?? 0` 为起点，但提交结果必须走同一 guard 和 clamp。

测试要求：

- `number-input.test.tsx` 增加非有限输入不会触发 `onValueChange` 的用例。
- 保留并覆盖空输入触发 `onValueChange(undefined)`。
- 覆盖 min/max clamp 不被非有限输入绕过。
- 覆盖 step button 在空值、min、max 附近的行为。

### Task B: Combobox overlay/listbox/focus/keyboard 收口

相关文件：

- `src/components/form/combobox.tsx`
- `src/components/form/combobox.test.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/command.tsx`

前端控件和操作：

- 控件：combobox trigger、search input、option item、clear button、loading indicator、empty state。
- 操作：点击 trigger 打开/关闭、输入搜索词、ArrowDown/ArrowUp 移动 active option、Enter 选择 active option、Escape 关闭、点击外部关闭、Tab 或焦点移出关闭、点击 disabled option、点击 clear button。

实现要求：

- 优先用 `Popover` 承担 overlay 开关、outside close、Escape close 和 focus 处理。
- 优先用 `Command` 承担搜索输入、列表、空状态和 active item；如不能一次迁移，必须在 `combobox.tsx` 中显式实现 active option 状态。
- active 状态字段必须是 `activeOptionValue: string | undefined` 或可追溯到 option 的 stable id，不得只依赖数组下标作为长期状态。
- trigger 继续暴露 `role="combobox"`、`aria-expanded`、`aria-controls`；若实现 active descendant，则 `aria-activedescendant` 指向当前 active option id。
- clear button 从 trigger button 内拆出为 sibling `button type="button"`，并有 `aria-label="Clear selection"`。
- `readOnly` 与 `disabled` 均不得打开 overlay、修改 `currentValue` 或修改 `currentSearch`。
- `loading === true` 时展示 loading state；不得允许选择不存在的 option。

测试要求：

- `combobox.test.tsx` 覆盖 trigger 打开、outside click 关闭、Escape 关闭。
- 覆盖搜索过滤后 ArrowDown/Enter 选择可用 option。
- 覆盖 disabled option 不可由点击或键盘选中。
- 覆盖 clear button 清空值、关闭 overlay、不会触发 trigger toggle。
- 覆盖受控字段：`open`/`onOpenChange`、`searchValue`/`onSearchValueChange`、`value`/`onValueChange`。

### Task C: DatePicker overlay/focus/clear 语义收口

相关文件：

- `src/components/form/date-picker.tsx`
- `src/components/form/date-picker.test.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/dialog.tsx`

前端控件和操作：

- 控件：date trigger、calendar overlay、date cell button、clear button。
- 操作：点击 trigger 打开/关闭、按 Enter/Space 打开、按 Escape 关闭、点击外部关闭、选择日期、点击 disabled date、点击 clear button。

实现要求：

- 优先用 `Popover` 承担 calendar overlay；只有确认需要模态焦点陷阱时才改用 `Dialog`。
- trigger 继续暴露 `aria-haspopup="dialog"`、`aria-expanded`，并保持 Field 注入的 `id`、`aria-describedby`、`aria-invalid`。
- calendar overlay 必须有可访问名称，例如 `aria-label="Choose date"` 或 primitive 等价结构。
- date cell 继续使用 `button type="button"`，`aria-pressed` 表示选中态，`disabledDate(date)` 映射到 `disabled`。
- clear button 从 trigger button 内拆出为 sibling `button type="button"`，并有 `aria-label="Clear date"`。
- `readOnly` 与 `disabled` 均不得打开 overlay、修改 `currentValue` 或触发 clear。
- 选择日期后调用 `onValueChange(date)` 并关闭 overlay；清除后调用 `onValueChange(undefined)` 并关闭 overlay。

测试要求：

- `date-picker.test.tsx` 覆盖 trigger 点击和 Enter/Space 打开。
- 覆盖 Escape 关闭、outside click 关闭、选择日期后关闭。
- 覆盖 disabled date 不触发 `onValueChange`。
- 覆盖 clear button 清空值、关闭 overlay、不会触发 trigger toggle。
- 覆盖受控字段：`open`/`onOpenChange`、`value`/`onValueChange`。

### Task D: Text input value plumbing 评估和文档收口

相关文件：

- `src/components/form/input.tsx`
- `src/components/form/search-input.tsx`
- `src/components/form/password-input.tsx`
- `src/components/form/textarea.tsx`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

前端控件和操作：

- 控件：text input、search input、password input、textarea。
- 操作：输入文本、受控 value 更新、清空 search input、切换 password visibility、textarea count 显示。

执行要求：

- 只评估这些文件是否因 Task A-C 的 value、Field 或 ARIA 语义变化需要同步。
- 若没有直接修复收益，不改这四个组件，不新增内部 hook。
- 若必须修改，字段级保持 `value`、`defaultValue`、`onValueChange`、`onChange` 的现有公开语义：内部状态先更新，随后调用原生 `onChange`；Field 注入仍通过 `getSconeControlStateProps`。
- 若 Task A-C 全部完成并验证通过，从 `SYSTEMATIC-CODE-REVIEW-2026-07.md` 删除 NumberInput、Combobox、DatePicker 对应 P1 索引项和 finding 章节。
- 若 text input value plumbing 未处理，保留该 P2 finding；若已完全处理并有验证证据，再删除对应 P2 索引项和 finding 章节。

## Verification

- Task A：`pnpm test -- src/components/form/number-input.test.tsx`
- Task B：`pnpm test -- src/components/form/combobox.test.tsx`
- Task C：`pnpm test -- src/components/form/date-picker.test.tsx`
- Task D 若触及 text input：`pnpm test -- src/components/form/input.test.tsx src/components/form/search-input.test.tsx src/components/form/password-input.test.tsx src/components/form/textarea.test.tsx`
- `pnpm test -- src/components/form`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format:check`
- 如 overlay primitive 迁移影响导出或构建路径，补跑 `pnpm test -- src/index.test.ts`。

## Closure

任务关闭时删除本 RUNBOOK。长期仍有价值的验证结论沉淀到 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 或其他 readiness 文档；已完全处理的问题必须从系统性审核报告中删除，避免保留过期 finding。
