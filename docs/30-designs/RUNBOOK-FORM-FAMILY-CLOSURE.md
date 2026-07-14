# Form Family Closure Runbook

## Purpose

完成 Form 组件族闭环，让 `scone-ui` 对外提供一致的 admin-ui 表单组件、结构组件、状态模型、可访问性关联、测试覆盖和根导出。

## Scope

本次闭环只纳入以下文件范围：

- `src/components/form/button.tsx`
- `src/components/form/input.tsx`
- `src/components/form/search-input.tsx`
- `src/components/form/password-input.tsx`
- `src/components/form/textarea.tsx`
- `src/components/form/select.tsx`
- `src/components/form/form.tsx`
- `src/components/form/field.tsx`
- `src/components/form/field-group.tsx`
- `src/components/form/form-section.tsx`
- `src/components/form/form-actions.tsx`
- `src/components/form/combobox.tsx`
- `src/components/form/switch.tsx`
- `src/components/form/checkbox.tsx`
- `src/components/form/radio-group.tsx`
- `src/components/form/number-input.tsx`
- `src/components/form/slider.tsx`
- `src/components/form/date-picker.tsx`
- `src/components/form/upload.tsx`
- `src/components/form/index.ts`
- `src/components/form/button.test.tsx`
- `src/components/form/input.test.tsx`
- `src/components/form/search-input.test.tsx`
- `src/components/form/password-input.test.tsx`
- `src/components/form/textarea.test.tsx`
- `src/components/form/select.test.tsx`
- `src/components/form/form.test.tsx`
- `src/components/form/field-group.test.tsx`
- `src/components/form/form-section.test.tsx`
- `src/components/form/form-actions.test.tsx`
- `src/components/form/combobox.test.tsx`
- `src/components/form/switch.test.tsx`
- `src/components/form/checkbox.test.tsx`
- `src/components/form/radio-group.test.tsx`
- `src/components/form/number-input.test.tsx`
- `src/components/form/slider.test.tsx`
- `src/components/form/date-picker.test.tsx`
- `src/components/form/upload.test.tsx`
- `src/index.ts`
- `src/index.test.ts`

可复用但不改造的现有基础文件：

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/input-group.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/switch.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/command.tsx`
- `src/lib/aria.ts`
- `src/lib/cn.ts`
- `src/lib/compose-refs.ts`
- `src/lib/use-controllable-state.ts`
- `src/types/foundation.ts`

## Non-goals

- 不绑定 React Hook Form、Formik 或自研 store。
- 不提供 AntD Form 风格全局 `form` 实例、rules 系统或校验 DSL。
- 不内置请求、字典加载、权限判断、路由跳转、业务校验规则或保存文案。
- 不迁移产品应用级 UI policy，不新增 `UI-RULES.md`。
- 不创建 recipe 运行时代码；DrawerForm、ConfirmationFlow 等 recipe 保持 docs-only。
- `SconeUpload` 只管理本地 `File[]`、选择、校验和 reject，不实现上传请求、上传进度、签名 URL 或后端协议。

## Public Data Structures

数据结构和 props 字段必须按本节落地；新增字段必须先更新本 RUNBOOK 或对应稳定设计文档。

### Shared Props

所有可交互 Form 控件共享以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string \| undefined` | 控件 id；被 `SconeField.Control` 注入时优先使用 Field id。 |
| `ariaLabel` | `string \| undefined` | 无可见 label 时必填，写入 `aria-label`。 |
| `disabled` | `boolean \| undefined` | 控件禁用；字段级值覆盖 Form context。 |
| `readOnly` | `boolean \| undefined` | 控件只读；字段级值覆盖 Form context。 |
| `invalid` | `boolean \| undefined` | 控件错误态；写入 `aria-invalid=true`。 |
| `required` | `boolean \| undefined` | 控件必填态；写入 `required` 或 `aria-required`。 |
| `size` | `SconeControlSize \| undefined` | 控件尺寸，来自 `src/types/foundation.ts`。 |
| `className` | `string \| undefined` | 透传到稳定根节点或交互节点。 |

### Value Models

