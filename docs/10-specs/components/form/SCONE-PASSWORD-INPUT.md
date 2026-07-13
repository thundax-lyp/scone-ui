# SconePasswordInput

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

密码输入。

| Prop                     | 类型                      | 说明                  |
| ------------------------ | ------------------------- | --------------------- |
| `value` / `defaultValue` | `string`                  | 密码值。              |
| `onValueChange`          | `(value: string) => void` | 值变化。              |
| `visible` / `defaultVisible` | `boolean`             | 密码是否可见。        |
| `onVisibleChange`        | `(visible: boolean) => void` | 可见状态变化。    |
| `placeholder`            | `string`                  | 占位说明。            |
| `autoComplete`           | `string`                  | 原生自动完成策略。    |
| `visibilityToggle`       | `boolean`                 | 是否允许显示/隐藏。   |
| `disabled`               | `boolean`                 | 禁用。                |
| `readOnly`               | `boolean`                 | 只读。                |
| `size`                   | `"sm" \| "md" \| "lg"`    | 控件尺寸。            |
| `ariaLabel`              | `string`                  | 无可见 label 时必填。 |
| `className`              | `string`                  | 样式。                |

## Usage

- 用于密码、token、secret 等敏感短文本输入。
- 密码强度、规则提示和泄露检查由产品侧或 Field 描述承载。

## Rules

- 必须支持 `autoComplete`。
- 可见性切换按钮必须有可访问名称。
- 不内置密码强度业务规则。
- 默认不显示明文；切换只影响可见性，不改变 value。
- shadcn mapping：基于 Input + icon button 组合，保留 Field 状态关联。
