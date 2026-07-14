# SconeTabs

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

内容面板切换，用于同一对象或同一工作区内的视图切换。

| Prop                     | 类型                         | 说明                  |
| ------------------------ | ---------------------------- | --------------------- |
| `value` / `defaultValue` | `string`                     | 当前 tab。            |
| `onValueChange`          | `(value: string) => void`    | 切换回调。            |
| `orientation`            | `"horizontal" \| "vertical"` | 方向。                |
| `activationMode`         | `"automatic" \| "manual"`    | 激活方式。            |
| `items`                  | `SconeOption<string>[]`      | 简单场景 helper。     |
| `ariaLabel`              | `string`                     | 无可见 label 时必填。 |
| `children`               | `ReactNode`                  | compound parts。      |
| `className`              | `string`                     | 样式。                |

## Usage

- 同一对象或工作区内多个内容面板使用 Tabs。
- 全局导航、路由系统和轻量模式值切换不使用 Tabs。

## Rules

- 权威模型是 compound parts：TabsList、TabsTrigger、TabsContent。
- `items` 只用于简单场景，不替代 compound 组合能力。
- Tabs 切换内容面板；只切换一个轻量值时使用 Segmented。
- shadcn mapping：基于 Radix Tabs，保留 roving focus。

测试：

- Trigger 与 Content 通过 ARIA 关联；方向键切换；manual 模式下焦点移动不自动切换内容。
