# SconeDrawer

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

侧向任务容器，用于短到中等长度创建、编辑、详情和辅助面板。

| Prop             | 类型                                   | 说明                     |
| ---------------- | -------------------------------------- | ------------------------ |
| `open`           | `boolean`                              | 打开状态。               |
| `defaultOpen`    | `boolean`                              | 默认打开。               |
| `onOpenChange`   | `(open: boolean) => void`              | 受控状态变化。           |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 用户请求关闭。           |
| `title`          | `ReactNode`                            | 标题。                   |
| `description`    | `ReactNode`                            | 可选说明。               |
| `side`           | `"right" \| "left" \| "bottom"`        | 出现方向，默认 `right`。 |
| `widthPreset`    | `"sm" \| "md" \| "lg" \| "full"`       | 宽度预设。               |
| `actions`        | `ReactNode`                            | 标题右侧操作。           |
| `footer`         | `ReactNode`                            | 底部区域。               |
| `loading`        | `boolean`                              | 内容加载。               |
| `destroyOnClose` | `boolean`                              | 关闭后销毁。             |
| `ariaLabel`      | `string`                               | 无可见标题时必填。       |
| `className`      | `string`                               | 样式。                   |

## Usage

- 中等复杂度的创建、编辑、详情和辅助任务使用 Drawer。
- 长流程或高复杂度编辑使用页面；短确认使用 Confirm。

## Rules

- Drawer 只提供浮层结构，不内置保存、取消或详情业务。
- `footer` 是布局 slot，不定义具体按钮；DrawerForm recipe 决定按钮组合。
- loading 时避免误操作，提交按钮 loading 由按钮自身表达。
- 窄屏可提升为 `full`。
- shadcn mapping：基于 Sheet/Drawer 包装，保留焦点和关闭行为。
