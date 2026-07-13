# Feedback And Overlay Component Spec

## Scope

本规格覆盖 admin-ui 基础反馈和浮层组件。反馈组件只负责状态表达、浮层结构、确认语义和异步状态，不绑定创建、编辑、详情等业务流程。

## Components

### SconeDrawer

侧向浮层容器。

| Prop             | 类型                             | 说明         |
| ---------------- | -------------------------------- | ------------ |
| `open`           | `boolean`                        | 打开状态     |
| `onClose`        | `() => void`                     | 关闭         |
| `title`          | `ReactNode`                      | 标题         |
| `size`           | `"sm" \| "md" \| "lg" \| "full"` | 尺寸         |
| `footer`         | `ReactNode`                      | 底部区域     |
| `extra`          | `ReactNode`                      | 标题辅助区域 |
| `loading`        | `boolean`                        | 加载         |
| `destroyOnClose` | `boolean`                        | 关闭后销毁   |
| `aria-label`     | `string`                         | 可访问名称   |
| `className`      | `string`                         | 样式         |

规则：

- 抽屉只提供浮层结构，不内置保存、取消或详情业务。
- `footer` 是布局 slot，不定义具体按钮。
- 加载状态必须避免误操作。

### SconeModal

居中弹窗。

建议能力：

- `open`
- `title`
- `onConfirm`
- `onCancel`
- `confirmLoading`
- `footer`
- `confirmText`
- `cancelText`
- `className`

规则：

- 长表单优先由调用方选择抽屉或页面承载，基础弹窗不限制内容。
- 弹窗必须有明确标题或可访问名称。

### SconeConfirm

确认交互。

| Prop          | 类型                          | 说明     |
| ------------- | ----------------------------- | -------- |
| `title`       | `ReactNode`                   | 确认标题 |
| `description` | `ReactNode`                   | 影响说明 |
| `onConfirm`   | `() => void \| Promise<void>` | 确认     |
| `cancelText`  | `string`                      | 取消文案 |
| `confirmText` | `string`                      | 确认文案 |
| `danger`      | `boolean`                     | 危险语义 |
| `disabled`    | `boolean`                     | 禁用     |

规则：

- 危险确认必须允许传入影响说明。
- 异步确认必须支持 loading。

### SconeAlert

状态提示。

建议能力：

- `tone`: `"info" | "success" | "warning" | "danger"`
- `title`
- `description`
- `icon`
- `action`
- `className`

规则：

- 错误信息必须可读，不只展示错误码。
- `action` 只放与提示直接相关的操作。

### SconeEmpty

空状态。

建议能力：

- `title`
- `description`
- `image`
- `action`
- `className`

规则：

- 空状态必须说明当前没有什么。
- 可恢复时提供明确操作入口。

### SconeLoading

加载状态。

建议能力：

- `loading`
- `variant`: `"spinner" | "skeleton"`
- `size`
- `children`
- `className`

规则：

- 页面级初次加载优先 skeleton。
- 操作级加载优先按钮 loading。

### SconeProgress

进度展示。

建议能力：

- `value`
- `max`
- `status`
- `showLabel`
- `className`

规则：

- 长任务进度必须配合状态文案。
