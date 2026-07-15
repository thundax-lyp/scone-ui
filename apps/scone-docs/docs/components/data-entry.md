---
title: 数据录入总览
sidebar_position: 5
---

# 数据录入总览

数据录入组件用于收集、编辑和提交结构化信息。Scone 的表单组件提供结构、ARIA 关联、状态展示和输入事件，不绑定 React Hook Form、Formik、请求层、权限判断或业务校验规则。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 动作按钮 | `SconeButton` | 普通、提交、加载和危险动作。 |
| 文本输入 | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | 文本、搜索、密码和多行输入。 |
| 数值和日期 | `SconeNumberInput`、`SconeSlider`、`SconeDatePicker` | 精确数字、范围调节和日期选择。 |
| 选择控件 | `SconeSelect`、`SconeCombobox`、`SconeRadioGroup`、`SconeCheckbox`、`SconeSwitch` | 单选、多选、搜索选择和开关状态。 |
| 上传 | `SconeUpload` | 文件选择和上传 UI 桥接。 |
| 表单结构 | `SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | 表单容器、字段关联、分组和操作区。 |

## 输入事件

- 文本和值输入组件以 `value` / `defaultValue` / `onValueChange` 作为主要受控模型。
- 需要原生事件时通过 `onChange` 透传 React 原生事件；它不是组件的主要值变化 API。
- `SconeSearchInput` 的 `onSearch(value)` 只表达显式搜索提交，不替代 `onValueChange`。
- 清空、提交、打开浮层和提交最终值使用显式事件，例如 `onClear`、`onSearch`、`onOpenChange`、`onValueCommit`。

## 选择规则

- 单值输入用 `SconeSelect`，大量选项搜索选择用 `SconeCombobox`。
- 单选比较用 `SconeRadioGroup`，不要为了少量选项默认折叠成 Select。
- 精确数字用 `SconeNumberInput`，粗略范围调节用 `SconeSlider`。
- 字段布局用 `SconeField`，表单语义容器用 `SconeForm`。
- 长表单编辑优先使用 `SconeDrawer` 或 FormPage Pattern，不塞进 `SconeDialog`。

## 反模式

- 把 Form 设计成 AntD `form` 实例和 rules 的完整复刻。
- 用 placeholder 代替 label。
- 在基础组件中内置请求、字典加载、权限判断或业务校验规则。
