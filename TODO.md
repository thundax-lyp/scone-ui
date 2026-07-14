# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `03 text-inputs`：基础文本输入闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/input.tsx`、`src/components/form/textarea.tsx`、`src/components/form/input.test.tsx`、`src/components/form/textarea.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeInput` 和 `SconeTextArea` 的 value/defaultValue/onValueChange、readOnly、invalid、autoSize 和 count 行为。
    - 验收点：输入、清空、多行、计数、ref 和 Field invalid 测试通过。
    - 重要度：9/10

- [ ] `04 search-password-inputs`：SearchInput 和 PasswordInput 闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/search-input.test.tsx`、`src/components/form/password-input.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现搜索输入 clear/loading 和密码输入可见性切换。
    - 验收点：输入、clear、loading、password/text 切换、按钮可访问名称和禁用只读测试通过。
    - 重要度：9/10

- [ ] `05 select`：Select 控件闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/select.tsx`、`src/components/form/select.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeSelect` 的 options、value/defaultValue/onValueChange、open/defaultOpen/onOpenChange 和 Field invalid。
    - 验收点：打开、键盘移动、选择、disabled option、受控 open 和 ARIA 状态测试通过。
    - 重要度：9/10

- [ ] `06 switch-checkbox`：Switch 和 Checkbox 闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/switch.test.tsx`、`src/components/form/checkbox.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeSwitch` 和 `SconeCheckbox` 的 checked/defaultChecked/onCheckedChange、indeterminate、disabled 和 Field invalid。
    - 验收点：点击、Space 键、半选态、disabled 和 ARIA 状态测试通过。
    - 重要度：8/10

- [ ] `07 radio-slider`：RadioGroup 和 Slider 闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/radio-group.tsx`、`src/components/form/slider.tsx`、`src/components/form/radio-group.test.tsx`、`src/components/form/slider.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeRadioGroup` 和 `SconeSlider` 的选项、数值数组、方向、min/max/step、键盘和 Field invalid。
    - 验收点：点击、方向键、拖动、键盘调整、disabled 和 ARIA 状态测试通过。
    - 重要度：8/10

- [ ] `08 combobox-number-input`：Combobox 和 NumberInput 闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/combobox.tsx`、`src/components/form/number-input.tsx`、`src/components/form/combobox.test.tsx`、`src/components/form/number-input.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeCombobox` 搜索选择和 `SconeNumberInput` 数字输入、清空、stepper、min/max。
    - 验收点：open/search/select/clear、loading/empty、数字输入、undefined 空值和边界测试通过。
    - 重要度：9/10

- [ ] `09 date-picker`：DatePicker 控件闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/date-picker.tsx`、`src/components/form/date-picker.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeDatePicker` 的 Date 值、open 状态、disabledDate、placeholder、formatLabel 和 Field invalid。
    - 验收点：键盘打开、选择日期、禁用日期、清空、受控 open 和 ARIA 状态测试通过。
    - 重要度：9/10

- [ ] `10 upload`：Upload 控件闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/upload.tsx`、`src/components/form/upload.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeUpload` 的本地 File[]、accept、multiple、maxFiles、maxSize、beforeAdd 和 onReject。
    - 验收点：选择文件、拒绝原因、disabled、multiple=false 和 onValueChange 文件列表测试通过。
    - 重要度：9/10

- [ ] `11 field-group`：FieldGroup 布局闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/field-group.tsx`、`src/components/form/field-group.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeFieldGroup` 的 title、description、columns、children、className 和语义容器。
    - 验收点：分组标题、说明、tab 顺序、columns 布局和 ref 测试通过。
    - 重要度：7/10

- [ ] `12 form-section-actions`：FormSection 和 FormActions 闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx`、`src/components/form/form-section.test.tsx`、`src/components/form/form-actions.test.tsx`、`src/components/form/index.ts`
    - 处理动作：实现 `SconeFormSection` 与 `SconeFormActions` 的标题、说明、局部 actions、align、sticky 和响应式换行。
    - 验收点：分区内容、header actions、sticky actions、窄屏换行和 ref 测试通过。
    - 重要度：7/10

- [ ] `13 public-export`：Form 公共导出闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`src/components/form/index.ts`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：汇总导出所有 Form 组件、props 类型和根入口 public exports。
    - 验收点：族入口和根入口 runtime export keys、public type assertions 测试通过。
    - 重要度：10/10

- [ ] `14 sync-main`：同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`feat/form-family-closure`、`main`
    - 处理动作：在收口验证前同步 `main` 最新代码到当前分支并解决本范围冲突。
    - 验收点：当前分支包含 `main` 最新提交，且没有引入 Form 闭环范围外修改。
    - 重要度：10/10

- [ ] `15 final-verification`：运行 Form 闭环验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`pnpm test`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check`
    - 处理动作：在同步 main 后运行 Form 组件族闭环所需验证命令并修复本范围内失败。
    - 验收点：四个验证命令通过，或失败项被收窄为明确阻塞原因。
    - 重要度：10/10

- [ ] `16 implementation-coverage`：更新 Form Implementation Coverage
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：记录 Form 组件族源码、测试、覆盖能力和验证结果。
    - 验收点：Implementation Coverage 明确标注 Form components、Form helpers、Additional form inputs 已实现并测试。
    - 重要度：9/10

- [ ] `17 cleanup-runbook-todo`：清理 RUNBOOK 和收窄 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-FORM-FAMILY-CLOSURE.md`、`TODO.md`
    - 处理动作：任务关闭后删除临时 RUNBOOK，并从 TODO 中删除已完成任务或收窄剩余任务。
    - 验收点：RUNBOOK 无残留引用，TODO 只保留未关闭任务。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
