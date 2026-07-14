# SconeField

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

字段结构组件，替代含混的 `FormItem` 模型。

## Anatomy

权威组合模型是 compound parts：

- `SconeField.Root`: 字段容器，生成 field id 并提供 context。
- `SconeField.Label`: 用户可读 label，可带 required 标记。
- `SconeField.Control`: 输入控件 slot，通过 `asChild`/Slot 和 context 把 id、ARIA 和状态提供给 control。
- `SconeField.Description`: 约束、格式或解释。
- `SconeField.Message`: 校验错误或提示，优先表达错误。

| Prop          | 类型        | 说明                              |
| ------------- | ----------- | --------------------------------- |
| `name`        | `string`    | 字段名，用于 adapter 或 id 生成。 |
| `id`          | `string`    | 显式字段 id。                     |
| `label`       | `ReactNode` | 字段 label。                      |
| `description` | `ReactNode` | 说明。                            |
| `message`     | `ReactNode` | 错误或提示。                      |
| `invalid`     | `boolean`   | 校验错误状态。                    |
| `required`    | `boolean`   | 必填。                            |
| `disabled`    | `boolean`   | 禁用。                            |
| `readOnly`    | `boolean`   | 只读。                            |
| `hidden`      | `boolean`   | 隐藏字段区域。                    |
| `children`    | `ReactNode` | Control。                         |
| `className`   | `string`    | 样式。                            |

## Usage

- 每个输入控件都应放入 Field，获得 label、description、message 和 ARIA 关联。
- 多个相关控件使用 FieldGroup，页面级分区使用 FormSection。

API 模式：

- Shorthand 模式：在 `SconeField.Root` 或 `SconeField` 上传入 `label`、`description`、`message` 和单个 `children`，组件自动生成 Label、Control、Description、Message。
- Compound 模式：显式使用 `SconeField.Label`、`SconeField.Control`、`SconeField.Description`、`SconeField.Message`。
- 两种模式不得混用。只要 children 中出现任一 compound part，`label`、`description`、`message` shorthand props 不自动渲染；实现应在开发环境警告或测试中禁止重复 label/message。

## Rules

- `Root` 根据显式 `id` 或 `name` 生成稳定 `fieldId`；未提供时使用 React `useId`。
- `Label` 的 `htmlFor` 指向 `fieldId`，除非 Control 包装的是非 labelable Radix trigger，此时使用 `aria-labelledby`。
- `Description` 和 `Message` 分别生成稳定 id，`Control` 合并到 child 的 `aria-describedby`，不得覆盖调用方已有描述 id。
- `invalid` 必须通过 `aria-invalid` 传播到 control；Radix trigger 使用等价 `data-invalid` 和 ARIA。
- `required` 必须体现在 label 标记和 control 的 `aria-required` 或原生 `required`。
- 表单级 `disabled`、`readOnly` 向 Field context 传播；字段级 props 可覆盖表单级值。
- `Control` 的用户心智模型固定为 `asChild`/Slot + Field context。
- `cloneElement` 只能作为内部兼容细节，不作为公开接入方式。
- 自定义控件优先读取 Field context；无法读取 context 的第三方控件由调用方手动接入 `id`、`aria-describedby`、`aria-invalid`。
- 多个 `Message` 可存在，但只有当前有效错误进入默认 `aria-describedby`；附加说明使用 Description。
- label 不直接使用后端字段名。
- `hidden` 不等同于权限控制；业务权限由产品侧处理。
- `SconeFormItem` 可作为兼容别名讨论，但权威结构命名为 `SconeField`。

可访问性测试最低要求：

- 通过 label 能查询到 control。
- invalid 时 control 有 `aria-invalid=true`。
- description/message 文本出现在 `aria-describedby` 关联节点中。
- disabled/readOnly 从 Form 传入时能影响 Field 内标准控件。