| 模型 | 字段 | 适用组件 |
| --- | --- | --- |
| Text value | `value?: string`、`defaultValue?: string`、`onValueChange?: (value: string) => void` | Input、SearchInput、PasswordInput、TextArea |
| Number value | `value?: number`、`defaultValue?: number`、`onValueChange?: (value: number \| undefined) => void` | NumberInput |
| Select value | `value?: Value`、`defaultValue?: Value`、`onValueChange?: (value: Value) => void` | Select、RadioGroup |
| Optional select value | `value?: Value`、`defaultValue?: Value`、`onValueChange?: (value: Value \| undefined) => void` | Combobox |
| Boolean checked | `checked?: boolean`、`defaultChecked?: boolean`、`onCheckedChange?: (checked: boolean) => void` | Switch、Checkbox |
| Slider value | `value?: number[]`、`defaultValue?: number[]`、`onValueChange?: (value: number[]) => void` | Slider |
| Date value | `value?: Date`、`defaultValue?: Date`、`onValueChange?: (value: Date \| undefined) => void` | DatePicker |
| Upload files | `value?: File[]`、`defaultValue?: File[]`、`onValueChange?: (files: File[]) => void` | Upload |

原生 `onChange` 仅作为 DOM event handler 透传，不作为主状态 API。

### Open Models

| 字段 | 类型 | 适用组件 |
| --- | --- | --- |
| `open` | `boolean \| undefined` | Select、Combobox、DatePicker |
| `defaultOpen` | `boolean \| undefined` | Select、Combobox、DatePicker |
| `onOpenChange` | `(open: boolean) => void` | Select、Combobox、DatePicker |

### Option Fields

Select、Combobox、RadioGroup 使用 `SconeOption<Value>`，字段来自 `src/types/foundation.ts`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `Value` | 选项值，Select 和 RadioGroup 必须可序列化到稳定 key。 |
| `label` | `React.ReactNode` | 可见选项文本或节点。 |
| `disabled` | `boolean \| undefined` | 禁用该选项。 |

### Form Fields

`SconeFormProps` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `disabled` | `boolean \| undefined` | 表单级禁用 context。 |
| `readOnly` | `boolean \| undefined` | 表单级只读 context。 |
| `requiredMark` | `boolean \| "optional" \| undefined` | label 必填或可选标记策略。 |
| `className` | `string \| undefined` | 表单根节点样式。 |
| `children` | `React.ReactNode` | 表单内容。 |

