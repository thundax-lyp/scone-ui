# Form Component Spec

## Scope

本规格覆盖 admin-ui 基础表单和操作组件。表单组件只负责输入、校验展示、状态表达和提交语义，不绑定业务流程。

## Components

### SconeButton

基础按钮。

| Prop              | 类型                                            | 说明             |
| ----------------- | ----------------------------------------------- | ---------------- |
| `variant`         | `"primary" \| "secondary" \| "ghost" \| "link"` | 视觉变体         |
| `size`            | `"sm" \| "md" \| "lg"`                          | 尺寸             |
| `danger`          | `boolean`                                       | 危险语义         |
| `block`           | `boolean`                                       | 块级             |
| `type`            | `"button" \| "submit" \| "reset"`               | 原生类型         |
| `href` / `target` | `string`                                        | 链接按钮         |
| `icon`            | `ReactNode`                                     | 图标             |
| `loading`         | `boolean`                                       | 加载             |
| `disabled`        | `boolean`                                       | 禁用             |
| `onClick`         | `function`                                      | 点击             |
| `aria-label`      | `string`                                        | 无可见文本时必填 |
| `className`       | `string`                                        | 样式             |

规则：

- 无可见文本的按钮必须有可访问名称。
- `danger` 不自动提供确认流程。
- 表单提交按钮必须显式使用 `type="submit"`。

### SconeInput

单行文本输入。

建议能力：

- `value` / `defaultValue`
- `onChange`
- `onPressEnter`
- `placeholder`
- `allowClear`
- `disabled`
- `readOnly`
- `prefix` / `suffix`
- `autoComplete`
- `maxLength`
- `showCount`
- `aria-label`
- `size`
- `className`

规则：

- placeholder 必须表达输入对象。
- 只读和禁用状态必须视觉可区分。

### SconeSearchInput

搜索输入。

规则：

- 必须支持 `value`、`onChange`、`onSearch`。
- 必须有稳定可访问名称。
- 搜索按钮或回车行为必须一致。

### SconePasswordInput

密码输入。

规则：

- 必须支持 `autoComplete`。
- 可见性切换必须有可访问名称。

### SconeTextArea

多行文本输入。

建议能力：

- `rows`
- `autoSize`
- `maxLength`
- `showCount`
- `value`
- `onChange`
- `placeholder`
- `disabled`
- `className`

### SconeSelect

选择器。

| Prop          | 类型                               | 说明       |
| ------------- | ---------------------------------- | ---------- |
| `value`       | `unknown`                          | 当前值     |
| `options`     | `SconeOption[]`                    | 选项       |
| `onChange`    | `function`                         | 变更       |
| `placeholder` | `string`                           | 占位       |
| `allowClear`  | `boolean`                          | 清空       |
| `searchable`  | `boolean`                          | 是否可搜索 |
| `mode`        | `"single" \| "multiple" \| "tags"` | 模式       |
| `loading`     | `boolean`                          | 加载       |
| `disabled`    | `boolean`                          | 禁用       |
| `aria-label`  | `string`                           | 可访问名称 |
| `className`   | `string`                           | 样式       |

规则：

- options 使用统一 `{ label, value, disabled? }` 结构。
- 多选空值类型必须稳定。

### SconeForm

表单容器。

建议能力：

- `form`
- `layout`
- `initialValues`
- `onSubmit`
- `requiredMark`
- `children`
- `className`

规则：

- 表单容器不承载页面标题。
- 提交状态由调用方控制。

### SconeFormItem

表单项。

建议能力：

- `name`
- `label`
- `rules`
- `error`
- `help`
- `required`
- `hidden`
- `children`
- `className`

规则：

- 错误信息必须绑定到具体输入。
- label 不直接使用后端字段名。

### SconeSwitch

布尔切换。

规则：

- 必须支持 `checked`、`onChange`、`disabled`、`aria-label`。
- 短文案可用 `checkedLabel` / `uncheckedLabel`，长说明放在外部。

### SconeCheckbox

勾选输入。

规则：

- 必须支持 `checked`、`indeterminate`、`onChange`。
- 文本 label 应与控件关联。

### SconeNumberInput

数字输入。

规则：

- 必须支持 `min`、`max`、`precision`。
- 格式化展示和真实值必须可区分。

### SconeDatePicker

日期时间输入。

规则：

- 必须明确值类型。
- `showTime` 作为显式能力。

### SconeUpload

文件选择和上传基础入口。

规则：

- 必须支持 `accept` 和 `beforeUpload`。
- 默认不绑定业务上传接口。
- 进度展示与 `SconeProgress` 组合。
