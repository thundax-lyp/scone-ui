# Form Component Spec

本文档是该分组的索引和共享规则。单组件合同已拆分到更小颗粒度的 SPEC 文件。

## Scope

本规格覆盖 admin-ui 基础表单、字段结构和操作组件。组件只负责输入、可访问关联、校验展示、状态表达和提交语义，不绑定业务流程、接口请求、权限判断或唯一表单状态库。

跨组件词汇、尺寸和状态以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准；FormPage、DrawerForm 和 FilterBar 以 [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md) 为准。

## State Library Boundary

`SconeForm` 和 `SconeField` 不强绑定 React Hook Form、Formik 或自研 store。

- 基础组件提供结构、ARIA 关联和状态展示。
- React Hook Form 等集成通过 adapter、示例或 recipe 提供。
- 不提供 AntD Form 风格的全局 `form` 实例作为基础依赖。
- 校验规则对象不进入基础组件核心 API；字段错误由调用方传入或 adapter 映射。

## Input Change Contract

表单输入组件统一使用 value callback，降低 adapter 接入成本。

- 文本和值输入组件使用 `onValueChange(value)` 表达值变化。
- 需要原生事件时通过 `onChange` 透传 React 原生事件；它不是组件的主要受控 API。
- Radix value 组件沿用 `value` / `defaultValue` / `onValueChange`。
- SearchInput 的 `onSearch(value)` 只表达显式搜索提交，不替代 `onValueChange`。
- 表单状态库 adapter 默认接入 `value` 和 `onValueChange`。
- 输入组件必须透传标准 `onFocus`、`onBlur`、`onKeyDown`、`name`、`id`、`autoFocus`、`autoComplete` 和 `form` 等原生字段，除非组件 SPEC 明确禁止。
- 清空、提交、打开浮层、提交最终值等非原生语义必须使用显式事件，例如 `onClear`、`onSearch`、`onOpenChange`、`onValueCommit`。

## Component Index

- [`SconeButton`](./components/form/SCONE-BUTTON.md)
- [`SconeInput`](./components/form/SCONE-INPUT.md)
- [`SconeSearchInput`](./components/form/SCONE-SEARCH-INPUT.md)
- [`SconePasswordInput`](./components/form/SCONE-PASSWORD-INPUT.md)
- [`SconeTextArea`](./components/form/SCONE-TEXTAREA.md)
- [`SconeSelect`](./components/form/SCONE-SELECT.md)
- [`SconeForm`](./components/form/SCONE-FORM.md)
- [`SconeField`](./components/form/SCONE-FIELD.md)
- [`SconeFieldGroup`](./components/form/SCONE-FIELD-GROUP.md)
- [`SconeFormSection`](./components/form/SCONE-FORM-SECTION.md)
- [`SconeFormActions`](./components/form/SCONE-FORM-ACTIONS.md)
- [`SconeCombobox`](./components/form/SCONE-COMBOBOX.md)
- [`SconeSwitch`](./components/form/SCONE-SWITCH.md)
- [`SconeCheckbox`](./components/form/SCONE-CHECKBOX.md)
- [`SconeRadioGroup`](./components/form/SCONE-RADIO-GROUP.md)
- [`SconeNumberInput`](./components/form/SCONE-NUMBER-INPUT.md)
- [`SconeSlider`](./components/form/SCONE-SLIDER.md)
- [`SconeDatePicker`](./components/form/SCONE-DATE-PICKER.md)
- [`SconeUpload`](./components/form/SCONE-UPLOAD.md)

## Anti-patterns

- 把 Form 设计成 AntD `form` 实例和 rules 的完整复刻。
- 用 placeholder 代替 label。
- 用 disabled input 展示只读详情。
- 把筛选表单和编辑表单混用同一布局。
- 在基础组件中内置请求、字典加载、权限判断或业务校验规则。