`SconeField.Root` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string \| undefined` | 字段 id；未传时内部生成稳定 id。 |
| `name` | `string \| undefined` | 字段名，只作为 DOM/语义辅助，不创建 store。 |
| `label` | `React.ReactNode \| undefined` | 可选快捷 label；compound 用法优先使用 `SconeField.Label`。 |
| `description` | `React.ReactNode \| undefined` | 可选快捷 description；compound 用法优先使用 `SconeField.Description`。 |
| `message` | `React.ReactNode \| undefined` | 可选快捷 message；compound 用法优先使用 `SconeField.Message`。 |
| `invalid` | `boolean \| undefined` | 字段错误态。 |
| `required` | `boolean \| undefined` | 字段必填态。 |
| `disabled` | `boolean \| undefined` | 字段禁用态，覆盖 Form context。 |
| `readOnly` | `boolean \| undefined` | 字段只读态，覆盖 Form context。 |
| `className` | `string \| undefined` | 字段根节点样式。 |

`SconeField` compound 必须导出：

- `SconeField.Root`
- `SconeField.Label`
- `SconeField.Control`
- `SconeField.Description`
- `SconeField.Message`

### Upload Fields

`SconeUploadProps` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `File[] \| undefined` | 受控文件列表。 |
| `defaultValue` | `File[] \| undefined` | 非受控初始文件列表。 |
| `onValueChange` | `(files: File[]) => void` | 文件列表变化回调。 |
| `accept` | `string \| undefined` | 允许的文件类型，透传到 input。 |
| `multiple` | `boolean \| undefined` | 是否允许多选。 |
| `maxFiles` | `number \| undefined` | 最大文件数量。 |
| `maxSize` | `number \| undefined` | 单文件最大字节数。 |
| `beforeAdd` | `(file: File, currentFiles: File[]) => boolean \| Promise<boolean>` | 添加前校验。 |
| `onReject` | `(rejection: SconeUploadRejection) => void` | 拒绝回调。 |

`SconeUploadRejection` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `file` | `File` | 被拒绝的文件。 |
| `reason` | `"accept" \| "maxFiles" \| "maxSize" \| "beforeAdd"` | 拒绝原因。 |
| `message` | `string` | 面向开发者的拒绝说明，不内置业务文案。 |

### DatePicker Fields

`SconeDatePickerProps` 使用 `Date \| undefined` 作为值，不使用格式化字符串。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `Date \| undefined` | 受控日期。 |
| `defaultValue` | `Date \| undefined` | 非受控初始日期。 |
| `onValueChange` | `(value: Date \| undefined) => void` | 日期变化回调。 |
| `disabledDate` | `(date: Date) => boolean` | 禁用不可选日期。 |
| `placeholder` | `string \| undefined` | 空值提示，不替代 label。 |
| `formatLabel` | `(date: Date) => string` | trigger 可读文本格式化。 |

## Task Breakdown

每个小任务限定 2-5 个文件；实现时按顺序推进，便于审核和小步提交。

### Task 1: Form And Field Foundation

文件：

- `src/components/form/form.tsx`
- `src/components/form/field.tsx`
- `src/components/form/form.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeFormProps.disabled`
- `SconeFormProps.readOnly`
- `SconeFormProps.requiredMark`
- `SconeFieldRootProps.id`
- `SconeFieldRootProps.name`
- `SconeFieldRootProps.invalid`
- `SconeFieldRootProps.required`
- `SconeFieldRootProps.disabled`
- `SconeFieldRootProps.readOnly`

前端控件和操作：

- 用户查看 label、必填标记、description、message。
- 用户聚焦字段 control，control 与 label、description、message 关联。
- 用户在 `SconeForm disabled` 下看到所有 Field control 禁用。
- 用户在 Field 覆盖 `disabled/readOnly/required/invalid` 后看到字段级状态优先生效。

验收点：

- `SconeForm` 只提供 `disabled/readOnly/requiredMark` context。
- `SconeField.Control` 注入 `id`、`aria-describedby`、`aria-invalid`、`required` 或 `aria-required`。
- `SconeField` compound API 完整导出。

### Task 2: Button

文件：

- `src/components/form/button.tsx`
- `src/components/form/button.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeButtonProps.loading`
- `SconeButtonProps.disabled`
- `SconeButtonProps.ariaLabel`
- `SconeButtonProps.asChild`
- `SconeButtonProps.onClick`
- `SconeButtonProps.className`

前端控件和操作：

- 用户点击 Button，正常态触发一次 `onClick`。
- 用户点击 `loading=true` 的 Button，按钮显示等待态且不触发重复提交。
- 用户使用 `asChild` 包装链接或自定义元素，ref 和 `className` 落在交互节点。
- 用户只看到图标按钮时，`ariaLabel` 提供可访问名称。

验收点：

- `loading` 与 `disabled` 都阻止点击回调。
- `ariaLabel` 写入交互节点。
- `asChild` 不破坏 ref、className 和 disabled 语义。

### Task 3: Text Input Basics

文件：

- `src/components/form/input.tsx`
- `src/components/form/textarea.tsx`
- `src/components/form/input.test.tsx`
- `src/components/form/textarea.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeInputProps.value`
- `SconeInputProps.defaultValue`
- `SconeInputProps.onValueChange`
- `SconeInputProps.readOnly`
- `SconeInputProps.invalid`
- `SconeTextAreaProps.value`
- `SconeTextAreaProps.defaultValue`
- `SconeTextAreaProps.onValueChange`
- `SconeTextAreaProps.autoSize`
- `SconeTextAreaProps.showCount`
- `SconeTextAreaProps.maxLength`

前端控件和操作：

- 用户输入 Input 文本，触发 `onValueChange(value)`。
- 用户清空 Input，触发 `onValueChange("")`。
- 用户输入 TextArea 多行文本，文本保留换行。
- 用户输入 TextArea 时，字符计数按当前值更新。
- 用户在 Field invalid 下查看 Input/TextArea，control 带 `aria-invalid=true`。

验收点：

- Input ref 指向原生 `input`。
- TextArea ref 指向原生 `textarea`。
- `readOnly` 下可聚焦但不可编辑；`disabled` 下不可操作。

### Task 4: Search And Password Inputs

文件：

- `src/components/form/search-input.tsx`
- `src/components/form/password-input.tsx`
- `src/components/form/search-input.test.tsx`
- `src/components/form/password-input.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeSearchInputProps.value`
- `SconeSearchInputProps.defaultValue`
- `SconeSearchInputProps.onValueChange`
- `SconeSearchInputProps.loading`
- `SconeSearchInputProps.clearable`
- `SconePasswordInputProps.value`
- `SconePasswordInputProps.defaultValue`
- `SconePasswordInputProps.onValueChange`
- `SconePasswordInputProps.visibilityLabel`
- `SconePasswordInputProps.hideVisibilityLabel`

前端控件和操作：

- 用户输入 SearchInput 搜索词，触发 `onValueChange(value)`。
- 用户点击 clear 按钮，输入值清空并触发 `onValueChange("")`。
- 用户看到 `loading=true` 的 SearchInput，控件显示局部等待状态。
- 用户输入 PasswordInput 密码，默认以 password type 隐藏。
- 用户点击可见性按钮，PasswordInput 在隐藏和显示之间切换。

验收点：

- clear 和 password toggle 按钮都有可访问名称。
- `loading` 只表达 UI 等待，不发起请求。
- `readOnly` 和 `disabled` 时 clear/toggle 操作不可改变值。

### Task 5: Select

文件：

- `src/components/form/select.tsx`
- `src/components/form/select.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeSelectProps.options`
- `SconeSelectProps.value`
- `SconeSelectProps.defaultValue`
- `SconeSelectProps.onValueChange`
- `SconeSelectProps.open`
- `SconeSelectProps.defaultOpen`
- `SconeSelectProps.onOpenChange`
- `SconeSelectProps.placeholder`

前端控件和操作：

- 用户打开 Select、用键盘移动选项、选择一项、关闭浮层。
- 用户点击 disabled 选项，选中值不改变。
- 用户在 `open` 受控模式下打开或关闭 Select，触发 `onOpenChange(open)`。
- 用户在 Field invalid 下查看 Select trigger，trigger 带错误 ARIA 状态。

验收点：

- Select 使用 `open/defaultOpen/onOpenChange` 管理展开态。
- Select 使用 `SconeOption<Value>`。
- Field invalid 写入对应 trigger 或 control 的 ARIA 状态。

### Task 6: Boolean Choice Controls

文件：

- `src/components/form/switch.tsx`
- `src/components/form/checkbox.tsx`
- `src/components/form/switch.test.tsx`
- `src/components/form/checkbox.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeSwitchProps.checked`
- `SconeSwitchProps.defaultChecked`
- `SconeSwitchProps.onCheckedChange`
- `SconeCheckboxProps.checked`
- `SconeCheckboxProps.defaultChecked`
- `SconeCheckboxProps.onCheckedChange`
- `SconeCheckboxProps.indeterminate`

前端控件和操作：

- 用户点击 Switch，状态在 on/off 间切换。
- 用户按 Space 切换 Switch，触发 `onCheckedChange`。
- 用户点击 Checkbox，状态在 checked/unchecked 间切换。
- 用户查看 `indeterminate=true` 的 Checkbox，控件显示半选态。
- 用户在 Field invalid 下查看 Switch/Checkbox，control 带错误 ARIA 状态。

验收点：

- Switch 和 Checkbox 保留 Radix checked/keyboard 语义。
- `disabled` 时点击和键盘都不改变状态。
- `indeterminate` 不伪装成 checked 值。

### Task 7: RadioGroup And Slider

文件：

- `src/components/form/radio-group.tsx`
- `src/components/form/slider.tsx`
- `src/components/form/radio-group.test.tsx`
- `src/components/form/slider.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeRadioGroupProps.options`
- `SconeRadioGroupProps.value`
- `SconeRadioGroupProps.defaultValue`
- `SconeRadioGroupProps.onValueChange`
- `SconeRadioGroupProps.orientation`
- `SconeSliderProps.value`
- `SconeSliderProps.defaultValue`
- `SconeSliderProps.onValueChange`
- `SconeSliderProps.min`
- `SconeSliderProps.max`
- `SconeSliderProps.step`

前端控件和操作：

- 用户点击 RadioGroup 选项，选中值变化。
- 用户用方向键在 RadioGroup 选项间移动并选择。
- 用户拖动 Slider thumb，数值数组变化。
- 用户用键盘调整 Slider 值，按 step 增减。
- 用户在 disabled 状态下操作 RadioGroup/Slider，值不改变。

验收点：

- RadioGroup 使用 `SconeOption<Value>`。
- Slider 值固定为 `number[]`，单值 Slider 也用单元素数组。
- Field invalid 写入对应 control 的 ARIA 状态。

### Task 8: Combobox And NumberInput

文件：

- `src/components/form/combobox.tsx`
- `src/components/form/number-input.tsx`
- `src/components/form/combobox.test.tsx`
- `src/components/form/number-input.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeComboboxProps.options`
- `SconeComboboxProps.value`
- `SconeComboboxProps.defaultValue`
- `SconeComboboxProps.onValueChange`
- `SconeComboboxProps.open`
- `SconeComboboxProps.defaultOpen`
- `SconeComboboxProps.onOpenChange`
- `SconeComboboxProps.searchValue`
- `SconeComboboxProps.onSearchValueChange`
- `SconeComboboxProps.loading`
- `SconeComboboxProps.emptyText`
- `SconeNumberInputProps.value`
- `SconeNumberInputProps.defaultValue`
- `SconeNumberInputProps.onValueChange`
- `SconeNumberInputProps.min`
- `SconeNumberInputProps.max`
- `SconeNumberInputProps.step`

前端控件和操作：

- 用户打开 Combobox，浮层显示 options。
- 用户输入搜索词，触发 `onSearchValueChange(searchValue)`。
- 用户选择选项，触发 `onValueChange(value)` 并关闭浮层。
- 用户清空 Combobox，触发 `onValueChange(undefined)`。
- 用户在 NumberInput 输入数字，触发 `onValueChange(number)`。
- 用户清空 NumberInput，触发 `onValueChange(undefined)`。
- 用户点击 NumberInput stepper，按 `step` 增减并受 `min/max` 限制。

验收点：

- Combobox 支持 loading、empty、open、selected 和 keyboard selection。
- NumberInput 的空值通过 `undefined` 表达，不用 `NaN` 暴露给调用方。
- NumberInput ref 指向原生 `input`。

### Task 9: DatePicker

文件：

- `src/components/form/date-picker.tsx`
- `src/components/form/date-picker.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeDatePickerProps.value`
- `SconeDatePickerProps.defaultValue`
- `SconeDatePickerProps.onValueChange`
- `SconeDatePickerProps.open`
- `SconeDatePickerProps.defaultOpen`
- `SconeDatePickerProps.onOpenChange`
- `SconeDatePickerProps.disabledDate`
- `SconeDatePickerProps.placeholder`
- `SconeDatePickerProps.formatLabel`

前端控件和操作：

- 用户打开 DatePicker、用键盘打开日历、选择日期、关闭浮层；禁用日期不可选。
- 用户在 trigger 上按 Enter 或 Space，打开日期浮层。
- 用户选择可用日期，触发 `onValueChange(date)`。
- 用户点击 disabled date，值不改变且浮层保持可理解状态。
- 用户清空日期，触发 `onValueChange(undefined)`。

验收点：

- DatePicker 值类型固定为 `Date \| undefined`，格式化只通过 `formatLabel` 输出显示文本。
- DatePicker 使用 `open/defaultOpen/onOpenChange` 管理展开态。
- Field invalid 写入 trigger 的 ARIA 状态。

### Task 10: Upload

文件：

- `src/components/form/upload.tsx`
- `src/components/form/upload.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeUploadProps.value`
- `SconeUploadProps.defaultValue`
- `SconeUploadProps.onValueChange`
- `SconeUploadProps.accept`
- `SconeUploadProps.multiple`
- `SconeUploadProps.maxFiles`
- `SconeUploadProps.maxSize`
- `SconeUploadProps.beforeAdd`
- `SconeUploadProps.onReject`
- `SconeUploadRejection.file`
- `SconeUploadRejection.reason`
- `SconeUploadRejection.message`

前端控件和操作：

- 用户点击 Upload 选择文件，文件通过校验后进入列表。
- 用户选择不符合 `accept` 的文件，触发 `onReject({ reason: "accept" })`。
- 用户选择超过 `maxSize` 的文件，触发 `onReject({ reason: "maxSize" })`。
- 用户选择超过 `maxFiles` 的文件，触发 `onReject({ reason: "maxFiles" })`。
- 用户的 `beforeAdd` 返回 false，触发 `onReject({ reason: "beforeAdd" })`。
- 用户在 disabled 状态点击 Upload，不打开选择动作且不改变文件列表。

验收点：

- Upload 不发起网络请求，不展示业务上传进度。
- `multiple=false` 时文件列表最多保留一个文件。
- `onValueChange(files)` 只返回通过校验的文件列表。

### Task 11: FieldGroup

文件：

- `src/components/form/field-group.tsx`
- `src/components/form/field-group.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeFieldGroupProps.title`
- `SconeFieldGroupProps.description`
- `SconeFieldGroupProps.columns`
- `SconeFieldGroupProps.children`
- `SconeFieldGroupProps.className`

前端控件和操作：

- 用户查看一组相关字段，FieldGroup 提供语义分组和可读标题。
- 用户在 FieldGroup 内按 tab 顺序经过每个字段。
- 用户调整窗口宽度，columns 布局变化但字段顺序不变。

验收点：

- FieldGroup 只表达字段分组和布局。
- ref 指向语义容器。

### Task 12: FormSection And FormActions

文件：

- `src/components/form/form-section.tsx`
- `src/components/form/form-actions.tsx`
- `src/components/form/form-section.test.tsx`
- `src/components/form/form-actions.test.tsx`
- `src/components/form/index.ts`

数据结构字段：

- `SconeFormSectionProps.title`
- `SconeFormSectionProps.description`
- `SconeFormSectionProps.actions`
- `SconeFormSectionProps.children`
- `SconeFormActionsProps.align`
- `SconeFormActionsProps.sticky`
- `SconeFormActionsProps.children`

前端控件和操作：

- 用户查看长表单分区，FormSection 显示标题、说明和内容区域。
- 用户在 FormSection header 查看局部 actions。
- 用户滚动长表单，FormActions 在 sticky 模式下保持操作区可见。
- 用户在窄屏查看 FormActions，按钮换行后仍保持主次操作顺序。

验收点：

- helper 只表达结构、标题、说明、布局和 sticky，不内置保存、取消、请求或权限逻辑。
- `align`、`sticky`、`className` 只影响布局，不改变业务行为。
- ref 指向语义容器。

### Task 13: Public Export Closure

文件：

- `src/components/form/index.ts`
- `src/index.ts`
- `src/index.test.ts`

数据结构字段：

- `src/components/form/index.ts` 导出所有 `Scone*` 组件。
- `src/components/form/index.ts` 导出所有 `Scone*Props` 类型。
- `src/index.ts` 汇总导出 `src/components/form/index.ts` 的组件。
- `src/index.ts` 汇总导出 `src/components/form/index.ts` 的类型。
- `src/index.test.ts` 的 runtime export keys 包含所有 Form 组件名。
- `src/index.test.ts` 的 type assertions 覆盖所有 Form public props 类型。

前端控件和操作：

- 使用者从根入口导入任一 Form 组件或类型。
- 使用者从 `src/components/form` 族入口导入任一 Form 组件或类型。

验收点：

- `src/components/form/index.ts` 导出所有组件和 props 类型。
- `src/index.ts` 从 `src/components/form` 汇总导出 Form 组件和类型。
- `src/index.test.ts` 覆盖所有 Form runtime export key 和 public type export。

## Verification

每个 Task 完成后运行最小相关测试；全量闭环后运行：

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm format:check
```

全量验收必须覆盖：

- Form/Field 的 label、description、message、required、disabled、readOnly、invalid 传播。
- Button 的 loading 禁止重复触发、disabled、`ariaLabel`、`asChild` ref 和 `className`。
- 文本输入的受控值、默认值、回调、ref、disabled、readOnly、Field invalid。
- Select、Combobox、DatePicker 的受控 value/open、键盘行为、loading/empty 或 disabledDate、Field invalid。
- Switch、Checkbox、RadioGroup、Slider 的受控状态、默认状态、disabled、Field invalid 和 Radix 键盘语义。
- Upload 的 `accept`、`multiple`、`maxFiles`、`maxSize`、`beforeAdd`、`onReject` 和 disabled。
- 根导出的 runtime export 和 public type export。

## Closure

任务完成后删除本 RUNBOOK。若验证证据仍需长期保留，先迁移到 `docs/40-readiness/` 的对应 readiness 或 evidence 文档，再删除本临时文件和残留引用。
